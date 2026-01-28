'use client'

import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Chip,
  Stack,
  Divider,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Button,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  alpha,
  useTheme,
} from '@mui/material'
import {
  TrendingUp,
  TrendingDown,
  Timeline,
  Analytics,
  BarChart,
  PieChart,
  Map,
  Public,
  People,
  EmojiEvents,
  CalendarToday,
  AccessTime,
  ArrowForward,
  OpenInNew,
  ExpandMore,
  ExpandLess,
  FilterList,
  Download,
  Share,
  Science,
  WaterDrop,
  LocalHospital,
  School,
  Factory,
  Balance,
  EnergySavingsLeaf,
  Psychology,
} from '@mui/icons-material'
import NatureIcon from '@mui/icons-material/Nature';
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// Mock data for the insights page
const sdgData = [
  { id: 1, name: 'Climate Action', icon: <NatureIcon />, progress: 78, volunteers: 2450, impact: '15K tons CO2 reduced' },
  { id: 2, name: 'Clean Water', icon: <WaterDrop />, progress: 65, volunteers: 1870, impact: '2.5M liters purified' },
  { id: 3, name: 'Good Health', icon: <LocalHospital />, progress: 82, volunteers: 3120, impact: '50K health checks' },
  { id: 4, name: 'Quality Education', icon: <School />, progress: 58, volunteers: 2890, impact: '200K students reached' },
  { id: 5, name: 'Industry Innovation', icon: <Factory />, progress: 45, volunteers: 1340, impact: '500 innovations' },
  { id: 6, name: 'Gender Equality', icon: <Balance />, progress: 71, volunteers: 2250, impact: '100K empowered' },
  { id: 7, name: 'Clean Energy', icon: <EnergySavingsLeaf />, progress: 63, volunteers: 1760, impact: '5MW generated' },
  { id: 8, name: 'Partnerships', icon: <People />, progress: 89, volunteers: 4230, impact: '250 partnerships' },
]

const globalStats = [
  { label: 'Total Volunteers', value: '45,820', change: '+12%', trend: 'up', icon: <People /> },
  { label: 'Active SIGs', value: '156', change: '+8', trend: 'up', icon: <Science /> },
  { label: 'Countries Reached', value: '92', change: '+5', trend: 'up', icon: <Public /> },
  { label: 'Total Hours', value: '1.2M', change: '+15%', trend: 'up', icon: <AccessTime /> },
  { label: 'Projects Completed', value: '890', change: '+23%', trend: 'up', icon: <EmojiEvents /> },
  { label: 'Impact Score', value: '9.4/10', change: '+0.3', trend: 'up', icon: <TrendingUp /> },
]

const regionalData = [
  { region: 'North America', volunteers: 12500, projects: 340, growth: 15 },
  { region: 'Europe', volunteers: 9800, projects: 280, growth: 12 },
  { region: 'Asia', volunteers: 18500, projects: 520, growth: 25 },
  { region: 'Africa', volunteers: 3200, projects: 95, growth: 42 },
  { region: 'South America', volunteers: 1800, projects: 62, growth: 18 },
  { region: 'Oceania', volunteers: 1200, projects: 38, growth: 8 },
]

const trendingProjects = [
  { id: 1, name: 'Ocean Cleanup Initiative', sdg: '14', volunteers: 890, trend: 'hot', impact: '15 tons plastic removed' },
  { id: 2, name: 'Digital Literacy Program', sdg: '4', volunteers: 1250, trend: 'rising', impact: '50K people trained' },
  { id: 3, name: 'Urban Farming Network', sdg: '2', volunteers: 670, trend: 'hot', impact: '100 farms established' },
  { id: 4, name: 'Renewable Energy Access', sdg: '7', volunteers: 980, trend: 'rising', impact: '5K households powered' },
]

const impactMetrics = [
  { metric: 'Carbon Offset', value: '45,000', unit: 'tons', description: 'Equivalent to 10,000 cars off the road' },
  { metric: 'Trees Planted', value: '2.5M', unit: 'trees', description: 'Creating 500 hectares of new forest' },
  { metric: 'Water Saved', value: '15M', unit: 'liters', description: 'Water for 30,000 people for a year' },
  { metric: 'People Trained', value: '250K', unit: 'people', description: 'Skills development programs completed' },
]

