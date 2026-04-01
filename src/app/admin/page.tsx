'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Alert,
  CircularProgress,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Event as EventIcon,
  LocationOn as LocationIcon,
  ArrowBack as ArrowBackIcon,
  AdminPanelSettings as AdminIcon,
  DateRange as DateRangeIcon
} from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import { supabase } from '@/lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'

// SUPER ADMIN EMAIL from env
const SUPER_ADMIN_EMAIL = process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL

// Types - Updated with start_date and end_date
interface SDGEvent {
  id: string
  sdg_id: number
  title: string
  description: string
  start_date: string      // Changed from event_date
  end_date: string        // NEW
  location: string
  requirements: string[]
  status: 'upcoming' | 'ongoing' | 'completed'
  created_at: string
}

const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8]
  }
}))

const GradientHeader = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(4)
}))

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState<SDGEvent[]>([])
  const [selectedSDG, setSelectedSDG] = useState<number>(1)
  const [openDialog, setOpenDialog] = useState(false)
  const [editingEvent, setEditingEvent] = useState<SDGEvent | null>(null)
  
  // Form state - Updated with start_date and end_date

  type FormData = {
  title: string
  description: string
  start_date: string
  end_date: string
  location: string
  requirements: string
  status: 'upcoming' | 'ongoing' | 'completed'
}

