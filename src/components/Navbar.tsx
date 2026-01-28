'use client'

import * as React from 'react'
import { signIn } from 'next-auth/react'
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Badge,
  alpha,
  Paper,
  InputBase,
  Stack,
  Chip,
} from '@mui/material'
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  Logout,
  Settings,
  Dashboard,
  Search,
  Home,
  Info,
  VolunteerActivism,
  TrendingUp,
  Insights,
  KeyboardArrowDown,
  Person,
  AdminPanelSettings,
  Assignment,
  EmojiEvents,
} from '@mui/icons-material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null)
  const [notificationsAnchorEl, setNotificationsAnchorEl] = React.useState<null | HTMLElement>(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const router = useRouter()
  const { data: session, status } = useSession()

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
  const isNotificationsOpen = Boolean(notificationsAnchorEl)

  // Mock notifications data
  const notifications = [
    { id: 1, title: 'Application Approved', message: 'Your Climate Action application was approved', time: '2h ago', read: false, type: 'success' },
    { id: 2, title: 'New SIG Available', message: 'Sustainable Cities SIG is now accepting applications', time: '1d ago', read: true, type: 'info' },
    { id: 3, title: 'Volunteer Hours Updated', message: 'You have completed 45 hours this month', time: '2d ago', read: true, type: 'success' },
    { id: 4, title: 'Certificate Ready', message: 'Your Climate Action certificate is available', time: '3d ago', read: false, type: 'warning' },
  ]

  const unreadCount = notifications.filter(n => !n.read).length

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleNotificationsOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchorEl(event.currentTarget)
  }

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
    handleMenuClose()
  }

  const handleSignIn = () => {
    signIn('google')
  }

  const handleMarkAllAsRead = () => {
    // In a real app, you would update the notifications as read
    handleNotificationsClose()
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        sx: {
          mt: 1.5,
          minWidth: 280,
          borderRadius: 3,
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
          backdropFilter: 'blur(20px)',
          backgroundColor: alpha('#ffffff', 0.92),
          border: '1px solid',
          borderColor: alpha(theme.palette.divider, 0.1),
          overflow: 'visible',
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: alpha('#ffffff', 0.92),
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
            borderTop: '1px solid',
            borderLeft: '1px solid',
            borderColor: alpha(theme.palette.divider, 0.1),
          }
        }
      }}
    >
      {/* User Info Section */}
      <Box sx={{ px: 3, py: 2.5, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar 
            src={session?.user?.image || undefined}
            sx={{ 
              width: 48, 
              height: 48,
              bgcolor: 'primary.main',
              border: '2px solid',
              borderColor: alpha(theme.palette.primary.main, 0.2),
            }}
          >
            {session?.user?.name?.charAt(0) || 'U'}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight={600} noWrap>
              {session?.user?.name || 'Welcome!'}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 180 }}>
              {session?.user?.email || 'Sign in to continue'}
            </Typography>
            {session && (
              <Chip 
                label="Volunteer" 
                size="small" 
                sx={{ mt: 0.5, height: 20, fontSize: '0.7rem' }}
                color="primary"
                variant="outlined"
              />
            )}
          </Box>
        </Stack>
      </Box>

      <Box sx={{ py: 1 }}>
        <MenuItem 
          component={Link} 
          href="/overview" 
          onClick={handleMenuClose}
          sx={{ py: 1.5, px: 3 }}
        >
          <ListItemIcon>
            <Dashboard fontSize="small" sx={{ color: 'primary.main' }} />
          </ListItemIcon>
          <ListItemText primary="Overview" />
        </MenuItem>
        <MenuItem 
          component={Link} 
          href="/profile" 
          onClick={handleMenuClose}
          sx={{ py: 1.5, px: 3 }}
        >
          <ListItemIcon>
            <Person fontSize="small" sx={{ color: 'primary.main' }} />
          </ListItemIcon>
          <ListItemText primary="My Profile" />
        </MenuItem>
        <MenuItem 
          component={Link} 
          href="/applications" 
          onClick={handleMenuClose}
          sx={{ py: 1.5, px: 3 }}
        >
          <ListItemIcon>
            <Assignment fontSize="small" sx={{ color: 'primary.main' }} />
          </ListItemIcon>
          <ListItemText primary="Applications" />
        </MenuItem>
        <MenuItem 
          component={Link} 
          href="/achievements" 
          onClick={handleMenuClose}
          sx={{ py: 1.5, px: 3 }}
        >
          <ListItemIcon>
            <EmojiEvents fontSize="small" sx={{ color: 'primary.main' }} />
          </ListItemIcon>
          <ListItemText primary="Achievements" />
        </MenuItem>
        {session?.user?.email?.includes('admin') && (
          <MenuItem 
            component={Link} 
            href="/admin" 
            onClick={handleMenuClose}
            sx={{ py: 1.5, px: 3 }}
          >
            <ListItemIcon>
              <AdminPanelSettings fontSize="small" sx={{ color: 'error.main' }} />
            </ListItemIcon>
            <ListItemText primary="Admin Panel" />
          </MenuItem>
        )}
      </Box>

      <Divider sx={{ my: 1 }} />

      <Box sx={{ py: 1 }}>
        <MenuItem 
          component={Link} 
          href="/settings" 
          onClick={handleMenuClose}
          sx={{ py: 1.5, px: 3 }}
        >
          <ListItemIcon>
            <Settings fontSize="small" sx={{ color: 'text.secondary' }} />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </MenuItem>
        {session && (
          <MenuItem 
            onClick={handleSignOut}
            sx={{ py: 1.5, px: 3 }}
          >
            <ListItemIcon>
              <Logout fontSize="small" sx={{ color: 'error.main' }} />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </MenuItem>
        )}
      </Box>
    </Menu>
  )

  const notificationsMenu = (
    <Menu
      anchorEl={notificationsAnchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isNotificationsOpen}
      onClose={handleNotificationsClose}
      PaperProps={{
        sx: {
          mt: 1.5,
          width: 360,
          maxHeight: 400,
          borderRadius: 3,
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
          backdropFilter: 'blur(20px)',
          backgroundColor: alpha('#ffffff', 0.92),
          border: '1px solid',
          borderColor: alpha(theme.palette.divider, 0.1),
          overflow: 'visible',
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: alpha('#ffffff', 0.92),
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
            borderTop: '1px solid',
            borderLeft: '1px solid',
            borderColor: alpha(theme.palette.divider, 0.1),
          }
        }
      }}
    >
      <Box sx={{ p: 2, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={600}>
            Notifications
          </Typography>
          <Button 
            size="small" 
            onClick={handleMarkAllAsRead}
            sx={{ fontSize: '0.75rem' }}
          >
            Mark all as read
          </Button>
        </Stack>
      </Box>
      
      <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
        {notifications.map((notification) => (
          <MenuItem 
            key={notification.id}
            sx={{ 
              py: 2, 
              px: 2, 
              borderBottom: `1px solid ${alpha(theme.palette.divider, 0.05)}`,
              bgcolor: notification.read ? 'transparent' : alpha(theme.palette.primary.main, 0.04),
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.08),
              }
            }}
          >
            <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ width: '100%' }}>
              <Avatar sx={{ 
                width: 32, 
                height: 32, 
                bgcolor: notification.type === 'success' ? 'success.main' : 
                        notification.type === 'warning' ? 'warning.main' : 'info.main',
                fontSize: '0.875rem'
              }}>
                {notification.type === 'success' ? '✓' : '!'}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  {notification.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {notification.message}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                  {notification.time}
                </Typography>
              </Box>
              {!notification.read && (
                <Box sx={{ 
                  width: 8, 
                  height: 8, 
                  borderRadius: '50%', 
                  bgcolor: 'primary.main',
                  mt: 1
                }} />
              )}
            </Stack>
          </MenuItem>
        ))}
      </Box>
      
      <Box sx={{ p: 2, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
        <Button 
          fullWidth 
          component={Link} 
          href="/notifications"
          onClick={handleNotificationsClose}
        >
          View All Notifications
        </Button>
      </Box>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      PaperProps={{
        sx: {
          mt: 1.5,
          width: 280,
          borderRadius: 3,
          backdropFilter: 'blur(20px)',
          backgroundColor: alpha('#ffffff', 0.95),
          border: '1px solid',
          borderColor: alpha(theme.palette.divider, 0.1),
        }
      }}
    >
      {status === 'authenticated' ? (
        <Box>
          <Box sx={{ p: 2, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar 
                src={session?.user?.image || undefined}
                sx={{ width: 40, height: 40 }}
              />
              <Box>
                <Typography variant="subtitle2" fontWeight={600}>
                  {session?.user?.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {session?.user?.email}
                </Typography>
              </Box>
            </Stack>
          </Box>
          
          <MenuItem component={Link} href="/overview" onClick={handleMobileMenuClose}>
            <ListItemIcon>
              <Dashboard fontSize="small" />
            </ListItemIcon>
            <ListItemText>Overview</ListItemText>
          </MenuItem>
          <MenuItem component={Link} href="/profile" onClick={handleMobileMenuClose}>
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
          <MenuItem component={Link} href="/applications" onClick={handleMobileMenuClose}>
            <ListItemIcon>
              <Assignment fontSize="small" />
            </ListItemIcon>
            <ListItemText>Applications</ListItemText>
          </MenuItem>
          
          <Divider />
          
          <MenuItem component={Link} href="/" onClick={handleMobileMenuClose}>
            <ListItemIcon>
              <Home fontSize="small" />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </MenuItem>
          <MenuItem component={Link} href="/sdg" onClick={handleMobileMenuClose}>
            <ListItemIcon>
              <VolunteerActivism fontSize="small" />
            </ListItemIcon>
            <ListItemText>SIGs</ListItemText>
          </MenuItem>
          <MenuItem component={Link} href="/about" onClick={handleMobileMenuClose}>
            <ListItemIcon>
              <Info fontSize="small" />
            </ListItemIcon>
            <ListItemText>About</ListItemText>
          </MenuItem>
          
          <Divider />
          
          <MenuItem onClick={handleNotificationsOpen}>
            <ListItemIcon>
              <Badge badgeContent={unreadCount} color="error">
                <NotificationsIcon fontSize="small" />
              </Badge>
            </ListItemIcon>
            <ListItemText>Notifications</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleSignOut}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            <ListItemText>Sign Out</ListItemText>
          </MenuItem>
        </Box>
      ) : (
        <Box>
          <MenuItem component={Link} href="/" onClick={handleMobileMenuClose}>
            <ListItemIcon>
              <Home fontSize="small" />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </MenuItem>
          <MenuItem component={Link} href="/sdg" onClick={handleMobileMenuClose}>
            <ListItemIcon>
              <VolunteerActivism fontSize="small" />
            </ListItemIcon>
            <ListItemText>SIGs</ListItemText>
          </MenuItem>
          <MenuItem component={Link} href="/about" onClick={handleMobileMenuClose}>
            <ListItemIcon>
              <Info fontSize="small" />
            </ListItemIcon>
            <ListItemText>About</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleSignIn} sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}>
            <ListItemIcon sx={{ color: 'white' }}>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText>Sign In with Google</ListItemText>
          </MenuItem>
        </Box>
      )}
    </Menu>
  )

  if (status === 'loading') {
    return (
      <AppBar position="sticky" sx={{ 
        bgcolor: alpha('#ffffff', 0.8),
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid',
        borderColor: alpha(theme.palette.divider, 0.1),
      }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ py: 1 }} />
        </Container>
      </AppBar>
    )
  }

  return (
    <>
      <AppBar 
        position="sticky" 
        sx={{ 
          bgcolor: alpha('#ffffff', 0.8),
          backdropFilter: 'blur(20px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          borderBottom: '1px solid',
          borderColor: alpha(theme.palette.divider, 0.1),
          transition: 'all 0.3s ease',
          '&:hover': {
            bgcolor: alpha('#ffffff', 0.9),
            boxShadow: '0 6px 30px rgba(0,0,0,0.08)',
          }
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ py: 1, justifyContent: 'space-between' }}>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: 1.5,
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                  border: '1px solid',
                  borderColor: alpha(theme.palette.primary.main, 0.2),
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.12),
                    transform: 'translateY(-1px)',
                    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.1)}`,
                  }
                }}>
                  <VolunteerActivism sx={{ 
                    color: 'primary.main',
                    fontSize: 28,
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                  }} />
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        letterSpacing: '0.5px',
                      }}
                    >
                      SDG VolunteerHub
                    </Typography>
                    <Typography variant="caption" sx={{ 
                      color: 'text.secondary',
                      fontWeight: 500,
                      letterSpacing: '0.3px'
                    }}>
                      United Nations Sustainable Goals
                    </Typography>
                  </Box>
                </Box>
              </Link>
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
              {/* Search Bar */}
              <Paper
                component="form"
                sx={{
                  p: '2px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  width: 300,
                  borderRadius: 3,
                  bgcolor: alpha(theme.palette.common.white, 0.9),
                  border: '1px solid',
                  borderColor: alpha(theme.palette.divider, 0.2),
                  backdropFilter: 'blur(10px)',
                  mr: 2,
                }}
              >
                <Search sx={{ color: 'text.secondary', mr: 1 }} />
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search SIGs, topics..."
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Paper>

              <Button 
                component={Link} 
                href="/" 
                startIcon={<Home />}
                sx={{ 
                  color: 'text.primary',
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                  }
                }}
              >
                Home
              </Button>
              <Button 
                component={Link} 
                href="/sdg" 
                startIcon={<VolunteerActivism />}
                sx={{ 
                  color: 'text.primary',
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                  }
                }}
              >
                SDGs
              </Button>
              <Button 
                component={Link} 
                href="/about" 
                startIcon={<Info />}
                sx={{ 
                  color: 'text.primary',
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                  }
                }}
              >
                About
              </Button>
              <Button 
                component={Link} 
                href="/insights" 
                startIcon={<Insights />}
                sx={{ 
                  color: 'text.primary',
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                  }
                }}
              >
                Insights
              </Button>
              
              {status === 'authenticated' ? (
                <>
                  <IconButton
                    size="large"
                    aria-label="show notifications"
                    onClick={handleNotificationsOpen}
                    sx={{ 
                      color: 'text.primary',
                      position: 'relative',
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                      }
                    }}
                  >
                    <Badge badgeContent={unreadCount} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  
                  <Button
                    onClick={handleProfileMenuOpen}
                    startIcon={
                      <Avatar 
                        src={session?.user?.image || undefined}
                        sx={{ 
                          width: 28, 
                          height: 28,
                          border: '2px solid',
                          borderColor: alpha(theme.palette.primary.main, 0.2),
                        }}
                      >
                        {session?.user?.name?.charAt(0)}
                      </Avatar>
                    }
                    endIcon={<KeyboardArrowDown />}
                    sx={{ 
                      color: 'text.primary',
                      borderRadius: 3,
                      px: 2,
                      py: 1,
                      textTransform: 'none',
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      border: '1px solid',
                      borderColor: alpha(theme.palette.primary.main, 0.2),
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        borderColor: alpha(theme.palette.primary.main, 0.3),
                      }
                    }}
                  >
                    <Box sx={{ textAlign: 'left', mr: 1 }}>
                      <Typography variant="body2" fontWeight={600} lineHeight={1}>
                        {session?.user?.name?.split(' ')[0]}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Volunteer
                      </Typography>
                    </Box>
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleSignIn}
                  startIcon={<AccountCircle />}
                  sx={{ 
                    ml: 2,
                    borderRadius: 3,
                    px: 3,
                    py: 1,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
                    '&:hover': {
                      boxShadow: `0 6px 25px ${alpha(theme.palette.primary.main, 0.3)}`,
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Sign In
                </Button>
              )}
            </Box>

            {/* Mobile menu button */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              {status === 'authenticated' && (
                <IconButton
                  size="large"
                  onClick={handleNotificationsOpen}
                  sx={{ mr: 1 }}
                >
                  <Badge badgeContent={unreadCount} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              )}
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={(event) => setMobileMoreAnchorEl(event.currentTarget)}
                sx={{ 
                  color: 'text.primary',
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                  border: '1px solid',
                  borderColor: alpha(theme.palette.divider, 0.2),
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {notificationsMenu}
    </>
  )
}