import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram, FaDribbble } from 'react-icons/fa';
import IconWrapper from './IconWrapper';

const FooterContainer = styled.footer`
  background-color: #0f0f0f;
  color: #ffffff;
  padding: 3rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const FooterInfo = styled.div`
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--primary-color);
  }
  
  p {
    margin-bottom: 1rem;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
  }
`;

const FooterLinks = styled.div`
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--primary-color);
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
  
  a {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: var(--primary-color);
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const SocialIcon = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--primary-color);
    color: #000;
    transform: translateY(-3px);
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterInfo>
          <h3>Aditya Avlani</h3>
          <p>I create digital experiences that are both functional and beautiful. Let's collaborate to bring your ideas to life.</p>
          <SocialIcons>
            <SocialIcon 
              href="https://linkedin.com/in/aditya-avlani" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconWrapper icon={FaLinkedin} />
            </SocialIcon>
            <SocialIcon 
              href="https://github.com/AdiDev1411" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconWrapper icon={FaGithub} />
            </SocialIcon>
            <SocialIcon 
              href="https://twitter.com/adityaavlani" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconWrapper icon={FaTwitter} />
            </SocialIcon>
            <SocialIcon 
              href="https://instagram.com/adityaavlani" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconWrapper icon={FaInstagram} />
            </SocialIcon>
            <SocialIcon 
              href="https://dribbble.com/adityaavlani" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconWrapper icon={FaDribbble} />
            </SocialIcon>
          </SocialIcons>
        </FooterInfo>
        <FooterLinks>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/projects">Projects</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </FooterLinks>
      </FooterContent>
      <Copyright>
        &copy; {new Date().getFullYear()} Aditya Avlani. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer; 