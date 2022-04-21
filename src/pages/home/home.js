import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components";
import { useAuth } from "../../context/AuthContext";
import './home.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import HistoryIcon from '@mui/icons-material/History';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import { AccountManager, BikeManager, BikeReservation, History } from "./pages";
const drawerWidth = 240;

export const Home = (props) => {
  let navigate = useNavigate();
  const { currentUser, signout, loading, role } = useAuth();
  useEffect(() => {
    if (!currentUser) {
      navigate('/signin');
    }
  }, [currentUser])
  if (loading) {
    return <Loader />
  }
  const getFeatures = () => {
    let features = [];
    switch (role) {
      case 'manager':
        features = [ {
          text: 'Bike Manager',
          route: 'bike-manager',
          icon: <TwoWheelerIcon />,
          element: <BikeManager/>
        },{
          text: 'Account Manager',
          route: 'account-manager',
          icon: <SupervisorAccountIcon />,
          element: <AccountManager/>
        }, {
          text: 'History',
          route: 'history',
          icon: <HistoryIcon />,
          element: <History/>
        }]
        break;
      default:
        features = [{
          text: 'Bike Reservation',
          route: 'bike-reservation',
          icon: <HistoryEduIcon />,
          element: <BikeReservation/>
        }]
        break;
    }
    return features;
  }
  const features = getFeatures(role);
  return (
    <Box sx={{ display: 'flex' }} className='appBarMargin'>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar >
          <Typography variant="h6" component="div" >
            Rent a Bike
          </Typography>
          <div className="flex" />
          <IconButton color="primary" aria-label="upload picture" component="span" onClick={signout}>
            <LogoutIcon className="logoutIcon" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {features.map(({ text, icon, route }) => (
              <ListItem key={text} button onClick={() => navigate(route)}>
                <ListItemIcon>
                  {icon}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path={'/'} element={<Navigate to={features[0].route} />} />
          {
            features.map(({ route, element }) => (
              <Route key={route} path={route} element={element} />
            ))
          }
        </Routes>
      </Box>
    </Box>
  )
}

