import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Users, Trophy, Clock } from 'lucide-react';
import './Stats.css';

const stats = [
  { icon: <GraduationCap size={32} />, value: 500, suffix: '+', label: 'Students Enrolled', desc: 'Growing every year' },
  { icon: <Users size={32} />, value: 35, suffix: '+', label: 'Qualified Teachers', desc: 'Experienced educators' },
  { icon: <Trophy size={32} />, value: 120, suffix: '+', label: 'Awards & Achievements', desc: 'At national competitions' },
  { icon: <Clock size={32} />, value: 10, suffix: '+', label: 'Years of Excellence', desc: 'Trusted by families' },
];

function Counter({ target, suffix, inView }) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <>{count}{suffix}</>;
}

export default function Stats() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="stats-section" ref={ref}>
      <div className="stats-bg" />
      <div className="container">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="stat-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12 }}
            >
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-number">
                <Counter target={s.value} suffix={s.suffix} inView={inView} />
              </div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-desc">{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
