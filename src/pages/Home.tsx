import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaStar, FaQuoteLeft, FaCode, FaDesktop, FaDatabase, FaMobileAlt, FaLaptopCode, FaArrowRight } from 'react-icons/fa';
import IconWrapper from '../components/IconWrapper';

const HomeContainer = styled.div`
  padding-top: 80px;
  overflow: hidden;
`;

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  z-index: 2;
`;

const HeroTag = styled(motion.div)`
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 30px;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  
  span {
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const HeroDescription = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  margin-bottom: 2.5rem;
  line-height: 1.6;
`;

const HeroButtons = styled(motion.div)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const HeroButton = styled(motion.div)`
  a {
    display: inline-block;
    padding: 0.8rem 2rem;
    border-radius: 30px;
    font-weight: 500;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    z-index: 1;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
      z-index: -1;
      transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }
  }
  
  &.primary a {
    color: var(--text-color);
    
    &::before {
      transform: scaleX(1);
    }
  }
  
  &.secondary a {
    color: var(--text-color);
    border: 1px solid rgba(255, 255, 255, 0.2);
    
    &::before {
      transform: scaleX(0);
    }
    
    &:hover::before {
      transform: scaleX(1);
    }
  }
`;

const HeroBackgroundShapes = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 0;
`;

const BackgroundShape = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
`;

const FeaturedSection = styled.section`
  padding: 8rem 0;
  background-color: #0c0c0c;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 700;
  margin-bottom: 3rem;
  text-align: center;
  
  span {
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const FeaturedGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeaturedItem = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 2rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  p {
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
  }
  
  &:hover {
    transform: translateY(-10px);
    border-color: var(--primary-color);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
`;

const StatSection = styled.section`
  padding: 5rem 0;
  background: #080808;
`;

const StatGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
`;

const StatItem = styled(motion.div)`
  h3 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 700;
    margin-bottom: 1rem;
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1rem;
  }
`;

const TestimonialsSection = styled.section`
  padding: 8rem 0;
  background-color: #0c0c0c;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: rgba(0, 180, 216, 0.03);
    filter: blur(100px);
    top: -100px;
    right: -100px;
    z-index: 0;
  }
`;

const TestimonialsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const TestimonialCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 10px;
    padding: 2px;
    background: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0.1),
      transparent,
      transparent,
      rgba(0, 180, 216, 0.2)
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`;

const QuoteIcon = styled.div`
  color: var(--primary-color);
  font-size: 2rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`;

const TestimonialText = styled.p`
  font-style: italic;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1rem;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AuthorInfo = styled.div`
  h4 {
    font-size: 1rem;
    margin-bottom: 0.2rem;
  }
  
  p {
    font-size: 0.9rem;
    color: var(--primary-color);
  }
`;

const StarsContainer = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1rem;
  color: #ffc107;
`;

const SkillsSection = styled.section`
  padding: 8rem 0;
  background: #080808;
`;

const SkillsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const SkillItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const SkillIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: var(--primary-color);
  font-size: 1.8rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
  
  &:hover {
    background: rgba(0, 180, 216, 0.1);
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 180, 216, 0.3);
  }
`;

const SkillName = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
`;

const SkillProgress = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  margin-top: 0.5rem;
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  border-radius: 3px;
`;

const RecentProjectsSection = styled.section`
  padding: 8rem 0;
  background-color: #0c0c0c;
`;

const ProjectsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ProjectCard = styled(motion.div)`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  height: 250px;
  cursor: pointer;
`;

const ProjectImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
`;

const ProjectOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0.1) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${ProjectCard}:hover & {
    opacity: 1;
  }
  
  ${ProjectCard}:hover ${ProjectImage} img {
    transform: scale(1.1);
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const ProjectCategory = styled.p`
  font-size: 0.9rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const ProjectLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: white;
  font-size: 0.9rem;
  gap: 0.5rem;
  transform: translateX(0);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateX(5px);
  }
`;

const SeeAllLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-color);
  font-size: 1rem;
  margin-top: 3rem;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    gap: 0.8rem;
  }
`;

const CTASection = styled.section`
  padding: 6rem 0;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.99),
    rgba(12, 12, 12, 0.95)
  );
  position: relative;
  overflow: hidden;
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    filter: blur(100px);
    z-index: 0;
  }
  
  &::before {
    background: rgba(0, 180, 216, 0.05);
    top: -150px;
    left: -150px;
  }
  
  &::after {
    background: rgba(216, 0, 180, 0.05);
    bottom: -150px;
    right: -150px;
  }
`;

const CTAContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1.5rem;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const CTATitle = styled(motion.h2)`
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 700;
  margin-bottom: 1.5rem;
  
  span {
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const CTAText = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: rgba(255, 255, 255, 0.8);
  max-width: 700px;
  margin: 0 auto 2.5rem;
  line-height: 1.6;
`;

const CTAButton = styled(motion.div)`
  display: inline-block;
  
  a {
    display: inline-block;
    padding: 1rem 2.5rem;
    border-radius: 30px;
    font-weight: 500;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    z-index: 1;
    color: #000;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
      z-index: -1;
      transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }
  }
`;

const Home: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      }
    }
  };
  
  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <HeroTag
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Front-End Developer & UI/UX Designer
          </HeroTag>
          
          <HeroTitle
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Hi, I'm <span>Aditya Avlani</span>
          </HeroTitle>
          
          <HeroDescription
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            I design and develop beautiful, interactive, and responsive websites that deliver exceptional user experiences. Let's bring your ideas to life!
          </HeroDescription>
          
          <HeroButtons
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <HeroButton 
              className="primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/projects">View My Work</Link>
            </HeroButton>
            
            <HeroButton 
              className="secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/contact">Contact Me</Link>
            </HeroButton>
          </HeroButtons>
        </HeroContent>
        
        <HeroBackgroundShapes>
          <BackgroundShape 
            style={{ 
              width: '400px', 
              height: '400px', 
              background: 'var(--primary-color)', 
              top: '10%', 
              right: '10%' 
            }}
            animate={{ 
              x: [0, 30, 0],
              y: [0, 40, 0], 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 12, 
              ease: "easeInOut" 
            }}
          />
          
          <BackgroundShape 
            style={{ 
              width: '300px', 
              height: '300px', 
              background: 'var(--secondary-color)', 
              bottom: '10%', 
              left: '10%' 
            }}
            animate={{ 
              x: [0, -40, 0],
              y: [0, 30, 0], 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 10, 
              ease: "easeInOut" 
            }}
          />
        </HeroBackgroundShapes>
      </HeroSection>
      
      <FeaturedSection>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          What I <span>Do</span>
        </SectionTitle>
        
        <FeaturedGrid>
          {[
            {
              title: 'Web Development',
              description: 'Building fast, responsive, and interactive websites using modern web technologies like React, TypeScript, and more.'
            },
            {
              title: 'UI/UX Design',
              description: 'Creating beautiful, intuitive interfaces that provide exceptional user experiences and meet business goals.'
            },
            {
              title: 'Animation & Interaction',
              description: 'Bringing websites to life with smooth animations and engaging interactions that enhance user experience.'
            }
          ].map((item, index) => (
            <FeaturedItem
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1 
              }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -10 }}
            >
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </FeaturedItem>
          ))}
        </FeaturedGrid>
      </FeaturedSection>
      
      <SkillsSection>
        <SkillsContainer>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            My <span>Skills</span>
          </SectionTitle>
          
          <SkillsGrid>
            {[
              { name: 'HTML/CSS', icon: FaCode, progress: 95 },
              { name: 'JavaScript', icon: FaLaptopCode, progress: 90 },
              { name: 'React', icon: FaDesktop, progress: 92 },
              { name: 'TypeScript', icon: FaCode, progress: 85 },
              { name: 'Node.js', icon: FaDatabase, progress: 80 },
              { name: 'Responsive', icon: FaMobileAlt, progress: 95 },
              { name: 'UI/UX', icon: FaDesktop, progress: 88 },
              { name: 'Next.js', icon: FaLaptopCode, progress: 82 }
            ].map((skill, index) => (
              <SkillItem
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true, amount: 0.1 }}
              >
                <SkillIcon>
                  <IconWrapper icon={skill.icon} />
                </SkillIcon>
                <SkillName>{skill.name}</SkillName>
                <SkillProgress>
                  <ProgressFill
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.progress}%` }}
                    transition={{ duration: 1, delay: 0.2 + index * 0.05 }}
                    viewport={{ once: true }}
                  />
                </SkillProgress>
              </SkillItem>
            ))}
          </SkillsGrid>
        </SkillsContainer>
      </SkillsSection>
      
      <RecentProjectsSection>
        <ProjectsContainer>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Recent <span>Projects</span>
          </SectionTitle>
          
          <ProjectsGrid>
            {[
              {
                title: 'E-commerce Website',
                category: 'Web Development',
                image: 'https://via.placeholder.com/600x400'
              },
              {
                title: 'Mobile Banking App',
                category: 'UI/UX Design',
                image: 'https://via.placeholder.com/600x400'
              },
              {
                title: 'Portfolio Dashboard',
                category: 'React Application',
                image: 'https://via.placeholder.com/600x400'
              }
            ].map((project, index) => (
              <ProjectCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ y: -10 }}
              >
                <ProjectImage>
                  <img src={project.image} alt={project.title} />
                </ProjectImage>
                <ProjectOverlay>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectCategory>{project.category}</ProjectCategory>
                  <ProjectLink to="/projects">
                    View Details <IconWrapper icon={FaArrowRight} />
                  </ProjectLink>
                </ProjectOverlay>
              </ProjectCard>
            ))}
          </ProjectsGrid>
          
          <div style={{ textAlign: 'center' }}>
            <SeeAllLink to="/projects">
              See all projects <IconWrapper icon={FaArrowRight} />
            </SeeAllLink>
          </div>
        </ProjectsContainer>
      </RecentProjectsSection>
      
      <TestimonialsSection>
        <TestimonialsContainer>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Client <span>Testimonials</span>
          </SectionTitle>
          
          <TestimonialGrid>
            {[
              {
                text: "Aditya is an exceptional developer. He delivered our project ahead of schedule and exceeded our expectations with the quality of his work.",
                author: "Sarah Johnson",
                role: "CEO, TechStart",
                rating: 5
              },
              {
                text: "Working with Aditya was a pleasure. He understood our requirements perfectly and created a beautiful website that perfectly represents our brand.",
                author: "Michael Chen",
                role: "Marketing Director, Innovate",
                rating: 5
              },
              {
                text: "Aditya's technical skills and attention to detail are impressive. He solved complex problems efficiently and communicated clearly throughout the project.",
                author: "Emily Rodriguez",
                role: "Product Manager, DevSolutions",
                rating: 5
              }
            ].map((testimonial, index) => (
              <TestimonialCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <StarsContainer>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <IconWrapper key={i} icon={FaStar} />
                  ))}
                </StarsContainer>
                
                <QuoteIcon>
                  <IconWrapper icon={FaQuoteLeft} />
                </QuoteIcon>
                
                <TestimonialText>"{testimonial.text}"</TestimonialText>
                
                <TestimonialAuthor>
                  <AuthorImage>
                    <img 
                      src={`https://randomuser.me/api/portraits/men/${index + 20}.jpg`} 
                      alt={testimonial.author} 
                    />
                  </AuthorImage>
                  <AuthorInfo>
                    <h4>{testimonial.author}</h4>
                    <p>{testimonial.role}</p>
                  </AuthorInfo>
                </TestimonialAuthor>
              </TestimonialCard>
            ))}
          </TestimonialGrid>
        </TestimonialsContainer>
      </TestimonialsSection>
      
      <StatSection ref={ref}>
        <StatGrid>
          {[
            { number: '5+', text: 'Years Experience' },
            { number: '50+', text: 'Projects Completed' },
            { number: '30+', text: 'Happy Clients' },
            { number: '10+', text: 'Design Awards' }
          ].map((stat, index) => (
            <StatItem
              key={index}
              variants={fadeInUp}
              initial="hidden"
              animate={controls}
              custom={index}
            >
              <h3>{stat.number}</h3>
              <p>{stat.text}</p>
            </StatItem>
          ))}
        </StatGrid>
      </StatSection>
      
      <CTASection>
        <CTAContainer>
          <CTATitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Ready to <span>Work Together</span>?
          </CTATitle>
          
          <CTAText
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Let's collaborate to bring your ideas to life. Whether you need a new website, a redesign, or a custom web application, I'm here to help turn your vision into reality.
          </CTAText>
          
          <CTAButton
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/contact">Get in Touch</Link>
          </CTAButton>
        </CTAContainer>
      </CTASection>
    </HomeContainer>
  );
};

export default Home; 