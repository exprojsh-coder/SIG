import { Container, Box } from '@mui/material'
import HeroSection from '@/components/home/HeroSection'
import SIGCarouselSection from "@/components/home/SIGCarouselSection"
import HowItWorksSection from "@/components/home/HowItWorksSection"
import BenefitsSection from '@/components/home/BenefitsSection'
import { supabase } from '@/lib/supabase'

export default async function Home() {
  const { data: sigs } = await supabase
    .from('sigs')
    .select('*')
    .order('created_at', { ascending: true })

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <HeroSection />
      <SIGCarouselSection sigs={sigs || []} />
      <HowItWorksSection />
      <BenefitsSection />
    </Box>
  )
}