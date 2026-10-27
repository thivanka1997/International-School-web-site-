import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles, ExternalLink, Music, Palette, Sprout, Trophy, Heart, Waves, Sun } from 'lucide-react';
import './News.css';

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const activities = [
  {
    id: 1,
    category: 'School Events',
    title: 'A Home Away from Home! Summer Day Out',
    classLevel: 'Agar Villa Resort Day Out',
    desc: 'At Kingsbridge American College, our teachers don\'t just educate; they nurture, care, and love our little ones like their very own. Heartwarming moments from our Summer Day Out at Agar Villa Resort capturing the beautiful bond between staff and students.',
    image: '/images/principal_motherly_care.jpg',
    icon: <Heart size={18} />,
    color: '#e11d48',
    mediaType: 'Facebook Photo Post',
    link: 'https://www.facebook.com/share/p/1FEJ8C46d8/',
    highlights: ['Nurturing care', 'Agar Villa Resort', 'Emotional bonding'],
  },
  {
    id: 2,
    category: 'School Events',
    title: 'Splish, Splash & Brightest Smiles!',
    classLevel: 'Pool Time & Outdoor Fun',
    desc: 'Pool time is always the highlight of our Kingsbridge Summer Day Out! Held at the beautiful Agar Villa Resort, our little ones had an absolute blast cooling off in the water with guided sessions that build water confidence and coordination.',
    image: '/images/cultural_event.jpg',
    icon: <Waves size={18} />,
    color: '#0284c7',
    mediaType: 'Facebook Photo Post',
    link: 'https://www.facebook.com/share/p/1CYURVUFWq/',
    highlights: ['Water confidence', 'Teacher guidance', 'Safe loving environment'],
  },
  {
    id: 3,
    category: 'School Events',
    title: '2026 Grand Steps Annual Concert on Stage',
    classLevel: 'Kingsbridge American College',
    desc: 'Proudly presenting the spectacular 2026 Grand Steps concert celebration on stage! Students in dazzling fairy and sports attires received awards and celebrated excellence with parents and teachers.',
    image: '/images/principal_ceremony.jpg',
    icon: <Trophy size={18} />,
    color: '#d97706',
    mediaType: 'Official Concert Album',
    link: 'https://www.facebook.com/share/p/19mNeBDuBM/',
    secondaryLink: 'https://www.facebook.com/share/p/18TRfF9gLT/',
    highlights: ['Grand Steps 2026', 'Stage performances', 'Student talents'],
  },
  {
    id: 4,
    category: 'School Events',
    title: 'Animal Costume Day & Annual Sports Celebration',
    classLevel: 'Boralesgamuwa Branch',
    desc: 'Teachers and students brought storybook characters to life with lion, elephant, crocodile, and bunny masks! An imaginative celebration fostering joy and creativity.',
    image: '/images/animal_costumes.jpg',
    icon: <Sun size={18} />,
    color: '#ea580c',
    mediaType: 'Facebook Event Album',
    link: 'https://www.facebook.com/share/p/14k9xrnLJBn/',
    highlights: ['Creative costumes', 'Boralesgamuwa Branch', 'Storybook fun'],
  },
  {
    id: 5,
    category: 'School Events',
    title: 'Walking Hand-in-Hand: Motherly Leadership',
    classLevel: 'All Grade Levels',
    desc: 'Madam Principal Dr. Nadeesha Jayawardena walking through our campus gardens hand-in-hand with her young students, demonstrating love, respect, and attentive motherly care every day.',
    image: '/images/principal_walking_students.jpg',
    icon: <Heart size={18} />,
    color: '#be185d',
    mediaType: 'Facebook Photo Post',
    link: 'https://www.facebook.com/share/p/14k9xrnLJBn/',
    highlights: ['Motherly care', 'Loving guidance', 'Kingsbridge family'],
  },
  {
    id: 6,
    category: 'Classroom Crafts',
    title: 'Spooky Little Creations Pumpkin Craft',
    classLevel: 'Lower Class',
    desc: 'Our little artists enjoyed decorating paper plates with orange paper squares, spooky black eyes, and mouths to create their own pumpkins, fostering fine motor skills and creativity.',
    image: '/images/students_refreshment.jpg',
    icon: <Palette size={18} />,
    color: '#d97706',
    mediaType: 'Facebook Reel / Video',
    link: 'https://www.facebook.com/share/r/18HyYwpYy7/',
    highlights: ['Fine motor skills', 'Creative expression', 'Seasonal fun'],
  },
  {
    id: 7,
    category: 'Music & Dance',
    title: 'Let the Music Fill Our Hearts & Carols',
    classLevel: 'Primary Class',
    desc: 'Our young stars took part in vocal training, practised lovely songs, and learned three beautiful Christmas carols with enthusiasm, building confidence and teamwork.',
    image: '/images/hero_student.jpg',
    icon: <Music size={18} />,
    color: '#2563eb',
    mediaType: 'Facebook Video',
    link: 'https://www.facebook.com/share/v/1GuQhauJfX/',
    highlights: ['Vocal training', 'Christmas carols', 'Stage confidence'],
  },
  {
    id: 8,
    category: 'Hands-on Science',
    title: 'Growing Young Minds: Parts of a Plant',
    classLevel: 'Upper Class Explorers',
    desc: 'Hands-on exploration of roots, stems, leaves, flowers, and fruits. Children identified each plant part, placed it correctly, and discovered the vital role of plants in nature.',
    image: '/images/principal_with_students.jpg',
    icon: <Sprout size={18} />,
    color: '#16a34a',
    mediaType: 'Facebook Reel / Video',
    link: 'https://www.facebook.com/share/r/1GM8vG6mzK/',
    highlights: ['Observation & memory', 'Scientific thinking', 'Vocabulary building'],
  },
];

