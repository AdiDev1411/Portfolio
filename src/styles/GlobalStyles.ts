import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    primary: '#00b4d8',
    secondary: '#00ff88',
    background: '#0a0a0a',
    text: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px',
  },
};

export const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: ${theme.colors.primary};
    --secondary-color: ${theme.colors.secondary};
    --background-color: ${theme.colors.background};
    --text-color: ${theme.colors.text};
    --text-secondary: ${theme.colors.textSecondary};
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.6;
    overflow-x: hidden;
  }

  /* Hide default cursor for custom cursor effect */
  @media (pointer: fine) {
    body.cursor-active * {
      cursor: none !important;
    }
    
    /* Only show default cursor when interacting with form elements that need it */
    body.cursor-active input[type="text"],
    body.cursor-active input[type="email"],
    body.cursor-active input[type="password"],
    body.cursor-active input[type="search"],
    body.cursor-active input[type="date"],
    body.cursor-active input[type="time"],
    body.cursor-active input[type="datetime-local"],
    body.cursor-active input[type="month"],
    body.cursor-active input[type="week"],
    body.cursor-active input[type="number"],
    body.cursor-active input[type="tel"],
    body.cursor-active input[type="url"],
    body.cursor-active textarea,
    body.cursor-active select,
    body.cursor-active [contenteditable="true"] {
      cursor: text !important;
    }
    
    body.cursor-active select,
    body.cursor-active input[type="checkbox"],
    body.cursor-active input[type="radio"],
    body.cursor-active input[type="range"],
    body.cursor-active input[type="color"],
    body.cursor-active input[type="file"],
    body.cursor-active input[type="submit"],
    body.cursor-active input[type="button"],
    body.cursor-active input[type="reset"] {
      cursor: pointer !important;
    }
  }

  a {
    color: var(--text-color);
    text-decoration: none;
    transition: color 0.3s ease;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`; 