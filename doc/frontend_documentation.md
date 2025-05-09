# Recipe GPT Frontend Documentation

## Project Overview
Recipe GPT is a React-based AI food recipe website that generates personalized recipes based on user inputs like main ingredients, cuisine type, calorie requirements, and special dietary needs. The application uses Google's Gemini AI to generate the recipes and provides a clean, modern interface with a food-themed color scheme.

## Tech Stack

### Core Technologies
- **React 17**: Frontend JavaScript library for building user interfaces
- **Vite**: Modern frontend build tool that provides faster development experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **DaisyUI**: Component library built on top of Tailwind CSS

### Supporting Libraries
- **@google/genai**: Google's Generative AI client library for JavaScript
- **@headlessui/react**: Unstyled, fully accessible UI components
- **i18next**: Internationalization framework
- **i18next-browser-languagedetector**: Auto-detects user language
- **react-i18next**: React bindings for i18next

### Backend (Node.js)
- **Express**: Web application framework for Node.js
- **dotenv**: Environment variable management
- **cors**: Cross-Origin Resource Sharing middleware

## Project Structure

```
recipe_gpt/
├── src/                      # Frontend source code
│   ├── components/           # React components
│   │   ├── ErrorAlert.jsx    # Error display component
│   │   ├── HeadlessDropdown.jsx  # Dropdown component
│   │   ├── LanguageSwitcher.jsx  # Language switching component
│   │   ├── LoadingBlock.jsx  # Loading indicator component
│   │   ├── RecipeForm.jsx    # Form for recipe inputs
│   │   └── RecipeResult.jsx  # Recipe result display
│   ├── i18n/                 # Internationalization resources
│   ├── utils/                # Utility functions
│   ├── api.js                # API service for Gemini integration
│   ├── App.jsx               # Main application component
│   ├── index.css             # Global CSS styles
│   └── main.jsx              # Application entry point
├── server/                   # Backend server code
│   └── index.js              # Express server for Gemini API proxy
├── public/                   # Public static assets
├── index.html                # HTML entry point
├── tailwind.config.js        # Tailwind CSS configuration
├── vite.config.js            # Vite configuration
├── postcss.config.js         # PostCSS configuration
└── package.json              # Project dependencies and scripts
```

## Color Scheme
The application uses a warm, appetizing color palette appropriate for a food website:

- **Primary**: #E67E22 (vibrant orange) - Used for main navigation bar
- **Secondary**: #2ECC71 (fresh green) - Used for buttons and CTAs
- **Accent**: #3498DB (blue accent) - Used for highlights and interactive elements
- **Background**: Light colors (#F8F9FA, #ECF0F1) - Used for page backgrounds
- **Text**: Dark slate (#2A303C) - Used for readable text content

## Key Components

### App.jsx
The main application component that handles:
- Overall layout (navbar, content, footer)
- State management for recipe generation
- Form submission and API calls
- Display of loading states and results

### RecipeForm
Handles user input for:
- Main ingredient selection
- Cuisine type selection
- Calorie requirements
- Special dietary needs

### RecipeResult
Displays the generated recipe with:
- Recipe title
- Ingredients list
- Cooking instructions
- Nutritional information

### LoadingBlock
Provides feedback during the AI generation process with:
- Animated loading indicators
- Contextual messages based on user inputs

### LanguageSwitcher
Allows users to switch between supported languages.

## API Integration

The frontend communicates with a Node.js/Express backend server that serves as a proxy to the Google Gemini AI API. The main API functions include:

1. **fetchGemini**: Sends recipe generation requests to the backend
2. **API Endpoints**:
   - `/api/gemini`: Main endpoint for recipe generation
   - `/api/gemini/short-sentence`: Generates personalized loading messages

## Development Scripts

- **dev:client**: Starts the Vite development server
- **dev:server**: Starts the Express backend server
- **dev**: Runs both client and server concurrently
- **build**: Creates a production build
- **preview**: Previews the production build locally

## Internationalization

The application supports multiple languages using i18next. Language resources are stored in the i18n directory and automatically detect the user's browser language.
