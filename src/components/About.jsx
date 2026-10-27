import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle2, ShieldCheck, Heart, MapPin, Sparkles, BookOpen, Compass } from 'lucide-react';
import './About.css';

const keyFeatures = [
  { 
    icon: <ShieldCheck size={22} />, 
    title: 'Government Approved (PV 103044)', 
    desc: 'Duly registered and approved educational institution authorised to deliver English-medium programmes.' 
  },
  { 
    icon: <Heart size={22} />, 
    title: 'Motherly Care Philosophy', 
    desc: 'Treating every child with the same patience, love, respect, and attentive care given to our own children.' 
  },
  { 
    icon: <BookOpen size={22} />, 
    title: 'Dual Curriculum Pathways', 
    desc: 'Offering both the National Curriculum in English Medium and the Cambridge Curriculum.' 
  },
  { 
    icon: <Compass size={22} />, 
    title: 'Accessible & Affordable', 
    desc: 'Making high-quality international-standard education accessible and affordable for Sri Lankan families.' 
  },
];

const highlights = [
  'Pre-School (from 2½ years) through Primary (Grades 1–5) and Secondary (Grades 6–11)',
  'Approved under registration number PV 103044',
  'National Curriculum in English Medium & Cambridge Curriculum',
  'Daycare Facility providing a safe, comfortable, and loving environment',
  'Dedicated School Transport Service across catchment zones',
  'Educators with Diplomas, Degrees, Honours & Master’s Degrees',
];

const branches = [
  { name: 'Boralesgamuwa Branch', desc: 'Main Branch with Pre-School, Primary & Secondary facilities' },
  { name: 'Mattegoda Branch', desc: 'Pre-School, Primary Education & Daycare Centre' },
  { name: 'Horana Branch', desc: 'Pre-School & Primary English Medium Programmes' },
];

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="about-section" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          className="about-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">School History & Background</span>
          <h2 className="section-heading">Excellence in Diversity Since 2015</h2>
          <p className="section-sub">
            From humble beginnings to a respected educational network across Boralesgamuwa, 
            Mattegoda, and Horana.
          </p>
        </motion.div>

        <div className="about-grid">
          {/* Left Column: Visual Showcase */}
          <motion.div
            className="about-visual"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {/* Real Photo Card with Principal & Students */}
            <div className="about-photo-frame">
              <img 
                src="/images/principal_with_students.jpg" 
                alt="Dr. Nadeesha Jayawardena with Kingsbridge students" 
                className="about-real-img"
              />
              <div className="about-photo-badge">
                <Sparkles size={16} />
                <span>Founded 2015 · Official Reg: PV 103044</span>
              </div>
            </div>

            {/* Campus Branches Card */}
            <div className="about-branches-box" id="branches">
              <div className="branches-box-header">
                <MapPin size={18} className="branch-pin-icon" />
                <h4>Our 3 Branches</h4>
              </div>
              <div className="branches-list">
                {branches.map((b) => (
                  <div key={b.name} className="branch-row">
                    <div className="branch-dot" />
                    <div>
                      <strong>{b.name}</strong>
                      <p>{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative & History */}
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="about-narrative-title">
              A Decade of Dedicated Service in English Medium Education
            </h3>

            <p className="about-intro">
              <strong>Kingsbridge American College</strong>, founded in <strong>2015</strong> by 
              <strong> Dr. Nadeesha M. Nandesena (Dr. Nadeesha Jayawardena)</strong>, has grown into a 
              respected educational institution committed to providing quality English-medium education 
              in Sri Lanka. As the Group Principal, Dr. Jayawardena brings over two decades of experience 
              in the education sector, both locally and internationally.
            </p>

            <p className="about-intro">
              The College is a duly registered and approved educational institution under 
              <strong> registration number PV 103044</strong>, authorised to deliver English-medium 
              programmes from Pre-School through to G.C.E. Ordinary Level and beyond, with the 
              long-term vision of extending services up to university level.
            </p>

            <p className="about-intro">
              As one of Sri Lanka's leading international school networks, Kingsbridge remains committed 
              to making high-quality education <em>accessible and affordable</em>. This reflects the 
              founding principle of Dr. Nadeesha: to provide Sri Lankan students with the opportunity to 
              receive an excellent education at a reasonable cost, enabling them to achieve their full potential.
            </p>

            {/* Feature Cards Grid */}
            <div className="about-features-grid">
              {keyFeatures.map((f) => (
                <div key={f.title} className="about-feat-item">
                  <div className="about-feat-icon">{f.icon}</div>
                  <div>
                    <h5>{f.title}</h5>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Checkmark Highlights */}
            <div className="about-highlights-wrap">
              <h4>Key Institutional Highlights:</h4>
              <ul className="about-highlights">
                {highlights.map((h) => (
                  <li key={h}>
                    <CheckCircle2 size={16} className="check-icon" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
