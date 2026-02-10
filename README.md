# Cure24 Frontend

A modern, responsive hospital management frontend application built with React and Vite. This application provides a comprehensive user interface for patients to explore hospital services, book appointments, view doctor profiles, and access essential healthcare information.

## Overview

Cure24 Frontend is a professional healthcare web application designed to streamline patient interactions with hospital services. The application features a clean, intuitive interface built with modern web technologies, ensuring optimal performance and user experience across all devices.

## Features

- **Responsive Design**: Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices
- **Service Information**: Comprehensive overview of hospital services and specialties
- **Doctor Profiles**: Detailed information about medical professionals and their specializations
- **Appointment Booking**: Easy-to-use appointment scheduling system
- **Contact System**: Direct communication channel with the hospital
- **Insurance Information**: Details about accepted insurance providers and coverage
- **About Section**: Hospital history, mission, and values
- **Privacy Policy**: Transparent data handling and privacy practices

## Technology Stack

- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Routing**: React Router DOM 7.13.0
- **Styling**: Tailwind CSS 4.1.18
- **Icons**: Lucide React 0.542.0
- **Linting**: ESLint 9.39.1

## 🌐 Live Demo

[Live Demo](https://cure24hospital.netlify.app/)


## Project Structure

```
cure24-frontend/
├── public/                 # Static assets
├── src/
│   ├── assets/
│   │   └── images/        # Image assets
│   ├── components/
│   │   ├── common/        # Reusable components
│   │   │   ├── Footer.jsx
│   │   │   ├── LoadingImage.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── SimplePage.jsx
│   │   └── home/          # Home page specific components
│   │       ├── About.jsx
│   │       ├── CallToAction.jsx
│   │       ├── Hero.jsx
│   │       ├── KeyServices.jsx
│   │       ├── ServicesPreview.jsx
│   │       └── Stats.jsx
│   ├── pages/             # Page components
│   │   ├── About.jsx
│   │   ├── Appointment.jsx
│   │   ├── Contact.jsx
│   │   ├── Doctors.jsx
│   │   ├── Home.jsx
│   │   ├── Insurance.jsx
│   │   ├── Privacy.jsx
│   │   └── Services.jsx
│   ├── App.jsx            # Main application component
│   ├── index.css          # Global styles
│   └── main.jsx           # Application entry point
├── eslint.config.js       # ESLint configuration
├── index.html             # HTML template
├── package.json           # Project dependencies
├── tailwind.config.js     # Tailwind CSS configuration
└── vite.config.js         # Vite configuration
```

## Component Architecture

### Common Components

- **Navbar**: Navigation bar with links to all main pages
- **Footer**: Site footer with contact information and links
- **LoadingImage**: Loading state component for images
- **SimplePage**: Template component for standard page layouts

### Home Page Components

- **Hero**: Main landing section with call-to-action
- **About**: Brief introduction to the hospital
- **KeyServices**: Highlight of main medical services
- **ServicesPreview**: Overview of available healthcare services
- **CallToAction**: Engagement section for patient actions
- **Stats**: Hospital statistics and achievements

### Pages

- **Home**: Main landing page with multiple sections
- **About**: Detailed hospital information
- **Services**: Complete list of medical services
- **Doctors**: Medical staff profiles and specializations
- **Appointment**: Appointment booking interface
- **Contact**: Contact form and hospital location
- **Insurance**: Insurance provider information
- **Privacy**: Privacy policy and data protection details

## Configuration

### Tailwind CSS

Tailwind CSS is configured via `tailwind.config.js`. The configuration uses the Vite plugin for optimal integration and performance.

### Vite

Vite configuration is available in `vite.config.js`. The setup includes React plugin for fast refresh and optimal development experience.

### ESLint

Code quality rules are defined in `eslint.config.js`, including React-specific linting rules and best practices.



## License

This project is private and proprietary. All rights reserved.
@amandhakate27

## Support

For questions or support, please contact the development team or open an issue in the repository.

Built with React and Vite for optimal performance and developer experience.





