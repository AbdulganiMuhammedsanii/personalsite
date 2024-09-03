"use client";
import React, { useState, useEffect } from "react";
import {
  Container,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
  Box,
  CssBaseline,
  Grid,
  Card,
  CardContent,
  Menu,
  MenuItem,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { blue, green } from "@mui/material/colors";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import { useRouter } from "next/navigation";

export default function Education() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false); // Track if the component is mounted
  const fullName = "Abdulgani Muhammedsani";
  const shortName = "Abdul";
  const [displayedName, setDisplayedName] = useState(fullName);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);


  useEffect(() => {
    setMounted(true); // Set mounted to true when the component mounts
  }, []);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMenuItemClick = (path) => {
    router.push(path);
    handleMenuClose();
  };
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const goBackHome = () => {
    router.push("/");
  };

  useEffect(() => {
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

  const semesters = [
    {
      semester: "FA24",
      courses: [
        "CS4820 Analysis of Algorithms",
        "STSCI 3740 Machine Learning",
        "CS4620 Computer Graphics",
      ],
    },
    {
      semester: "SU24",
      courses: [
        "STSCI3080 Probability Models and Inference",
      ],
    },
    {
      semester: "SP24",
      courses: [
        "CS4700 Foundations of Artificial Intelligence",
        "CS3110 Data Structures and Functional Programming",
      ],
    },
    {
      semester: "FA23",
      courses: [
        "CS4410 Operating Systems",
        "CS2800 Discrete Structures",
      ],
    },
    {
      semester: "SP23",
      courses: [
        "CS3420 Embedded Systems",
        "CS1998 Intro to Backend Development",
        "MATH2210 Linear Algebra",
      ],
    },
    {
      semester: "FA22",
      courses: [
        "CS1110 Intro to Computing",
        "CS2110 Data Structures and Algorithms",
      ],
    },
  ];

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
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
      mode: "light",
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

  if (!mounted) return null; // Prevents rendering until the component is fully mounted

  return (
    <ThemeProvider theme={darkMode ? darkTheme : theme}>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <Typography
              color={"text.primary"}
              style={{ fontFamily: "monospace", cursor: "pointer" }}
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
              <Button style={{ fontFamily: 'monospace' }} color="inherit">Education</Button>
              <IconButton color="inherit" onClick={toggleDarkMode}>
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Stack>
          </Toolbar>
        </AppBar>

        <Container sx={{ mt: 10, mb: 5 }}>
          <Typography
            variant="h4"
            gutterBottom
            style={{ fontFamily: "monospace", textAlign: "center" }}
          >
            my cs and stat education
          </Typography>
          <Grid container spacing={4}>
            {semesters.map((semester, index) => (
              <Grid item xs={12} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" style={{ fontFamily: "monospace", fontWeight: "bold" }}>
                      {semester.semester}
                    </Typography>
                    {semester.courses.map((course, i) => (
                      <Typography key={i} variant="body1" style={{ fontFamily: "monospace", marginLeft: 16 }}>
                        {course}
                      </Typography>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Box
          sx={{
            py: 2,
            backgroundColor: "primary.main",
            color: "white",
            mt: "auto",
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
