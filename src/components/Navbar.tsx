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
} from '@mui/material'
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  Logout,
  Settings,
  Dashboard,
} from '@mui/icons-material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import Google from 'next-auth/providers/google'

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const router = useRouter()
  const { data: session, status } = useSession()

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
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
   // await signOut({ redirect: false })
    //router.push('/')
    //handleMenuClose()
  }

  const handleSignIn = () => {
    signIn('google')
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
          minWidth: 200,
          borderRadius: 2,
          boxShadow: 3,
        }
      }}
    >
      <Box sx={{ px: 2, py: 1.5 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          {session?.user?.name || 'User'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {session?.user?.email}
        </Typography>
      </Box>
      <Divider />
      <MenuItem component={Link} href="/profile" onClick={handleMenuClose}>
        <ListItemIcon>
          <AccountCircle fontSize="small" />
        </ListItemIcon>
        <ListItemText>Profile</ListItemText>
      </MenuItem>
      <MenuItem component={Link} href="/dashboard" onClick={handleMenuClose}>
        <ListItemIcon>
          <Dashboard fontSize="small" />
        </ListItemIcon>
        <ListItemText>Dashboard</ListItemText>
      </MenuItem>
      <MenuItem component={Link} href="/settings" onClick={handleMenuClose}>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        <ListItemText>Settings</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleSignOut}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        <ListItemText>Sign Out</ListItemText>
      </MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  // Build menu items array based on auth status
const mobileMenuItems = [];
if (status === 'authenticated') {
  mobileMenuItems.push(
    <MenuItem key="profile" onClick={handleProfileMenuOpen}>
      <IconButton size="large" aria-label="account of current user" color="inherit">
        <Avatar sx={{ width: 32, height: 32 }}>
          {session?.user?.name?.charAt(0) || 'U'}
        </Avatar>
      </IconButton>
      <p>Profile</p>
    </MenuItem>
  );
  mobileMenuItems.push(
    <MenuItem key="notifications">
      <IconButton size="large" aria-label="show notifications" color="inherit">
        <Badge badgeContent={4} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <p>Notifications</p>
    </MenuItem>
  );
} else {
  mobileMenuItems.push(
    <MenuItem key="signin" onClick={handleSignIn}>
      <IconButton size="large" aria-label="sign in" color="inherit">
        <AccountCircle />
      </IconButton>
      <p>Sign In</p>
    </MenuItem>
  );
}

// Then use it in your Menu
const renderMobileMenu = (
  <Menu
    anchorEl={mobileMoreAnchorEl}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    id={mobileMenuId}
    keepMounted
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={isMobileMenuOpen}
    onClose={handleMobileMenuClose}
  >
    {mobileMenuItems}
  </Menu>
);

  // Show a loading state or nothing while checking auth status
  if (status === 'loading') {
    return (
      <AppBar position="sticky" sx={{ bgcolor: 'background.paper' }}>
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
          bgcolor: 'background.paper',
          boxShadow: 1,
          borderBottom: 1,
          borderColor: 'divider'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 1 }}>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    mr: 2,
                    fontWeight: 700,
                    color: 'primary.main',
                    letterSpacing: '.1rem',
                    textDecoration: 'none',
                  }}
                >
                  UN SDGs
                </Typography>
              </Link>
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
              <Button component={Link} href="/" color="inherit" sx={{ color: 'text.primary' }}>
                Home
              </Button>
              <Button component={Link} href="/sdg" color="inherit" sx={{ color: 'text.primary' }}>
                SIGs
              </Button>
              <Button component={Link} href="/about" color="inherit" sx={{ color: 'text.primary' }}>
                About
              </Button>
              
              {status === 'authenticated' ? (
                <>
                  <IconButton
                    size="large"
                    aria-label="show notifications"
                    color="inherit"
                    sx={{ color: 'text.primary' }}
                  >
                    <Badge badgeContent={4} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    sx={{ color: 'text.primary' }}
                  >
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                      {session?.user?.name?.charAt(0) || 'U'}
                    </Avatar>
                  </IconButton>
                </>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleSignIn}
                  sx={{ ml: 2 }}
                >
                  Sign In
                </Button>
              )}
            </Box>

            {/* Mobile menu button */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={(event) => setMobileMoreAnchorEl(event.currentTarget)}
                color="inherit"
                sx={{ color: 'text.primary' }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </>
  )
}