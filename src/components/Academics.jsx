import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BookOpen, Calculator, Globe, Palette, FlaskConical, Music, Dumbbell, Laptop, Heart, Bus, ShieldCheck, Users, GraduationCap } from 'lucide-react';
import './Academics.css';

const teacherPoints = [
  { icon: <Users size={18} />, text: '35+ qualified teachers across our three branches' },
  { icon: <GraduationCap size={18} />, text: "Educators holding Diplomas, Degrees, Honours & Master's Degrees" },
  { icon: <Heart size={18} />, text: 'Every child guided with patience, love and respect' },
];

function TeachersBlock() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div className="teachers-block" ref={ref}>
      <motion.figure
        className="teachers-photo"
        initial={{ opacity: 0, x: -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <img src="/images/teachers_team.jpg" alt="The Kingsbridge American College teaching staff" loading="lazy" />
        <figcaption>Our teaching family · Kingsbridge American College</figcaption>
      </motion.figure>

      <motion.div
        className="teachers-text"
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        <span className="section-tag gold">Meet Our Teachers</span>
        <h3 className="teachers-title">
          Dedicated Teachers, <em>Caring Hearts</em>
        </h3>
        <p className="teachers-desc">
          Behind every happy, confident Kingsbridge child is a team of devoted teachers. They bring
          knowledge, patience and genuine motherly care into every classroom — guiding each child
          to learn, grow and shine, just as they would their own.
        </p>
        <ul className="teachers-points">
          {teacherPoints.map((p) => (
            <li key={p.text}>
              <span className="teachers-point-icon">{p.icon}</span>
              {p.text}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

const gradeBands = [
  {
    id: 'preschool',
    label: 'Pre-School & Daycare',
    grades: 'Age 2½ – 5 Years',
    color: '#e11d48',
    bg: '#fff1f2',
    desc: 'Nurtured with loving motherly care in a secure, child-friendly environment. Children discover early phonics, creative exploration, social interaction, and confidence with dedicated full-day daycare facilities.',
    subjects: ['Early English Literacy & Phonics', 'Sensory & Play-based Learning', 'Numeracy & Shapes', 'Art, Craft & Sensory Play', 'Music & Rhymes', 'Social & Emotional Development', 'Physical Play & Coordination', 'Caring Daycare Facility'],
  },
  {
    id: 'primary',
    label: 'Primary School',
    grades: 'Grade 1 – 5',
    color: '#1a56c8',
    bg: '#e8f0fb',
    desc: 'Delivering comprehensive primary education with both the National Curriculum in English Medium and the Cambridge Curriculum. Dedicated educators with diplomas and degrees provide student-centred instruction.',
    subjects: ['English Language & Reading', 'Mathematics & Logic', 'Environmental & General Science', 'Sinhala / Tamil', 'Art & Design', 'Western & Eastern Music', 'Physical Education & Games', 'Computer Literacy & ICT'],
  },
  {
    id: 'secondary',
    label: 'Secondary & O/L',
    grades: 'Grade 6 – 11 (O/L)',
    color: '#003087',
    bg: '#e0eaff',
    desc: 'Preparing students for G.C.E. Ordinary Level and Cambridge qualifications with subject specialisation, lab practicals, leadership development, and career orientation.',
    subjects: ['English Language & Literature', 'Combined Mathematics', 'Science (Biology, Physics, Chemistry)', 'History & Civics', 'Geography', 'ICT & Computing', 'Commerce & Business Studies', 'Religious Studies & Character Building'],
  },
];

const facilities = [
  {
    icon: <Heart size={26} />,
    title: 'Motherly Care & Daycare',
    desc: 'Safe, loving, and comfortable environment for children from 2½ years, giving working parents peace of mind.',
    color: '#e11d48'
  },
  {
    icon: <ShieldCheck size={26} />,
    title: 'Dual Curriculums',
    desc: 'Flexibility to choose between the National Curriculum in English Medium or the Cambridge International Curriculum.',
    color: '#003087'
  },
  {
    icon: <Bus size={26} />,
    title: 'School Transport Service',
    desc: 'Safe, comfortable, and reliable transport network serving families across our branch networks.',
    color: '#059669'
  },
];

const subjects = [
  { icon: <BookOpen size={24} />, name: 'English Medium', color: '#003087' },
  { icon: <Calculator size={24} />, name: 'Mathematics', color: '#1a56c8' },
  { icon: <FlaskConical size={24} />, name: 'Science Labs', color: '#0891b2' },
  { icon: <Globe size={24} />, name: 'Social Studies', color: '#059669' },
  { icon: <Laptop size={24} />, name: 'ICT & Tech', color: '#7c3aed' },
  { icon: <Palette size={24} />, name: 'Art & Creativity', color: '#db2777' },
  { icon: <Music size={24} />, name: 'Music & Drama', color: '#d97706' },
  { icon: <Dumbbell size={24} />, name: 'Physical Fitness', color: '#dc2626' },
];

export default function Academics() {
  const [active, setActive] = useState('preschool');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const current = gradeBands.find(g => g.id === active);

  return (
    <section id="academics" className="academics-section" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          className="academics-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Academic Pathways</span>
          <h2 className="section-heading">Pre-School to Secondary<br />Nurturing Lifelong Learners</h2>
          <p className="section-sub">
            Offering both the National Curriculum in English Medium and the Cambridge Curriculum, 
            empowering parents to choose the ideal academic pathway for their child.
          </p>
        </motion.div>

        {/* Grade Band Tabs */}
        <div className="grade-tabs">
          {gradeBands.map((g) => (
            <button
              key={g.id}
              id={`tab-${g.id}`}
              className={`grade-tab ${active === g.id ? 'active' : ''}`}
              onClick={() => setActive(g.id)}
              style={active === g.id ? { background: g.color, color: 'white', borderColor: g.color } : {}}
            >
              <span className="tab-label">{g.label}</span>
              <span className="tab-grades">{g.grades}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="grade-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            style={{ '--band-color': current.color, '--band-bg': current.bg }}
          >
            <div className="grade-content-grid">
              <div className="grade-info">
                <h3 className="grade-title" style={{ color: current.color }}>
                  {current.label}
                </h3>
                <p className="grade-grades-tag">{current.grades}</p>
                <p className="grade-desc">{current.desc}</p>
                <button 
                  className="btn btn-primary grade-btn"
                  style={{ background: `linear-gradient(135deg, ${current.color}, ${current.color}dd)` }}
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Inquire for Admissions
                </button>
              </div>
              <div className="grade-subjects">
                <h4 className="grade-subjects-title">Key Areas & Curriculum Scope</h4>
                <ul className="grade-subjects-list">
                  {current.subjects.map((s) => (
                    <li key={s} className="subject-item" style={{ borderLeftColor: current.color }}>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Special Support & Facilities Strip */}
        <motion.div 
          className="facilities-strip"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {facilities.map((f) => (
            <div key={f.title} className="facility-card">
              <div className="facility-icon" style={{ color: f.color, background: `${f.color}15` }}>
                {f.icon}
              </div>
              <div className="facility-body">
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Subject Icons Grid */}
        <motion.div
          className="subjects-grid-section"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <h3 className="subjects-grid-title">Holistic Learning Framework</h3>
          <div className="subjects-icon-grid">
            {subjects.map((s, i) => (
              <motion.div
                key={s.name}
                className="subject-card"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.07 }}
                whileHover={{ y: -6, boxShadow: '0 12px 40px rgba(0,48,135,0.15)' }}
              >
                <div className="subject-icon" style={{ color: s.color, background: `${s.color}15` }}>
                  {s.icon}
                </div>
                <span className="subject-name">{s.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <TeachersBlock />
      </div>
    </section>
  );
}
