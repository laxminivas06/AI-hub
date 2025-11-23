import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import AITools from './components/AITools';
import ToolDetail from './components/ToolDetail';
import Mentor from './components/Mentor';
import Partners from './components/Partners';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navigation />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <AITools />
              <Mentor />
              <Partners />
            </>
          } />
          <Route path="/tool/:toolId" element={<ToolDetail />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;