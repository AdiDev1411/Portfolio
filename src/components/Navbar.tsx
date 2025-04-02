import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  z-index: 100;
  backdrop-filter: blur(10px);
  background: rgba(10, 10, 10, 0.8);
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(motion.div)`
  position: relative;
  font-weight: 500;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    transition: width 0.3s ease;
  }
  
  &:hover::after, &.active::after {
    width: 100%;
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: none;
  color: var(--text-color);
  font-size: 1.5rem;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background: var(--background-color);
  padding: 2rem;
  z-index: 200;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 3rem;
`;

const MobileNavLink = styled(Link)`
  display: block;
  padding: 1rem;
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    color: var(--primary-color);
  }
`;

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' }
  ];
  
  const mobileMenuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      x: "0",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };
  
  const menuButtonVariants = {
    open: {
      rotate: 45,
      y: 5,
      transition: { duration: 0.3 }
    },
    closed: {
      rotate: 0,
      y: 0,
      transition: { duration: 0.3 }
    }
  };
  
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        staggerChildren: 0.1,
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };
  
  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 }
    }
  };
  
  const AnimatePresenceWithFix = AnimatePresence as any;
  
  return (
    <NavContainer style={{ 
      boxShadow: scrolled ? '0 5px 15px rgba(0, 0, 0, 0.1)' : 'none',
      transition: 'all 0.3s ease'
    }}>
      <NavContent>
        <Logo
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <Link to="/">ADITYA AVLANI</Link>
        </Logo>
        
        <motion.div
          variants={navVariants}
          initial="hidden"
          animate="visible"
        >
          <NavLinks>
            {navLinks.map((link) => (
              <NavLink 
                key={link.path}
                variants={linkVariants}
                whileHover="hover"
                className={location.pathname === link.path ? 'active' : ''}
              >
                <Link to={link.path}>
                  {link.label}
                </Link>
              </NavLink>
            ))}
          </NavLinks>
        </motion.div>
        
        <MobileMenuButton
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <motion.div
            animate={mobileMenuOpen ? "open" : "closed"}
            variants={menuButtonVariants}
          >
            <span></span>
            <span></span>
            <span></span>
          </motion.div>
        </MobileMenuButton>
      </NavContent>
      
      <AnimatePresenceWithFix>
        {mobileMenuOpen && (
          <MobileMenu
            key="mobile-menu"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {navLinks.map((link) => (
              <MobileNavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </MobileNavLink>
            ))}
          </MobileMenu>
        )}
      </AnimatePresenceWithFix>
    </NavContainer>
  );
};

export default Navbar;

 