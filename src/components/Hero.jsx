import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import './Hero.css';

const stats = [
  { value: '2015', label: 'Established' },
  { value: '10+', label: 'Years', inline: true },
  { value: '500+', label: 'Students' },
];

// Large photos that slowly crossfade behind the headline
const backdrops = [
  { src: '/img/hero/kids_friends.webp', pos: 'center 35%' },
  { src: '/img/hero/grand_steps_peace.webp', pos: 'center 55%' },
  { src: '/img/hero_student.webp', pos: 'center 30%' },
];

// Photo strip along the bottom of the hero (scrolls continuously)
const filmstrip = [
  { src: '/img/thumbs/hero/kids_friends.webp', alt: 'Students laughing together' },
  { src: '/img/thumbs/hero/classroom.webp', alt: 'Students learning in class' },
  { src: '/img/thumbs/hero/stage_dance.webp', alt: 'Stage dance performance' },
  { src: '/img/thumbs/students_refreshment.webp', alt: 'Students sharing refreshments' },
  { src: '/img/thumbs/hero/graduation.webp', alt: 'Young graduates in caps and gowns' },
  { src: '/img/thumbs/animal_costumes.webp', alt: 'Animal costume day' },
  { src: '/img/thumbs/school-life/reading_together.webp', alt: 'Students reading a book together' },
  { src: '/img/thumbs/cultural_event.webp', alt: 'Traditional games day' },
  { src: '/img/thumbs/hero/grand_steps_peace.webp', alt: '2026 Grand Steps concert' },
  { src: '/img/thumbs/principal_motherly_care.webp', alt: 'Principal with a student' },
  { src: '/img/thumbs/hero/sports_day.webp', alt: 'Sports day' },
  { src: '/img/thumbs/hero_student.webp', alt: 'Student playing outdoors' },
  { src: '/img/thumbs/principal_walking_students.webp', alt: 'Principal walking with students' },
];

const BACKDROP_MS = 7000;
const INTRO_DELAY = 1.4; // seconds the intro title shows before the content arrives

const scrollTo = (selector) => {
  document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
};

export default function Hero() {
  // Track the real viewport height so the hero fills the first screen accurately
  const [vh, setVh] = useState(() => (typeof window === 'undefined' ? 900 : window.innerHeight));
  const [bg, setBg] = useState(0);
  // Backdrops are added one slide ahead, so only the first photo loads up front
  const [loadedBgs, setLoadedBgs] = useState(2);
  const reduceMotion = useReducedMotion();
  const delay = reduceMotion ? 0 : INTRO_DELAY;

  useEffect(() => {
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setBg((i) => (i + 1) % backdrops.length);
      setLoadedBgs((n) => Math.min(backdrops.length, n + 1));
    }, BACKDROP_MS);
    return () => clearInterval(t);
  }, []);

  const rise = (d) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: delay + d, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section id="home" className="hero" style={{ '--hero-vh': `${vh}px` }}>
      {/* Dim photo backdrop */}
      <div className="hero-media" aria-hidden="true">
        {backdrops.slice(0, loadedBgs).map((b, i) => (
          <img
            key={b.src}
            src={b.src}
            alt=""
            fetchPriority={i === 0 ? 'high' : 'low'}
            className={`hero-bg ${i === bg ? 'active' : ''}`}
            style={{ objectPosition: b.pos }}
          />
        ))}
        <div className="hero-media-overlay" />
      </div>

      {/* Intro title: big gold name + motto, fades away as the content arrives */}
      {!reduceMotion && (
        <motion.div
          className="hero-intro"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3.4, times: [0, 0.2, 0.55, 1], ease: 'easeInOut' }}
        >
          <motion.span
            className="hero-intro-name"
            initial={{ letterSpacing: '0.02em' }}
            animate={{ letterSpacing: '0.08em' }}
            transition={{ duration: 3.4, ease: 'easeOut' }}
          >
            Kingsbridge American College
          </motion.span>
          <span className="hero-intro-motto">“Excellence in Diversity”</span>
        </motion.div>
      )}

      {/* Registration seal */}
      <motion.div
        className="hero-seal"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: delay + 0.5 }}
      >
        <span className="hero-seal-star">✦</span>
        <span className="hero-seal-text">Govt. Reg.<br />PV 103044</span>
        <span className="hero-seal-year">2015</span>
      </motion.div>

      <div className="container hero-main">
        <div className="hero-copy">
          <motion.h1 className="hero-title" {...rise(0)}>
            Nurturing every child
            <span className="hero-title-italic">to inspire excellence.</span>
          </motion.h1>

          <motion.p className="hero-lead" {...rise(0.15)}>
            An English medium school in Boralesgamuwa, Mattegoda &amp; Horana.
          </motion.p>

          <motion.p className="hero-desc" {...rise(0.25)}>
            From Pre-School through Primary and Secondary to O/L — with motherly care and both
            National &amp; Cambridge curriculums, we bring out the best in every single child.
          </motion.p>

          <motion.div className="hero-actions" {...rise(0.35)}>
            <button className="hero-btn hero-btn-gold" id="hero-apply-btn" onClick={() => scrollTo('#contact')}>
              Apply for Admission
              <ArrowRight size={16} />
            </button>
            <button className="hero-btn hero-btn-ghost" id="hero-programmes-btn" onClick={() => scrollTo('#academics')}>
              Our Programmes
              <ChevronDown size={16} />
            </button>
          </motion.div>
        </div>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: delay + 0.45 }}
        >
          {stats.map((s) => (
            <div className={`hero-stat ${s.inline ? 'inline' : ''}`} key={s.label}>
              <span className="hero-stat-val">{s.value}</span>
              <span className="hero-stat-lbl">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scrolling photo strip – the list is doubled so the loop is seamless */}
      <motion.div
        className="hero-filmstrip"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: delay + 0.6 }}
      >
        <div className="hero-filmstrip-track">
          {[...filmstrip, ...filmstrip].map((p, i) => (
            <img
              key={`${p.src}-${i}`}
              src={p.src}
              alt={i < filmstrip.length ? p.alt : ''}
              aria-hidden={i >= filmstrip.length}
              loading="lazy"
            />
          ))}
        </div>
      </motion.div>

      {/* Registration ribbon */}
      <div className="hero-ribbon">
        <div className="container hero-ribbon-inner">
          <span className="hero-ribbon-badge">Govt. Registered</span>
          <span className="hero-ribbon-text">
            Approved educational institution No. PV 103044 — offering National &amp; Cambridge curriculums.
          </span>
        </div>
      </div>
    </section>
  );
}
