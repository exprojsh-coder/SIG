'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  Button,
  Skeleton,
  Alert
} from '@mui/material'
import {
  Event as EventIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Edit as EditIcon,
  DateRange as DateRangeIcon
} from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { useSession } from 'next-auth/react'

// Super admin email from env
const SUPER_ADMIN_EMAIL = process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL

// Updated interface with start_date and end_date
interface SDGEvent {
  id: string
  sdg_id: number
  title: string
  description: string
  start_date: string    // Changed from event_date
  end_date: string      // NEW
  location: string
  requirements: string[]
  status: 'upcoming' | 'ongoing' | 'completed'
}

interface SDGEventsProps {
  sdgId: number
  color: string
}

const EventCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s ease',
  borderLeft: `4px solid ${theme.palette.primary.main}`,
  '&:hover': {
    transform: 'translateX(8px)',
    boxShadow: theme.shadows[4]
  }
}))

export default function SDGEvents({ sdgId, color }: SDGEventsProps) {
  const { data: session } = useSession()
  const [events, setEvents] = useState<SDGEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Simple env-based admin check
    if (session?.user?.email === SUPER_ADMIN_EMAIL) {
      setIsAdmin(true)
    }
    fetchEvents()
  }, [sdgId, session])

  // Format date range for display
  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    
    if (start === end) {
      return startDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
    
    return `${startDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })} - ${endDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })}`
  }

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('sdg_events')
        .select('*')
        .eq('sdg_id', sdgId)
        .order('start_date', { ascending: true })  // Changed from event_date

      if (error) {
        if (error.code === '42P01') {
          // Table doesn't exist yet
          setEvents([])
          return
        }
        throw error
      }
      setEvents(data || [])
    } catch (error) {
      console.error('Error fetching events:', error)
      setEvents([])
    } finally {
      setLoading(false)
    }
  }

  // Subscribe to real-time updates
  useEffect(() => {
    const channel = supabase
      .channel(`sdg_events_${sdgId}`)
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

  if (loading) {
    return (
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color }}>
          Event Details
        </Typography>
        {[1, 2].map((i) => (
          <Skeleton key={i} variant="rectangular" height={120} sx={{ mb: 2, borderRadius: 2 }} />
        ))}
      </Box>
    )
  }

  const upcomingEvents = events.filter(e => e.status === 'upcoming' || e.status === 'ongoing')
  const pastEvents = events.filter(e => e.status === 'completed')

  return (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color }}>
          Event Details
        </Typography>
        {isAdmin && (
          <Button
            size="small"
            startIcon={<EditIcon />}
            onClick={() => window.open('/admin', '_blank')}
            sx={{ color }}
          >
            Manage Events
          </Button>
        )}
      </Box>

      {events.length === 0 ? (
        <Alert severity="info" sx={{ borderRadius: 2 }}>
          No upcoming events scheduled. Check back soon!
        </Alert>
      ) : (
        <AnimatePresence>
          {/* Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Upcoming & Ongoing
              </Typography>
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <EventCard sx={{ borderLeftColor: color }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Chip
                          label={event.status.toUpperCase()}
                          color={event.status === 'ongoing' ? 'success' : 'primary'}
                          size="small"
                        />
                      </Box>

                      <Typography variant="h6" gutterBottom fontWeight="bold">
                        {event.title}
                      </Typography>

                      <Typography variant="body2" color="text.secondary" paragraph>
                        {event.description}
                      </Typography>

                      <Stack spacing={1}>
                        {/* Updated: Date range with DateRangeIcon */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <DateRangeIcon fontSize="small" sx={{ mr: 1, color }} />
                          <Typography variant="body2">
                            {formatDateRange(event.start_date, event.end_date)}
                          </Typography>
                        </Box>
                        
                        {/* Location */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocationIcon fontSize="small" sx={{ mr: 1, color: 'error.main' }} />
                          <Typography variant="body2">{event.location}</Typography>
                        </Box>
                      </Stack>

                      {event.requirements && event.requirements.length > 0 && (
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                            What to bring:
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {event.requirements.map((req, idx) => (
                              <Chip
                                key={idx}
                                label={req}
                                size="small"
                                variant="outlined"
                                sx={{ borderColor: color, color }}
                              />
                            ))}
                          </Box>
                        </Box>
                      )}
                    </CardContent>
                  </EventCard>
                </motion.div>
              ))}
            </Box>
          )}

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Past Events
              </Typography>
              {pastEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <EventCard sx={{ opacity: 0.7, borderLeftColor: 'grey.400' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="subtitle1" fontWeight="medium">
                            {event.title}
                          </Typography>
                          {/* Updated: Use date range for past events too */}
                          <Typography variant="caption" color="text.secondary">
                            {formatDateRange(event.start_date, event.end_date)} • {event.location}
                          </Typography>
                        </Box>
                        <Chip label="COMPLETED" size="small" color="default" />
                      </Box>
                    </CardContent>
                  </EventCard>
                </motion.div>
              ))}
            </Box>
          )}
        </AnimatePresence>
      )}
    </Box>
  )
}