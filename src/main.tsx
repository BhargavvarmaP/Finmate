import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@/contexts/ThemeContext';
import App from './App';
import './styles/animations.css'; // Import custom animations
import './styles/globals.css';  // Updated import

// Find the root element in the DOM
const rootElement = document.getElementById('root');

// Ensure the root element exists before rendering the app
if (rootElement) {
  // Create a root for React to render into
  const root = ReactDOM.createRoot(rootElement);

  // Render the App component inside React.StrictMode
  root.render(
    <React.StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  );
} else {
  // Handle the case where the root element is not found
  console.error('Failed to find the root element. Make sure an element with ID "root" exists in your HTML.');
}