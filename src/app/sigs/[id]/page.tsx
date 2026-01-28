'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Chip,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  AlertTitle,
  CircularProgress,
  Skeleton,
  Fab,
  Divider,
  Avatar,
  Stack
} from '@mui/material'
import {
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckCircleIcon,
  AccessTime as AccessTimeIcon,
  Login as LoginIcon,
  Check as CheckIcon,
  HourglassEmpty as HourglassEmptyIcon,
  Category as CategoryIcon,
  MyLocation as TargetIcon,
  School as SchoolIcon,
  EmojiEvents as EmojiEventsIcon,
  Public as PublicIcon,
  VolunteerActivism as VolunteerActivismIcon,
  AdsClick as BullseyeIcon,
  Timeline as TimelineIcon,
  Groups as GroupsIcon
} from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { sdgData } from '@/data/sdgData'

// Type definition for SDG
interface SDGType {
  id: number;
  displayTitle: string;
  actualTitle: string;
  summary: string;
  description: string;
  color: string;
  image_url: string;
  focus_areas: string[];
  objectives: string[];
  requirements?: string[];
  benefits?: string[];
  targets: string[];
}

// Custom styled components (same as before)
const HeroSection = styled(Paper)(({ theme }) => ({
  position: 'relative',
  borderRadius: Number(theme.shape.borderRadius) * 3,
  overflow: 'hidden',
  marginBottom: theme.spacing(4),
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 100%)',
    zIndex: 1
  }
}))

const HeroImage = styled('div')({
  height: '400px',
  width: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  position: 'relative'
})

const HeroContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(6),
  color: 'white',
  zIndex: 2,
  background: 'linear-gradient(transparent 0%, rgba(0, 0, 0, 0.6) 100%)'
}))

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8]
  }
}))

const PulseButton = styled(Button)(({ theme }) => ({
  animation: 'pulse 2s infinite',
  '@keyframes pulse': {
    '0%': {
      boxShadow: `0 0 0 0 ${theme.palette.primary.main}`
    },
    '70%': {
      boxShadow: `0 0 0 10px transparent`
    },
    '100%': {
      boxShadow: `0 0 0 0 transparent`
    }
  }
}))