export default function InsightsPage() {
  const theme = useTheme()
  const router = useRouter()
  const [timeRange, setTimeRange] = useState('year')
  const [expandedSdg, setExpandedSdg] = useState<number | null>(1)
  const [viewMode, setViewMode] = useState('grid')

  const handleTimeRangeChange = (
    event: React.MouseEvent<HTMLElement>,
    newRange: string | null,
  ) => {
    if (newRange !== null) {
      setTimeRange(newRange)
    }
  }

  const handleViewModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: string | null,
  ) => {
    if (newMode !== null) {
      setViewMode(newMode)
    }
  }

  const toggleSdgExpand = (id: number) => {
    setExpandedSdg(expandedSdg === id ? null : id)
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" fontWeight={800} gutterBottom>
          <Analytics sx={{ mr: 2, verticalAlign: 'middle' }} />
          Global Insights
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mb: 4 }}>
          Discover the collective impact of volunteers worldwide. Track progress, explore trends, and see how we're advancing the UN Sustainable Development Goals together.
        </Typography>
        
        {/* Filters and Controls */}
        <Paper sx={{ p: 2, borderRadius: 3, mb: 3, bgcolor: alpha(theme.palette.primary.main, 0.02) }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <FilterList color="primary" />
              <Typography variant="subtitle2" color="primary">
                Filters
              </Typography>
            </Stack>
            
            <ToggleButtonGroup
              value={timeRange}
              exclusive
              onChange={handleTimeRangeChange}
              size="small"
            >
              <ToggleButton value="week">Week</ToggleButton>
              <ToggleButton value="month">Month</ToggleButton>
              <ToggleButton value="quarter">Quarter</ToggleButton>
              <ToggleButton value="year">Year</ToggleButton>
            </ToggleButtonGroup>
            
            <Stack direction="row" spacing={1}>
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={handleViewModeChange}
                size="small"
              >
                <ToggleButton value="grid">
                  <BarChart fontSize="small" />
                </ToggleButton>
                <ToggleButton value="list">
                  <Timeline fontSize="small" />
                </ToggleButton>
              </ToggleButtonGroup>
              
              <Button startIcon={<Download />} variant="outlined" size="small">
                Export
              </Button>
              <Button startIcon={<Share />} variant="outlined" size="small">
                Share
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Box>

      {/* Global Stats */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {globalStats.map((stat, index) => (
          <Grid size={{xs:12, sm:6, md:4, lg:2}} key={index}>
            <Card sx={{ 
              height: '100%', 
              borderRadius: 3,
              border: '1px solid',
              borderColor: alpha(theme.palette.divider, 0.1),
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: theme.shadows[8],
              }
            }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Avatar sx={{ 
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: 'primary.main',
                    width: 48,
                    height: 48
                  }}>
                    {stat.icon}
                  </Avatar>
                  <Chip 
                    label={stat.change}
                    size="small"
                    color={stat.trend === 'up' ? 'success' : 'error'}
                    icon={stat.trend === 'up' ? <TrendingUp /> : <TrendingDown />}
                    variant="outlined"
                  />
                </Stack>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4}>
        {/* Left Column - SDG Progress */}
        <Grid size={{xs:12, lg:8}} >
          {/* SDG Progress Cards */}
          <Paper sx={{ p: 3, borderRadius: 3, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  SDG Progress Tracker
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Real-time progress across all Sustainable Development Goals
                </Typography>
              </Box>
              <Chip label="Live Data" color="success" variant="outlined" />
            </Box>

            <Grid container spacing={2}>
              {sdgData.map((sdg) => (
                <Grid size={{xs:12, sm:6}} key={sdg.id}>
                  <Card 
                    sx={{ 
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: alpha(theme.palette.divider, 0.1),
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.02),
                      }
                    }}
                    onClick={() => toggleSdgExpand(sdg.id)}
                  >
                    <CardContent>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main' }}>
                            {sdg.icon}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle1" fontWeight={600}>
                              {sdg.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {sdg.volunteers.toLocaleString()} volunteers
                            </Typography>
                          </Box>
                        </Stack>
                        <IconButton size="small">
                          {expandedSdg === sdg.id ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                      </Stack>

                      <Box sx={{ mb: 1 }}>
                        <Stack direction="row" justifyContent="space-between" mb={0.5}>
                          <Typography variant="body2" color="text.secondary">
                            Progress
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {sdg.progress}%
                          </Typography>
                        </Stack>
                        <LinearProgress 
                          variant="determinate" 
                          value={sdg.progress} 
                          sx={{ 
                            height: 8, 
                            borderRadius: 4,
                            bgcolor: alpha(theme.palette.primary.main, 0.1)
                          }} 
                        />
                      </Box>

                      {expandedSdg === sdg.id && (
                        <Box sx={{ mt: 2, pt: 2, borderTop: `1px dashed ${alpha(theme.palette.divider, 0.2)}` }}>
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2" color="text.secondary">
                              Impact:
                            </Typography>
                            <Typography variant="body2" fontWeight={600}>
                              {sdg.impact}
                            </Typography>
                          </Stack>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* Regional Distribution */}
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Regional Distribution
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Volunteer engagement across different regions
            </Typography>

            <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
              <List>
                {regionalData.map((region, index) => (
           <ListItem 
  key={index}
  sx={{ 
    py: 2,
    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    '&:last-child': { borderBottom: 0 }
  }}
>
  <ListItemAvatar>
    <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
      <Map />
    </Avatar>
  </ListItemAvatar>
  <ListItemText
    primary={
      <Typography variant="subtitle1" fontWeight={600}>
        {region.region}
      </Typography>
    }
    secondary={
      <Stack direction="row" spacing={3} sx={{ mt: 1 }}>
        <Typography variant="caption">
          {region.volunteers.toLocaleString()} volunteers
        </Typography>
        <Typography variant="caption">
          {region.projects} projects
        </Typography>
      </Stack>
    }
    secondaryTypographyProps={{ component: 'div' }}
  />
                    <Box sx={{ textAlign: 'right' }}>
                      <Chip 
                        label={`+${region.growth}%`}
                        size="small"
                        color="success"
                        variant="outlined"
                      />
                      <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 0.5 }}>
                        YoY Growth
                      </Typography>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Paper>
        </Grid>

        {/* Right Column - Impact & Trends */}
        <Grid size={{xs:12, lg:4}} >
          {/* Impact Metrics */}
          <Paper sx={{ p: 3, borderRadius: 3, mb: 4 }}>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              <Timeline sx={{ mr: 1, verticalAlign: 'middle' }} />
              Impact Metrics
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Cumulative impact since platform launch
            </Typography>

            <Stack spacing={3}>
              {impactMetrics.map((metric, index) => (
                <Box key={index}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.5}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {metric.metric}
                    </Typography>
                    <Typography variant="h5" fontWeight={700} color="primary.main">
                      {metric.value}
                      <Typography component="span" variant="body2" color="text.secondary">
                        {' '}{metric.unit}
                      </Typography>
                    </Typography>
                  </Stack>
                  <Typography variant="caption" color="text.secondary">
                    {metric.description}
                  </Typography>
                  <Divider sx={{ mt: 2 }} />
                </Box>
              ))}
            </Stack>
          </Paper>

          {/* Trending Projects */}
          <Paper sx={{ p: 3, borderRadius: 3, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  Trending Projects
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Most active initiatives this month
                </Typography>
              </Box>
              <Button endIcon={<ArrowForward />} size="small">
                View All
              </Button>
            </Box>

            <List sx={{ '& .MuiListItem-root': { px: 0 } }}>
              {trendingProjects.map((project) => (
                <ListItem key={project.id} sx={{ py: 1.5 }}>
                  <ListItemIcon>
                    <Chip 
                      label={`SDG ${project.sdg}`}
                      size="small"
                      sx={{ 
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: 'primary.main',
                        fontWeight: 600
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" fontWeight={600}>
                        {project.name}
                      </Typography>
                    }
                    secondary={
                      <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">
                          {project.volunteers.toLocaleString()} volunteers
                        </Typography>
                        <Chip 
                          label={project.trend === 'hot' ? '🔥 Hot' : '📈 Rising'}
                          size="small"
                          color={project.trend === 'hot' ? 'error' : 'warning'}
                          variant="outlined"
                        />
                      </Stack>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Insights Widget */}
          <Paper sx={{ 
            p: 3, 
            borderRadius: 3,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                <Psychology sx={{ mr: 1, verticalAlign: 'middle' }} />
                Did You Know?
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 3 }}>
                Every 10 volunteers on our platform contributes to approximately 1 Sustainable Development Goal target being achieved ahead of schedule.
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button 
                  variant="contained" 
                  sx={{ 
                    bgcolor: 'white', 
                    color: 'primary.main',
                    '&:hover': { bgcolor: '#f5f5f5' }
                  }}
                  onClick={() => router.push('/sdg')}
                >
                  Join a Project
                </Button>
                <Button 
                  variant="outlined" 
                  sx={{ color: 'white', borderColor: 'white' }}
                  onClick={() => router.push('/about')}
                >
                  Learn More
                </Button>
              </Stack>
            </Box>
            <Box sx={{ 
              position: 'absolute',
              right: -20,
              bottom: -20,
              opacity: 0.1,
              fontSize: 200
            }}>
              <Public />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Data Visualization Section */}
      <Paper sx={{ p: 3, borderRadius: 3, mt: 4, bgcolor: alpha(theme.palette.primary.main, 0.02) }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Data Visualizations
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Interactive charts and graphs for in-depth analysis
            </Typography>
          </Box>
          <Chip label="Coming Soon" color="info" variant="outlined" />
        </Box>

        <Grid container spacing={3}>
          <Grid size={{xs:12, md:6}} >
            <Paper sx={{ p: 3, borderRadius: 2, height: '100%', textAlign: 'center' }}>
              <BarChart sx={{ fontSize: 60, color: alpha(theme.palette.primary.main, 0.5), mb: 2 }} />
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Impact Over Time
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Track cumulative impact metrics with interactive time-series charts
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{xs:12, md:6}} >
            <Paper sx={{ p: 3, borderRadius: 2, height: '100%', textAlign: 'center' }}>
              <PieChart sx={{ fontSize: 60, color: alpha(theme.palette.secondary.main, 0.5), mb: 2 }} />
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Sector Distribution
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Visual breakdown of projects across different SDG categories
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}