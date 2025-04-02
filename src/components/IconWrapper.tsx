import React from 'react';
import { IconType } from 'react-icons';

interface IconWrapperProps {
  icon: IconType;
}

const IconWrapper: React.FC<IconWrapperProps> = ({ icon: Icon }) => {
  // Use createElement to avoid JSX TypeScript errors with IconType
  return React.createElement(Icon as React.ElementType);
};

export default IconWrapper; 