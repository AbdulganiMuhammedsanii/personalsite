"use client";
import Image from "next/image";
import * as React from 'react';
import { Container, IconButton, Card, CardMedia, AppBar, Toolbar, Typography, Stack, Button, Box, CssBaseline, Grid } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blue, green } from '@mui/material/colors';
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";

export default function Experiences() {
  const [darkMode, setDarkMode] = React.useState(true);
  const fullName = 'Abdulgani Muhammedsani';
  const shortName = 'Abdul';
  const [displayedName, setDisplayedName] = React.useState(fullName);
  const [isHovered, setIsHovered] = React.useState(false);
  const router = useRouter();
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
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
      image: "/images/cornell_webdev.webp",
      role: "Cornell Webdev Project Team Member",
      description: "Analyzed large datasets using Python and SQL, created dashboards with Tableau, and provided insights that improved business decision-making processes.",
    },
    {
      image: "/images/headstarter.png",
      role: "SWE Fellow at Headstarter AI",
      description: "Analyzed large datasets using Python and SQL, created dashboards with Tableau, and provided insights that improved business decision-making processes.",
    },
    {
      image: "/images/cornell_logo.png",
      role: "CS1110 Course Assistant",
      description: "Developed and maintained web applications using React, Node.js, and MongoDB. Worked closely with the UI/UX team to create responsive and user-friendly interfaces.",
    },
    {
      image: "/images/google_cssi.jpg",
      role: "Google CSSI Program Participant",
      description: "Analyzed large datasets using Python and SQL, created dashboards with Tableau, and provided insights that improved business decision-making processes.",
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
            <Stack direction='row' spacing={2} color={"text.primary"}>
              <Button onClick={goBackHome} style={{ fontFamily: 'monospace' }} color="inherit">About Me</Button>
              <Button style={{ fontFamily: 'monospace' }} color="inherit">Education</Button>
              <IconButton color="inherit" onClick={toggleDarkMode}>
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Stack>
          </Toolbar>
        </AppBar>

        <Container sx={{ mt: 10, mb: 5 }}>
          <Typography variant="h4" gutterBottom style={{ fontFamily: 'monospace', textAlign: 'center' }}>
            My Experiences
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
