import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

const ProjectsContainer = styled.div`
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
    background: url('https://source.unsplash.com/random/1600x800/?tech,code') center/cover no-repeat;
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

const ProjectsSection = styled.section`
  padding: 5rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const FilterButtons = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
`;

const FilterButton = styled(motion.button)<{ isActive?: boolean }>`
  background: ${props => props.isActive ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.isActive ? 'white' : 'var(--text-color)'};
  border: 1px solid ${props => props.isActive ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.1)'};
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
  }
  
  &.active {
    background: var(--primary-color);
    color: white;
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border-color: var(--primary-color);
  }
`;

const ProjectImage = styled.div`
  position: relative;
  height: 220px;
  
  img {
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
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 50%);
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const ProjectDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const ProjectTag = styled.span`
  background: rgba(255, 255, 255, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.9);
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const ProjectLink = styled(motion.a)`
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &.live {
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    color: var(--text-color);
  }
  
  &.code {
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: var(--text-color);
    
    &:hover {
      border-color: var(--primary-color);
    }
  }
  
  &:hover {
    transform: translateY(-3px);
  }
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: 3rem;
  color: rgba(255, 255, 255, 0.6);
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

interface ProjectData {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string[];
  tags: string[];
  liveLink: string;
  codeLink: string;
}

const Projects: React.FC = () => {
  const projects: ProjectData[] = [
    {
      id: 1,
      title: 'E-Commerce Website',
      description: 'A modern e-commerce platform with product filtering, cart functionality, and payment processing.',
      image: 'https://source.unsplash.com/random/600x400/?ecommerce,shop',
      category: ['web', 'frontend'],
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      liveLink: 'https://example.com',
      codeLink: 'https://github.com'
    },
    {
      id: 2,
      title: 'Portfolio Template',
      description: 'A customizable portfolio template for creatives with smooth animations and responsive design.',
      image: 'https://source.unsplash.com/random/600x400/?portfolio,design',
      category: ['web', 'ui/ux'],
      tags: ['React', 'Framer Motion', 'Styled Components'],
      liveLink: 'https://example.com',
      codeLink: 'https://github.com'
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'A weather application with real-time data visualization and location-based forecasts.',
      image: 'https://source.unsplash.com/random/600x400/?weather,cloud',
      category: ['web', 'mobile'],
      tags: ['React Native', 'API Integration', 'Charts'],
      liveLink: 'https://example.com',
      codeLink: 'https://github.com'
    },
    {
      id: 4,
      title: 'Task Management App',
      description: 'A productivity application with drag-and-drop functionality, filters, and user authentication.',
      image: 'https://source.unsplash.com/random/600x400/?task,productivity',
      category: ['mobile', 'ui/ux'],
      tags: ['React', 'Firebase', 'Drag & Drop'],
      liveLink: 'https://example.com',
      codeLink: 'https://github.com'
    },
    {
      id: 5,
      title: 'Social Media Dashboard',
      description: 'An analytics dashboard for social media with data visualization and reporting features.',
      image: 'https://source.unsplash.com/random/600x400/?dashboard,analytics',
      category: ['web', 'frontend'],
      tags: ['Vue.js', 'D3.js', 'Firebase'],
      liveLink: 'https://example.com',
      codeLink: 'https://github.com'
    },
    {
      id: 6,
      title: 'Recipe Finder App',
      description: 'A mobile application for finding recipes based on ingredients, dietary preferences, and cooking time.',
      image: 'https://source.unsplash.com/random/600x400/?food,recipe',
      category: ['mobile'],
      tags: ['React Native', 'API Integration', 'Firebase'],
      liveLink: 'https://example.com',
      codeLink: 'https://github.com'
    },
  ];
  
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>(projects);
  
  const handleFilterClick = (category: string) => {
    setActiveFilter(category);
    
    if (category === 'all') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => 
        project.category.includes(category)
      );
      setFilteredProjects(filtered);
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut" 
      }
    },
    exit: { 
      opacity: 0, 
      y: 50,
      transition: { 
        duration: 0.3,
        ease: "easeIn" 
      }
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  // Use the type casting approach
  const AnimatePresenceWithFix = AnimatePresence as any;

  return (
    <ProjectsContainer>
      <PageHeader>
        <PageTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My <span>Projects</span>
        </PageTitle>
        <PageDescription
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Explore my portfolio of web development projects and creative works.
        </PageDescription>
      </PageHeader>
      
      <ProjectsSection>
        <Container>
          <FilterButtons
            as={motion.div}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {['all', 'web', 'mobile', 'ui/ux', 'frontend'].map((category, index) => (
              <FilterButton
                key={index}
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleFilterClick(category)}
                isActive={activeFilter === category}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </FilterButton>
            ))}
          </FilterButtons>
          
          {filteredProjects.length > 0 ? (
            <AnimatePresenceWithFix mode="wait">
              <ProjectsGrid
                key="projects-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    variants={cardVariants}
                    whileHover={{ y: -10 }}
                  >
                    <ProjectImage>
                      <img src={project.image} alt={project.title} />
                    </ProjectImage>
                    <ProjectContent>
                      <ProjectTitle>{project.title}</ProjectTitle>
                      <ProjectDescription>{project.description}</ProjectDescription>
                      
                      <ProjectTags>
                        {project.tags.map((tag, index) => (
                          <ProjectTag key={index}>{tag}</ProjectTag>
                        ))}
                      </ProjectTags>
                      
                      <ProjectLinks>
                        <ProjectLink 
                          href={project.liveLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="live"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Live Demo
                        </ProjectLink>
                        <ProjectLink 
                          href={project.codeLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="code"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Code
                        </ProjectLink>
                      </ProjectLinks>
                    </ProjectContent>
                  </ProjectCard>
                ))}
              </ProjectsGrid>
            </AnimatePresenceWithFix>
          ) : (
            <EmptyState
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3>No projects found in this category</h3>
              <p>Try selecting a different category from the filter options.</p>
            </EmptyState>
          )}
        </Container>
      </ProjectsSection>
    </ProjectsContainer>
  );
};

export default Projects; 