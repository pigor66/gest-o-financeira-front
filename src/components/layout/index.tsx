import React, { useState, ReactNode } from 'react';
import { useRouter } from 'next/router';
import {
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Box,
  CssBaseline,
  Drawer as MuiDrawer,
  Typography,
  Divider,
  Switch,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  BottomNavigation,
  BottomNavigationAction,
  useMediaQuery
} from '@mui/material';
import {
  Home as HomeIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
  CompareArrows as CompareArrowsIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { styled, useTheme, Theme } from '@mui/material/styles';
import { closedMixin, DrawerHeader, openedMixin } from './style';

const drawerWidth = 240;

interface DashboardLayoutProps {
  children: ReactNode;
  darkMode: boolean;
  handleThemeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// AppBar styled component
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// Bottom navigation styled for mobile view
const BottomNav = styled(BottomNavigation)(({ theme }) => ({
  display: 'none',
  position: 'fixed',
  bottom: 0,
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down('md')]: {
    display: 'flex',
  },
}));

// Drawer styled to hide on mobile
const DrawerStyled = styled(MuiDrawer)(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'block',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  },
}));

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, darkMode, handleThemeChange }) => {
  const theme = useTheme();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const jwt = false;

  const getTitle = () => {
    switch (router.pathname) {
      case '/dashboard':
        return 'Home';
      case '/dashboard/nova-transacao':
        return 'Nova transação';
      case '/dashboard/transacoes':
        return 'Transações';
      default:
        return 'Dashboard';
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} color="inherit" sx={{ width: open ? `calc(100% - ${drawerWidth}px)` : '100%' }}>
        <Toolbar>
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={'100%'} px={2}>
            {!isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ width: '0', ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}px={2}>
              <Typography variant="h6" noWrap  >
                {getTitle()}
              </Typography>
              <Switch checked={darkMode} onChange={handleThemeChange} />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>


      {!jwt && <DrawerStyled variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            { text: 'Home', icon: <HomeIcon />, route: '/' },
            { text: 'Nova Transação', icon: <AccountBalanceWalletIcon />, route: '/dashboard/nova-transacao' },
            { text: 'Transações', icon: <CompareArrowsIcon />, route: '/dashboard/transacoes' },
          ].map(({ text, icon, route }) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => router.push(route)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DrawerStyled>}


      <BottomNav>
        <BottomNavigationAction label="Home" icon={<HomeIcon />} onClick={() => router.push('/')} />
        <BottomNavigationAction label="Nova Transação" icon={<AccountBalanceWalletIcon />} onClick={() => router.push('/dashboard/nova-transacao')} />
        <BottomNavigationAction label="Transações" icon={<CompareArrowsIcon />} onClick={() => router.push('/dashboard/transacoes')} />
      </BottomNav>


      <Box component="main" sx={{ marginTop: '4rem', width: '100%', padding: '3rem' }}>
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