const [formData, setFormData] = useState<FormData>({
  title: '',
  description: '',
  start_date: '',
  end_date: '',
  location: '',
  requirements: '',
  status: 'upcoming'
})


  useEffect(() => {
    checkAdminStatus()
  }, [session])

  useEffect(() => {
    if (isAdmin) {
      fetchEvents()
    }
  }, [isAdmin, selectedSDG])

  const checkAdminStatus = async () => {
    if (status === 'loading') return
    
    if (!session?.user?.email) {
      router.push('/')
      return
    }

    const userEmail = session.user.email
    const isUserAdmin = userEmail === SUPER_ADMIN_EMAIL
    
    console.log('Admin check:', { userEmail, superAdmin: SUPER_ADMIN_EMAIL, isUserAdmin })
    
    if (!isUserAdmin) {
      router.push('/')
      return
    }

    setIsAdmin(true)
    setLoading(false)
  }

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('sdg_events')
        .select('*')
        .eq('sdg_id', selectedSDG)
        .order('start_date', { ascending: true })  // Changed from event_date

      if (error) {
        if (error.code === '42P01') {
          console.warn('sdg_events table does not exist yet')
          setEvents([])
          return
        }
        throw error
      }
      setEvents(data || [])
    } catch (error) {
      console.error('Error fetching events:', error)
      setEvents([])
    }
  }

  const handleOpenDialog = (event?: SDGEvent) => {
    if (event) {
      setEditingEvent(event)
      setFormData({
        title: event.title,
        description: event.description,
        start_date: event.start_date,      // Changed
        end_date: event.end_date,           // NEW
        location: event.location,
        requirements: event.requirements?.join(', ') || '',
        status: event.status
      })
    } else {
      setEditingEvent(null)
      setFormData({
        title: '',
        description: '',
        start_date: '',      // Changed
        end_date: '',        // NEW
        location: '',
        requirements: '',
        status: 'upcoming'
      })
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingEvent(null)
  }

  const handleSave = async () => {
    try {
      // Validation: end_date must be >= start_date
      if (formData.end_date < formData.start_date) {
        alert('End date cannot be before start date!')
        return
      }

      const requirementsArray = formData.requirements
        .split(',')
        .map(r => r.trim())
        .filter(r => r.length > 0)

      const eventData = {
        sdg_id: selectedSDG,
        title: formData.title,
        description: formData.description,
        start_date: formData.start_date,      // Changed
        end_date: formData.end_date,          // NEW
        location: formData.location,
        requirements: requirementsArray,
        status: formData.status
      }

      if (editingEvent) {
        const { error } = await supabase
          .from('sdg_events')
          .update(eventData)
          .eq('id', editingEvent.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('sdg_events')
          .insert([eventData])

        if (error) throw error
      }

      handleCloseDialog()
      fetchEvents()
    } catch (error: any) {
      console.error('Error saving event:', error)
      alert('Failed to save event: ' + (error.message || 'Unknown error'))
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return

    try {
      const { error } = await supabase
        .from('sdg_events')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchEvents()
    } catch (error: any) {
      console.error('Error deleting event:', error)
      alert('Failed to delete: ' + (error.message || 'Unknown error'))
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'primary'
      case 'ongoing': return 'success'
      case 'completed': return 'default'
      default: return 'primary'
    }
  }

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

  // Create table if missing button
  const setupDatabase = async () => {
    alert('Please run the SQL setup in Supabase SQL Editor first (see console)')
    console.log(`
-- Run this in Supabase SQL Editor:

-- Drop existing table if you need to recreate
DROP TABLE IF EXISTS public.sdg_events CASCADE;

-- Create sdg_events table with start_date and end_date
CREATE TABLE public.sdg_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sdg_id INTEGER NOT NULL CHECK (sdg_id >= 1 AND sdg_id <= 17),
  title TEXT NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,      -- NEW: Event start date
  end_date DATE NOT NULL,        -- NEW: Event end date
  location TEXT,
  requirements TEXT[],
  status TEXT DEFAULT 'upcoming',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  CONSTRAINT valid_date_range CHECK (end_date >= start_date)  -- Ensure end >= start
);

-- Enable RLS
ALTER TABLE public.sdg_events ENABLE ROW LEVEL SECURITY;

-- Allow all operations for now
CREATE POLICY "Allow all" ON public.sdg_events FOR ALL USING (true) WITH CHECK (true);

-- Create indexes
CREATE INDEX idx_sdg_events_sdg_id ON public.sdg_events(sdg_id);
CREATE INDEX idx_sdg_events_dates ON public.sdg_events(start_date, end_date);
    `)
  }

  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress size={60} />
      </Container>
    )
  }

  if (!isAdmin) return null

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <GradientHeader>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <AdminIcon sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h3" component="h1" fontWeight="bold">
            Admin Dashboard
          </Typography>
        </Box>
        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          Manage SDG Events & Content
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', mt: 1 }}>
          Logged in as: {session?.user?.email}
        </Typography>
      </GradientHeader>

      {/* Controls */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Select SDG</InputLabel>
              <Select
                value={selectedSDG}
                onChange={(e) => setSelectedSDG(Number(e.target.value))}
                label="Select SDG"
              >
                {Array.from({ length: 17 }, (_, i) => (
                  <MenuItem key={i + 1} value={i + 1}>
                    SDG {i + 1}: {getSDGTitle(i + 1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => router.push('/sdg')}
              >
                Back to SDGs
              </Button>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog()}
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
              >
                Add Event
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Database Setup Alert */}
      {events.length === 0 && (
        <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
          <Typography variant="body2" gutterBottom>
            If this is your first time, you need to create the database table with start_date and end_date columns.
          </Typography>
          <Button size="small" variant="outlined" onClick={setupDatabase} sx={{ mt: 1 }}>
            Show SQL Setup
          </Button>
        </Alert>
      )}

      {/* Events List */}
      <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        Events for SDG {selectedSDG}
      </Typography>

      <AnimatePresence>
        {events.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
              <EventIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No events yet for this SDG
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => handleOpenDialog()}
              >
                Create First Event
              </Button>
            </Paper>
          </motion.div>
        ) : (
          <Grid container spacing={3}>
            {events.map((event, index) => (
              <Grid size={{ xs: 12, md: 6 }} key={event.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <StyledCard>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Chip
                          label={event.status.toUpperCase()}
                          color={getStatusColor(event.status) as any}
                          size="small"
                        />
                        <Box>
                          <IconButton
                            size="small"
                            onClick={() => handleOpenDialog(event)}
                            sx={{ mr: 1 }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDelete(event.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>

                      <Typography variant="h6" gutterBottom fontWeight="bold">
                        {event.title}
                      </Typography>

                      <Typography variant="body2" color="text.secondary" paragraph>
                        {event.description}
                      </Typography>

                      <Stack spacing={1}>
                        {/* Updated: Show date range */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <DateRangeIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                          <Typography variant="body2">
                            {formatDateRange(event.start_date, event.end_date)}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocationIcon fontSize="small" sx={{ mr: 1, color: 'error.main' }} />
                          <Typography variant="body2">{event.location}</Typography>
                        </Box>
                      </Stack>

                      {event.requirements && event.requirements.length > 0 && (
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="caption" color="text.secondary">
                            Requirements:
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                            {event.requirements.map((req, idx) => (
                              <Chip key={idx} label={req} size="small" variant="outlined" />
                            ))}
                          </Box>
                        </Box>
                      )}
                    </CardContent>
                  </StyledCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}
      </AnimatePresence>

      {/* Add/Edit Dialog - Updated with date range fields */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingEvent ? 'Edit Event' : 'Create New Event'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Event Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              margin="normal"
              multiline
              rows={3}
            />
            
            {/* Date Range Fields */}
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Start Date"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="End Date"
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  required
                  inputProps={{
                    min: formData.start_date // Prevent selecting before start
                  }}
                  helperText={formData.end_date < formData.start_date ? "Must be after start date" : ""}
                  error={formData.end_date < formData.start_date}
                />
              </Grid>
            </Grid>

            <TextField
              fullWidth
              label="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Requirements (comma separated)"
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              margin="normal"
              placeholder="e.g. Laptop, Internet, 2 hours"
              helperText="Separate multiple requirements with commas"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                label="Status"
              >
                <MenuItem value="upcoming">Upcoming</MenuItem>
                <MenuItem value="ongoing">Ongoing</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} startIcon={<CancelIcon />}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            startIcon={<SaveIcon />}
            disabled={!formData.title || !formData.start_date || !formData.end_date || formData.end_date < formData.start_date}
          >
            Save Event
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

// Helper function to get SDG titles
function getSDGTitle(id: number): string {
  const titles: { [key: number]: string } = {
    1: 'No Poverty', 2: 'Zero Hunger', 3: 'Good Health', 4: 'Quality Education',
    5: 'Gender Equality', 6: 'Clean Water', 7: 'Affordable Energy', 8: 'Decent Work',
    9: 'Industry & Innovation', 10: 'Reduced Inequalities', 11: 'Sustainable Cities',
    12: 'Responsible Consumption', 13: 'Climate Action', 14: 'Life Below Water',
    15: 'Life on Land', 16: 'Peace & Justice', 17: 'Partnerships'
  }
  return titles[id] || `SDG ${id}`
}