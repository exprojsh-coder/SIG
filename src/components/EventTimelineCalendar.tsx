import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Grid,
  useTheme,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isWithinInterval,
  parseISO,
} from 'date-fns';
import { eventTimelineData } from '@/data/eventTimelineData';

interface EventTimelineCalendarProps {
  sdgId: number;
  color?: string; // optional highlight color (will use theme primary if not provided)
}

const EventTimelineCalendar: React.FC<EventTimelineCalendarProps> = ({
  sdgId,
  color,
}) => {
  const theme = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());

  // Filter events for this SDG
  const events = useMemo(
    () => eventTimelineData.filter((event) => event.sdgId === sdgId),
    [sdgId]
  );

  // Generate days of the current month
  const monthDays = useMemo(() => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return eachDayOfInterval({ start, end });
  }, [currentDate]);

  // Weekday headers
  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // Check if a date falls inside any event range
  const isDateInEvent = (date: Date): boolean => {
    return events.some((event) => {
      const start = parseISO(event.startDate);
      const end = parseISO(event.endDate);
      return (
        isWithinInterval(date, { start, end }) ||
        isSameDay(date, start) ||
        isSameDay(date, end)
      );
    });
  };

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  // If no events, show a simple message
  if (events.length === 0) {
    return (
      <Paper elevation={1} sx={{ p: 2, borderRadius: 2, mb: 3 }}>
        <Typography variant="subtitle2" color="text.secondary" align="center">
          No upcoming events for this SDG
        </Typography>
      </Paper>
    );
  }

  // Use provided color or fall back to theme primary
  const highlightColor = color || theme.palette.primary.main;

  return (
    <Paper elevation={2} sx={{ p: 2, borderRadius: 2, mb: 3 }}>
      {/* Header with month navigation */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 1,
        }}
      >
        <Typography variant="subtitle2" fontWeight="600">
          Event Timeline
        </Typography>
        <Box>
          <IconButton size="small" onClick={handlePrevMonth}>
            <ChevronLeftIcon fontSize="small" />
          </IconButton>
          <Typography variant="caption" sx={{ mx: 1, fontWeight: 500 }}>
            {format(currentDate, 'MMM yyyy')}
          </Typography>
          <IconButton size="small" onClick={handleNextMonth}>
            <ChevronRightIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Weekday headers */}
      <Grid container spacing={0.5} sx={{ mb: 0.5 }}>
        {weekDays.map((day) => (
          <Grid key={day} size={{ xs: 12 / 7 }} sx={{ textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              {day}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {/* Calendar grid */}
      <Grid container spacing={0.5}>
        {/* Empty cells before first day of month */}
        {Array.from({ length: monthDays[0].getDay() }).map((_, index) => (
          <Grid key={`empty-start-${index}`} size={{ xs: 12 / 7 }} />
        ))}

        {/* Actual days */}
        {monthDays.map((day) => {
          const inEvent = isDateInEvent(day);
          return (
            <Grid key={day.toISOString()} size={{ xs: 12 / 7 }} sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: '100%',
                  aspectRatio: '1/1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  backgroundColor: inEvent ? highlightColor : 'transparent',
                  color: inEvent ? 'white' : 'text.primary',
                  fontSize: '0.875rem',
                  fontWeight: inEvent ? 600 : 400,
                  transition: 'background-color 0.2s',
                  '&:hover': {
                    backgroundColor: inEvent
                      ? theme.palette.primary.dark
                      : theme.palette.action.hover,
                  },
                }}
              >
                {format(day, 'd')}
              </Box>
            </Grid>
          );
        })}

        {/* (Optional) empty cells after last day can be added similarly if desired */}
      </Grid>

      {/* Event list preview */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
          Upcoming Events:
        </Typography>
        {events.map((event) => {
          const start = parseISO(event.startDate);
          const end = parseISO(event.endDate);
          return (
            <Box key={event.id} sx={{ fontSize: '0.75rem', mb: 0.5 }}>
              • {event.title}: {format(start, 'MMM d')} – {format(end, 'MMM d')}
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
};

export default EventTimelineCalendar;