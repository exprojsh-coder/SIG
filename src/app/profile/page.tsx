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
  Alert,
  Tooltip,
  CardActions,
  CardHeader,
  Tab,
  Tabs
} from '@mui/material'
import {
  Person as PersonIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Cancel as CancelIcon,
  ArrowForward as ArrowForwardIcon,
  Home as HomeIcon,
  Download as DownloadIcon,
  Edit as EditIcon,
  Refresh as RefreshIcon,
  Assignment as AssignmentIcon,
  TrendingUp as TrendingUpIcon,
  AccessTime as AccessTimeIcon,
  Group as GroupIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface Application {
  id: string
  user_id: string
  sig_id: string
  status: 'pending' | 'approved' | 'rejected'
  applied_at: string
  sig?: {
    id: string
    name: string
    acronym: string
    description: string
  }
}

interface UserStats {
  totalApplications: number
  approvedApplications: number
  pendingApplications: number
  rejectedApplications: number
  completionRate: number
  rank: string
}

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [dbUser, setDbUser] = useState<any>(null)
  const [userStats, setUserStats] = useState<UserStats>({
    totalApplications: 0,
    approvedApplications: 0,
    pendingApplications: 0,
    rejectedApplications: 0,
    completionRate: 0,
    rank: 'New Member'
  })
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [status, router])

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      fetchUserData()
    }
  }, [status, session])

  const ensureUserInDatabase = async () => {
    if (!session?.user?.email) return null

    try {
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('email', session.user.email)
        .maybeSingle()

      if (existingUser) {
        return existingUser
      }

      const userData = {
        email: session.user.email,
        name: session.user.name || null,
        image: session.user.image || null,
        google_id: session.user.id || null,
      }

      const { data: newUser, error } = await supabase
        .from('users')
        .insert([userData])
        .select()
        .single()

      if (error && Object.keys(error).length > 0) {
        console.log('Insert returned error:', error)
        
        if (error.code === '23505') {
          const { data: retryUser } = await supabase
            .from('users')
            .select('*')
            .eq('email', session.user.email)
            .maybeSingle()
          return retryUser
        }
        
        const { data: fallbackUser } = await supabase
          .from('users')
          .select('*')
          .eq('email', session.user.email)
          .maybeSingle()
        
        if (fallbackUser) {
          return fallbackUser
        }
        
        return null
      }

      return newUser
    } catch (error: any) {
      console.log('Exception in ensureUserInDatabase:', error?.message || error)
      
      try {
        const { data: fallbackUser } = await supabase
          .from('users')
          .select('*')
          .eq('email', session.user.email)
          .maybeSingle()
        
        if (fallbackUser) {
          return fallbackUser
        }
      } catch (fetchError) {
        console.log('Could not fetch user after exception')
      }
      
      return null
    }
  }

  const calculateUserStats = (apps: Application[]) => {
    const total = apps.length
    const approved = apps.filter(app => app.status === 'approved').length
    const pending = apps.filter(app => app.status === 'pending').length
    const rejected = apps.filter(app => app.status === 'rejected').length
    const completionRate = total > 0 ? Math.round((approved / total) * 100) : 0
    
    let rank = 'New Member'
    if (approved >= 5) rank = 'Top Contributor'
    else if (approved >= 3) rank = 'Active Volunteer'
    else if (approved >= 1) rank = 'Participant'

    return {
      totalApplications: total,
      approvedApplications: approved,
      pendingApplications: pending,
      rejectedApplications: rejected,
      completionRate,
      rank
    }
  }

  const fetchUserData = async () => {
    setLoading(true)
    
    try {
      if (!session?.user?.email) {
        setLoading(false)
        return
      }

      const user = await ensureUserInDatabase()
      
      if (!user) {
        const { data: existingUser } = await supabase
          .from('users')
          .select('*')
          .eq('email', session.user.email)
          .maybeSingle()
          
        if (existingUser) {
          setDbUser(existingUser)
        } else {
          setLoading(false)
          return
        }
      } else {
        setDbUser(user)
      }

      const { data: applicationsData } = await supabase
        .from('volunteer_applications')
        .select(`
          *,
          sig:sigs (id, name, acronym, description)
        `)
        .eq('user_id', dbUser?.id || user?.id)
        .order('applied_at', { ascending: false })

      const apps = applicationsData || []
      setApplications(apps)
      setUserStats(calculateUserStats(apps))
    } catch (error) {
      console.log('Error in fetchUserData:', error)
      setApplications([])
    } finally {
      setLoading(false)
    }
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircleIcon color="success" />
      case 'pending':
        return <PendingIcon color="warning" />
      case 'rejected':
        return <CancelIcon color="error" />
      default:
        return <PendingIcon color="action" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'success'
      case 'pending':
        return 'warning'
      case 'rejected':
        return 'error'
      default:
        return 'default'
    }
  }

  if (status === 'loading' || loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Box sx={{ width: '100%', maxWidth: 400 }}>
          <LinearProgress />
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Loading your profile...
          </Typography>
        </Box>
      </Box>
    )
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" fontWeight={700}>
            <PersonIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
            My Profile
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={fetchUserData}
            >
              Refresh
            </Button>
            <Button
              variant="contained"
              startIcon={<HomeIcon />}
              onClick={() => router.push('/')}
            >
              Browse SIGs
            </Button>
          </Stack>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Manage your applications and profile information
        </Typography>
      </Box>

      {/* User Info Card */}
      <Card sx={{ mb: 4, borderRadius: 3 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid size={{xs:12, md:3}} >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar
                  src={session?.user?.image || '/default-avatar.png'}
                  sx={{ width: 120, height: 120, mb: 2 }}
                />
                <Chip
                  label={userStats.rank}
                  color="primary"
                  size="small"
                />
              </Box>
            </Grid>
            <Grid size={{xs:12, md:9}}>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                {session?.user?.name || 'User'}
              </Typography>
              <Stack direction="row" spacing={3} sx={{ mb: 2 }}>
                <Box display="flex" alignItems="center">
                  <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {session?.user?.email || 'No email'}
                  </Typography>
                </Box>
                {dbUser && (
                  <Box display="flex" alignItems="center">
                    <CalendarIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      Member since: {new Date(dbUser.created_at).toLocaleDateString()}
                    </Typography>
                  </Box>
                )}
              </Stack>
              <Divider sx={{ my: 2 }} />
              <Alert severity="info" sx={{ borderRadius: 2 }}>
                <Typography variant="body2">
                  Applications: {applications.length} / 3 active applications allowed
                </Typography>
              </Alert>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{xs:12,md:3, sm:6}} >
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
          </Paper>
        </Grid>
        <Grid size={{xs:12,md:3, sm:6}}>
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
        <Grid size={{xs:12,md:3, sm:6}}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: 'warning.light', mr: 2 }}>
                <AccessTimeIcon color="warning" />
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight={700}>
                  {userStats.pendingApplications}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pending
                </Typography>
              </Box>
            </Box>
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
                  Current Rank
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Left Column - Applications */}
        <Grid size={{xs:12, md:8}} >
          <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab label="My Applications" icon={<AssignmentIcon />} iconPosition="start" />
                <Tab label="Application Stats" icon={<TrendingUpIcon />} iconPosition="start" />
              </Tabs>
            </Box>
            <Box sx={{ p: 3 }}>
              {activeTab === 0 && (
                <>
                  {applications.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                      <PersonIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary" gutterBottom>
                        No applications yet
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Start your volunteering journey by applying to SIGs
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<HomeIcon />}
                        onClick={() => router.push('/')}
                      >
                        Browse Available SIGs
                      </Button>
                    </Box>
                  ) : (
                    <List>
                      {applications.map((app) => (
                        <Card key={app.id} sx={{ mb: 2, borderRadius: 2 }}>
                          <CardContent>
                            <Grid container spacing={2} alignItems="center">
                              <Grid size={{xs:12, md:8}} >
                                <Typography variant="h6" fontWeight={600}>
                                  {app.sig?.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                  {app.sig?.acronym}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {app.sig?.description}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                  <CalendarIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                  <Typography variant="caption" color="text.secondary">
                                    Applied: {new Date(app.applied_at).toLocaleDateString()}
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid size={{xs:12, md:4}} >
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                  <Chip
                                    label={app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                    color={getStatusColor(app.status) as any}
                                    sx={{ mb: 1 }}
                                  />
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    {getStatusIcon(app.status)}
                                    <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                                      {app.status === 'pending' && 'Under review'}
                                      {app.status === 'approved' && 'Application approved'}
                                      {app.status === 'rejected' && 'Not approved'}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      ))}
                    </List>
                  )}
                </>
              )}
              {activeTab === 1 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Application Statistics
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid size={{xs:12, sm:6}} >
                      <Paper sx={{ p: 3, borderRadius: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          Success Rate
                        </Typography>
                        <Typography variant="h4" fontWeight={700}>
                          {userStats.completionRate}%
                        </Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={userStats.completionRate} 
                          color="success"
                          sx={{ mt: 2, height: 8, borderRadius: 4 }}
                        />
                      </Paper>
                    </Grid>
                    <Grid size={{xs:12, sm:6}} >
                      <Paper sx={{ p: 3, borderRadius: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          Application Status Distribution
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                          <Stack spacing={1}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="body2">Approved</Typography>
                              <Typography variant="body2" fontWeight={600}>
                                {userStats.approvedApplications}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="body2">Pending</Typography>
                              <Typography variant="body2" fontWeight={600}>
                                {userStats.pendingApplications}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="body2">Rejected</Typography>
                              <Typography variant="body2" fontWeight={600}>
                                {userStats.rejectedApplications}
                              </Typography>
                            </Box>
                          </Stack>
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Right Column - Quick Actions & Info */}
        <Grid size={{xs:12, md:4}} >
          {/* Quick Actions */}
          <Paper sx={{ mb: 3, borderRadius: 3, p: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Quick Actions
            </Typography>
            <Stack spacing={2}>
              <Button 
                variant="contained" 
                fullWidth 
                startIcon={<EditIcon />}
                onClick={() => router.push('/profile/edit')}
              >
                Edit Profile
              </Button>
              <Button 
                variant="outlined" 
                fullWidth 
                startIcon={<DownloadIcon />}
                onClick={() => router.push('/certificates')}
              >
                Download Certificates
              </Button>
              <Button 
                variant="outlined" 
                fullWidth 
                startIcon={<HomeIcon />}
                onClick={() => router.push('/')}
              >
                Browse SIGs
              </Button>
            </Stack>
          </Paper>

          {/* Application Limits */}
          <Paper sx={{ mb: 3, borderRadius: 3, p: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Application Limits
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Active Applications</Typography>
                <Typography variant="body2" fontWeight={600}>
                  {applications.length} / 3
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={(applications.length / 3) * 100} 
                color={applications.length >= 3 ? "error" : "primary"}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
            <Alert severity={applications.length >= 3 ? "error" : "info"} sx={{ borderRadius: 2 }}>
              {applications.length >= 3 
                ? "Maximum applications reached. Withdraw an application to apply for new SIGs."
                : `${3 - applications.length} application${3 - applications.length === 1 ? '' : 's'} remaining`}
            </Alert>
          </Paper>

          {/* Recent Activity */}
          <Paper sx={{ borderRadius: 3, p: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Recent Activity
            </Typography>
            <List>
              {applications.slice(0, 3).map((app) => (
                <ListItem key={app.id} sx={{ px: 0 }}>
                  <ListItemIcon>
                    {getStatusIcon(app.status)}
                  </ListItemIcon>
                  <ListItemText
                    primary={app.sig?.name}
                    secondary={
                      <>
                        <Typography variant="caption" component="span">
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)} • 
                        </Typography>
                        <Typography variant="caption" color="text.secondary" component="span" sx={{ ml: 0.5 }}>
                          {new Date(app.applied_at).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
              {applications.length === 0 && (
                <ListItem sx={{ px: 0 }}>
                  <ListItemText
                    primary="No recent activity"
                    secondary="Apply to your first SIG to get started"
                  />
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}