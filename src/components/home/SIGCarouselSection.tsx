import { Container, Box, Typography } from '@mui/material'
import SIGCarousel from '@/components/SIGCarousel'
import { SIG } from '@/types/sig'

interface SIGCarouselSectionProps {
  sigs: SIG[]
}

export default function SIGCarouselSection({ sigs }: SIGCarouselSectionProps) {
  return (
    <Box id="sigs" sx={{ py: 10, backgroundColor: 'grey.50' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="overline" color="primary" sx={{ fontWeight: 600, letterSpacing: 2 }}>
            Explore Opportunities
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
            Available Special Interest Groups
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
            Browse through our curated selection of UN SIGs and find the perfect match for your skills and interests
          </Typography>
        </Box>
        
        <SIGCarousel sigs={sigs} />
      </Container>
    </Box>
  )
}