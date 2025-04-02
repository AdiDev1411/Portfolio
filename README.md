# React Portfolio Website

A modern, animated portfolio website built with React, TypeScript, and Framer Motion. This portfolio showcases beautiful animations, responsive design, and a clean user interface.

## Features

- ✨ Smooth page transitions and animations using Framer Motion
- 🎨 Modern UI design with a dark theme
- 📱 Fully responsive layout for all device sizes
- 🧩 Component-based architecture with TypeScript
- 🔄 Interactive elements and hover effects
- 🖼️ Project showcase with filtering capabilities
- 📝 Functional contact form

## Pages

- **Home** - Introduction with animated elements
- **About** - Personal information, skills, and experience
- **Projects** - Portfolio of work with filtering
- **Contact** - Contact form and information

## Technologies Used

- React
- TypeScript
- Framer Motion (for animations)
- Styled Components (for styling)
- React Router (for navigation)
- React Intersection Observer (for scroll animations)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
```

2. Navigate to the project directory
```bash
cd my-portfolio
```

3. Install dependencies
```bash
npm install
# or
yarn install
```

4. Start the development server
```bash
npm start
# or
yarn start
```

5. Open your browser and visit `http://localhost:3000`

## Customization

### Changing Colors

You can customize the color scheme by editing the CSS variables in `src/styles/GlobalStyles.css`:

```css
:root {
  --primary-color: #7000FF;
  --secondary-color: #00D9FF;
  --background-color: #0A0A0A;
  --text-color: #FFFFFF;
  --accent-color: #FF3D00;
  --gray-color: #333333;
  --light-gray: #555555;
}
```

### Adding Projects

To add new projects, edit the projects array in `src/pages/Projects.tsx`.

### Updating Personal Information

Update your personal information, skills, and experience in the respective component files.

## Deployment

This project can be deployed to various platforms:

### Netlify/Vercel
1. Connect your GitHub repository
2. Set the build command to `npm run build`
3. Set the publish directory to `build`

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
```json
"homepage": "https://yourusername.github.io/repository-name",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```
3. Run `npm run deploy`

## License

This project is licensed under the MIT License.

## Acknowledgements

- Unsplash for placeholder images
- FontAwesome for icons
- Google Fonts for typography
