"use client";
import * as React from 'react';
import { Container, IconButton, Card, CardMedia, AppBar, Toolbar, Typography, Stack, Button, Box, CssBaseline, Drawer, List, ListItem, ListItemText } from '@mui/material';
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
import { AuthContext } from '../context/AuthContext';

export default function Home() {
  const fulltext = "hhi, my name is abdulgani,\n and i am a cs and stat major \n at cornell university,\n with an interest in software \ndevelopment and machine learning.";
  const [text, setText] = React.useState("");
  const [isTextGenerating, setIsTextGenerating] = React.useState(true); // Track if text is generating
  const { darkMode, setDarkMode } = React.useContext(AuthContext);
  const fullName = 'Abdulgani Muhammedsani';
  const shortName = 'Abdul';
  const [displayedName, setDisplayedName] = React.useState(fullName);
  const [isHovered, setIsHovered] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null)
  const router = useRouter();

  const textIntervalRef = React.useRef(null);
  const textGeneratedRef = React.useRef(false);

  const handleMenuClick = (event) => {
    if (!isTextGenerating) {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const goBackHome = () => {
    if (!isTextGenerating) {
      router.push('/');
    }
  };

  const handleMenuDrawerClick = (event) => {
    if (!isTextGenerating) {
      setAnchorEl1(event.currentTarget);
    }
  };

  const handleMenuDrawerClose = () => {
    setAnchorEl1(null);
  };


  const handleMenuItemClick = (path) => {
    if (!isTextGenerating) {
      router.push(path);
      handleMenuClose();
    }
  };

  const handleMouseEnter = () => {
    if (!isTextGenerating) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isTextGenerating) {
      setIsHovered(false);
    }
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

  React.useEffect(() => {
    if (textGeneratedRef.current) return;

    let i = 0;
    textIntervalRef.current = setInterval(() => {
      if (i < fulltext.length - 1) {
        setText((prevText) => prevText + fulltext[i]);
        i++;
      } else {
        clearInterval(textIntervalRef.current);
        textGeneratedRef.current = true;
        setIsTextGenerating(false); // Text generation complete, re-enable buttons
      }
    }, 25);

    return () => clearInterval(textIntervalRef.current);
  }, []);

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
    if (!isTextGenerating) {
      setDarkMode(!darkMode);
    }
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
              <IconButton color="inherit" onClick={handleMenuDrawerClick} disabled={isTextGenerating}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Stack direction='row' spacing={2} color={"text.primary"} sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button onClick={goBackHome} style={{ fontFamily: 'monospace' }} color="inherit" disabled={isTextGenerating}>About Me</Button>
              <Button
                style={{ fontFamily: "monospace" }}
                color="inherit"
                onClick={handleMenuClick}
                disabled={isTextGenerating}
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
                <MenuItem sx={{ fontFamily: 'monospace' }} onClick={() => handleMenuItemClick("/projects")} disabled={isTextGenerating}>
                  Projects
                </MenuItem>
                <MenuItem sx={{ fontFamily: 'monospace' }} onClick={() => handleMenuItemClick("/experience")} disabled={isTextGenerating}>
                  Experiences
                </MenuItem>

              </Menu>
              <Button style={{ fontFamily: 'monospace' }} color="inherit" onClick={() => handleMenuItemClick("/education")} disabled={isTextGenerating}>Education</Button>
              <IconButton color="inherit" onClick={toggleDarkMode} disabled={isTextGenerating}>
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
          <MenuItem button onClick={() => handleMenuItemClick("/projects")} disabled={isTextGenerating}>
            Projects
          </MenuItem>
          <MenuItem button onClick={() => handleMenuItemClick("/experience")} disabled={isTextGenerating}>
            Experiences
          </MenuItem>
          <MenuItem button onClick={() => handleMenuItemClick("/education")} disabled={isTextGenerating}>
            Education
          </MenuItem>
          <MenuItem button onClick={toggleDarkMode} disabled={isTextGenerating}>
            Toggle Dark Mode
          </MenuItem>
        </Menu>

        <Box sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'center',
          alignItems: 'center',
          mt: 15,
          ml: { xs: 2, md: 20 },
          mr: { xs: 2, md: 2 },
          maxWidth: '100%',
        }}>
          <Box sx={{
            width: { xs: 200, md: 405 },
            height: { xs: 'auto', md: 385 },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Card sx={{ width: '100%', height: '100%', borderRadius: '30%', boxShadow: 3, overflow: 'hidden' }}>
              <CardMedia
                component="img"
                image="/images/abdulgani_muhammedsani_picture.png"
                alt="Abdulgani's Picture"
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '30%',
                  filter: 'brightness(90%)',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    transition: 'transform 0.3s ease-in-out',
                  }
                }}
              />
            </Card>
          </Box>
          <Box sx={{ ml: { xs: 0, md: 10 }, mt: { xs: 4, md: 0 }, flexGrow: 1, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography fontSize={{ xs: 20, md: 30 }} style={{ fontFamily: 'monospace', whiteSpace: 'pre-line' }} variant="h5" component="p" gutterBottom>
              {text}
            </Typography>
          </Box>
        </Box>
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
                disabled={isTextGenerating}
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.linkedin.com/in/abdulgani-muhammedsani-007262203/"
                target="_blank"
                color="inherit"
                aria-label="LinkedIn"
                disabled={isTextGenerating}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                component="a"
                href="mailto:abdulgani.muhammedsani@gmail.com"
                color="inherit"
                aria-label="Email"
                disabled={isTextGenerating}
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
