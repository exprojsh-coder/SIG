'use client'

import { useState } from 'react'
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Stack,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Button,
  IconButton
} from '@mui/material'
import {
  ExpandMore as ExpandMoreIcon,
  Public as PublicIcon,
  Diversity3 as DiversityIcon,
  EmojiEvents as AwardsIcon,
  TrendingUp as GrowthIcon,
  Security as SecurityIcon,
  Handshake as PartnershipIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  VolunteerActivism as VolunteerIcon,
  School as EducationIcon,
  HealthAndSafety as HealthIcon,
  Nature as EnvironmentIcon,
  Devices as TechnologyIcon,
  Groups as TeamIcon
} from '@mui/icons-material'

interface TeamMember {
  id: string
  name: string
  role: string
  department: string
  avatar: string
  bio: string
}

interface Statistic {
  label: string
  value: string
  icon: React.ReactNode
  change: string
}

export default function AboutPage() {
  const [expanded, setExpanded] = useState<string | false>(false)

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const stats: Statistic[] = [
    { label: 'Active Volunteers', value: '10,000+', icon: <VolunteerIcon />, change: '+15% this year' },
    { label: 'SIGs Launched', value: '50+', icon: <PublicIcon />, change: '5 new this quarter' },
    { label: 'Countries Reached', value: '120+', icon: <LocationIcon />, change: 'Global coverage' },
    { label: 'Success Rate', value: '95%', icon: <AwardsIcon />, change: 'High satisfaction' }
  ]

  const teamMembers: TeamMember[] = [
    { id: '1', name: 'Dr. Sarah Chen', role: 'Director', department: 'Global Operations', avatar: '/api/placeholder/100/100', bio: '15+ years in UN humanitarian work' },
    { id: '2', name: 'Marcus Johnson', role: 'Head of Technology', department: 'Digital Innovation', avatar: '/api/placeholder/100/100', bio: 'Former tech lead at Google.org' },
    { id: '3', name: 'Aisha Rahman', role: 'Program Manager', department: 'Climate Action', avatar: '/api/placeholder/100/100', bio: 'Environmental policy expert' }
  ]

  const focusAreas = [
    { icon: <HealthIcon />, title: 'Global Health', description: 'Improving healthcare access worldwide', projects: 12 },
    { icon: <EducationIcon />, title: 'Education', description: 'Promoting quality education for all', projects: 8 },
    { icon: <EnvironmentIcon />, title: 'Environment', description: 'Sustainable development initiatives', projects: 15 },
    { icon: <TechnologyIcon />, title: 'Technology', description: 'Digital inclusion and innovation', projects: 6 }
  ]

  const timelineEvents = [
    { year: '2015', title: 'Platform Launch', description: 'Started with 3 pilot SIGs' },
    { year: '2018', title: 'Global Expansion', description: 'Expanded to 50+ countries' },
    { year: '2020', title: 'Digital Transformation', description: 'Launched mobile app and AI matching' },
    { year: '2023', title: 'Millionth Volunteer', description: 'Reached 1M volunteer milestone' }
  ]

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box sx={{ 
        bgcolor: 'primary.main', 
        color: 'white', 
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid size={{xs:12, md:6}}>
              <Chip 
                label="About UN SIGs" 
                sx={{ 
                  mb: 3, 
                  bgcolor: 'rgba(255, 255, 255, 0.2)', 
                  color: 'white',
                  fontWeight: 600
                }} 
              />
              <Typography variant="h1" sx={{ 
                fontWeight: 800, 
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                lineHeight: 1.2
              }}>
                Making Global Impact Accessible
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                Connecting passionate volunteers with United Nations Special Interest Groups to drive meaningful change worldwide.
              </Typography>
            </Grid>
            <Grid size={{xs:12, md:6}}>
              <Paper sx={{ p: 4, borderRadius: 4, bgcolor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  Our Mission
                </Typography>
                <Typography paragraph>
                  To democratize access to global volunteer opportunities and empower individuals to contribute to UN Sustainable Development Goals through specialized interest groups.
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                  <Button variant="contained" sx={{ bgcolor: 'white', color: 'primary.main' }}>
                    Join Our Mission
                  </Button>
                  <Button variant="outlined" sx={{ color: 'white', borderColor: 'white' }}>
                    Watch Video
                  </Button>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid size={{xs:6, md:3}} key={index}>
              <Card sx={{ borderRadius: 3, textAlign: 'center', p: 3 }}>
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {stat.icon}
                </Box>
                <Typography variant="h3" fontWeight={700} gutterBottom>
                  {stat.value}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {stat.label}
                </Typography>
                <Typography variant="caption" color="success.main">
                  {stat.change}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Our Story & Values */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h2" align="center" fontWeight={700} gutterBottom>
          Our Story & Values
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
          Founded on the principles of accessibility, impact, and collaboration
        </Typography>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid size={{xs:12, md:6}}>
            <Paper sx={{ p: 4, borderRadius: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom fontWeight={600}>
                <DiversityIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Inclusivity
              </Typography>
              <Typography paragraph>
                We believe everyone should have the opportunity to contribute to global change, regardless of location, background, or experience level.
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{xs:12, md:6}}>
            <Paper sx={{ p: 4, borderRadius: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom fontWeight={600}>
                <SecurityIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Transparency
              </Typography>
              <Typography paragraph>
                Every SIG, project, and impact metric is openly shared. We believe in accountability and clear communication.
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{xs:12, md:6}}>
            <Paper sx={{ p: 4, borderRadius: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom fontWeight={600}>
                <GrowthIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Innovation
              </Typography>
              <Typography paragraph>
                Continuously evolving our platform with cutting-edge technology to improve volunteer matching and impact measurement.
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{xs:12, md:6}}>
            <Paper sx={{ p: 4, borderRadius: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom fontWeight={600}>
                <PartnershipIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Partnership
              </Typography>
              <Typography paragraph>
                Collaborating with UN agencies, NGOs, and local organizations to maximize our collective impact.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Focus Areas */}
        <Typography variant="h4" gutterBottom fontWeight={700}>
          Our Focus Areas
        </Typography>
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {focusAreas.map((area, index) => (
            <Grid size={{xs:12, sm:6, md:3}} key={index}>
              <Card sx={{ borderRadius: 3, p: 3, height: '100%' }}>
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {area.icon}
                </Box>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  {area.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {area.description}
                </Typography>
                <Chip label={`${area.projects} projects`} size="small" variant="outlined" />
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* FAQ Section */}
        <Typography variant="h4" gutterBottom fontWeight={700}>
          Frequently Asked Questions
        </Typography>
        <Box sx={{ mb: 8 }}>
          {[
            { question: 'How do I join a SIG?', answer: 'Simply browse available SIGs, click "Apply Now", and complete your profile. Most applications are reviewed within 48 hours.' },
            { question: 'Is there a cost to volunteer?', answer: 'No, volunteering through UN SIGs is completely free. We cover all platform and administrative costs.' },
            { question: 'What time commitment is required?', answer: 'Time commitments vary by SIG. Most require 5-10 hours per week, but we have opportunities for all schedules.' },
            { question: 'Do I need specific skills?', answer: 'We have opportunities for all skill levels. Many SIGs provide training and mentorship for new volunteers.' }
          ].map((faq, index) => (
            <Accordion 
              key={index} 
              expanded={expanded === `panel${index}`} 
              onChange={handleAccordionChange(`panel${index}`)}
              sx={{ mb: 1, borderRadius: 2 }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={600}>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary">{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        {/* Timeline */}
        <Typography variant="h4" gutterBottom fontWeight={700}>
          Our Journey
        </Typography>
        <Box sx={{ position: 'relative', pl: 4, mb: 8 }}>
          <Divider orientation="vertical" sx={{ 
            position: 'absolute', 
            left: 7, 
            top: 0, 
            bottom: 0,
            borderColor: 'primary.main',
            borderWidth: 2
          }} />
          {timelineEvents.map((event, index) => (
            <Box key={index} sx={{ mb: 4, position: 'relative' }}>
              <Box sx={{ 
                position: 'absolute', 
                left: -32, 
                top: 0,
                width: 16, 
                height: 16, 
                borderRadius: '50%', 
                bgcolor: 'primary.main',
                border: '3px solid white'
              }} />
              <Typography variant="h6" color="primary" fontWeight={700}>
                {event.year}
              </Typography>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                {event.title}
              </Typography>
              <Typography color="text.secondary">
                {event.description}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Contact Section */}
        <Paper sx={{ p: 4, borderRadius: 3, bgcolor: 'primary.light' }}>
          <Grid container spacing={4}>
            <Grid size={{xs:12, md:8}}>
              <Typography variant="h5" gutterBottom fontWeight={600}>
                Get in Touch
              </Typography>
              <Typography paragraph>
                Have questions or want to partner with us? We'd love to hear from you.
              </Typography>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <EmailIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography>contact@unsigs.org</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PhoneIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography>+1 (555) 123-4567</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography>UN Headquarters, New York, NY</Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid size={{xs:12, md:4}}>
              <Typography variant="h6" gutterBottom>
                Follow Us
              </Typography>
              <Stack direction="row" spacing={1}>
                <IconButton><LinkedInIcon /></IconButton>
                <IconButton><TwitterIcon /></IconButton>
                <IconButton><FacebookIcon /></IconButton>
                <IconButton><InstagramIcon /></IconButton>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  )
}