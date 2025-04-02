import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: var(--background-color);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden;
  perspective: 1500px;
`;

const LoadingText = styled(motion.h1)`
  color: var(--primary-color);
  font-size: 2.5rem;
  font-weight: 700;
  position: relative;
  text-transform: uppercase;
  letter-spacing: 5px;
  transform-style: preserve-3d;
  
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 3px;
    bottom: -10px;
    left: 0;
    background: var(--primary-color);
    transform-origin: left;
  }
`;

// 3D Shapes with improved styling
const Shape = styled(motion.div)`
  position: absolute;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  pointer-events: none;
  will-change: transform, opacity;
`;

const Cube = styled(Shape)`
  width: 60px;
  height: 60px;
  background: rgba(0, 180, 216, 0.15);
  border: 2px solid var(--primary-color);
  box-shadow: 0 0 15px rgba(0, 180, 216, 0.3);
`;

const Sphere = styled(Shape)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(216, 0, 180, 0.1);
  border: 2px solid #d800b4;
  box-shadow: 0 0 15px rgba(216, 0, 180, 0.3);
`;

const Pyramid = styled(Shape)`
  width: 0;
  height: 0;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-bottom: 50px solid rgba(180, 216, 0, 0.1);
  filter: drop-shadow(0 0 10px rgba(180, 216, 0, 0.3));
`;

const Logo3D = styled(motion.div)`
  font-size: 6rem;
  font-weight: 800;
  color: var(--primary-color);
  transform-style: preserve-3d;
  position: absolute;
  opacity: 0.15;
  text-shadow: 0 0 15px rgba(0, 180, 216, 0.5);
  pointer-events: none;
  will-change: transform;
`;

const ProgressBar = styled(motion.div)`
  width: 300px;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  margin-top: 30px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2) inset;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: var(--primary-color);
  transform-origin: left;
  box-shadow: 0 0 10px var(--primary-color);
`;

const LoadingPercentage = styled(motion.div)`
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-top: 10px;
  font-weight: 500;
`;

// Content wrapper to ensure proper stacking
const ContentWrapper = styled(motion.div)`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const WelcomeContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: var(--background-color);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
  overflow: hidden;
  perspective: 1500px;
`;

const WelcomeContent = styled(motion.div)`
  text-align: center;
  max-width: 800px;
  width: 100%;
  position: relative;
  z-index: 10;
  transform-style: preserve-3d;
`;

const WelcomeTitle = styled(motion.h1)`
  color: var(--primary-color);
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  position: relative;
  transform-style: preserve-3d;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const WelcomeText = styled(motion.p)`
  color: var(--text-color);
  font-size: 1.5rem;
  margin-bottom: 2rem;
  line-height: 1.6;
  position: relative;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const WelcomeButton = styled(motion.button)`
  background: var(--primary-color);
  color: var(--background-color);
  padding: 1rem 3rem;
  border-radius: 30px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 20px rgba(0, 180, 216, 0.4);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.5);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%);
    transform-origin: 50% 50%;
  }
  
  &:hover::after {
    animation: ripple 1s ease-out;
  }
  
  @keyframes ripple {
    0% {
      transform: scale(0, 0);
      opacity: 0.5;
    }
    100% {
      transform: scale(20, 20);
      opacity: 0;
    }
  }
`;

const LoadingDots = styled(motion.div)`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Dot = styled(motion.div)`
  width: 8px;
  height: 8px;
  background: var(--primary-color);
  border-radius: 50%;
`;

// Add particle styles
const Particle = styled(motion.div)`
  position: absolute;
  background: ${props => props.color || 'var(--primary-color)'};
  border-radius: 50%;
  pointer-events: none;
`;

const BackgroundGlow = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 40vw;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0,180,216,0.1) 0%, rgba(0,180,216,0) 70%);
  z-index: 1;
  pointer-events: none;
`;

const WelcomeScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress with more natural easing
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Slow down progress as it approaches 100% for more realistic loading
        const increment = prev < 50 ? 7 : prev < 80 ? 5 : prev < 95 ? 2 : 1;
        return Math.min(prev + increment, 100);
      });
    }, 180);

    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      setShowWelcome(true);
    }, 5000);

    const welcomeTimer = setTimeout(() => {
      setShowWelcome(false);
    }, 9500);

    return () => {
      clearInterval(interval);
      clearTimeout(loadingTimer);
      clearTimeout(welcomeTimer);
    };
  }, []);

  // Optimized floating animation with reduced complexity
  const floatingAnimation = {
    initial: { opacity: 0, scale: 0 },
    animate: (index: number) => ({
      opacity: 0.7,
      scale: 1,
      x: Math.sin(index * 0.4) * 70,
      y: Math.sin(index * 0.5) * 70,
      rotateX: Math.sin(index) * 90,
      rotateY: Math.cos(index) * 90,
      rotateZ: Math.sin(index * 0.7) * 45,
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut",
        delay: index * 0.3
      }
    })
  };

  // Simplified 3D Logo Animation
  const logoAnimation = {
    initial: { opacity: 0, scale: 0.8, rotateY: 0 },
    animate: {
      opacity: 0.15,
      scale: 1,
      rotateY: 360,
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  // Animation for the progress bar
  const progressAnimation = {
    width: `${progress}%`,
    transition: { duration: 0.3, ease: "easeOut" }
  };

  // Use the type casting approach
  const AnimatePresenceWithFix = AnimatePresence as any;

  // Reduced number of shapes for better performance
  const shapes = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    type: i % 3 === 0 ? "cube" : i % 3 === 1 ? "sphere" : "pyramid",
    position: {
      top: `${Math.random() * 70 + 15}%`,
      left: `${Math.random() * 70 + 15}%`,
      zIndex: i < 4 ? -1 : 1
    }
  }));

  return (
    <>
      {isLoading && (
        <AnimatePresenceWithFix>
          <LoadingContainer
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              rotateX: 30,
              rotateY: 30,
              scale: 0.9
            }}
            transition={{ duration: 0.8 }}
          >
            {/* Background 3D Logo */}
            <Logo3D
              variants={logoAnimation}
              initial="initial"
              animate="animate"
              style={{ transform: 'translateZ(50px)' }}
            >
              AA
            </Logo3D>
            
            {/* 3D Floating Shapes - rendered before content for proper stacking */}
            {shapes.map((shape, index) => {
              if (shape.type === "cube") {
                return (
                  <Cube 
                    key={shape.id}
                    style={shape.position}
                    variants={floatingAnimation}
                    initial="initial"
                    animate="animate"
                    custom={index}
                  />
                );
              } else if (shape.type === "sphere") {
                return (
                  <Sphere 
                    key={shape.id}
                    style={shape.position}
                    variants={floatingAnimation}
                    initial="initial"
                    animate="animate"
                    custom={index}
                  />
                );
              } else {
                return (
                  <Pyramid 
                    key={shape.id}
                    style={shape.position}
                    variants={floatingAnimation}
                    initial="initial"
                    animate="animate"
                    custom={index}
                  />
                );
              }
            })}

            {/* Content wrapper ensures proper stacking */}
            <ContentWrapper
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <LoadingText
                initial={{ opacity: 0, rotateX: -20 }}
                animate={{ 
                  opacity: 1, 
                  rotateX: 0,
                  textShadow: [
                    "0 0 5px rgba(0, 180, 216, 0.3)",
                    "0 0 15px rgba(0, 180, 216, 0.5)",
                    "0 0 5px rgba(0, 180, 216, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              >
                Loading
              </LoadingText>

              <ProgressBar>
                <ProgressFill 
                  animate={progressAnimation}
                />
              </ProgressBar>
              
              <LoadingPercentage
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {progress}%
              </LoadingPercentage>
            </ContentWrapper>
          </LoadingContainer>
        </AnimatePresenceWithFix>
      )}

      {showWelcome && (
        <AnimatePresenceWithFix>
          <WelcomeContainer
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Background glow effect */}
            <BackgroundGlow
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 0.8, 
                scale: 1.2,
                x: [0, 30, -30, 0],
                y: [0, -30, 30, 0]
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            {/* Particles */}
            {Array.from({ length: 20 }).map((_, i) => (
              <Particle
                key={`particle-${i}`}
                color={i % 3 === 0 
                  ? 'rgba(0, 180, 216, 0.6)' 
                  : i % 3 === 1 
                    ? 'rgba(216, 180, 0, 0.3)' 
                    : 'rgba(216, 0, 180, 0.3)'
                }
                style={{
                  width: Math.random() * 10 + 3,
                  height: Math.random() * 10 + 3,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.8, 0],
                  y: [0, -Math.random() * 100 - 50],
                  x: [0, (Math.random() - 0.5) * 50],
                  scale: [1, Math.random() + 0.5, 0],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "easeInOut"
                }}
              />
            ))}
            
            <WelcomeContent
              initial={{ opacity: 0, rotateX: 30, y: 50 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              exit={{ opacity: 0, rotateX: -30, y: -50 }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 15,
                duration: 0.8 
              }}
            >
              <WelcomeTitle
                initial={{ opacity: 0, y: -50, rotateY: -20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  rotateY: 0,
                  textShadow: [
                    "0 0 0px rgba(0, 180, 216, 0)",
                    "0 0 10px rgba(0, 180, 216, 0.5)",
                    "0 0 0px rgba(0, 180, 216, 0)"
                  ]
                }}
                transition={{ 
                  delay: 0.3,
                  duration: 1,
                  textShadow: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 3
                  }
                }}
              >
                Welcome to My Portfolio
              </WelcomeTitle>
              
              <WelcomeText
                initial={{ opacity: 0, scale: 0.8, z: -100 }}
                animate={{ opacity: 1, scale: 1, z: 0 }}
                transition={{ 
                  delay: 0.6,
                  type: "spring", 
                  stiffness: 50
                }}
              >
                I'm Aditya Avlani, a passionate web developer crafting beautiful and functional digital experiences
              </WelcomeText>
              
              <WelcomeButton
                initial={{ opacity: 0, y: 50 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  boxShadow: [
                    "0 0 0 rgba(0, 180, 216, 0)",
                    "0 0 20px rgba(0, 180, 216, 0.7)",
                    "0 0 0 rgba(0, 180, 216, 0)"
                  ]
                }}
                transition={{ 
                  delay: 0.9,
                  duration: 0.5,
                  boxShadow: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 2
                  }
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  boxShadow: "0 10px 25px rgba(0, 180, 216, 0.6)" 
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowWelcome(false)}
              >
                Explore My Work
              </WelcomeButton>
            </WelcomeContent>
          </WelcomeContainer>
        </AnimatePresenceWithFix>
      )}
    </>
  );
};

export default WelcomeScreen; 