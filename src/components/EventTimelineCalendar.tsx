'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Paper,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Alert,
  Skeleton
} from '@mui/material'
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Event as EventIcon,
  Today as TodayIcon
} from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'

interface CalendarEvent {
  id: string
  sdg_id: number
  title: string
  description: string
  start_date: string
  end_date: string
  location: string
  status: 'upcoming' | 'ongoing' | 'completed'
}

interface EventTimelineCalendarProps {
  sdgId: number
  color: string
}

const CalendarContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  marginBottom: theme.spacing(2)
}))

const DayCell = styled(Box, {
  shouldForwardProp: (prop) => !['isToday', 'hasEvent', 'isSelected'].includes(prop as string)
})<{ isToday?: boolean; hasEvent?: boolean; isSelected?: boolean }>(
  ({ theme, isToday, hasEvent, isSelected }) => ({
    aspectRatio: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: isToday ? 700 : 400,
    backgroundColor: isSelected 
      ? theme.palette.primary.main 
      : isToday 
        ? theme.palette.grey[200]
        : 'transparent',
    color: isSelected 
      ? 'white' 
      : theme.palette.text.primary,
    border: hasEvent ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: isSelected 
        ? theme.palette.primary.dark 
        : theme.palette.grey[100]
    }
  })
)

const EventDot = styled(Box)(({ theme }) => ({
  width: 6,
  height: 6,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  position: 'absolute',
  bottom: 2
}))

export default function EventTimelineCalendar({ sdgId, color }: EventTimelineCalendarProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedEvents, setSelectedEvents] = useState<CalendarEvent[]>([])
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    fetchEvents()
    
    // Real-time subscription
    const channel = supabase
      .channel(`calendar_events_${sdgId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'sdg_events',
          filter: `sdg_id=eq.${sdgId}`
        },
        () => {
          fetchEvents()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [sdgId])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('sdg_events')
        .select('id, sdg_id, title, description, start_date, end_date, location, status')
        .eq('sdg_id', sdgId)
        .order('start_date', { ascending: true })

      if (error) {
        if (error.code === '42P01') {
          // Table doesn't exist
          setEvents([])
          return
        }
        throw error
      }
      setEvents(data || [])
    } catch (error) {
      console.error('Error fetching calendar events:', error)
      setEvents([])
    } finally {
      setLoading(false)
    }
  }

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getEventsForDate = (date: Date): CalendarEvent[] => {
    const dateStr = date.toISOString().split('T')[0]
    return events.filter(event => {
      const start = event.start_date
      const end = event.end_date
      return dateStr >= start && dateStr <= end
    })
  }

  const hasEventOnDate = (date: Date): boolean => {
    return getEventsForDate(date).length > 0
  }

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const dayEvents = getEventsForDate(clickedDate)
    
    if (dayEvents.length > 0) {
      setSelectedDate(clickedDate)
      setSelectedEvents(dayEvents)
      setOpenDialog(true)
    }
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const goToToday = () => {
    const today = new Date()
    setCurrentDate(today)
    const todayEvents = getEventsForDate(today)
    if (todayEvents.length > 0) {
      setSelectedDate(today)
      setSelectedEvents(todayEvents)
      setOpenDialog(true)
    }
  }

  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    
    if (start === end) {
      return startDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      })
    }
    
    return `${startDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })} - ${endDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })}`
  }

  const getDaysArray = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }
    
    // Days of month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    
    return days
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  if (loading) {
    return (
      <CalendarContainer>
        <Skeleton variant="text" height={40} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={250} />
      </CalendarContainer>
    )
  }

  const upcomingEvents = events.filter(e => 
    e.status === 'upcoming' || e.status === 'ongoing'
  ).slice(0, 3)

  return (
    <CalendarContainer>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color }}>
          Event Calendar
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton size="small" onClick={() => navigateMonth('prev')}>
            <ChevronLeftIcon />
          </IconButton>
          <Typography variant="subtitle1" sx={{ minWidth: 120, textAlign: 'center' }}>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </Typography>
          <IconButton size="small" onClick={() => navigateMonth('next')}>
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Today Button */}
      <Button
        size="small"
        startIcon={<TodayIcon />}
        onClick={goToToday}
        sx={{ mb: 2, color }}
      >
        Today
      </Button>

      {/* Weekday Headers */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1, mb: 1 }}>
        {weekDays.map(day => (
          <Typography
            key={day}
            variant="caption"
            align="center"
            sx={{ fontWeight: 600, color: 'text.secondary' }}
          >
            {day}
          </Typography>
        ))}
      </Box>

      {/* Calendar Grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}>
        <AnimatePresence>
          {getDaysArray().map((day, index) => {
            if (day === null) {
              return <Box key={`empty-${index}`} />
            }

            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
            const isToday = new Date().toDateString() === date.toDateString()
            const hasEvent = hasEventOnDate(date)
            const dayEvents = getEventsForDate(date)

            return (
              <motion.div
                key={day}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.01 }}
              >
                <DayCell
                  isToday={isToday}
                  hasEvent={hasEvent}
                  onClick={() => handleDateClick(day)}
                  sx={{ position: 'relative' }}
                >
                  {day}
                  {hasEvent && <EventDot />}
                </DayCell>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </Box>

      {/* Upcoming Events Preview */}
      {upcomingEvents.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Upcoming Events
          </Typography>
          {upcomingEvents.map((event, idx) => (
            <Paper
              key={event.id}
              sx={{
                p: 1.5,
                mb: 1,
                borderLeft: `3px solid ${color}`,
                cursor: 'pointer',
                '&:hover': { bgcolor: 'grey.50' }
              }}
              onClick={() => {
                const start = new Date(event.start_date)
                setCurrentDate(start)
                setSelectedDate(start)
                setSelectedEvents([event])
                setOpenDialog(true)
              }}
            >
              <Typography variant="body2" fontWeight="medium" noWrap>
                {event.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatDateRange(event.start_date, event.end_date)}
              </Typography>
            </Paper>
          ))}
        </Box>
      )}

      {/* Event Details Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EventIcon sx={{ color }} />
            Events on {selectedDate?.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Box>
        </DialogTitle>
        <DialogContent>
          <List>
            {selectedEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  mb: 2,
                  bgcolor: 'grey.50',
                  borderRadius: 2,
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }}
              >
                <Box sx={{ width: '100%', mb: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" fontWeight="bold">
                      {event.title}
                    </Typography>
                    <Chip
                      label={event.status.toUpperCase()}
                      size="small"
                      color={event.status === 'ongoing' ? 'success' : 'primary'}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {formatDateRange(event.start_date, event.end_date)}
                  </Typography>
                </Box>
                
                <Typography variant="body2" paragraph>
                  {event.description}
                </Typography>
                
                <Typography variant="caption" color="text.secondary">
                  📍 {event.location}
                </Typography>
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>

      {/* No Events Message */}
      {events.length === 0 && (
        <Alert severity="info" sx={{ mt: 2, borderRadius: 2 }}>
          No events scheduled. Check back soon!
        </Alert>
      )}
    </CalendarContainer>
  )
}