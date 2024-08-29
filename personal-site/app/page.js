"use client";
import Image from "next/image";
import styles from "./page.module.css";
import * as React from 'react';
import { Container, IconButton, Card, CardMedia, AppBar, Toolbar, Typography, Stack, Button, Box, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { indigo, blue, green, red, yellow} from '@mui/material/colors';
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

export default function Home() {
  const fulltext = "hii, my name is abdulgani,\n and i am a cs and stat major \n at cornell university,\n with an interest in software \ndevelopment, data science, \nand machine learning.";
  const [text, setText] = React.useState("");
  const [darkMode, setDarkMode] = React.useState(false);
  const fullName = 'Abdulgani Muhammedsani';
  const shortName = 'Abdul';
  const [displayedName, setDisplayedName] = React.useState(fullName);
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  React.useEffect(() => {
    if (isHovered && displayedName.length > shortName.length) {
      // Remove characters when hovering
      const timeout = setTimeout(() => {
        setDisplayedName((prev) => prev.slice(0, -1));
      }, 40);

      return () => clearTimeout(timeout);
    } else if (!isHovered && displayedName.length < fullName.length) {
      // Add characters when not hovering
      const timeout = setTimeout(() => {
        setDisplayedName((prev) => fullName.slice(0, prev.length + 1));
      }, 40);

      return () => clearTimeout(timeout);
    }
  }, [isHovered, displayedName]);


  React.useEffect(() => {
    let i = 0;
    const interval = setInterval(() =>{
      if (i < fulltext.length-1) {
        if (fulltext[i] === "\\") {
          i++;
          if (fulltext[i] === "n") {
            setText((prevText) => prevText + "\n");
          }
          i++;
        }
        else {
        setText((prevText) => prevText + fulltext[i]);
        i++;
        }
      }
      else 
      {
        clearInterval(interval);
      }
    }, 25);
    return () => clearInterval(interval);
  },[fulltext]);

  const darkTheme = createTheme({
    palette: {
      mode : 'dark',
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
      mode : 'light',
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
      <Box sx={{
          bgcolor: "background.default",
          color: "text.primary",
          minHeight: "100vh",
        }}>
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


          <Stack direction='row' spacing={2} color = {"text.primary"}>
            <Button style = {{fontFamily: 'monospace'}} color="inherit">About Me</Button>
            <Button style = {{fontFamily: 'monospace'}} color="inherit">Education</Button>
            <Button style = {{fontFamily: 'monospace'}} color="inherit">Experiences</Button>
            <Button style = {{fontFamily: 'monospace'}} color="inherit">Projects</Button>
            <IconButton color="inherit" onClick={toggleDarkMode}>
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 15, ml: 20, mr: 2, maxWidth: '100%' }}>
  <Card sx={{ width: 405, height: 375, borderRadius: '50%', boxShadow: 3, overflow: 'hidden' }}>
    <CardMedia
      component="img"
      image="/images/abdulgani_muhammedsani_picture.png" // Update this to the actual path of your image
      alt="Abdulgani's Picture"
      sx={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        filter: 'brightness(90%)',
        '&:hover': {
          transform: 'scale(1.05)',
          transition: 'transform 0.3s ease-in-out',
        }
      }}
    />
  </Card>
  <Box sx={{ ml: 10 }}>
    <Typography fontSize={30} style={{ fontFamily: 'monospace', whiteSpace: 'pre-line' }} variant="h5" component="p" gutterBottom>
      {text}
    </Typography>
  </Box>
</Box>
</Box>
<Box sx={{ py: 2, backgroundColor: 'primary.main', color: 'white' }}>
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
              href="abdulgani.muhammedsani@gmail.com"
              color="inherit"
              aria-label="Email"
            >
              <EmailIcon />
            </IconButton>
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
