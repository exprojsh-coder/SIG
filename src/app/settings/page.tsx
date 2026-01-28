'use client'

import { useState } from 'react'
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Avatar,
  Stack,
  Chip,
  Alert,
  IconButton,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  ListItemButton
} from '@mui/material'
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Language as LanguageIcon,
  Palette as PaletteIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Lock as LockIcon,
  Devices as DevicesIcon,
  Timeline as TimelineIcon
} from '@mui/icons-material'
import { useRouter } from 'next/navigation'

interface UserProfile {
  name: string
  email: string
  phone: string
  location: string
  bio: string
  expertise: string[]
}

interface NotificationSettings {
  emailNotifications: boolean
  pushNotifications: boolean
  applicationUpdates: boolean
  deadlineReminders: boolean
  newsletter: boolean
}

interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'connections'
  showActivity: boolean
  showAchievements: boolean
  dataSharing: boolean
}

export default function SettingsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    bio: 'Passionate about climate action and digital inclusion. Looking to make meaningful contributions to sustainable development.',
    expertise: ['Environmental Science', 'Project Management', 'Data Analysis']
  })

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    applicationUpdates: true,
    deadlineReminders: true,
    newsletter: false
  })

  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    profileVisibility: 'connections',
    showActivity: true,
    showAchievements: true,
    dataSharing: false
  })

  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  })

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <PersonIcon /> },
    { id: 'notifications', label: 'Notifications', icon: <NotificationsIcon /> },
    { id: 'privacy', label: 'Privacy', icon: <SecurityIcon /> },
    { id: 'security', label: 'Security', icon: <LockIcon /> },
    { id: 'preferences', label: 'Preferences', icon: <PaletteIcon /> },
    { id: 'data', label: 'Data & Export', icon: <DownloadIcon /> }
  ]

  const handleSaveProfile = () => {
    setIsEditing(false)
    // API call would go here
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    // Reset to original data
  }

  const handleNotificationChange = (key: keyof NotificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handlePrivacyChange = (key: keyof PrivacySettings, value: any) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handlePasswordChange = () => {
    // API call for password change
    setPassword({ current: '', new: '', confirm: '' })
  }

  const handleExportData = () => {
    // Trigger data export
    alert('Data export initiated. You will receive an email when it\'s ready.')
  }

  const handleDeleteAccount = () => {
    // API call to delete account
    setShowDeleteDialog(false)
    router.push('/')
  }

  const addExpertise = (expertise: string) => {
    if (expertise && !userProfile.expertise.includes(expertise)) {
      setUserProfile(prev => ({
        ...prev,
        expertise: [...prev.expertise, expertise]
      }))
    }
  }

  const removeExpertise = (index: number) => {
    setUserProfile(prev => ({
      ...prev,
      expertise: prev.expertise.filter((_, i) => i !== index)
    }))
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Settings
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Manage your account settings and preferences
      </Typography>

      <Grid container spacing={3}>
        {/* Left Navigation */}
        <Grid size={{xs:12, md:3}}>
          <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
            <List disablePadding>
              {tabs.map((tab) => (
                <ListItem
  key={tab.id}
  disablePadding
  sx={{
    borderLeft: activeTab === tab.id
      ? '4px solid'
      : '4px solid transparent',
    borderColor: 'primary.main',
  }}
>
  <ListItemButton
    selected={activeTab === tab.id}
    onClick={() => setActiveTab(tab.id)}
    sx={{
      '&.Mui-selected': {
        bgcolor: 'action.selected',
        '&:hover': {
          bgcolor: 'action.selected',
        },
      },
    }}
  >
    <ListItemIcon sx={{ minWidth: 40 }}>
      {tab.icon}
    </ListItemIcon>
    <ListItemText primary={tab.label} />
  </ListItemButton>
</ListItem>

              ))}
            </List>
          </Paper>
        </Grid>

        {/* Main Content */}
        <Grid size={{xs:12, md:9}}>
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <Paper sx={{ p: 4, borderRadius: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h5" fontWeight={600}>
                  Profile Information
                </Typography>
                {!isEditing ? (
                  <Button 
                    startIcon={<EditIcon />} 
                    onClick={() => setIsEditing(true)}
                    variant="outlined"
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Stack direction="row" spacing={1}>
                    <Button 
                      startIcon={<SaveIcon />} 
                      onClick={handleSaveProfile}
                      variant="contained"
                    >
                      Save Changes
                    </Button>
                    <Button 
                      startIcon={<CancelIcon />} 
                      onClick={handleCancelEdit}
                      variant="outlined"
                    >
                      Cancel
                    </Button>
                  </Stack>
                )}
              </Box>

              <Grid container spacing={3}>
                <Grid size={{xs:12, md:4}}>
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Avatar
                      sx={{ 
                        width: 120, 
                        height: 120, 
                        mb: 2,
                        mx: 'auto',
                        fontSize: '2.5rem'
                      }}
                    >
                      JD
                    </Avatar>
                    <Button variant="outlined" size="small">
                      Change Photo
                    </Button>
                  </Box>
                </Grid>
                <Grid size={{xs:12, md:8}}>
                  <Grid container spacing={3}>
                    <Grid size={{xs:12, sm:6}}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        value={userProfile.name}
                        onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                        disabled={!isEditing}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon />
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                    <Grid size={{xs:12, sm:6}}>
                      <TextField
                        fullWidth
                        label="Email"
                        value={userProfile.email}
                        onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                        disabled={!isEditing}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon />
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                    <Grid size={{xs:12, sm:6}}>
                      <TextField
                        fullWidth
                        label="Phone"
                        value={userProfile.phone}
                        onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                        disabled={!isEditing}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneIcon />
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                    <Grid size={{xs:12, sm:6}}>
                      <TextField
                        fullWidth
                        label="Location"
                        value={userProfile.location}
                        onChange={(e) => setUserProfile({...userProfile, location: e.target.value})}
                        disabled={!isEditing}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationIcon />
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                    <Grid size={{xs:12}}>
                      <TextField
                        fullWidth
                        label="Bio"
                        value={userProfile.bio}
                        onChange={(e) => setUserProfile({...userProfile, bio: e.target.value})}
                        disabled={!isEditing}
                        multiline
                        rows={4}
                      />
                    </Grid>
                    <Grid size={{xs:12}}>
                      <Typography variant="subtitle2" gutterBottom>
                        Areas of Expertise
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {userProfile.expertise.map((exp, index) => (
                          <Chip 
                            key={index}
                            label={exp}
                            onDelete={isEditing ? () => removeExpertise(index) : undefined}
                            color="primary"
                            variant="outlined"
                          />
                        ))}
                        {isEditing && (
                          <Chip 
                            label="+ Add"
                            onClick={() => {
                              const newExp = prompt('Enter new expertise area:')
                              if (newExp) addExpertise(newExp)
                            }}
                            variant="outlined"
                          />
                        )}
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <Paper sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                Notification Settings
              </Typography>
              <Typography color="text.secondary" paragraph>
                Control how and when you receive notifications
              </Typography>

              <List>
                {Object.entries(notificationSettings).map(([key, value]) => (
                  <ListItem key={key}>
                    <ListItemText 
                      primary={key.split(/(?=[A-Z])/).join(' ').replace(/^\w/, c => c.toUpperCase())}
                      secondary="Receive updates about your applications and new opportunities"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={value}
                        onChange={() => handleNotificationChange(key as keyof NotificationSettings)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 3 }} />

              <Alert severity="info">
                You can also manage notification preferences for individual SIGs from your dashboard.
              </Alert>
            </Paper>
          )}

          {/* Privacy Tab */}
          {activeTab === 'privacy' && (
            <Paper sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                Privacy Settings
              </Typography>
              <Typography color="text.secondary" paragraph>
                Control who can see your information and activity
              </Typography>

              <Grid container spacing={3}>
                <Grid size={{xs:12}}>
                  <FormControl fullWidth>
                    <InputLabel>Profile Visibility</InputLabel>
                    <Select
                      value={privacySettings.profileVisibility}
                      label="Profile Visibility"
                      onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                    >
                      <MenuItem value="public">Public (Everyone)</MenuItem>
                      <MenuItem value="connections">Connections Only</MenuItem>
                      <MenuItem value="private">Private (Only Me)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={{xs:12}}>
                  <List>
                    <ListItem>
                      <ListItemText 
                        primary="Show Activity Status"
                        secondary="Let others see when you're active"
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          edge="end"
                          checked={privacySettings.showActivity}
                          onChange={() => handlePrivacyChange('showActivity', !privacySettings.showActivity)}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Show Achievements"
                        secondary="Display your badges and accomplishments"
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          edge="end"
                          checked={privacySettings.showAchievements}
                          onChange={() => handlePrivacyChange('showAchievements', !privacySettings.showAchievements)}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Data Sharing for Research"
                        secondary="Allow anonymous data to improve the platform"
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          edge="end"
                          checked={privacySettings.dataSharing}
                          onChange={() => handlePrivacyChange('dataSharing', !privacySettings.dataSharing)}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </Grid>

                <Grid size={{xs:12}}>
                  <Alert severity="warning">
                    Changing these settings may affect how others can find and connect with you on the platform.
                  </Alert>
                </Grid>
              </Grid>
            </Paper>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <Paper sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                Security Settings
              </Typography>
              <Typography color="text.secondary" paragraph>
                Manage your account security and authentication
              </Typography>

              <Grid container spacing={3}>
                <Grid size={{xs:12}}>
                  <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                    Change Password
                  </Typography>
                  <Stack spacing={2}>
                    <TextField
                      fullWidth
                      type={showPassword ? 'text' : 'password'}
                      label="Current Password"
                      value={password.current}
                      onChange={(e) => setPassword({...password, current: e.target.value})}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)}>
                              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                    <TextField
                      fullWidth
                      type="password"
                      label="New Password"
                      value={password.new}
                      onChange={(e) => setPassword({...password, new: e.target.value})}
                    />
                    <TextField
                      fullWidth
                      type="password"
                      label="Confirm New Password"
                      value={password.confirm}
                      onChange={(e) => setPassword({...password, confirm: e.target.value})}
                    />
                    <Box>
                      <Button 
                        variant="contained" 
                        onClick={handlePasswordChange}
                        disabled={!password.current || !password.new || password.new !== password.confirm}
                      >
                        Update Password
                      </Button>
                    </Box>
                  </Stack>
                </Grid>

                <Grid size={{xs:12}}>
                  <Divider />
                </Grid>

                <Grid size={{xs:12}}>
                  <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                    Two-Factor Authentication
                  </Typography>
                  <Alert severity="info" sx={{ mb: 2 }}>
                    Add an extra layer of security to your account
                  </Alert>
                  <Button variant="outlined">
                    Enable 2FA
                  </Button>
                </Grid>

                <Grid size={{xs:12}}>
                  <Divider />
                </Grid>

                <Grid size={{xs:12}}>
                  <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                    Active Sessions
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <DevicesIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Current Device"
                        secondary="Chrome on macOS • New York, NY"
                      />
                      <ListItemSecondaryAction>
                        <Chip label="Active" color="success" size="small" />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <DevicesIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Mobile App"
                        secondary="iOS 17 • iPhone 15 Pro"
                      />
                      <ListItemSecondaryAction>
                        <Button size="small">Revoke</Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Paper>
          )}

          {/* Data & Export Tab */}
          {activeTab === 'data' && (
            <Paper sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                Data Management
              </Typography>

              <Grid container spacing={3}>
                <Grid size={{xs:12}}>
                  <Alert severity="info" sx={{ mb: 3 }}>
                    You have the right to access, export, and delete your personal data.
                  </Alert>
                </Grid>

                <Grid size={{xs:12, md:6}}>
                  <Paper sx={{ p: 3, borderRadius: 2, bgcolor: 'primary.light' }}>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Export Your Data
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Download a copy of all your data including profile information, applications, and activity history.
                    </Typography>
                    <Button 
                      variant="contained" 
                      startIcon={<DownloadIcon />}
                      onClick={handleExportData}
                    >
                      Request Data Export
                    </Button>
                  </Paper>
                </Grid>

                <Grid size={{xs:12, md:6}}>
                  <Paper sx={{ p: 3, borderRadius: 2, bgcolor: 'error.light' }}>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Delete Account
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </Typography>
                    <Button 
                      variant="contained" 
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => setShowDeleteDialog(true)}
                    >
                      Delete Account
                    </Button>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          )}
        </Grid>
      </Grid>

      {/* Delete Account Dialog */}
      <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
        <DialogTitle>
          <WarningIcon color="error" sx={{ mr: 1, verticalAlign: 'middle' }} />
          Delete Account
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account? This action will:
          </DialogContentText>
          <List dense>
            <ListItem>
              <ListItemIcon><CancelIcon color="error" /></ListItemIcon>
              <ListItemText primary="Permanently delete all your data" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CancelIcon color="error" /></ListItemIcon>
              <ListItemText primary="Cancel all active applications" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CancelIcon color="error" /></ListItemIcon>
              <ListItemText primary="Remove you from all SIGs" />
            </ListItem>
          </List>
          <DialogContentText sx={{ mt: 2 }}>
            This action cannot be undone. Please type "DELETE" to confirm.
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            label="Type DELETE to confirm"
            margin="dense"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteAccount} color="error" variant="contained">
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}