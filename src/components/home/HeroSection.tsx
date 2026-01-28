'use client'

import { Container, Typography, Box, Grid, Paper, Button, Stack, Chip } from '@mui/material'
import {
  VolunteerActivism as VolunteerActivismIcon,
  HowToReg as HowToRegIcon,
} from '@mui/icons-material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function HeroSection() {
  const router = useRouter()

  const handleExploreClick = () => {
    router.push('#sigs')
  }

  const handleJoinClick = () => {
    router.push('/profile')
  }

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        padding: { xs: 6, md: 12, lg: 12 },
        py: { xs: 8, md: 12 },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=1600&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1
        }
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid size={{xs:12, md:7}}>
            <Box sx={{ position: 'relative' }}>
              <Chip
                label="UN Global Initiative"
                color="primary"
                sx={{ mb: 3, backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
              />
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.2
                }}
              >
                Volunteer with UN Special Interest Groups
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.9, maxWidth: '700px' }}>
                Join global initiatives, make an impact, and contribute to meaningful change 
                across various United Nations Special Interest Groups.
              </Typography>
              
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 6 }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<VolunteerActivismIcon />}
                  onClick={handleExploreClick}
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontSize: '1.1rem',
                    backgroundColor: 'white',
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'grey.100',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s'
                  }}
                >
                  Explore SIGs
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<HowToRegIcon />}
                  onClick={handleJoinClick}
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontSize: '1.1rem',
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  Join Today
                </Button>
              </Stack>

              {/* Stats */}
              <Grid container spacing={3}>
                {[
                  { value: '50+', color: 'primary.main', label: 'Global SIGs' },
                  { value: '3', color: 'success.main', label: 'Max Applications' },
                  { value: '1-Click', color: 'warning.main', label: 'Simple Application' },
                  { value: '100%', color: 'info.main', label: 'Secure Login' },
                ].map((stat, index) => (
                  <Grid size={{xs:6, sm:3}} key={index}>
                    <Box
                      sx={{
                        textAlign: 'center',
                        p: 3,
                        borderRadius: 4,
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      <Typography variant="h3" sx={{ color: stat.color, fontWeight: 700 }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
          
          <Grid size={{xs:12, md:5}}>
            <Box
              sx={{
                position: 'relative',
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: 8
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=800&auto=format&fit=crop"
                alt="UN Volunteers collaborating"
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.7))',
                  p: 3,
                  color: 'white'
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Join thousands making a difference
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Real impact starts with you
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}