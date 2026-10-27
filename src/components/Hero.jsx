import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronRight, GraduationCap } from 'lucide-react';
import './Hero.css';

const stats = [
  { value: '2015', label: 'Established' },
  { value: '3', label: 'Branches' },
  { value: '500+', label: 'Students' },
];

// Hero slideshow photos. `pos` is the object-position used when a photo is cropped.
const slides = [
  { src: '/images/hero/kids_friends.jpg', alt: 'Kingsbridge students laughing together in their sports uniform', pos: 'center 35%' },
  { src: '/images/hero/graduation.jpg', alt: 'Young graduates in white caps and gowns', pos: 'center 40%' },
  { src: '/images/hero/stage_dance.jpg', alt: 'Students performing a dance on stage', pos: 'center 30%' },
  { src: '/images/hero/playground.jpg', alt: 'Smiling students on the playground slide', pos: 'center 35%' },
  { src: '/images/hero/sports_day.jpg', alt: 'A happy student at sports day', pos: 'center 30%' },
  { src: '/images/hero/classroom.jpg', alt: 'Students learning in the classroom', pos: '35% center' },
  { src: '/images/hero/grand_steps_peace.jpg', alt: '2026 Grand Steps concert – The Candle of Peace', pos: 'center 55%' },
];

const SLIDE_MS = 5000;

const scrollTo = (selector) => {
  document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
};

function SlideDots({ active, onSelect, className }) {
  return (
    <div className={`hero-dots ${className}`} role="tablist" aria-label="Choose photo">
      {slides.map((s, i) => (
        <button
          key={s.src}
          type="button"
          role="tab"
          aria-selected={i === active}
          aria-label={`Show photo ${i + 1} of ${slides.length}`}
          className={`hero-dot ${i === active ? 'active' : ''}`}
          onClick={() => onSelect(i)}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  // Track the real viewport height so the hero fills the first screen accurately
  const [vh, setVh] = useState(() => (typeof window === 'undefined' ? 900 : window.innerHeight));
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Auto-advance; restarting the timer whenever the slide changes means a dot click gets a full 5 s
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setActive((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [active, paused]);

  return (
    <section id="home" className="hero" style={{ '--hero-vh': `${vh}px` }}>
      {/* Full-bleed backdrop: blurred on desktop (behind the photo card), sharp on phones */}
      <div className="hero-media" aria-hidden="true">
        {slides.map((s, i) => (
          <div key={s.src} className={`hero-bg-slide ${i === active ? 'active' : ''}`}>
            <img src={s.src} alt="" style={{ objectPosition: s.pos }} />
          </div>
        ))}
        <div className="hero-media-overlay" />
        <div className="hero-media-vignette" />
      </div>

      {/* Crest badge (phones only – the navbar logo covers desktop) */}
      <motion.div
        className="hero-crest"
        initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <img src="/logo.png" alt="Kingsbridge American College crest" />
      </motion.div>

      <div className="container hero-layout">
        <div className="hero-cine-inner">
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

          <motion.div
            className="hero-cine-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {stats.map((s) => (
              <div className="cine-stat" key={s.label}>
                <span className="cine-stat-val">{s.value}</span>
                <span className="cine-stat-lbl">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Framed slideshow card (desktop) */}
        <motion.div
          className="hero-frame"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="hero-frame-photos">
            {slides.map((s, i) => (
              <img
                key={s.src}
                src={s.src}
                alt={s.alt}
                className={`hero-frame-img ${i === active ? 'active' : ''}`}
                style={{ objectPosition: s.pos }}
                aria-hidden={i !== active}
              />
            ))}
          </div>
          <SlideDots active={active} onSelect={setActive} className="hero-dots-frame" />
        </motion.div>
      </div>

      <SlideDots active={active} onSelect={setActive} className="hero-dots-mobile" />

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
