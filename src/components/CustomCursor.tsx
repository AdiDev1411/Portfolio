import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CursorWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 999999;
`;

const OuterCursor = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid white;
  mix-blend-mode: difference;
  pointer-events: none;
  z-index: 999999;
  transform: translate(-50%, -50%);
`;

const InnerCursor = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: white;
  mix-blend-mode: difference;
  pointer-events: none;
  z-index: 999999;
  transform: translate(-50%, -50%);
`;

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Add a short delay before showing the cursor to ensure everything is loaded
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    // Track mouse position
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Track mouse clicks
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    // Track hovers over interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    // Add event listeners
    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    // Make sure cursor is visible when the mouse enters the viewport
    document.addEventListener('mouseenter', () => setIsVisible(true));
    document.addEventListener('mouseleave', () => setIsVisible(false));

    // Clean up event listeners on component unmount
    return () => {
      clearTimeout(showTimer);
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseenter', () => setIsVisible(true));
      document.removeEventListener('mouseleave', () => setIsVisible(false));
    };
  }, []);

  return (
    <CursorWrapper>
      <OuterCursor
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isHovering ? 1.5 : isClicked ? 0.8 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          mass: 0.3,
          stiffness: 200,
          damping: 20,
          scale: { duration: 0.2 }
        }}
      />
      <InnerCursor
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isClicked ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          mass: 0.1,
          stiffness: 400,
          damping: 20,
          scale: { duration: 0.2 }
        }}
      />
    </CursorWrapper>
  );
};

export default CustomCursor; 