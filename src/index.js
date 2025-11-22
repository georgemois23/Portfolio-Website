import { ChakraProvider } from '@chakra-ui/react'
import { ThemeProvider } from 'next-themes'
import { createRoot } from 'react-dom/client'
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'

// Import the 'system' you created in the previous step instead of 'theme'
import { system } from './theme/theme.js' 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider value={system}>
        {/* ThemeProvider handles the color mode config now */}
        <ThemeProvider 
          attribute="class" 
          disableTransitionOnChange
          defaultTheme="light"  
          enableSystem={false}  
        >
          <App />
        </ThemeProvider>
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>,
)