import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import AITools from './components/AITools';
import Mentor from './components/Mentor';
import Partners from './components/Partners';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <AITools />
      <Mentor />
      <Partners />
      <Footer />
    </div>
  );
}

export default App;