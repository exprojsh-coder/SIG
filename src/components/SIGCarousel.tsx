'use client'

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Stack,
  Chip,
  CardActionArea,
  CardActions,
  Fade,
  useMediaQuery,
  useTheme,
  LinearProgress
} from '@mui/material'
import {
  ChevronLeft,
  ChevronRight,
  ArrowForward,
  AccessTime,
  Group,
  TrendingUp,
  LocationOn
} from '@mui/icons-material'
import { SIG } from '@/types/sig'

interface SIGCarouselProps {
  sigs: SIG[]
}

// Deterministic function to generate consistent values between server/client
const generateDeterministicData = (id: string) => {
  // Create a simple hash from the ID for deterministic values
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash) + id.charCodeAt(i)
    hash = hash & hash
  }
  
  const locations = ['Global', 'Regional', 'Remote']
  const location = locations[Math.abs(hash) % locations.length]
  const volunteers = 50 + (Math.abs(hash) % 450) // 50-500
  const duration = `${3 + (Math.abs(hash) % 6)} months` // 3-8 months
  const progress = 30 + (Math.abs(hash) % 50) // 30-80%
  
  return { location, volunteers, duration, progress }
}

export default function SIGCarousel({ sigs }: SIGCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true)
  const [mounted, setMounted] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))

  // Set mounted state to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Calculate cards per view based on screen size
  const getCardsPerView = useCallback(() => {
    if (!mounted) return 3 // Default for server
    if (isMobile) return 1.1
    if (isTablet) return 2.2
    return 3.3
  }, [mounted, isMobile, isTablet])

  // Enhanced SIGs with deterministic data
  const enhancedSigs = useMemo(() => {
    return sigs.map(sig => ({
      ...sig,
      ...generateDeterministicData(sig.id)
    }))
  }, [sigs])

  const scrollToIndex = useCallback((index: number) => {
    if (!scrollContainerRef.current || !mounted) return
    
    const container = scrollContainerRef.current
    const children = container.children
    if (children.length === 0) return
    
    const cardElement = children[0] as HTMLElement
    const cardWidth = cardElement.offsetWidth + 16 // 16px for gap
    const scrollPosition = index * cardWidth
    
    setIsScrolling(true)
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    })
    
    setCurrentIndex(index)
    setAutoScrollEnabled(false)
    
    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }
    
    // Re-enable auto-scroll after user interaction timeout
    scrollTimeoutRef.current = setTimeout(() => {
      setAutoScrollEnabled(true)
    }, 2000)
  }, [mounted])

  const nextSlide = useCallback(() => {
    if (enhancedSigs.length === 0) return
    const cardsPerView = getCardsPerView()
    const maxIndex = Math.max(enhancedSigs.length - Math.floor(cardsPerView), 0)
    const nextIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1
    scrollToIndex(nextIndex)
  }, [enhancedSigs.length, getCardsPerView, currentIndex, scrollToIndex])

  const prevSlide = useCallback(() => {
    if (enhancedSigs.length === 0) return
    const prevIndex = currentIndex === 0 ? 0 : currentIndex - 1
    scrollToIndex(prevIndex)
  }, [currentIndex, enhancedSigs.length, scrollToIndex])

  // Auto-scroll functionality
  useEffect(() => {
    if (!autoScrollEnabled || enhancedSigs.length <= 1 || !mounted) return
    
    autoScrollRef.current = setInterval(() => {
      const cardsPerView = getCardsPerView()
      const maxIndex = Math.max(enhancedSigs.length - Math.floor(cardsPerView), 0)
      const nextIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1
      scrollToIndex(nextIndex)
    }, 3000)
    
    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
      }
    }
  }, [autoScrollEnabled, currentIndex, enhancedSigs.length, getCardsPerView, scrollToIndex, mounted])

  // Handle scroll events for manual navigation
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current || isScrolling || !mounted) return
    
    const container = scrollContainerRef.current
    const children = container.children
    if (children.length === 0) return
    
    const cardElement = children[0] as HTMLElement
    const cardWidth = cardElement.offsetWidth + 16
    
    const scrolledIndex = Math.round(container.scrollLeft / cardWidth)
    
    if (scrolledIndex !== currentIndex) {
      setCurrentIndex(scrolledIndex)
      setAutoScrollEnabled(false)
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        setAutoScrollEnabled(true)
      }, 5000)
    }
  }, [currentIndex, isScrolling, mounted])

  // Reset scrolling state
  useEffect(() => {
    const timer = setTimeout(() => setIsScrolling(false), 300)
    return () => clearTimeout(timer)
  }, [currentIndex])

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
      }
    }
  }, [])

  // If not mounted yet, render a skeleton without dynamic data
  if (!mounted) {
    return (
      <Box sx={{ position: 'relative', overflow: 'hidden', width: '100%' }}>
        <LinearProgress sx={{ mb: 3 }} />
        <Stack direction="row" spacing={2} sx={{ py: 3, px: { xs: 2, md: 4 } }}>
          {[1, 2, 3].map((i) => (
            <Card key={i} sx={{ minWidth: 320, flexShrink: 0, borderRadius: 4 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ height: 24, bgcolor: 'action.hover', borderRadius: 1, mb: 1 }} />
                  <Chip label="Loading..." size="small" variant="outlined" />
                </Box>
                <Typography variant="body2" sx={{ height: 40, bgcolor: 'action.hover', borderRadius: 1, mb: 2 }} />
                <LinearProgress variant="determinate" value={0} sx={{ mb: 2 }} />
                <Button fullWidth disabled>Loading...</Button>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>
    )
  }

  if (enhancedSigs.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          No SIGs available at the moment
        </Typography>
      </Box>
    )
  }

  const cardsPerView = getCardsPerView()
  const maxIndex = Math.max(enhancedSigs.length - Math.floor(cardsPerView), 0)
  const totalSlides = maxIndex + 1

  return (
    <Box sx={{ 
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      '&:hover .carousel-controls': {
        opacity: 1
      }
    }}>
      {/* Progress indicator */}
      <Box sx={{ mb: 3 }}>
        <LinearProgress 
          variant="determinate" 
          value={totalSlides > 1 ? ((currentIndex + 1) / totalSlides) * 100 : 100}
          sx={{ 
            height: 4,
            borderRadius: 2,
            backgroundColor: 'action.hover',
            '& .MuiLinearProgress-bar': {
              borderRadius: 2,
              backgroundColor: 'primary.main'
            }
          }}
        />
        {totalSlides > 1 && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>
            {currentIndex + 1} of {totalSlides}
          </Typography>
        )}
      </Box>

      {/* Main carousel container */}
      <Box sx={{ position: 'relative' }}>
        <Stack
          ref={scrollContainerRef}
          direction="row"
          spacing={2}
          onScroll={handleScroll}
          sx={{
            overflowX: 'auto',
            overflowY: 'hidden',
            py: 3,
            px: { xs: 2, md: 4 },
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            scrollSnapType: 'x mandatory',
            maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
          }}
        >
          {enhancedSigs.map((sig, index) => (
            <Fade in={true} timeout={300} key={sig.id}>
              <Card
                sx={{
                  minWidth: { xs: 280, sm: 320, md: 360 },
                  flexShrink: 0,
                  borderRadius: 4,
                  boxShadow: currentIndex === index ? 8 : 2,
                  transform: currentIndex === index ? 'translateY(-4px)' : 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  scrollSnapAlign: 'start',
                  position: 'relative',
                  overflow: 'visible',
                  '&:hover': {
                    boxShadow: 12,
                    transform: 'translateY(-8px)',
                  }
                }}
              >
                {/* Priority badge */}
                {index % 3 === 0 && (
                  <Chip
                    label="High Priority"
                    color="error"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: -10,
                      right: 16,
                      fontWeight: 600,
                      fontSize: '0.7rem'
                    }}
                  />
                )}

                {/* Card content */}
                <CardActionArea onClick={() => console.log('View SIG:', sig.id)}>
                  
                     
                  <CardContent sx={{ p: 3 }}>
    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography variant="h6" fontWeight={700} sx={{ flex: 1, mr: 2 }}>
                        {sig.name}
                      </Typography>
                      
                      <Chip 
                        label={sig.location} 
                        size="small" 
                        icon={<LocationOn sx={{ fontSize: 14 }} />}
                        variant="outlined"
                      />
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 3 }}>
                      {sig.description.length > 120 
                        ? `${sig.description.substring(0, 120)}...` 
                        : sig.description}
                    </Typography>

                    {/* Stats row */}
                    <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Group sx={{ fontSize: 16, mr: 0.5, color: 'primary.main' }} />
                        <Typography variant="caption" fontWeight={500}>
                          {sig.volunteers} volunteers
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AccessTime sx={{ fontSize: 16, mr: 0.5, color: 'warning.main' }} />
                        <Typography variant="caption" fontWeight={500}>
                          {sig.duration}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TrendingUp sx={{ fontSize: 16, mr: 0.5, color: 'success.main' }} />
                        <Typography variant="caption" fontWeight={500}>
                          {sig.progress}% complete
                        </Typography>
                      </Box>
                    </Box>

                    {/* Progress bar */}
                    <Box sx={{ mb: 3 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={sig.progress}
                        sx={{ 
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: 'action.hover',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 3,
                            backgroundColor: 'success.main'
                          }
                        }}
                      />
                    </Box>
                  </CardContent>
                 
                </CardActionArea>

                <CardActions sx={{ px: 3, pb: 3, pt: 0 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    endIcon={<ArrowForward />}
                    href={`/sigs/${sig.id}`}
                    sx={{
                      py: 1,
                      borderRadius: 2,
                      fontWeight: 600,
                      textTransform: 'none',
                      fontSize: '0.9rem'
                    }}
                  >
                   Learn More
                  </Button>
                </CardActions>
              </Card>
            </Fade>
          ))}
        </Stack>

        {/* Navigation controls - Only show if there are multiple slides */}
        {totalSlides > 1 && (
          <Box className="carousel-controls" sx={{ 
            opacity: { xs: 1, md: 0 },
            transition: 'opacity 0.3s',
            pointerEvents: 'auto'
          }}>
            <IconButton
              onClick={prevSlide}
              disabled={currentIndex === 0}
              sx={{
                position: 'absolute',
                left: { xs: 8, md: 16 },
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'background.paper',
                boxShadow: 4,
                '&:hover': { backgroundColor: 'background.default' },
                '&.Mui-disabled': { opacity: 0.3 }
              }}
            >
              <ChevronLeft />
            </IconButton>
            
            <IconButton
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              sx={{
                position: 'absolute',
                right: { xs: 8, md: 16 },
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'background.paper',
                boxShadow: 4,
                '&:hover': { backgroundColor: 'background.default' },
                '&.Mui-disabled': { opacity: 0.3 }
              }}
            >
              <ChevronRight />
            </IconButton>
          </Box>
        )}
      </Box>

      {/* Navigation dots for mobile */}
      {isMobile && totalSlides > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 3 }}>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <Box
              key={index}
              onClick={() => scrollToIndex(index)}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: currentIndex === index ? 'primary.main' : 'action.disabled',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                '&:hover': {
                  backgroundColor: currentIndex === index ? 'primary.dark' : 'action.hover'
                }
              }}
            />
          ))}
        </Box>
      )}

      {/* Auto-scroll toggle */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Chip
          label={`Auto-scroll: ${autoScrollEnabled ? 'ON' : 'OFF'}`}
          color={autoScrollEnabled ? 'primary' : 'default'}
          variant="outlined"
          size="small"
          onClick={() => setAutoScrollEnabled(!autoScrollEnabled)}
          sx={{ cursor: 'pointer' }}
        />
      </Box>
    </Box>
  )
}