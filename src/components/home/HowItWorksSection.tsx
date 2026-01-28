import { Container, Box, Grid, Paper, Typography, Chip } from '@mui/material'
import {
  Security as SecurityIcon,
  Explore as ExploreIcon,
  VolunteerActivism as VolunteerActivismIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material'

export default function HowItWorksSection() {
  const steps = [
    {
      number: '1',
      icon: <SecurityIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Secure Sign In',
      description: 'Quick and secure Google login to get started. Your data is protected with enterprise-grade security.',
      badge: '30 Seconds',
      color: 'primary'
    },
    {
      number: '2',
      icon: <ExploreIcon sx={{ fontSize: 40, color: 'success.main' }} />,
      title: 'Browse SIGs',
      description: 'Explore detailed profiles of UN Special Interest Groups. Filter by focus area, time commitment, and skills required.',
      badge: 'Global Network',
      color: 'success'
    },
    {
      number: '3',
      icon: <VolunteerActivismIcon sx={{ fontSize: 40, color: 'warning.main' }} />,
      title: 'One-Click Volunteer',
      description: 'Simple one-click application to join. Track your applications and receive updates in your personal dashboard.',
      badge: 'Limit: 3 SIGs',
      color: 'warning'
    }
  ]

  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Chip
            label="Simple Process"
            color="primary"
            icon={<TrendingUpIcon />}
            sx={{ mb: 2 }}
          />
          <Typography variant="h2" sx={{ fontWeight: 700, mb: 3 }}>
            How It Works
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
            Start making a difference in just three simple steps
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {steps.map((step, index) => (
            <Grid size={{xs:12, md:4}} key={index}>
              <Paper
                sx={{
                  p: 4,
                  height: '100%',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  borderRadius: 4,
                  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                  position: 'relative',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 8,
                    background: 'linear-gradient(145deg, #ffffff 0%, #e3f2fd 100%)'
                  }
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <Chip
                    label={step.number}
                    sx={{
                      position: 'absolute',
                      top: -12,
                      right: 20,
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      backgroundColor: `${step.color}.main`,
                      color: 'white',
                      boxShadow: 2
                    }}
                  />
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      backgroundColor: `${step.color}.light`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3
                    }}
                  >
                    {step.icon}
                  </Box>
                </Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  {step.title}
                </Typography>
                <Typography color="text.secondary" paragraph>
                  {step.description}
                </Typography>
                <Chip 
                  label={step.badge} 
                  size="small" 
                  color={step.color as any} 
                  variant="outlined" 
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}