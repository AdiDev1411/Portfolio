import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, 
  FaFigma, FaGithub, FaGitAlt, FaDatabase 
} from 'react-icons/fa';
import { 
  SiTypescript, SiNextdotjs, SiGraphql, 
  SiTailwindcss, SiStyledcomponents, SiFramer 
} from 'react-icons/si';
import IconWrapper from '../components/IconWrapper';

const AboutContainer = styled.div`
  padding: 120px 0 80px;
  overflow: hidden;
`;

const PageHeader = styled.div`
  background: rgba(10, 10, 10, 0.9);
  padding: 4rem 1.5rem;
  text-align: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://source.unsplash.com/random/1600x800/?dark,abstract') center/cover no-repeat;
    opacity: 0.2;
    z-index: -1;
  }
`;

const PageTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: 700;
  margin-bottom: 1rem;
  
  span {
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const PageDescription = styled(motion.p)`
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
`;

const AboutSection = styled.section`
  padding: 5rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 2fr;
    align-items: flex-start;
  }
`;

const AboutImage = styled(motion.div)`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  height: 350px;
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    pointer-events: none;
  }
`;

const ImageBox = styled.div`
  position: relative;
  padding: 0.5rem;
  height: 100%;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 50%;
    border-top: 2px solid var(--primary-color);
    border-left: 2px solid var(--primary-color);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
    height: 50%;
    border-bottom: 2px solid var(--secondary-color);
    border-right: 2px solid var(--secondary-color);
  }
`;

const AboutContent = styled.div`
  h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 50px;
      height: 2px;
      background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    }
  }
  
  p {
    margin-bottom: 1.5rem;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.8);
  }
`;

const SkillsContainer = styled.div`
  margin-top: 2rem;
`;

const SkillsTitle = styled(motion.h3)`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1.5rem;
`;

const SkillItem = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-5px);
    border-color: var(--primary-color);
    background: rgba(255, 255, 255, 0.08);
  }
  
  svg {
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
  }
  
  h4 {
    margin: 0;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.9);
  }
`;

const TimelineSection = styled.section`
  padding: 5rem 0;
  background-color: #0c0c0c;
`;

const TimelineContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, var(--primary-color), var(--secondary-color));
    
    @media (max-width: 768px) {
      left: 30px;
    }
  }
`;

const TimelineTitle = styled(motion.h2)`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 3rem;
  
  span {
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  margin-bottom: 3rem;
  width: 50%;
  padding: 0 2rem;
  
  &:nth-child(odd) {
    margin-left: auto;
    
    &::before {
      left: 0;
    }
  }
  
  &:nth-child(even) {
    &::before {
      right: 0;
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    width: 12px;
    height: 12px;
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    border-radius: 50%;
    transform: translateX(-50%);
    
    @media (max-width: 768px) {
      left: 30px !important;
    }
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding-left: 60px;
    padding-right: 1rem;
    
    &:nth-child(odd) {
      margin-left: 0;
    }
  }
`;

const TimelineContent = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
  
  .date {
    font-size: 0.9rem;
    color: var(--secondary-color);
    margin-bottom: 1rem;
    font-weight: 500;
  }
  
  p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
  }
`;

const About: React.FC = () => {
  const skills = [
    { name: 'HTML5', icon: <IconWrapper icon={FaHtml5} /> },
    { name: 'CSS3', icon: <IconWrapper icon={FaCss3Alt} /> },
    { name: 'JavaScript', icon: <IconWrapper icon={FaJs} /> },
    { name: 'TypeScript', icon: <IconWrapper icon={SiTypescript} /> },
    { name: 'React', icon: <IconWrapper icon={FaReact} /> },
    { name: 'Next.js', icon: <IconWrapper icon={SiNextdotjs} /> },
    { name: 'Node.js', icon: <IconWrapper icon={FaNodeJs} /> },
    { name: 'GraphQL', icon: <IconWrapper icon={SiGraphql} /> },
    { name: 'Figma', icon: <IconWrapper icon={FaFigma} /> },
    { name: 'Framer Motion', icon: <IconWrapper icon={SiFramer} /> },
    { name: 'TailwindCSS', icon: <IconWrapper icon={SiTailwindcss} /> },
    { name: 'Styled Components', icon: <IconWrapper icon={SiStyledcomponents} /> }
  ];
  
  const experiences = [
    {
      title: 'Senior Frontend Developer',
      company: 'Tech Solutions Inc.',
      date: '2020 - Present',
      description: 'Leading frontend development for various client projects, implementing modern UI designs and optimizing performance.'
    },
    {
      title: 'Frontend Developer',
      company: 'Digital Agency XYZ',
      date: '2018 - 2020',
      description: 'Developed responsive websites and web applications for various clients across different industries.'
    },
    {
      title: 'UI/UX Designer',
      company: 'Creative Studio',
      date: '2016 - 2018',
      description: 'Created user interfaces and experiences for web and mobile applications focusing on user-centric design.'
    }
  ];
  
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
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  return (
    <AboutContainer>
      <PageHeader>
        <PageTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About <span>Me</span>
        </PageTitle>
        <PageDescription
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Get to know more about me, my experience, and my journey in web development.
        </PageDescription>
      </PageHeader>
      
      <AboutSection>
        <Container>
          <AboutGrid>
            <AboutImage
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <ImageBox>
                <img 
                  src={`${process.env.PUBLIC_URL}/assets/images/profile.jpg`}
                  alt="Aditya Avlani"
                />
              </ImageBox>
            </AboutImage>
            
            <AboutContent>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                Who Am I?
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <p>
                  Hello! I'm Aditya Avlani, a creative frontend developer passionate about building beautiful, 
                  interactive websites with clean, efficient code and intuitive user experiences.
                </p>
                <p>
                  With a background in both design and development, I bridge the gap between 
                  aesthetics and functionality, creating websites that not only look good but 
                  also perform exceptionally well. I specialize in modern JavaScript frameworks 
                  like React, and I'm constantly exploring new technologies and techniques to 
                  enhance my skills.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new design trends, 
                  experimenting with creative animations, or enjoying outdoor activities 
                  to recharge my creative energy.
                </p>
              </motion.div>
              
              <SkillsContainer>
                <SkillsTitle
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  My Skills
                </SkillsTitle>
                
                <SkillsGrid
                  as={motion.div}
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {skills.map((skill, index) => (
                    <SkillItem
                      key={index}
                      variants={fadeInUp}
                      whileHover={{ y: -5, scale: 1.05 }}
                    >
                      {skill.icon}
                      <h4>{skill.name}</h4>
                    </SkillItem>
                  ))}
                </SkillsGrid>
              </SkillsContainer>
            </AboutContent>
          </AboutGrid>
        </Container>
      </AboutSection>
      
      <TimelineSection>
        <TimelineTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          My <span>Experience</span>
        </TimelineTitle>
        
        <TimelineContainer>
          {experiences.map((exp, index) => (
            <TimelineItem
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <TimelineContent>
                <h3>{exp.title}</h3>
                <div className="date">{exp.date} | {exp.company}</div>
                <p>{exp.description}</p>
              </TimelineContent>
            </TimelineItem>
          ))}
        </TimelineContainer>
      </TimelineSection>
    </AboutContainer>
  );
};

export default About; 