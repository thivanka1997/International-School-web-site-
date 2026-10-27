import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Stats from './components/Stats';
import Academics from './components/Academics';
import Principal from './components/Principal';
import SchoolLife from './components/SchoolLife';
import Gallery from './components/Gallery';
import News from './components/News';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handler = () => setShowScroll(window.scrollY > 400);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stats />
        <Academics />
        <SchoolLife />
        <Principal />
        <Gallery />
        <News />
        <Contact />
      </main>
      <Footer />

      {/* Scroll to top */}
      <button
        className={`scroll-top ${showScroll ? 'visible' : ''}`}
        id="scroll-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
}
