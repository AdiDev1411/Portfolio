import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import IconWrapper from '../components/IconWrapper';
import { saveContactSubmission } from '../utils/contactService';

const ContactContainer = styled.div`
  padding: 120px 0 80px;
  
  @media (max-width: 768px) {
    padding: 100px 0 60px;
  }
`;

const ContactSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const PageTitle = styled(motion.h1)`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  
  span {
    color: var(--primary-color);
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PageDescription = styled(motion.p)`
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
  color: var(--text-secondary);
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormLabel = styled.label`
  font-size: 1rem;
  color: var(--text-secondary);
`;

const FormInput = styled.input`
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--text-color);
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(0, 180, 216, 0.2);
  }
`;

const FormTextarea = styled.textarea`
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--text-color);
  font-size: 1rem;
  resize: vertical;
  min-height: 150px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(0, 180, 216, 0.2);
  }
`;

const SubmitButton = styled(motion.button)`
  background: var(--primary-color);
  color: #000;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;
  
  &:hover {
    background: var(--primary-color);
    opacity: 0.9;
    transform: translateY(-3px);
  }
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ContactTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  
  span {
    color: var(--primary-color);
  }
`;

const ContactCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--primary-color);
    transform: translateY(-5px);
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  svg {
    font-size: 1.5rem;
    color: var(--primary-color);
  }
  
  div {
    display: flex;
    flex-direction: column;
  }
  
  h4 {
    font-size: 1.1rem;
    margin-bottom: 0.2rem;
  }
  
  p, a {
    color: var(--text-secondary);
    transition: color 0.3s ease;
  }
  
  a:hover {
    color: var(--primary-color);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-secondary);
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--primary-color);
    color: #000;
  }
`;

const Contact: React.FC = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form data
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }
    
    // Save the submission to localStorage
    try {
      saveContactSubmission({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      });
      
      console.log('Form data submitted:', formData);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setErrorMessage('');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error saving contact submission:', error);
      setErrorMessage('An error occurred while submitting the form. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <ContactContainer>
      <ContactSection>
        <PageHeader>
          <PageTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Get In <span>Touch</span>
          </PageTitle>
          <PageDescription
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Feel free to contact me for any project or collaboration. I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
          </PageDescription>
        </PageHeader>
        
        <ContactGrid>
          <ContactForm
            as={motion.form}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
          >
            {submitSuccess && (
              <SuccessMessage 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                Thank you! Your message has been sent successfully.
              </SuccessMessage>
            )}
            
            {errorMessage && (
              <ErrorMessage 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {errorMessage}
              </ErrorMessage>
            )}
            
            <FormGroup as={motion.div} variants={fadeInUp}>
              <FormLabel>Your Name</FormLabel>
              <FormInput 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </FormGroup>
            <FormGroup as={motion.div} variants={fadeInUp}>
              <FormLabel>Your Email</FormLabel>
              <FormInput 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </FormGroup>
            <FormGroup as={motion.div} variants={fadeInUp}>
              <FormLabel>Subject</FormLabel>
              <FormInput 
                type="text" 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required 
              />
            </FormGroup>
            <FormGroup as={motion.div} variants={fadeInUp}>
              <FormLabel>Your Message</FormLabel>
              <FormTextarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                required 
              />
            </FormGroup>
            <SubmitButton
              type="submit"
              as={motion.button}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </SubmitButton>
          </ContactForm>
          
          <ContactInfo
            as={motion.div}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <ContactTitle>Contact <span>Information</span></ContactTitle>
            <ContactCard as={motion.div} variants={fadeInUp}>
              <ContactItem>
                <IconWrapper icon={FaEnvelope} />
                <div>
                  <h4>Email</h4>
                  <a href="mailto:adiforpro@gmail.com">adiforpro@gmail.com</a>
                </div>
              </ContactItem>
              <ContactItem>
                <IconWrapper icon={FaPhone} />
                <div>
                  <h4>Phone</h4>
                  <a href="tel:+917016157670">+91 7016157670</a>
                </div>
              </ContactItem>
              <ContactItem>
                <IconWrapper icon={FaMapMarkerAlt} />
                <div>
                  <h4>Location</h4>
                  <p>Rajkot, Gujarat, India</p>
                </div>
              </ContactItem>
              <SocialLinks>
                <SocialLink 
                  href="https://linkedin.com/in/adityaavlani" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  as={motion.a}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconWrapper icon={FaLinkedin} />
                </SocialLink>
                <SocialLink 
                  href="https://github.com/adityaavlani" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  as={motion.a}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconWrapper icon={FaGithub} />
                </SocialLink>
                <SocialLink 
                  href="https://twitter.com/adityaavlani" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  as={motion.a}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconWrapper icon={FaTwitter} />
                </SocialLink>
              </SocialLinks>
            </ContactCard>
          </ContactInfo>
        </ContactGrid>
      </ContactSection>
    </ContactContainer>
  );
};

// Add these styled components
const SuccessMessage = styled(motion.div)`
  background-color: rgba(0, 200, 83, 0.1);
  border: 1px solid rgba(0, 200, 83, 0.3);
  color: #00c853;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-weight: 500;
`;

const ErrorMessage = styled(motion.div)`
  background-color: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.3);
  color: #ff3d00;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-weight: 500;
`;

export default Contact; 