import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronRight, GraduationCap } from 'lucide-react';
import './Hero.css';

const stats = [
  { value: '2015', label: 'Established' },
  { value: '3', label: 'Branches' },
  { value: '500+', label: 'Students' },
];

const scrollTo = (selector) => {
  document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
};

export default function Hero() {
  // Track the real viewport height so the hero fills the first screen accurately
  const [vh, setVh] = useState(() => (typeof window === 'undefined' ? 900 : window.innerHeight));

  useEffect(() => {
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <section id="home" className="hero" style={{ '--hero-vh': `${vh}px` }}>
      {/* Big cinematic photo backdrop */}
      <div className="hero-media" aria-hidden="true">
        <div className="hero-media-panel panel-a">
          <img src="/images/students_refreshment.jpg" alt="" />
        </div>
        <div className="hero-media-panel panel-b">
          <img src="/images/hero_student.jpg" alt="" />
        </div>
        <div className="hero-media-overlay" />
        <div className="hero-media-vignette" />
      </div>

      {/* Crest badge */}
      <motion.div
        className="hero-crest"
        initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <img src="/logo.png" alt="Kingsbridge American College crest" />
      </motion.div>

      <div className="container hero-cine-inner">
        <motion.div
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow-dot" />
          <span>Kingsbridge American College · Reg. PV 103044 · Est. 2015</span>
        </motion.div>

        <motion.h1
          className="hero-cine-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          Nurturing Potential.
          <br />
          <span className="hero-cine-italic">Inspiring Excellence.</span>
        </motion.h1>

        <motion.p
          className="hero-cine-lead"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          An English medium school in Boralesgamuwa, Mattegoda &amp; Horana.
        </motion.p>

        <motion.p
          className="hero-cine-desc"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          From Pre-School through Primary and Secondary — with motherly care and both
          National &amp; Cambridge curriculums, we bring out the best in every single child.
        </motion.p>

        <motion.div
          className="hero-cine-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <button className="btn btn-gold" id="hero-apply-btn" onClick={() => scrollTo('#contact')}>
            <GraduationCap size={18} />
            Admissions Open 2026/27
          </button>
          <button className="btn btn-outline-white" id="hero-programmes-btn" onClick={() => scrollTo('#academics')}>
            Our Programmes
            <ChevronRight size={16} />
          </button>
        </motion.div>
      </div>

      {/* Floating vertical stats, GSC-style */}
      <div className="hero-cine-stats-wrap" aria-hidden="false">
        <motion.div
          className="hero-cine-stats"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          {stats.map((s) => (
            <div className="cine-stat" key={s.label}>
              <span className="cine-stat-val">{s.value}</span>
              <span className="cine-stat-lbl">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.button
        className="hero-scroll-cue"
        onClick={() => scrollTo('#about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        aria-label="Scroll to about section"
      >
        <ChevronDown size={22} />
      </motion.button>
    </section>
  );
}
