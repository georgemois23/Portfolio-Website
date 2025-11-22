import { useState } from 'react'
import { Routes, Route,Navigate } from "react-router-dom";
import { Box, Heading, Button } from "@chakra-ui/react";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
// import Gallery from './pages/Gallery';
// import Register from "./pages/Register";
// import NotReady from "./pages/NotReady";
// import Sponsors from "./pages/Sponsors";
// import Videos from "./pages/Videos";
// import Linux from "./pages/LinuxCommands";
// import Blog from "./pages/Blog.jsx";
// import PostPage from './pages/blog/[slug].jsx';
// import Events from './pages/Events.jsx';
// import EventPage from './pages/Events/[slugEvents].jsx';
import Contact from "./pages/Contact";
import Header from "./components/Header/Header";
import ReadMe from "./pages/ReadMe";
import Error404 from "./pages/Error404";
import ScrollToTop from "./components/ScrollToTop";
import './App.css';
// import LinuxCommands from './pages/LinuxCommands.jsx';
import Stars from "./Stars";
function App() {
  const [count, setCount] = useState(0)
   

 return (
  <Box minH="100vh" bg="#000000" color="#D6E3F0" position="relative" overflowY="auto" overflowX={'hidden'} >
          <Stars color="#D6E3F0" background="#000000" />
<Box position="relative" zIndex={1}>

      {/* <ScrollToTop /> */}
        <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/readme" element={<ReadMe />} />
        {/* <Route path="/gallery" element={<Gallery />} /> */}

        {/* <Route path="/*" element={<NotReady/>} /> */}
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<Error404/>} />

        </Route>
        
      </Routes>
      </Box>

      </Box>
      // </>
    );
  }

export default App
