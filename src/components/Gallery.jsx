import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, ZoomIn } from 'lucide-react';
import './Gallery.css';


const INITIAL_COUNT = 9;

const galleryItems = [
  {
    id: 8,
    cat: 'School Life',
    title: 'Confident, Energetic Learning',
    desc: 'Senior primary students enjoying active outdoor exercises and sports activities with confidence.',
    image: '/images/hero_student.jpg',
    featured: false,
    tag: 'Age 10-12 Primary',
  },
  {
    id: 6,
    cat: 'Activities',
    title: 'Animal Costume Day & Annual Sports',
    desc: 'Teachers and students bringing storybook animal masks to life with colorful flags and lively outdoor activities.',
    image: '/images/animal_costumes.jpg',
    featured: false,
    tag: 'Costume Celebration',
  },
  {
    id: 12,
    cat: 'School Life',
    title: 'Healthy Refreshments & Social Time',
    desc: 'Students enjoying healthy drinks together in the campus courtyard, building lifelong friendships.',
    image: '/images/students_refreshment.jpg',
    featured: false,
    tag: 'Healthy Habits',
  },
  {
    id: 10,
    cat: 'Activities',
    title: 'Traditional Games & Cultural Day',
    desc: 'Students joyfully participating in pillow fight (Kotta Pora) and cultural festivities on campus.',
    image: '/images/cultural_event.jpg',
    featured: false,
    tag: 'Cultural Activities',
  },
  {
    id: 4,
    cat: 'Leadership',
    title: 'Motherly Guidance & Care',
    desc: 'Madam Principal Dr. Nadeesha Jayawardena walking hand-in-hand with students, exemplifying motherly love and care.',
    image: '/images/principal_walking_students.jpg',
    featured: false,
    tag: 'Motherly Guidance',
  },
  {
    id: 7,
    cat: 'Leadership',
    title: 'Motherly Affection & Guidance',
    desc: 'Madam Principal sharing a tender, loving moment with her students, reflecting our motherly care ethos.',
    image: '/images/principal_motherly_care.jpg',
    featured: false,
    tag: 'Motherly Care',
  },
  {
    id: 3,
    cat: 'Leadership',
    title: 'Madam Principal Dr. Nadeesha Jayawardena',
    desc: 'Founder & Principal addressing the academic diploma ceremony at BMICH Colombo in doctoral regalia.',
    image: '/images/principal_ceremony.jpg',
    featured: true,
    tag: 'Academic Ceremony',
  },
  {
    id: 13,
    cat: 'Activities',
    title: 'The Candle of Peace',
    desc: 'Our little ones sharing a heartfelt message of peace and unity on stage at the 2026 Grand Steps concert.',
    image: '/images/hero/grand_steps_peace.jpg',
    featured: false,
    tag: 'Grand Steps 2026',
  },
  {
    id: 14,
    cat: 'Activities',
    title: 'Stage Dance Performance',
    desc: 'Students performing an energetic, well-rehearsed dance item in front of a proud audience of parents.',
    image: '/images/hero/stage_dance.jpg',
    featured: false,
    tag: 'Annual Concert',
  },
];

// Only offer filters that actually have photos
const categories = ['All', ...new Set(galleryItems.map((g) => g.cat))];

export default function Gallery() {
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const filtered = active === 'All' ? galleryItems : galleryItems.filter(g => g.cat === active);
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);

  // Close the photo viewer with the Escape key
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => e.key === 'Escape' && setLightbox(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  return (
    <section id="gallery" className="gallery-section" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          className="gallery-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Campus Moments</span>
          <h2 className="section-heading">Life at Kingsbridge</h2>
          <p className="section-sub">
            A glimpse into our vibrant school community — where motherly care, academic excellence, 
            and lifelong friendships come to life every day.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="gallery-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`gallery-filter-${cat.toLowerCase().replace(/\s/g, '-')}`}
              className={`filter-btn ${active === cat ? 'active' : ''}`}
              onClick={() => { setActive(cat); setShowAll(false); }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div className="gallery-grid" layout>
          <AnimatePresence>
            {visible.map((item) => (
              <motion.div
                key={item.id}
                className={`gallery-card ${item.featured ? 'featured-card' : ''}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setLightbox(item)}
              >
                <div className="gallery-card-inner">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="gallery-card-img"
                  />
                  <div className="gallery-card-overlay">
                    <span className="gallery-item-tag">{item.tag}</span>
                    <h3 className="gallery-item-title">{item.title}</h3>
                    <p className="gallery-item-desc">{item.desc}</p>
                    <div className="gallery-zoom-cue">
                      <ZoomIn size={18} />
                      <span>Click to view full photo</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length > INITIAL_COUNT && (
          <div className="gallery-more">
            <button className="btn btn-outline" onClick={() => setShowAll(!showAll)}>
              {showAll ? 'Show fewer photos' : `Show all ${filtered.length} photos`}
            </button>
          </div>
        )}

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightbox && (
            <motion.div
              className="gallery-lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(null)}
            >
              <motion.div
                className="lightbox-box"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="lightbox-close"
                  onClick={() => setLightbox(null)}
                  aria-label="Close photo"
                >
                  <X size={24} />
                </button>

                <div className="lightbox-img-wrap">
                  <img 
                    src={lightbox.image} 
                    alt={lightbox.title} 
                    className="lightbox-img"
                  />
                </div>

                <div className="lightbox-caption">
                  <span className="lightbox-tag">{lightbox.tag}</span>
                  <h3>{lightbox.title}</h3>
                  <p>{lightbox.desc}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
