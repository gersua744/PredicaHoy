import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Box, 
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';
import FeedIcon from '@mui/icons-material/Feed';
import ThemeToggle from './ThemeToggle';
import DonationButton from './DonationButton';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Inicio', icon: <HomeIcon />, href: '/' },
    { text: 'Acerca de', icon: <InfoIcon />, href: '#about' },
    { text: 'Recursos', icon: <FeedIcon />, href: '#resources' },
    { text: 'Ayuda', icon: <HelpIcon />, href: '#help' },
  ];

  return (
    <AppBar position="static" color="primary" elevation={3}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          PredicaHoy
        </Typography>

        {isMobile ? (
          <>
            <ThemeToggle />
            <DonationButton />
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <List>
                  {menuItems.map((item) => (
                    <ListItem button key={item.text} component="a" href={item.href}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {menuItems.map((item) => (
                <Button 
                  key={item.text} 
                  color="inherit" 
                  href={item.href} 
                  sx={{ mx: 1 }}
                >
                  {item.text}
                </Button>
              ))}
              <DonationButton />
              <ThemeToggle />
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
