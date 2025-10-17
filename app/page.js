"use client";
import * as React from 'react';
import Image from "next/image";
import { Container, Grid, CardContent, IconButton, Card, CardMedia, CardActions, AppBar, Toolbar, Typography, Stack, Button, Box, CssBaseline, Divider, Fab } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blue, green } from '@mui/material/colors';
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import { AuthContext } from '../context/AuthContext';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { experiences as experiencesData, semesters as semestersData } from "../data/siteContent";

export default function Home() {
  const fulltext = "Hii, I'm Abdulgani,\n Software Engineer, \n emerging ML enthusiast,\n and passionate builder \n at Cornell University.";
  const [text, setText] = React.useState("");
  const [isTextGenerating, setIsTextGenerating] = React.useState(true); // Track if text is generating
  const [isSwiperReady, setIsSwiperReady] = React.useState(false); // Track if swiper is ready
  const { darkMode, setDarkMode } = React.useContext(AuthContext);
  const fullName = 'Abdulgani Muhammedsani';
  const shortName = 'Abdul';
  const [displayedName, setDisplayedName] = React.useState(fullName);
  const [isHovered, setIsHovered] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("about");
  const [showBackToTop, setShowBackToTop] = React.useState(false);
  const experiences = experiencesData;
  const semesters = semestersData;

  const textIntervalRef = React.useRef(null);
  const textGeneratedRef = React.useRef(false);




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
    if (textGeneratedRef.current)
      return () => clearInterval(textIntervalRef.current);

    let i = 0;
    textIntervalRef.current = setInterval(() => {
      if (i < fulltext.length - 1) {
        setText((prevText) => prevText + fulltext[i]);
        i++;
      } else {
        clearInterval(textIntervalRef.current);
        textGeneratedRef.current = true;
        setIsTextGenerating(false); // Text generation complete, re-enable buttons
        setIsSwiperReady(true); // Enable swiper after text generation
      }
    }, 25);

    return () => clearInterval(textIntervalRef.current);
  }, []);

  // Scrollspy + Back-to-top visibility
  React.useEffect(() => {
    const sectionIds = ["about", "experience", "education", "projects"];
    const elements = sectionIds
      .map((id) => typeof document !== 'undefined' ? document.getElementById(id) : null)
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        // Determine which section is most visible
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-40% 0px -50% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));

    const onScroll = () => {
      if (typeof window !== 'undefined') {
        setShowBackToTop(window.scrollY > 400);
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', onScroll);
      }
    };
  }, []);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
      <Box>
        <Box
          sx={{
            bgcolor: "background.default",
            color: "text.primary",
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row-reverse' },
            minHeight: "100vh",
          }}
        >
          <AppBar position="fixed" color="primary">
            <Toolbar>
              <Typography
                color={"text.primary"}
                style={{ fontFamily: 'var(--font-display)', cursor: 'pointer', letterSpacing: 0.5 }}
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {displayedName}
              </Typography>
              <Stack direction='row' spacing={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Button color={activeSection === 'about' ? 'secondary' : 'inherit'} href="#about" sx={{ fontFamily: 'monospace' }}>
                  About
                </Button>
                <Button color={activeSection === 'experience' ? 'secondary' : 'inherit'} href="#experience" sx={{ fontFamily: 'monospace' }}>
                  Experience
                </Button>
                <Button color={activeSection === 'education' ? 'secondary' : 'inherit'} href="#education" sx={{ fontFamily: 'monospace' }}>
                  Education
                </Button>
                <Button color={activeSection === 'projects' ? 'secondary' : 'inherit'} href="#projects" sx={{ fontFamily: 'monospace' }}>
                  Projects
                </Button>
              </Stack>
              <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <IconButton color="inherit" onClick={toggleDarkMode} disabled={isTextGenerating}>
                  {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Box>
              <Stack direction='row' spacing={2} color={"text.primary"} sx={{ display: { xs: 'none', md: 'flex' } }}>


                <IconButton color="inherit" onClick={toggleDarkMode} disabled={isTextGenerating}>
                  {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Stack>
            </Toolbar>
          </AppBar>

          {/* Drawer for mobile */}



          <Box id="about" sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
            mt: 15,
            ml: { xs: 2, md: 20 },
            mr: { xs: 2, md: 2 },
            maxWidth: '100%',
            scrollMarginTop: 80,
            borderRadius: 2,
          }}>
            <Box sx={{
              width: { xs: 320, md: 500 },
              height: { xs: 320, md: 500 },
              display: 'flex',
              ml: { xs: 0, md: 20 },
              mt: { xs: 5, md: -10 },
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Card sx={{ width: '100%', height: '100%', borderRadius: '50%', boxShadow: 3, overflow: 'hidden', transition: 'transform 250ms ease, box-shadow 250ms ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 } }}>
                <CardMedia
                  component="img"
                  image="/images/AbdulganiHeadshot.png"
                  alt="Abdulgani's Picture"
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    objectPosition: '50% 25%',
                    filter: 'none',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.02)'
                    }
                  }}
                />
              </Card>
            </Box>
            <Box sx={{ ml: { xs: 0, md: 25 }, mt: { xs: 8, md: -10 }, flexGrow: 1, textAlign: { xs: 'center', md: 'left' } }}>
              <Typography fontSize={{ xs: 24, md: 36 }} style={{ fontFamily: 'var(--font-display)', whiteSpace: 'pre-line', lineHeight: 1.4 }} variant="h4" component="p" gutterBottom>
                {text}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Container id="experience" sx={{ mt: 0, mb: -3, scrollMarginTop: 80 }}>
          <Divider sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ fontFamily: 'monospace', textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1 }}>
              Experience
            </Typography>
          </Divider>
          <Grid container spacing={4} direction="column">
            {experiences.map((experience, index) => (
              <Grid item key={index}>
                <Card sx={{ display: 'flex', alignItems: 'center', padding: 2, transition: 'transform 250ms ease, box-shadow 250ms ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 } }}>
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

        <Container id="education" sx={{ mt: 15, mb: 5, scrollMarginTop: 80 }}>
          <Divider sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ fontFamily: 'monospace', textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1 }}>
              Education
            </Typography>
          </Divider>
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




        {/* Project Panel */}
        <Container id="projects" maxWidth="md" sx={{ mt: 7, scrollMarginTop: 80 }}>
          <Divider sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ fontFamily: 'monospace', textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1 }}>
              Projects
            </Typography>
          </Divider>
          {isSwiperReady && (
            <>
              <Card sx={{ backgroundColor: "background.paper", boxShadow: 3, mb: 4, transition: 'transform 250ms ease, box-shadow 250ms ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 } }}>
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
                  <Button size="small" color="secondary" href="https://futuresofkashmir.org/" target="_blank">
                    Visit Site
                  </Button>
                  <Button size="small" color="secondary" href="https://github.com/AbdulganiMuhammedsanii/kashmir" target="_blank">
                    View Code
                  </Button>
                </CardActions>
              </Card>
              <Card sx={{ backgroundColor: "background.paper", boxShadow: 3, mb: 4, transition: 'transform 250ms ease, box-shadow 250ms ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 } }}>
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
              <Card sx={{ backgroundColor: "background.paper", boxShadow: 3, mb: 4, transition: 'transform 250ms ease, box-shadow 250ms ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 } }}>
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
            </>
          )}
        </Container>
        <Container
          maxWidth="md"
          sx={{
            mt: 5,
            mb: 2,
            py: 8,
            px: 4,
            bgcolor: darkMode ? 'background.paper' : 'background.default', // Background color based on theme
            borderRadius: 2, // Rounded corners
            boxShadow: 3, // Subtle shadow for depth
          }}
        >
          <Typography
            variant="h5"
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

        {showBackToTop && (
          <Fab color="secondary" aria-label="back to top" onClick={scrollToTop} sx={{ position: 'fixed', right: 24, bottom: 24 }}>
            <KeyboardArrowUpIcon />
          </Fab>
        )}


      </Box>
    </ThemeProvider>
  );
}
