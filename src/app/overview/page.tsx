'use client'

import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Stack,
  LinearProgress,
  Avatar,
  Chip,
  Divider,
} from '@mui/material'
import {
  TrendingUp,
  People,
  Schedule,
  EmojiEvents,
  Assignment,
  CheckCircle,
  PendingActions,
  Info,
  VolunteerActivism,
  ArrowForward,
} from '@mui/icons-material'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function OverviewPage() {
  const { data: session } = useSession()
  const router = useRouter()

  const stats = [
    { label: 'Total Applications', value: '12', icon: <Assignment />, color: 'primary.main', change: '+2 this month' },
    { label: 'Approved', value: '8', icon: <CheckCircle />, color: 'success.main', change: '67% success rate' },
    { label: 'Pending', value: '3', icon: <PendingActions />, color: 'warning.main', change: 'Under review' },
    { label: 'Volunteer Hours', value: '240', icon: <Schedule />, color: 'info.main', change: '40h this month' },
  ]

  const quickActions = [
    { label: 'Browse SIGs', icon: <VolunteerActivism />, color: 'primary', href: '/sdg' },
    { label: 'My Profile', icon: <People />, color: 'secondary', href: '/profile' },
    { label: 'View Certificates', icon: <EmojiEvents />, color: 'warning', href: '/certificates' },
    { label: 'Get Support', icon: <Info />, color: 'info', href: '/support' },
  ]

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Welcome Section */}
      <Paper sx={{ 
        p: 4, 
        mb: 4, 
        borderRadius: 4,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h3" fontWeight={800} gutterBottom>
            Welcome back, {session?.user?.name?.split(' ')[0] || 'Volunteer'}!
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
            Continue your journey towards sustainable development
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button 
              variant="contained" 
              sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: '#f5f5f5' } }}
              component={Link}
              href="/sdg"
            >
              Explore SIGs
            </Button>
            <Button 
              variant="outlined" 
              sx={{ color: 'white', borderColor: 'white' }}
              component={Link}
              href="/profile"
            >
              View Profile
            </Button>
          </Stack>
        </Box>
        <VolunteerActivism sx={{ 
          position: 'absolute', 
          right: 40, 
          bottom: -20, 
          fontSize: 200, 
          opacity: 0.1,
          transform: 'rotate(15deg)'
        }} />
      </Paper>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid size={{xs:12, sm:6, md:3}} key={index}>
            <Card sx={{ 
              borderRadius: 3, 
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
              }
            }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: stat.color, color: 'white' }}>
                    {stat.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight={700}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Box>
                </Stack>
                <Typography variant="caption" color={stat.color} sx={{ mt: 1, display: 'block' }}>
                  {stat.change}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid size={{xs:12, md:8}} >
          {/* Quick Actions */}
          <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              {quickActions.map((action, index) => (
                <Grid size={{xs:12, sm:6}} key={index}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={action.icon}
                    sx={{ 
                      py: 2,
                      justifyContent: 'flex-start',
                      borderRadius: 2,
                      borderColor: `${action.color}.main`,
                      color: `${action.color}.main`,
                      '&:hover': {
                        bgcolor: `${action.color}.light`,
                        borderColor: `${action.color}.dark`,
                      }
                    }}
                    component={Link}
                    href={action.href}
                  >
                    {action.label}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* Progress */}
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Your Progress
            </Typography>
            <Stack spacing={3}>
              <Box>
                <Stack direction="row" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">SDG 13: Climate Action</Typography>
                  <Typography variant="body2" fontWeight={600}>75%</Typography>
                </Stack>
                <LinearProgress variant="determinate" value={75} color="success" sx={{ height: 8, borderRadius: 4 }} />
              </Box>
              <Box>
                <Stack direction="row" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">SDG 4: Quality Education</Typography>
                  <Typography variant="body2" fontWeight={600}>45%</Typography>
                </Stack>
                <LinearProgress variant="determinate" value={45} color="info" sx={{ height: 8, borderRadius: 4 }} />
              </Box>
              <Box>
                <Stack direction="row" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">SDG 3: Good Health</Typography>
                  <Typography variant="body2" fontWeight={600}>30%</Typography>
                </Stack>
                <LinearProgress variant="determinate" value={30} color="warning" sx={{ height: 8, borderRadius: 4 }} />
              </Box>
            </Stack>
          </Paper>
        </Grid>

        {/* Right Column */}
        <Grid size={{xs:12, md:4}}>
          {/* Recent Activity */}
          <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Recent Activity
            </Typography>
            <Stack spacing={2}>
              {[
                { action: 'Application approved', detail: 'Climate Action Initiative', time: '2 hours ago' },
                { action: 'Volunteer hours logged', detail: '40 hours completed', time: '1 day ago' },
                { action: 'New badge earned', detail: 'First Contribution', time: '3 days ago' },
                { action: 'Application submitted', detail: 'Education Equity Program', time: '1 week ago' },
              ].map((item, index) => (
                <Box key={index}>
                  <Typography variant="body2" fontWeight={600}>
                    {item.action}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.detail} • {item.time}
                  </Typography>
                  {index < 3 && <Divider sx={{ my: 2 }} />}
                </Box>
              ))}
            </Stack>
          </Paper>

          {/* Achievement Badges */}
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight={600}>
                Your Badges
              </Typography>
              <Chip label="3 earned" size="small" color="primary" />
            </Stack>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Avatar sx={{ bgcolor: 'gold', width: 56, height: 56 }}>
                <EmojiEvents sx={{ color: 'white' }} />
              </Avatar>
              <Avatar sx={{ bgcolor: 'silver', width: 56, height: 56 }}>
                <TrendingUp sx={{ color: 'white' }} />
              </Avatar>
              <Avatar sx={{ bgcolor: '#cd7f32', width: 56, height: 56 }}>
                <People sx={{ color: 'white' }} />
              </Avatar>
            </Stack>
            <Button 
              fullWidth 
              endIcon={<ArrowForward />} 
              sx={{ mt: 3 }}
              component={Link}
              href="/achievements"
            >
              View All Achievements
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}