"use client";
import Image from "next/image";
import * as React from 'react';
import { Container, IconButton, Card, CardMedia, AppBar, Toolbar, Typography, Stack, Button, Box, CssBaseline, Grid , Menu, MenuItem} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blue, green } from '@mui/material/colors';
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";
import { AuthContext } from '../../context/AuthContext';

export default function Experiences() {
  const {darkMode, setDarkMode} = React.useContext(AuthContext);
  const fullName = 'Abdulgani Muhammedsani';
  const shortName = 'Abdul';
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [displayedName, setDisplayedName] = React.useState(fullName);
  const [isHovered, setIsHovered] = React.useState(false);
  const router = useRouter();
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMenuItemClick = (path) => {
    router.push(path);
    handleMenuClose();
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const goBackHome = () => {
    router.push('/');
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

  const experiences = [
    {
      image: "/images/headstarter.png",
      role: "SWE Fellow at Headstarter AI",
      description: "Built 5+ AI apps and APIs using NextJS, OpenAI, Pinecone, StripeAPI \n  from design to deployment leading 3 engineering fellows using MVC design patterns. \n Coached by Amazon, Bloomberg, and Capital One engineers on Agile, CI/CD, Git and microservice patterns",
    },
    {
      image: "/images/cornell_webdev.webp",
      role: "Cornell Webdev Project Team Member",
      description: "Contributed to Scheduler plus, a chrome extension that serves to provide additional information for students looking to create their schedule. Utilized React, JavaScript, and HTML/CSS to develop the front-end of the extension. Collaborated with a team of 3 developers to implement features and deployment.",
    },
    {
      image: "/images/cornell_logo.png",
      role: "CS1110 Course Assistant",
      description: "Assisted in lab sections by guiding 30+ students through technical coding problems. Contributed to bi-weekly grading sessions of 400+ coding assignments, and provided comprehensive feedback.",
    },
    {
      image: "/images/google_cssi.jpg",
      role: "Google CSSI Program Participant",
      description: "Participated in a 4-week intensive computer science summer program for high-achieving students. Configured 14 individual coding projects in JavaScript by using concepts such as variables, data types, and functions. Delivered a collaborative final project presentation that included a live demonstration to Google employees and community leaders.",
    }
    // Add more experiences here
  ];

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

        <Container sx={{ mt: 10, mb: 5 }}>
          <Typography variant="h4" gutterBottom style={{ fontFamily: 'monospace', textAlign: 'center' }}>
            my experiences
          </Typography>
          <Grid container spacing={4} direction="column">
            {experiences.map((experience, index) => (
              <Grid item key={index}>
                <Card sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
                  <CardMedia
                    component="img"
                    image={experience.image}
                    alt={experience.role}
                    sx={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', mr: 3 }}
                  />
                  <Box>
                    <Typography variant="h6" style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
                      {experience.role}
                    </Typography>
                    <Typography variant="body1" style={{ fontFamily: 'monospace' }}>
                      {experience.description}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
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