const filterCategories = ['All Activities', 'School Events', 'Classroom Crafts', 'Music & Dance', 'Hands-on Science'];

export default function News() {
  const [selectedFilter, setSelectedFilter] = useState('All Activities');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const filtered = selectedFilter === 'All Activities'
    ? activities
    : activities.filter((a) => a.category === selectedFilter);

  return (
    <section id="news" className="news-section" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          className="news-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">
            <Sparkles size={14} />
            Live from Our Classrooms & Events
          </span>
          <h2 className="section-heading">Classroom Activities & School Events</h2>
          <p className="section-sub">
            Real photos and videos from our Summer Day Out at Agar Villa Resort, 
            2026 Grand Steps Concert, vocal training, and daily learning published on Facebook.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="activities-filter-bar">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              className={`act-filter-btn ${selectedFilter === cat ? 'active' : ''}`}
              onClick={() => setSelectedFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Activities Grid with Displayed Photos */}
        <motion.div className="activities-grid" layout>
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.article
                key={item.id}
                className="activity-card"
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                style={{ '--act-color': item.color }}
              >
                {/* Photo Display */}
                <div className="act-img-frame">
                  <img src={item.image} alt={item.title} className="act-card-photo" />
                  <div className="act-img-overlay" />
                  <span className="act-media-pill" style={{ background: item.color }}>
                    {item.mediaType}
                  </span>
                </div>

                <div className="act-card-content">
                  <div className="act-card-top">
                    <div className="act-cat-badge" style={{ color: item.color, background: `${item.color}15` }}>
                      {item.icon}
                      <span>{item.category}</span>
                    </div>
                    <span className="act-class-tag">{item.classLevel}</span>
                  </div>

                  <h3 className="act-title">{item.title}</h3>
                  <p className="act-desc">{item.desc}</p>

                  <div className="act-highlights">
                    {item.highlights.map((h) => (
                      <span key={h} className="highlight-pill">✓ {h}</span>
                    ))}
                  </div>

                  <div className="act-card-footer">
                    <div className="act-links-group">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-fb-watch"
                        style={{ background: item.color }}
                      >
                        <FacebookIcon />
                        <span>View on Facebook</span>
                        <ExternalLink size={13} />
                      </a>

                      {item.secondaryLink && (
                        <a
                          href={item.secondaryLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-fb-secondary"
                          title="View Album Part 2"
                        >
                          Part 2 <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
