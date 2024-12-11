"use client";
import Image from "next/image";
import * as React from 'react';
import {
  Container,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
  Box,
  CssBaseline,
  Grid,
} from '@mui/material';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";


import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blue, green } from '@mui/material/colors';
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { AuthContext } from '../../context/AuthContext';

export default function Projects() {
  const fullName = 'Abdulgani Muhammedsani';
  const shortName = 'Abdul';
  const [displayedName, setDisplayedName] = React.useState(fullName);
  const [isHovered, setIsHovered] = React.useState(false);
  const { darkMode, setDarkMode } = React.useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);

  const router = useRouter();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuDrawerClick = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const goBackHome = () => {
    router.push('/');
  };


  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuDrawerClose = () => {
    setAnchorEl1(null);
  }

  const handleMenuItemClick = (path) => {
    router.push(path);
    handleMenuClose();
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };


  React.useEffect(() => {
    if (isHovered && displayedName.length > shortName.length) {
      const timeout = setTimeout(() => {
        setDisplayedName((prev) => prev.slice(0, -1));
      }, 40);

      return () => clearTimeout(timeout);
    } else if (!isHovered && displayedName.length < fullName.length) {
      const timeout = setTimeout(() => {
        setDisplayedName((prev) => fullName.slice(0, prev.length + 1));
      }, 40);

      return () => clearTimeout(timeout);
    }
  }, [isHovered, displayedName]);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: "#121212",
      },
      primary: {
        main: "#121212",
      },
      secondary: {
        main: blue[500],
      },
      text: {
        primary: "#ffffff",
      },
    },
  });

  const theme = createTheme({
    palette: {
      mode: 'light',
      background: {
        default: "#f0f0f0",
      },
      primary: {
        main: green[200],
      },
      secondary: {
        main: blue[500],
      },
      text: {
        primary: "#000000",
      },
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : theme}>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
          display: 'flex',
          flexDirection: 'column',
          minHeight: "100vh",
        }}
      >
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <Typography
              color={"text.primary"}
              style={{ fontFamily: 'monospace', cursor: 'pointer' }}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {displayedName}
            </Typography>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <IconButton color="inherit" onClick={handleMenuDrawerClick}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Stack direction='row' spacing={2} color={"text.primary"} sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button style={{ fontFamily: 'monospace' }} color="inherit" onClick={goBackHome}>About Me</Button>
              <Button
                style={{ fontFamily: "monospace" }}
                color="inherit"
                onClick={handleMenuClick}
              >
                Work
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                sx={{
                  '& .MuiPaper-root': {
                    backgroundColor: 'primary.main',
                  },
                }}
              >
                <MenuItem sx={{ fontFamily: 'monospace' }} onClick={() => handleMenuItemClick("/projects")}>
                  Projects
                </MenuItem>
                <MenuItem sx={{ fontFamily: 'monospace' }} onClick={() => handleMenuItemClick("/experience")}>
                  Experiences
                </MenuItem>
              </Menu>
              <Button style={{ fontFamily: 'monospace' }} color="inherit" onClick={() => handleMenuItemClick("/education")}>Education</Button>
              <IconButton color="inherit" onClick={toggleDarkMode}>
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Stack>
          </Toolbar>
        </AppBar>

        {/* Drawer for mobile */}
        <Menu
          anchorEl={anchorEl1}
          open={Boolean(anchorEl1)}
          onClose={handleMenuDrawerClose}
          sx={{
            '& .MuiPaper-root': {
              backgroundColor: 'primary.main',
            },
          }}
        >
          <MenuItem button onClick={() => handleMenuItemClick("/")}>
            About Me
          </MenuItem>
          <MenuItem button onClick={() => handleMenuItemClick("/experience")}>
            Experiences
          </MenuItem>
          <MenuItem button onClick={() => handleMenuItemClick("/education")} >
            Education
          </MenuItem>
          <MenuItem button onClick={toggleDarkMode} >
            Toggle Dark Mode
          </MenuItem>
        </Menu>

        {/* Project Panel */}
        <Container maxWidth="md" sx={{ mt: 15 }}>
          <Typography variant="h4" gutterBottom style={{ fontFamily: 'monospace', textAlign: 'center' }}>
            my projects
          </Typography>
          <Card sx={{ backgroundColor: "background.paper", boxShadow: 3, mb: 4 }}>
            <CardMedia> {/* Set a fixed height for CardMedia */}
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                autoplay={{ delay: 1500 }}
                loop
                speed={3000} // Increase the transition duration for smoother sliding
                style={{ width: "100%", height: "100%" }} // Ensure Swiper takes full height of CardMedia
              >
                <SwiperSlide>
                  <Image
                    src="/images/projec4.png"
                    alt="Slide 1"
                    layout="responsive"
                    width={850}
                    height={430}
                    style={{ objectFit: "cover", width: "100%", height: "auto" }}
                    objectFit="cover" // Ensure the image covers the slide area
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src="/images/team.png"
                    alt="Slide 2"
                    layout="responsive"
                    width={850}
                    height={430}
                    style={{ objectFit: "cover", width: "100%", height: "auto" }}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src="/images/instaa.png"
                    layout="responsive"
                    alt="Slide 3"
                    width={850}
                    height={430}
                    style={{ objectFit: "cover", width: "100%", height: "auto" }}
                  />
                </SwiperSlide>
              </Swiper>
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" sx={{ fontFamily: 'monospace' }}>
                Futures of Kashmir
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                Futures of Kashmir is a dynamic and secure website developed for a Georgetown-founded non-profit organization dedicated to enhancing educational opportunities and promoting literacy among children in the Kashmir region. The website serves as a comprehensive platform to showcase the organization&apos; s; initiatives, facilitate donations, and engage with supporters and the community.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="secondary" href="https://kashmir-nine.vercel.app/" target="_blank">
                Visit Site
              </Button>
              <Button size="small" color="secondary" href="https://github.com/AbdulganiMuhammedsanii/kashmir" target="_blank">
                View Code
              </Button>
            </CardActions>
          </Card>
          <Card sx={{ backgroundColor: "background.paper", boxShadow: 3, mb: 4 }}>
            <CardMedia> {/* Set a fixed height for CardMedia */}
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                autoplay={{ delay: 3500 }}
                loop
                speed={3000} // Increase the transition duration for smoother sliding
                style={{ width: "100%", height: "100%" }} // Ensure Swiper takes full height of CardMedia
              >
                <SwiperSlide>
                  <Image
                    src="/images/project2.png"
                    alt="recoveryhome"
                    layout="responsive"
                    width={850}
                    height={430}
                    style={{ objectFit: "cover", width: "100%", height: "auto" }}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src="/images/serviceinfo.png"
                    alt="serviceinfo"
                    layout="responsive"
                    width={850}
                    height={430}
                    style={{ objectFit: "cover", width: "100%", height: "auto" }}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src="/images/rates.png"
                    alt="rates"
                    layout="responsive"
                    width={850}
                    height={430}
                    style={{ objectFit: "cover", width: "100%", height: "auto" }}
                  />
                </SwiperSlide>
              </Swiper>
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" sx={{ fontFamily: 'monospace' }}>
                Recovery AI
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                Recovery AI is a web application developed for anyone who needs damaged an blurred images to be refined.
                The platform offers key services to streamline this process into service packages, helping users make informed decisions about their image refinement.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="secondary" href="https://recoveryai.pro" target="_blank">
                Visit Site
              </Button>
              <Button size="small" color="secondary" href="https://github.com/AbdulganiMuhammedsanii/enhanced_img_AI" target="_blank">
                View Code
              </Button>
            </CardActions>
          </Card>
          <Card sx={{ backgroundColor: "background.paper", boxShadow: 3, mb: 4 }}>
            <CardMedia>

              <Image
                layout="responsive"
                width={850}
                height={430}
                src="/images/csadvisor.png" // Replace with the actual image URL
                alt="CSAdvisor Project"
                style={{ objectFit: "cover", width: "100%", height: "auto" }}
              />


            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" sx={{ fontFamily: 'monospace' }}>
                CSAdvisor
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                CSAdvisor is a web application developed for Cornell University students to assist in course planning and advising.
                The platform offers detailed insights into courses, professors, and student feedback, helping students make informed decisions about their academic paths.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="secondary" href="https://cs.cornelladvisor.com" target="_blank">
                Visit Site
              </Button>
              <Button size="small" color="secondary" href="https://github.com/AbdulganiMuhammedsanii/Customer_support" target="_blank">
                View Code
              </Button>
            </CardActions>
          </Card>
        </Container>
        <Container
          maxWidth="md"
          sx={{
            mt: 5,
            mb: 2,
            py: 8,
            px: 4,
            bgcolor: darkMode ? 'background.paper' : '#f5f5f5', // Background color based on theme
            borderRadius: 2, // Rounded corners
            boxShadow: 3, // Subtle shadow for depth
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            style={{ fontFamily: 'monospace', textAlign: 'center', color: darkMode ? '#ffffff' : '#333333' }}
          >
            Tools & Software
          </Typography>

          <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Box textAlign="center">
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'monospace',
                    color: darkMode ? '#61DAFB' : '#333333', // React color in dark mode, default in light mode
                  }}
                >
                  React
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box textAlign="center">
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'monospace',
                    color: darkMode ? '#61DAFB' : '#333333', // Next.js color in dark mode, default in light mode
                  }}
                >
                  Next.js
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box textAlign="center">
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'monospace',
                    color: darkMode ? '#339933' : '#333333', // Node.js color in dark mode, default in light mode
                  }}
                >
                  Node.js
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box textAlign="center">
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'monospace',
                    color: darkMode ? '#47A248' : '#333333', // MongoDB color in dark mode, default in light mode
                  }}
                >
                  PostgreSQL
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box textAlign="center">
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'monospace',
                    color: darkMode ? '#FFCA28' : '#333333', // Firebase color in dark mode, default in light mode
                  }}
                >
                  Firebase
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box textAlign="center">
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'monospace',
                    color: darkMode ? '#F05032' : '#333333', // Git color in dark mode, default in light mode
                  }}
                >
                  Git
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box textAlign="center">
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'monospace',
                    color: darkMode ? '#007FFF' : '#333333', // Material-UI color in dark mode, default in light mode
                  }}
                >
                  Material-UI
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>


        <Box
          sx={{
            py: 2,
            backgroundColor: 'primary.main',
            color: 'white',
            mt: 'auto',
          }}
        >
          <Container maxWidth="md">
            <Stack direction="row" justifyContent="center" spacing={4}>
              <IconButton
                component="a"
                href="https://github.com/AbdulganiMuhammedsanii"
                target="_blank"
                color="inherit"
                aria-label="GitHub"
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.linkedin.com/in/abdulgani-muhammedsani-007262203/"
                target="_blank"
                color="inherit"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                component="a"
                href="mailto:abdulgani.muhammedsani@gmail.com"
                color="inherit"
                aria-label="Email"
              >
                <EmailIcon />
              </IconButton>
            </Stack>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