export default function SDGDetailPage() {
  const { id } = useParams()
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const [sdg, setSdg] = useState<SDGType | null>(null)
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState(false)
  const [alreadyApplied, setAlreadyApplied] = useState(false)
  const [userApplicationsCount, setUserApplicationsCount] = useState(0)
  const [dbUser, setDbUser] = useState<any>(null)

  useEffect(() => {
    if (id) {
      fetchSDG()
    }
  }, [id])

  useEffect(() => {
    if (session?.user && id) {
      checkApplicationStatus()
    }
  }, [session, id])

  const fetchSDG = async () => {
    try {
      const sdgId = parseInt(id as string)
      
      // Use static SDG data for IDs 1-17
      if (sdgId >= 1 && sdgId <= 17) {
        const sdgItem = sdgData.find(item => item.id === sdgId)
        if (sdgItem) {
          setSdg(sdgItem as SDGType)
        } else {
          console.error('SDG not found in static data')
        }
      } else {
        console.error('SDG ID must be between 1 and 17')
      }
    } catch (error) {
      console.error('Error fetching SDG:', error)
    } finally {
      setLoading(false)
    }
  }

  const ensureUserInDatabase = async () => {
    if (!session?.user?.email) {
      console.log('No email in session')
      return null
    }

    try {
      console.log('Checking user in database for email:', session.user.email)
      
      const { data: existingUser, error: queryError } = await supabase
        .from('users')
        .select('*')
        .eq('email', session.user.email)
        .maybeSingle()

      if (queryError) {
        console.error('Error checking user:', queryError)
        return null
      }

      if (existingUser) {
        console.log('User found:', existingUser.id)
        return existingUser
      }

      // Create new user
      console.log('Creating new user...')
      const userData = {
        email: session.user.email,
        name: session.user.name || '',
        image: session.user.image || '',
        google_id: session.user.id || null // Handle case where id might be undefined
      }
      
      console.log('User data to insert:', userData)

      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert([userData])
        .select()
        .single()

      if (insertError) {
        console.error('Error creating user:', insertError)
        console.error('Error details:', insertError.message, insertError.details, insertError.hint)
        return null
      }

      console.log('New user created:', newUser.id)
      return newUser
    } catch (error) {
      console.error('Error ensuring user in database:', error)
      return null
    }
  }

  const checkApplicationStatus = async () => {
    if (!session?.user || !id) return

    const userData = await ensureUserInDatabase()
    
    if (!userData) {
      console.error('Failed to ensure user in database')
      return
    }
    
    setDbUser(userData)
    const sdgId = parseInt(id as string)

    try {
      // Fixed: Use sdg_applications table and sdg_id column
      const { data: existingApp, error } = await supabase
        .from('sdg_applications')
        .select('id')
        .eq('sdg_id', sdgId) // Use sdg_id, not id
        .eq('user_id', userData.id)
        .maybeSingle()

      if (error) {
        console.error('Error checking application:', error)
        console.error('Error details:', error.message)
      } else {
        console.log('Application check result:', existingApp ? 'Applied' : 'Not applied')
        setAlreadyApplied(!!existingApp)
      }

      // Check application count
      const { count, error: countError } = await supabase
        .from('sdg_applications')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userData.id)
        .eq('status', 'pending')

      if (countError) {
        console.error('Error counting applications:', countError)
      } else {
        console.log('User application count:', count)
        setUserApplicationsCount(count || 0)
      }
    } catch (error) {
      console.error('Error checking application status:', error)
    }
  }

  const handleApply = async () => {
    if (!session?.user) {
      alert('Please sign in first')
      return
    }

    const userData = await ensureUserInDatabase()
    
    if (!userData) {
      alert('Failed to sync user data. Please try again.')
      return
    }

    if (userApplicationsCount >= 3) {
      alert('You have reached the maximum limit of 3 active applications. Please wait for some applications to be processed before applying to more SDGs.')
      return
    }

    if (alreadyApplied) {
      alert('You have already volunteered for this SDG initiative.')
      return
    }

    setApplying(true)
    const sdgId = parseInt(id as string)

    try {
      console.log('Applying for SDG:', sdgId, 'User:', userData.id)
      
      const { error } = await supabase
        .from('sdg_applications')
        .insert([
          {
            user_id: userData.id,
            sdg_id: sdgId, // Use sdg_id
            status: 'pending'
          }
        ])

      if (error) {
        console.error('Application error:', error)
        if (error.code === '23505') {
          setAlreadyApplied(true)
          alert('You have already volunteered for this SDG initiative.')
          return
        }
        throw error
      }

      alert('Successfully applied to volunteer! You can track your application in your profile.')
      setAlreadyApplied(true)
      setUserApplicationsCount(prev => prev + 1)
    } catch (error) {
      console.error('Error applying:', error)
      alert('Failed to apply. Please try again.')
    } finally {
      setApplying(false)
    }
  }

  const handleSignIn = () => {
    router.push('/')
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ mb: 4 }}>
          <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 1 }} />
        </Box>
        
        <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 3, mb: 4 }} />
        
        <Grid container spacing={3}>
          <Grid size={{xs:12, md:8}} >
            <Skeleton variant="text" height={60} width="80%" sx={{ mb: 2 }} />
            <Skeleton variant="text" height={30} width="60%" sx={{ mb: 3 }} />
            <Skeleton variant="text" height={100} sx={{ mb: 4 }} />
          </Grid>
          <Grid size={{xs:12, md:4}} >
            <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 2, mb: 3 }} />
          </Grid>
        </Grid>
      </Container>
    )
  }

  if (!sdg) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Box sx={{ mt: 8 }}>
          <PublicIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
          <Typography variant="h4" gutterBottom color="error">
            SDG Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            The Sustainable Development Goal you're looking for doesn't exist.
          </Typography>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => router.push('/sdgs')}
            sx={{ mt: 2 }}
          >
            Back to SDGs
          </Button>
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push('/sdgs')}
          sx={{ mb: 3 }}
        >
          Back to All SDGs
        </Button>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSection elevation={6}>
          <HeroImage style={{ 
            backgroundImage: `url(${sdg.image_url})`,
            backgroundColor: sdg.color
          }} />
          <HeroContent>
            <Grid container alignItems="center" spacing={2}>
              <Grid size={{xs:12, md:8}}>
                <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                  {sdg.actualTitle}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                  <Chip
                    label={`SDG ${sdg.id}`}
                    color="primary"
                    size="medium"
                    sx={{ 
                      fontWeight: 600, 
                      fontSize: '1rem',
                      backgroundColor: sdg.color,
                      color: 'white'
                    }}
                  />
                  <Chip
                    icon={<VolunteerActivismIcon />}
                    label="Sustainable Development Goal"
                    variant="outlined"
                    sx={{ color: 'white', borderColor: 'white' }}
                  />
                </Box>
                <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: '800px' }}>
                  {sdg.description}
                </Typography>
              </Grid>
            </Grid>
          </HeroContent>
        </HeroSection>
      </motion.div>

      {/* Main Content */}
      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid size={{xs:12, md:8}} >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Paper elevation={2} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3, color: 'primary.main' }}>
                About This Goal
              </Typography>
              
              <Grid container spacing={4}>
                {/* Focus Areas */}
                <Grid size={{xs:12, sm:6}}>
                  <FeatureCard elevation={1}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ bgcolor: sdg.color, mr: 2 }}>
                          <CategoryIcon />
                        </Avatar>
                        <Typography variant="h6">Focus Areas</Typography>
                      </Box>
                      <List dense>
                        {sdg.focus_areas?.map((area: string, index: number) => (
                          <ListItem key={index} sx={{ px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <CheckIcon sx={{ color: sdg.color }} fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary={area} />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </FeatureCard>
                </Grid>

                {/* Objectives */}
                <Grid size={{xs:12, sm:6}} >
                  <FeatureCard elevation={1}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ bgcolor: sdg.color, mr: 2 }}>
                          <TargetIcon />
                        </Avatar>
                        <Typography variant="h6">Objectives</Typography>
                      </Box>
                      <List dense>
                        {sdg.objectives?.map((objective: string, index: number) => (
                          <ListItem key={index} sx={{ px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <BullseyeIcon sx={{ color: sdg.color }} fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary={objective} />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </FeatureCard>
                </Grid>

                {/* Requirements (Conditional) */}
                {sdg.requirements && sdg.requirements.length > 0 && (
                  <Grid size={{xs:12, sm:6}}>
                    <FeatureCard elevation={1}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar sx={{ bgcolor: sdg.color, mr: 2 }}>
                            <SchoolIcon />
                          </Avatar>
                          <Typography variant="h6">Requirements</Typography>
                        </Box>
                        <List dense>
                          {sdg.requirements.map((requirement: string, index: number) => (
                            <ListItem key={index} sx={{ px: 0 }}>
                              <ListItemIcon sx={{ minWidth: 36 }}>
                                <CheckIcon sx={{ color: sdg.color }} fontSize="small" />
                              </ListItemIcon>
                              <ListItemText primary={requirement} />
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </FeatureCard>
                  </Grid>
                )}

                {/* Benefits (Conditional) */}
                {sdg.benefits && sdg.benefits.length > 0 && (
                  <Grid size={{xs:12, sm:6}} >
                    <FeatureCard elevation={1}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar sx={{ bgcolor: sdg.color, mr: 2 }}>
                            <EmojiEventsIcon />
                          </Avatar>
                          <Typography variant="h6">Benefits</Typography>
                        </Box>
                        <List dense>
                          {sdg.benefits.map((benefit: string, index: number) => (
                            <ListItem key={index} sx={{ px: 0 }}>
                              <ListItemIcon sx={{ minWidth: 36 }}>
                                <CheckIcon sx={{ color: sdg.color }} fontSize="small" />
                              </ListItemIcon>
                              <ListItemText primary={benefit} />
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </FeatureCard>
                  </Grid>
                )}

                {/* Targets */}
                {sdg.targets && sdg.targets.length > 0 && (
                  <Grid size={{xs:12}} >
                    <FeatureCard elevation={1}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar sx={{ bgcolor: sdg.color, mr: 2 }}>
                            <TimelineIcon />
                          </Avatar>
                          <Typography variant="h6">2030 Targets</Typography>
                        </Box>
                        <List dense>
                          {sdg.targets.map((target: string, index: number) => (
                            <ListItem key={index} sx={{ px: 0 }}>
                              <ListItemIcon sx={{ minWidth: 36 }}>
                                <CheckIcon sx={{ color: sdg.color }} fontSize="small" />
                              </ListItemIcon>
                              <ListItemText primary={target} />
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </FeatureCard>
                  </Grid>
                )}
              </Grid>
            </Paper>
          </motion.div>
        </Grid>

        {/* Right Column - Volunteer Action */}
        <Grid size={{xs:12, md:4}}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3, position: 'sticky', top: 20 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3, color: sdg.color }}>
                Get Involved
              </Typography>

              {session ? (
                <>
                  {/* Application Status */}
                  {alreadyApplied ? (
                    <Alert 
                      severity="success" 
                      icon={<CheckCircleIcon fontSize="inherit" />}
                      sx={{ mb: 3 }}
                    >
                      <AlertTitle>Application Submitted</AlertTitle>
                      You have already volunteered for this SDG. Check your profile for updates.
                    </Alert>
                  ) : userApplicationsCount >= 3 ? (
                    <Alert 
                      severity="warning" 
                      icon={<HourglassEmptyIcon fontSize="inherit" />}
                      sx={{ mb: 3 }}
                    >
                      <AlertTitle>Application Limit Reached</AlertTitle>
                      You have 3 active applications. Please wait for some to be processed.
                    </Alert>
                  ) : null}

                  {/* Volunteer Stats */}
                  <Box sx={{ mb: 4, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Your Volunteer Status
                    </Typography>
                    <Stack direction="row" justifyContent="space-between">
                      <Box textAlign="center">
                        <Typography variant="h4" color={sdg.color}>
                          {userApplicationsCount}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Active Applications
                        </Typography>
                      </Box>
                      <Box textAlign="center">
                        <Typography variant="h4" color="success.main">
                          {3 - userApplicationsCount}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Available Slots
                        </Typography>
                      </Box>
                    </Stack>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                      Maximum 3 SDG initiatives per volunteer
                    </Typography>
                  </Box>

                  {/* Apply Button */}
                  <Box>
                    {!alreadyApplied && userApplicationsCount < 3 && (
                      <PulseButton
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={handleApply}
                        disabled={applying}
                        startIcon={applying ? <CircularProgress size={20} color="inherit" /> : <VolunteerActivismIcon />}
                        sx={{
                          py: 2,
                          mb: 2,
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          backgroundColor: sdg.color,
                          '&:hover': {
                            backgroundColor: sdg.color,
                            opacity: 0.9
                          }
                        }}
                      >
                        {applying ? 'Applying...' : 'Volunteer for this Goal!'}
                      </PulseButton>
                    )}

                    {/* Status Display */}
                    {alreadyApplied && (
                      <Button
                        variant="outlined"
                        color="success"
                        fullWidth
                        size="large"
                        startIcon={<CheckCircleIcon />}
                        sx={{ py: 2 }}
                        disabled
                      >
                        Application Submitted
                      </Button>
                    )}

                    {userApplicationsCount >= 3 && !alreadyApplied && (
                      <Button
                        variant="outlined"
                        color="warning"
                        fullWidth
                        size="large"
                        startIcon={<HourglassEmptyIcon />}
                        sx={{ py: 2 }}
                        disabled
                      >
                        Limit Reached
                      </Button>
                    )}
                  </Box>
                </>
              ) : (
                <Box>
                  <Alert severity="info" sx={{ mb: 3 }}>
                    <AlertTitle>Sign In Required</AlertTitle>
                    Sign in with Google to volunteer for this SDG initiative
                  </Alert>
                  
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleSignIn}
                    startIcon={<LoginIcon />}
                    sx={{ 
                      py: 2, 
                      fontSize: '1.1rem',
                      backgroundColor: sdg.color,
                      '&:hover': {
                        backgroundColor: sdg.color,
                        opacity: 0.9
                      }
                    }}
                  >
                    Sign in to Volunteer
                  </Button>
                  
                  <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
                    Quick and secure Google login process
                  </Typography>
                </Box>
              )}

              {/* UN Resources */}
              <Divider sx={{ my: 3 }} />
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  UN Resources
                </Typography>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  href={`https://sdgs.un.org/goals/goal${sdg.id}`}
                  target="_blank"
                  startIcon={<PublicIcon />}
                >
                  UN Official Page
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  href={`https://en.wikipedia.org/wiki/Sustainable_Development_Goal_${sdg.id}`}
                  target="_blank"
                  startIcon={<GroupsIcon />}
                >
                  Wikipedia Article
                </Button>
              </Box>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>

      {/* Floating Action Button for Mobile */}
      <Fab
        color="primary"
        variant="extended"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          display: { xs: 'flex', md: 'none' }
        }}
      >
        <ArrowBackIcon sx={{ transform: 'rotate(90deg)' }} />
        Top
      </Fab>
    </Container>
  )
}
