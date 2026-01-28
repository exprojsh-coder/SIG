'use client'

import { useState, useEffect } from 'react'
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Avatar,
  Stack,
  Divider,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Tab,
  Tabs,
  TextField,
  MenuItem,
  Alert,
  Tooltip
} from '@mui/material'
import {
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  EmojiEvents as EmojiEventsIcon,
  TrendingUp as TrendingUpIcon,
  Notifications as NotificationsIcon,
  CalendarToday as CalendarIcon,
  Group as GroupIcon,
  AccessTime as AccessTimeIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Cancel as CancelIcon,
  ArrowForward as ArrowForwardIcon,
  Edit as EditIcon,
  Download as DownloadIcon,
  AddCircle as AddCircleIcon,
  Visibility as VisibilityIcon,
  MoreVert as MoreVertIcon,
  Person as PersonIcon,
  Security as SecurityIcon,
  Settings as SettingsIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import { SIG } from '@/types/sig'

interface Application {
  id: string
  sigId: string
  sigName: string
  status: 'pending' | 'approved' | 'rejected' | 'withdrawn'
  appliedDate: string
  updatedDate: string
  priority: 'low' | 'medium' | 'high'
}

interface Notification {
  id: string
  title: string
  message: string
  timestamp: string
  read: boolean
  type: 'info' | 'success' | 'warning' | 'error'
}

export default function DashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(0)
  const [userStats, setUserStats] = useState({
    totalApplications: 12,
    approvedApplications: 8,
    pendingApplications: 3,
    totalVolunteerHours: 240,
    completionRate: 85,
    rank: 'Top 15%'
  })
  const [applications, setApplications] = useState<Application[]>([
    {
      id: '1',
      sigId: 'sig1',
      sigName: 'Climate Action Initiative',
      status: 'approved',
      appliedDate: '2024-01-15',
      updatedDate: '2024-01-20',
      priority: 'high'
    },
    {
      id: '2',
      sigId: 'sig2',
      sigName: 'Global Health Partnership',
      status: 'pending',
      appliedDate: '2024-02-01',
      updatedDate: '2024-02-01',
      priority: 'medium'
    },
    {
      id: '3',
      sigId: 'sig3',
      sigName: 'Education Equity Program',
      status: 'rejected',
      appliedDate: '2024-01-10',
      updatedDate: '2024-01-12',
      priority: 'high'
    }
  ])
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Application Approved',
      message: 'Your application for Climate Action Initiative has been approved!',
      timestamp: '2 hours ago',
      read: false,
      type: 'success'
    },
    {
      id: '2',
      title: 'New SIG Available',
      message: 'Check out the new Sustainable Cities SIG',
      timestamp: '1 day ago',
      read: true,
      type: 'info'
    },
    {
      id: '3',
      title: 'Deadline Approaching',
      message: 'Submission deadline for Ocean Conservation is in 3 days',
      timestamp: '2 days ago',
      read: true,
      type: 'warning'
    }
  ])
  const [recommendedSIGs, setRecommendedSIGs] = useState<SIG[]>([
    {
      id: 'rec1',
      name: 'Sustainable Agriculture',
      description: 'Promoting sustainable farming practices globally',
      focus_area: 'Environment',
      created_at: '2024-01-01',
      updated_at: '2024-01-01',
      volunteers: 150,
      duration: '6 months',
      progress: 45
    },
    {
      id: 'rec2',
      name: 'Digital Inclusion',
      description: 'Bridging the digital divide in underserved communities',
      focus_area: 'Technology',
      created_at: '2024-01-01',
      updated_at: '2024-01-01',
      volunteers: 85,
      duration: '4 months',
      progress: 20
    }
  ])

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const [formattedDate, setFormattedDate] = useState<string | null>(null)


  const getStatusIcon = (status: Application['status']) => {
    switch (status) {
      case 'approved': return <CheckCircleIcon color="success" />
      case 'pending': return <PendingIcon color="warning" />
      case 'rejected': return <CancelIcon color="error" />
      default: return <PendingIcon color="action" />
    }
  }

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'approved': return 'success'
      case 'pending': return 'warning'
      case 'rejected': return 'error'
      default: return 'default'
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })))
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" fontWeight={700}>
            <DashboardIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
            Dashboard
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<AddCircleIcon />}
            onClick={() => router.push('/sigs')}
          >
            Find New SIGs
          </Button>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Welcome back! Here's your volunteering overview
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{xs:12, sm:6, md:3}}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.light', mr: 2 }}>
                <AssignmentIcon color="primary" />
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight={700}>
                  {userStats.totalApplications}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Applications
                </Typography>
              </Box>
            </Box>
            <Typography variant="caption" color="success.main">
              +2 this month
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{xs:12, sm:6, md:3}}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: 'success.light', mr: 2 }}>
                <CheckCircleIcon color="success" />
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight={700}>
                  {userStats.approvedApplications}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Approved
                </Typography>
              </Box>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={userStats.completionRate} 
              color="success"
              sx={{ height: 6, borderRadius: 3 }}
            />
          </Paper>
        </Grid>
        <Grid size={{xs:12, sm:6, md:3}}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: 'warning.light', mr: 2 }}>
                <AccessTimeIcon color="warning" />
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight={700}>
                  {userStats.totalVolunteerHours}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Volunteer Hours
                </Typography>
              </Box>
            </Box>
            <Typography variant="caption" color="warning.main">
              40 hours this month
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{xs:12, sm:6, md:3}}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: 'info.light', mr: 2 }}>
                <TrendingUpIcon color="info" />
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight={700}>
                  {userStats.rank}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Global Rank
                </Typography>
              </Box>
            </Box>
            <Typography variant="caption" color="info.main">
              Top performer
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid size={{xs:12, md:8}}>
          <Paper sx={{ mb: 3, borderRadius: 3, overflow: 'hidden' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab label="My Applications" icon={<AssignmentIcon />} iconPosition="start" />
                <Tab label="Active Projects" icon={<GroupIcon />} iconPosition="start" />
                <Tab label="Upcoming" icon={<CalendarIcon />} iconPosition="start" />
              </Tabs>
            </Box>
            <Box sx={{ p: 3 }}>
              {activeTab === 0 && (
                <List>
                  {applications.map((app) => (
                    <ListItem 
                      key={app.id}
                      sx={{
                        borderRadius: 2,
                        mb: 1,
                        bgcolor: 'action.hover',
                        '&:hover': { bgcolor: 'action.selected' }
                      }}
                      secondaryAction={
                        <Stack direction="row" spacing={1}>
                          <IconButton onClick={() => router.push(`/sigs/${app.sigId}`)}>
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton>
                            <MoreVertIcon />
                          </IconButton>
                        </Stack>
                      }
                    >
                      <ListItemIcon>
                        {getStatusIcon(app.status)}
                      </ListItemIcon>
                     <ListItemText
  primary={
    <Typography fontWeight={600} component="span">
      {app.sigName}
    </Typography>
  }
  secondary={
    <Stack direction="row" spacing={2} alignItems="center">
      <Typography variant="caption" component="span">
        Applied:{' '}
        {new Date(app.appliedDate).toLocaleDateString('en-US')}
      </Typography>
      <Chip
        label={app.status.toUpperCase()}
        size="small"
        color={getStatusColor(app.status) as any}
        variant="outlined"
      />
      <Chip
        label={app.priority}
        size="small"
        color={
          app.priority === 'high'
            ? 'error'
            : app.priority === 'medium'
            ? 'warning'
            : 'success'
        }
      />
    </Stack>
  }
  primaryTypographyProps={{ component: 'div' }}
  secondaryTypographyProps={{ component: 'div' }}
/>

                    </ListItem>
                  ))}
                </List>
              )}
              {activeTab === 1 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Active Projects
                  </Typography>
                  <Typography color="text.secondary">
                    You're currently working on 2 active projects
                  </Typography>
                </Box>
              )}
              {activeTab === 2 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Upcoming Events
                  </Typography>
                  <Typography color="text.secondary">
                    No upcoming events scheduled
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>

          {/* Recommended SIGs */}
          <Paper sx={{ borderRadius: 3, p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" fontWeight={600}>
                Recommended for You
              </Typography>
              <Button endIcon={<ArrowForwardIcon />} onClick={() => router.push('/sigs')}>
                View All
              </Button>
            </Box>
            <Grid container spacing={2}>
              {recommendedSIGs.map((sig) => (
                <Grid size={{xs:12, sm:6}} key={sig.id}>
                  <Card sx={{ borderRadius: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6" fontWeight={600}>
                          {sig.name}
                        </Typography>
                        <Chip label={sig.focus_area} size="small" variant="outlined" />
                      </Box>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {sig.description}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <GroupIcon fontSize="small" color="primary" />
                          <Typography variant="caption">{sig.volunteers} volunteers</Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <AccessTimeIcon fontSize="small" color="warning" />
                          <Typography variant="caption">{sig.duration}</Typography>
                        </Stack>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={sig.progress} 
                        color="success"
                        sx={{ height: 6, borderRadius: 3, mb: 2 }}
                      />
                    </CardContent>
                    <CardActions>
                      <Button fullWidth variant="contained" size="small">
                        Apply Now
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Right Column */}
        <Grid size={{xs:12, md:4}}>
          {/* Notifications */}
          <Paper sx={{ mb: 3, borderRadius: 3, p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" fontWeight={600}>
                <NotificationsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Notifications
              </Typography>
              <Button size="small" onClick={markAllAsRead}>
                Mark all read
              </Button>
            </Box>
            <List sx={{ maxHeight: 400, overflow: 'auto' }}>
              {notifications.map((notif) => (
                <ListItem
                  key={notif.id}
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    bgcolor: notif.read ? 'transparent' : 'primary.light',
                    '&:hover': { bgcolor: 'action.hover' }
                  }}
                  onClick={() => markAsRead(notif.id)}
                >
                  <ListItemIcon>
                    {notif.type === 'success' && <CheckCircleIcon color="success" />}
                    {notif.type === 'warning' && <PendingIcon color="warning" />}
                    {notif.type === 'info' && <NotificationsIcon color="info" />}
                  </ListItemIcon>
                 <ListItemText
  primary={notif.title}
  primaryTypographyProps={{ component: 'span' }}
  secondary={notif.message}
  secondaryTypographyProps={{ component: 'span' }}
/>

                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Quick Actions */}
          <Paper sx={{ borderRadius: 3, p: 3, mb: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Quick Actions
            </Typography>
            <Stack spacing={2}>
              <Button 
                variant="contained" 
                fullWidth 
                startIcon={<DownloadIcon />}
                onClick={() => router.push('/certificates')}
              >
                Download Certificates
              </Button>
              <Button 
                variant="outlined" 
                fullWidth 
                startIcon={<EditIcon />}
                onClick={() => router.push('/profile/edit')}
              >
                Update Profile
              </Button>
              <Button 
                variant="outlined" 
                fullWidth 
                startIcon={<EmojiEventsIcon />}
                onClick={() => router.push('/achievements')}
              >
                View Achievements
              </Button>
            </Stack>
          </Paper>

          {/* Recent Activity */}
          <Paper sx={{ borderRadius: 3, p: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Recent Activity
            </Typography>
            <List>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon>
                  <CheckCircleIcon color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Application approved"
                  secondary="Climate Action Initiative • 2 days ago"
                />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon>
                  <PendingIcon color="warning" />
                </ListItemIcon>
                <ListItemText
                  primary="Application submitted"
                  secondary="Global Health Partnership • 1 week ago"
                />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon>
                  <EmojiEventsIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Badge earned"
                  secondary="First Contribution • 2 weeks ago"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}