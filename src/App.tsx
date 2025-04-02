import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, theme } from './styles/GlobalStyles';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WelcomeScreen from './components/WelcomeScreen';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';

// AnimatePresence wrapper component
const AnimatedRoutes = () => {
  const location = useLocation();
  
  // Use the type casting approach
  const AnimatePresenceWithFix = AnimatePresence as any;
  
  return (
    <>
      <AnimatePresenceWithFix mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </AnimatePresenceWithFix>
    </>
  );
};

const App: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if the device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = 
        typeof window.navigator === "undefined" ? "" : navigator.userAgent;
      const mobile = Boolean(
        userAgent.match(
          /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
        )
      );
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  // Add cursor-active class to body when custom cursor is active
  useEffect(() => {
    // Short delay to let everything initialize
    const initTimer = setTimeout(() => {
      if (!isMobile) {
        document.body.classList.add('cursor-active');
      } else {
        document.body.classList.remove('cursor-active');
      }
    }, 100);
    
    return () => {
      clearTimeout(initTimer);
      document.body.classList.remove('cursor-active');
    };
  }, [isMobile]);
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {/* Only show custom cursor on non-mobile devices */}
      {!isMobile && <CustomCursor />}
      <WelcomeScreen />
      <Router>
        <ScrollToTop />
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
