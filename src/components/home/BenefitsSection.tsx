'use client' 

import { Container, Box, Grid, Paper, Typography, Button, Divider } from '@mui/material'
import {
  VolunteerActivism as VolunteerActivismIcon,
  Public as PublicIcon,
  EmojiEvents as EmojiEventsIcon,
  Groups as GroupsIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material'
import Link from 'next/link'

export default function BenefitsSection() {
  return (
    <Box sx={{ py: 10, backgroundColor: 'primary.main', color: 'white' }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid size={{xs:12, md:6}}>
            <Typography variant="overline" sx={{ opacity: 0.8, letterSpacing: 2 }}>
              Why Volunteer With Us
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 700, mb: 3 }}>
              Make Your Impact Count
            </Typography>
            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)', mb: 4 }} />
            
            <Grid container spacing={3}>
              {[
                { icon: <PublicIcon />, title: 'Global Network', desc: 'Connect with volunteers worldwide' },
                { icon: <EmojiEventsIcon />, title: 'UN Certificate', desc: 'Receive official recognition' },
                { icon: <GroupsIcon />, title: 'Team Collaboration', desc: 'Work with diverse teams' },
                { icon: <TrendingUpIcon />, title: 'Career Growth', desc: 'Enhance your professional skills' }
              ].map((benefit, index) => (
                <Grid size={{xs:6}} key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ mr: 2, color: 'white' }}>
                      {benefit.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {benefit.title}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        {benefit.desc}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
          
          <Grid size={{xs:12, md:6}} >
            <Paper
              elevation={6}
              sx={{
                p: 4,
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Ready to Make a Difference?
              </Typography>
              <Typography paragraph sx={{ opacity: 0.9 }}>
                Join thousands of volunteers who are already contributing to meaningful change through UN SIGs.
              </Typography>
              <Button
                variant="contained"
                size="large"
                fullWidth
                startIcon={<VolunteerActivismIcon />}
                component={Link}
                href="/"
                sx={{
                  py: 1.5,
                  mt: 2,
                  backgroundColor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'grey.100'
                  }
                }}
              >
                Start Volunteering Today
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}