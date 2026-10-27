import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './SchoolLife.css';

// Real photos from school days. The first one is the large tile on the left.
const moments = [
  { src: '/images/school-life/little_stars.jpg', title: 'Our Little Stars', tag: 'Kingsbridge Family', pos: 'center 40%' },
  { src: '/images/school-life/games_day.jpg', title: 'Fun & Games Day', tag: 'Outdoor Play', pos: 'center 35%' },
  { src: '/images/school-life/playgroup_class.jpg', title: 'Learning Our ABCs', tag: 'Play Group Classroom', pos: 'center 55%' },
  { src: '/images/school-life/party_time.jpg', title: 'Party Time Together', tag: 'Celebrations', pos: 'center 40%' },
  { src: '/images/school-life/art_exhibition.jpg', title: 'Proud Young Artists', tag: 'Art Exhibition', pos: 'center 35%' },
];

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
            Learning, playing, celebrating and growing together — real moments from life at Kingsbridge.
          </p>
        </motion.div>
      </div>

      <div className="school-life-mosaic">
        {moments.map((m, i) => (
          <motion.figure
            key={m.src}
            className={`sl-tile ${i === 0 ? 'sl-tile-large' : ''}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
          >
            <img src={m.src} alt={m.title} loading="lazy" style={{ objectPosition: m.pos }} />
            <figcaption>
              <span className="sl-tag">{m.tag}</span>
              <span className="sl-title">{m.title}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
