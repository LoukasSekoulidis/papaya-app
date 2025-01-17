import * as React from 'react';
import { useState, useEffect } from 'react'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import useMediaQuery from '@mui/material/useMediaQuery';

import NoteContainer from '../note/NoteContainer'
import DashboardCategories from './DashboardCategories'
import DashboardGeneral from './DashboardGeneral'
import FormCreateNoteMUI from '../note/FormCreateNoteMUI'
import FormUpdateNoteMUI from '../note/FormUpdateNoteMUI'
import UserWidget from '../user/UserWidget'

import { selectCurrentCategoryName } from '../../redux/categories/categoriesSlice'
import { selectApperance } from '../../redux/user/userSlice'
import { selectNoteAction } from '../../redux/notes/notesSlice'
import { useSelector } from 'react-redux'


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme({
  breakpoints: {
    values: {
      md: 1125,
    }
  },
  palette: {
    neutral: {
      main: '#fff',
      contrastText: '#000'
    },
    dark: {
      main: '#000'
    },
    // mode: 'dark'
  }
})


const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        neutral: {
          main: '#fff',
          contrastText: '#000'
        },
        dark: {
          main: '#000',
          contrastText: '#fff'
        },
        red: {
          main: '#e53935',
          contrastText: '#fff'
        }
        }
      : {
        neutral: {
          main: '#000',
          contrastText: '#fff'
        },
        dark: {
          main: '#fff',
          contrastText: '#000'
        },
        red: {
          main: '#e53935',
          contrastText: '#000'
        }
        }),
  },
});

function DashboardContent() {
  const [open, setOpen] = useState(true);
  const largeScreen = useMediaQuery(mdTheme.breakpoints.up('md'));
  
  const currentCategory = useSelector(selectCurrentCategoryName)
  const apperance = useSelector(selectApperance)

  const noteAction = useSelector(selectNoteAction)
  const [updated, setUpdated] = useState()


  const [currentShownWindow, setCurrentShownWindow] = useState()
  const createWindow = <FormCreateNoteMUI/>
  const updateWindow = <FormUpdateNoteMUI setUpdated={setUpdated}/>

  useEffect(() => {
    if (noteAction === 'create') {
      // console.log('create window')
      setCurrentShownWindow(createWindow)

    } else if(noteAction.includes('update')) {
      // console.log('update window')
      setCurrentShownWindow(updateWindow)

    } else {
      setCurrentShownWindow(null)
      
    }
    //eslint-disable-next-line
  }, [noteAction])

  const toggleDrawer = () => {
    setOpen(!open);
  };



  const darkModeTheme = createTheme(getDesignTokens(apperance))

  return (
    <ThemeProvider theme={darkModeTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar color='neutral' position="absolute" open={open}>
          <Toolbar 
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
            
          >
            <IconButton
              edge="start"
              // style={{ color: 'black' }}
              aria-label="open drawer"
              onClick={toggleDrawer}
              color='dark'
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color='neutral'
              noWrap
              sx={{ flexGrow: 1 }}
            >
              { currentCategory ? currentCategory : 'Home'}
              {/* Home */}
            </Typography>
            <UserWidget />
          </Toolbar>
        </AppBar>
        {/* Left sidebar  */}
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer} color='dark' >
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <DashboardGeneral />
            <Divider sx={{ my: 1 }} />
            <DashboardCategories />

          </List>
        </Drawer>
        {/* main content */}
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />

          <Container 
            maxWidth="false" 
            sx={{ mt: 4, mb: 4 }}
          >
            <Grid container spacing={3} direction={largeScreen?"row":"column-reverse"}>
              <Grid item xs={12} md={6} lg={6}>
                <NoteContainer updated={updated} setCurrentShownWindow={setCurrentShownWindow} setUpdated={setUpdated}/>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                {currentShownWindow}
              </Grid>
              
              
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
