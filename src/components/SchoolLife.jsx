import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './SchoolLife.css';

// School life photos. The first five fill the mosaic (first one is the large tile);
// the rest sit in an equal-width strip underneath.
const moments = [
  { src: '/images/school-life/science_lab.webp', title: 'Young Scientists', tag: 'Science Lab', pos: 'center 40%' },
  { src: '/images/school-life/reading_together.webp', title: 'Reading Together', tag: 'Library Time', pos: 'center 45%' },
  { src: '/images/school-life/hands_on_learning.webp', title: 'Hands-on Learning', tag: 'Science & Crafts', pos: 'center 45%' },
  { src: '/images/school-life/classroom_colouring.webp', title: 'Colour, Read & Learn', tag: 'Classroom', pos: 'center 55%' },
  { src: '/images/school-life/indoor_volleyball.webp', title: 'Team Spirit', tag: 'Indoor Sports', pos: 'center 35%' },
  { src: '/images/school-life/football.webp', title: 'On the Field', tag: 'Football', pos: 'center 40%' },
  { src: '/images/hero/classroom.jpg', title: 'Eager Minds', tag: 'Classroom', pos: '35% center' },
  { src: '/images/hero/graduation.jpg', title: 'Proud Graduates', tag: 'Graduation', pos: 'center 40%' },
];

const MOSAIC_COUNT = 5;

function MomentTile({ m, large = false, delay, inView }) {
  return (
    <motion.figure
      className={`sl-tile ${large ? 'sl-tile-large' : ''}`}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <img src={m.src} alt={m.title} loading="lazy" style={{ objectPosition: m.pos }} />
      <figcaption>
        <span className="sl-tag">{m.tag}</span>
        <span className="sl-title">{m.title}</span>
      </figcaption>
    </motion.figure>
  );
}

export default function SchoolLife() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="school-life" className="school-life-section" ref={ref}>
      <div className="container">
        <motion.div
          className="school-life-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag gold">School Life</span>
          <h2 className="section-heading">Every Day, a New Adventure</h2>
          <p className="section-sub">
            Learning, exploring, playing and growing together — every day at Kingsbridge.
          </p>
        </motion.div>
      </div>

      <div className="school-life-mosaic">
        {moments.slice(0, MOSAIC_COUNT).map((m, i) => (
          <MomentTile key={m.src} m={m} large={i === 0} delay={0.1 + i * 0.1} inView={inView} />
        ))}
      </div>
      <div className="school-life-strip">
        {moments.slice(MOSAIC_COUNT).map((m, i) => (
          <MomentTile key={m.src} m={m} delay={0.6 + i * 0.1} inView={inView} />
        ))}
      </div>
    </section>
  );
}
