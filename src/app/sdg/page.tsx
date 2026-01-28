// app/sdgs/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Fade,
  Paper,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Tooltip,
  IconButton,
  Chip,
  alpha,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { Variants } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowForward,
  Favorite,
  Share,
  FavoriteBorder,
} from '@mui/icons-material';
import { sdgData } from '@/data/sdgData';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Import the types
import type { SDG } from '@/types/sdg';

// Create a theme with custom transitions
const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32',
      light: '#4CAF50',
      dark: '#1B5E20',
    },
    secondary: {
      main: '#1565C0',
      light: '#42A5F5',
      dark: '#0D47A1',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.5px',
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 16,
  },
});

// SDG Logo Props Interface
interface SdgLogoProps {
  id: number;
  color: string;
  size?: number;
}

const SdgLogo = ({ id, color, size = 60 }: SdgLogoProps) => (
  <Box
    sx={{
      width: size,
      height: size,
      borderRadius: '50%',
      backgroundColor: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: `0 4px 20px ${alpha(color, 0.3)}`,
      border: `3px solid ${color}`,
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.1) rotate(5deg)',
        boxShadow: `0 8px 30px ${alpha(color, 0.5)}`,
      },
    }}
  >
    <Typography
      variant="h5"
      sx={{
        fontWeight: 900,
        fontSize: size * 0.5,
        color: color,
        textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
      }}
    >
      {id}
    </Typography>
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(135deg, ${alpha(color, 0.1)} 0%, transparent 100%)`,
      }}
    />
  </Box>
);

// Floating particles background component - CLIENT-SIDE ONLY
const FloatingParticles = () => {
  const [particles, setParticles] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Generate particles only on client side
    const generatedParticles = [...Array(15)].map((_, i) => ({
      id: i,
      width: Math.random() * 10 + 2,
      height: Math.random() * 10 + 2,
      top: Math.random() * 100,
      left: Math.random() * 100,
      opacity: Math.random() * 0.1 + 0.05,
      yAmplitude: Math.random() * 30,
      xAmplitude: Math.random() * 20 - 10,
      opacityRange: [0.5, 1, 0.5],
      duration: Math.random() * 5 + 3,
    }));
    setParticles(generatedParticles);
  }, []);

  // Don't render anything on server side
  if (!isClient || particles.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          style={{
            position: 'absolute',
            width: particle.width,
            height: particle.height,
            borderRadius: '50%',
            backgroundColor: alpha('#fff', particle.opacity),
            top: `${particle.top}%`,
            left: `${particle.left}%`,
          }}
          animate={{
            y: [0, -particle.yAmplitude, 0],
            x: [0, particle.xAmplitude, 0],
            opacity: particle.opacityRange,
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </Box>
  );
};

// SDG Card Props Interface
interface SdgCardProps {
  sdg: SDG;
  index: number;
  isHovered: boolean;
  onHover: (id: number | null) => void;
}

// Animated SDG Card Component
const SdgCard = ({ sdg, index, isHovered, onHover }: SdgCardProps) => {
  const router = useRouter();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.5, 
        delay: index * 0.1, 
        ease: [0.42, 0, 0.58, 1] as any
      } 
    },
    hover: { 
      y: -10, 
      scale: 1.02, 
      transition: { 
        duration: 0.3,
        ease: "easeOut" 
      } 
    },
  };

  return (
    <Grid size={{xs:12, sm:6, md:4, lg:3}}  key={sdg.id}>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        whileHover="hover"
        variants={cardVariants}
        onMouseEnter={() => onHover(sdg.id)}
        onMouseLeave={() => onHover(null)}
      >
        <Card
          sx={{
            height: 280,
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            background: `linear-gradient(135deg, ${sdg.color} 0%, ${alpha(sdg.color, 0.8)} 100%)`,
            color: 'white',
            borderRadius: 3,
            boxShadow: `0 8px 32px ${alpha(sdg.color, 0.3)}`,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(45deg, transparent 30%, ${alpha('#fff', 0.1)} 100%)`,
              opacity: 0,
              transition: 'opacity 0.3s ease',
            },
            '&:hover::before': {
              opacity: 1,
            },
            '&:hover': {
              boxShadow: `0 16px 48px ${alpha(sdg.color, 0.5)}`,
            },
          }}
          onClick={() => router.push(`/sigs/${sdg.id}`)}
        >
          <FloatingParticles />
          
          <CardContent sx={{ 
            height: '100%', 
            p: 3, 
            display: 'flex', 
            flexDirection: 'column',
            position: 'relative',
            zIndex: 1,
          }}>
            {/* Logo and Header */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              mb: 2,
            }}>
              <SdgLogo id={sdg.id} color={sdg.color} />
              
              <Tooltip title={`SDG ${sdg.id}`}>
                <Chip
                  label={`Goal ${sdg.id}`}
                  size="small"
                  sx={{
                    backgroundColor: alpha('#fff', 0.2),
                    color: 'white',
                    fontWeight: 600,
                    backdropFilter: 'blur(10px)',
                  }}
                />
              </Tooltip>
            </Box>

            {/* Title */}
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 800,
                fontSize: '1.2rem',
                lineHeight: 1.3,
                mb: 1.5,
                flexGrow: 1,
                textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
              }}
            >
              {sdg.displayTitle}
            </Typography>

            {/* Description Preview */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: isHovered ? 1 : 0.8,
                height: isHovered ? 'auto' : 20,
              }}
              transition={{ duration: 0.3 }}
            >
              <Typography 
                variant="caption" 
                sx={{ 
                  opacity: 0.9,
                  fontSize: '0.75rem',
                  lineHeight: 1.4,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {sdg.summary}
              </Typography>
            </motion.div>

            {/* Hover Overlay */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: alpha('#000', 0.85),
                    padding: 24,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 12,
                  }}
                >
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      fontWeight: 'bold', 
                      mb: 1.5,
                      textAlign: 'center',
                      fontSize: '1.1rem',
                    }}
                  >
                    {sdg.actualTitle}
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontSize: '0.85rem',
                      textAlign: 'center',
                      mb: 2,
                      lineHeight: 1.5,
                    }}
                  >
                    {sdg.summary}
                  </Typography>
                  
                  <CardActions sx={{ p: 0 }}>
                    <Button
                      component={Link}
                      href={`/sigs/${sdg.id}`}
                      variant="contained"
                      size="small"
                      onClick={(e) => e.stopPropagation()}
                      endIcon={<ArrowForward />}
                      sx={{
                        backgroundColor: 'white',
                        color: sdg.color,
                        fontWeight: 600,
                        textTransform: 'none',
                        px: 2,
                        '&:hover': {
                          backgroundColor: alpha('#fff', 0.9),
                          transform: 'translateX(4px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Explore Goal
                    </Button>
                  </CardActions>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress Indicator (Optional) */}
            <Box sx={{ 
              position: 'absolute', 
              bottom: 16, 
              right: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              opacity: 0.7,
            }}>
              {[...Array(3)].map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    backgroundColor: alpha('#fff', i === 0 ? 1 : 0.3),
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Grid>
  );
};

// Header with animated text
const AnimatedHeader = () => {
  const [textIndex, setTextIndex] = useState(0);
  const texts = [
    "Sustainable Development Goals",
    "Global Agenda 2030",
    "Building a Better Future",
    "Transforming Our World"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={textIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          style={{ position: 'absolute', left: 0, right: 0 }}
        >
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              fontWeight: 800,
              color: 'primary.main',
              mb: 2,
              textAlign: 'center',
            }}
          >
            {texts[textIndex]}
          </Typography>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

// Main Component
const SDGsPage = () => {
  const [hoveredSdg, setHoveredSdg] = useState<number | null>(null);
  const [favoriteSdgs, setFavoriteSdgs] = useState<number[]>([]);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleFavorite = (sdgId: number) => {
    setFavoriteSdgs(prev => 
      prev.includes(sdgId) 
        ? prev.filter(id => id !== sdgId)
        : [...prev, sdgId]
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
        {/* Animated Header */}
        <Box sx={{ mb: 8, textAlign: 'center', minHeight: 100 }}>
          <AnimatedHeader />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'text.secondary',
                maxWidth: 800,
                mx: 'auto',
                mb: 4,
                fontSize: { xs: '1rem', md: '1.1rem' },
              }}
            >
              The 17 Sustainable Development Goals (SDGs) are an urgent call for action 
              by all countries in a global partnership to end poverty, protect the planet, 
              and ensure prosperity for all.
            </Typography>
          </motion.div>

          {/* Interactive Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 4,
              mb: 6,
              flexWrap: 'wrap',
            }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ color: 'primary.main', fontWeight: 700 }}>
                  17
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Global Goals
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ color: 'secondary.main', fontWeight: 700 }}>
                  169
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Targets
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ color: 'success.main', fontWeight: 700 }}>
                  2030
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Target Year
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </Box>

        {/* SDGs Grid with Animation */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            {sdgData.map((sdg: SDG, index: number) => (
              <SdgCard
                key={sdg.id}
                sdg={sdg}
                index={index}
                isHovered={hoveredSdg === sdg.id}
                onHover={setHoveredSdg}
              />
            ))}
          </Grid>
        </motion.div>

        {/* Floating Action Buttons */}
        <Box sx={{ 
          position: 'fixed', 
          bottom: 32, 
          right: 32,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          zIndex: 1000,
        }}>
          <Tooltip title="View Favorites" arrow>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconButton
                onClick={() => console.log('Show favorites:', favoriteSdgs)}
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'white',
                  boxShadow: 4,
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                }}
              >
                {favoriteSdgs.length > 0 ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </motion.div>
          </Tooltip>
          
          <Tooltip title="Share Goals" arrow>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconButton
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'UN Sustainable Development Goals',
                      text: 'Check out these 17 SDGs that aim to transform our world!',
                      url: window.location.href,
                    });
                  }
                }}
                sx={{
                  backgroundColor: 'secondary.main',
                  color: 'white',
                  boxShadow: 4,
                  '&:hover': {
                    backgroundColor: 'secondary.dark',
                  },
                }}
              >
                <Share />
              </IconButton>
            </motion.div>
          </Tooltip>
        </Box>

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <Paper
            elevation={0}
            sx={{
              mt: 8,
              p: 6,
              borderRadius: 4,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <FloatingParticles />
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                Ready to Make a Difference?
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                Join millions of people working towards achieving the Sustainable Development Goals
              </Typography>
              <Button
                component={Link}
                href="/sdg/17"
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                sx={{
                  backgroundColor: 'white',
                  color: '#667eea',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  '&:hover': {
                    backgroundColor: alpha('#fff', 0.9),
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Start Your Journey
              </Button>
            </Box>
          </Paper>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <Box sx={{ 
            mt: 6, 
            textAlign: 'center', 
            color: 'text.secondary',
            pt: 4,
            borderTop: `1px solid ${alpha('#000', 0.1)}`,
          }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Hover over any SDG card to see a brief summary. Click "Explore Goal" for detailed information.
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', opacity: 0.7 }}>
              Data based on United Nations Sustainable Development Goals | 2030 Agenda
            </Typography>
          </Box>
        </motion.div>
      </Container>

      {/* Background decorative elements */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(76, 175, 80, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 80% 20%, rgba(21, 101, 192, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />
    </ThemeProvider>
  );
};

export default SDGsPage;