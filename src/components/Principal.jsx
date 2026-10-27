import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote, Award, BookOpen, GraduationCap, ShieldCheck, Heart, UserCheck, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import './Principal.css';

const qualifications = [
  { degree: 'Doctorate in Education', institution: 'University of Maryland, USA', type: 'Doctorate' },
  { degree: 'Academic Dean', institution: 'American Campus Colombo', type: 'Leadership' },
  { degree: 'Master of Business Administration (MBA)', institution: 'University of Bolton, UK', type: 'Postgraduate' },
  { degree: 'Post Graduate Diploma in Business Administration', institution: 'Postgraduate Level', type: 'Postgraduate' },
  { degree: 'Edexcel Level 7', institution: 'E Thames Graduate School – UK', type: 'Diploma' },
  { degree: 'Bachelor of Commerce – BCom (Hons)', institution: 'University of Delhi', type: 'Undergraduate' },
];

const experienceList = [
  { role: 'Founder & Group Principal', place: 'Kingsbridge American College (Boralesgamuwa, Mattegoda & Horana)' },
  { role: 'Former Principal', place: 'Lakeland Inter American College, Rathmalana' },
  { role: 'Former Lecturer for MBA Programmes', place: 'British School of Commerce (Marketing & International Marketing)' },
  { role: 'Cambridge Syllabus Educator', place: 'Lyceum International School' },
  { role: 'London O/L & A/L Educator', place: 'Musaeus College, Colombo' },
];

export default function Principal() {
  const [activeTab, setActiveTab] = useState('message'); // 'message' | 'credentials'
  const [expandedMessage, setExpandedMessage] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="principal" className="principal-section" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="principal-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Leadership & Vision</span>
          <h2 className="section-heading">Meet Madam Principal</h2>
          <p className="section-sub">
            Guiding Kingsbridge American College with over two decades of international 
            and local educational leadership, academic excellence, and compassionate motherly care.
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="principal-grid">
          {/* Left Column: Photos & Quick Profile */}
          <motion.div
            className="principal-visual-col"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {/* Primary Portrait Card */}
            <div className="principal-photo-card">
              <div className="principal-photo-wrap">
                <img 
                  src="/images/principal_ceremony.jpg" 
                  alt="Dr. Nadeesha Mitusuko Jayawardena addressing graduation ceremony" 
                  className="principal-main-img"
                />
                <div className="principal-photo-badge">
                  <GraduationCap size={16} />
                  <span>Doctorate in Education (USA)</span>
                </div>
              </div>

              <div className="principal-id-details">
                <h3 className="principal-full-name">Dr. Nadeesha Mitusuko Jayawardena</h3>
                <p className="principal-title-tag">Founder & Group Principal</p>
                <p className="principal-institution">Kingsbridge American College Network</p>
                
                <div className="principal-branches-tag">
                  <MapPin size={14} />
                  <span>Boralesgamuwa · Mattegoda · Horana</span>
                </div>

                <div className="principal-personal-note">
                  <ShieldCheck size={14} className="note-icon" />
                  <span>Mother of one Son & Proud Wife of Military Officer Brigadier Shalutha Jayawardena</span>
                </div>
              </div>
            </div>

            {/* Motherly Care Secondary Card */}
            <motion.div 
              className="motherly-care-card"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="mc-photo-wrap">
                <img 
                  src="/images/principal_with_students.jpg" 
                  alt="Dr. Nadeesha Jayawardena nurturing students at Kingsbridge" 
                  className="mc-thumb"
                />
              </div>
              <div className="mc-content">
                <div className="mc-header">
                  <Heart size={16} className="heart-icon" />
                  <h4>Motherly Care in Education</h4>
                </div>
                <p>
                  "We treat every child with the same love, patience, respect, and attention 
                  that we would give our own children."
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Message & Qualifications Tabs */}
          <motion.div
            className="principal-content-col"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Tab Buttons */}
            <div className="principal-tabs">
              <button
                className={`ptab-btn ${activeTab === 'message' ? 'active' : ''}`}
                onClick={() => setActiveTab('message')}
              >
                <Quote size={16} />
                <span>Principal's Official Message</span>
              </button>
              <button
                className={`ptab-btn ${activeTab === 'credentials' ? 'active' : ''}`}
                onClick={() => setActiveTab('credentials')}
              >
                <Award size={16} />
                <span>Qualifications & Career Experience</span>
              </button>
            </div>

            {/* Tab 1: Official Message */}
            {activeTab === 'message' && (
              <motion.div 
                className="message-card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="message-header-bar">
                  <div className="message-salutation">
                    <Quote size={28} className="quote-badge" />
                    <div>
                      <h3>Dear Parents, Students, and Well-Wishers,</h3>
                      <span className="welcome-sub">Welcome to Kingsbridge American College</span>
                    </div>
                  </div>
                </div>

                <div className="message-body">
                  <p className="lead-para">
                    It is my great pleasure to welcome you to <strong>Kingsbridge American College</strong>, 
                    an educational institution founded in <strong>2015</strong> with a clear vision of providing 
                    quality education, compassionate care, and a strong foundation for every child’s future.
                  </p>

                  <p>
                    At Kingsbridge American College, we believe that every child is unique, every child deserves 
                    the best opportunities, and every child has the potential to achieve greatness. Our mission 
                    goes beyond academic excellence. We are committed to nurturing confident, disciplined, creative, 
                    and compassionate individuals who will become responsible citizens and future leaders.
                  </p>

                  <div className="highlight-quote-box">
                    <p>
                      "We offer both the <strong>National Curriculum in English Medium</strong> and the 
                      <strong> Cambridge Curriculum</strong>, giving parents the opportunity to select an educational 
                      pathway that best suits their children’s needs and future aspirations."
                    </p>
                  </div>

                  {/* Expandable Extended Message */}
                  <div className={`message-collapsible ${expandedMessage ? 'expanded' : ''}`}>
                    <p>
                      Since our establishment, we have continuously worked towards expanding our educational services 
                       and strengthening our academic standards. We currently provide education from <strong>Pre-School 
                       (age 2½) through Primary (Grades 1–5) and Secondary (Grades 6–11)</strong>, with the ambition of developing Kingsbridge American College into 
                      a leading educational institution that will extend its services up to university level.
                    </p>

                    <p>
                      We operate a <strong>daycare facility</strong> designed 
                      to provide a safe, comfortable, and caring environment for children while their parents attend to their 
                      professional and personal responsibilities. Our <strong>school transport service</strong> further supports 
                      families by helping children travel conveniently and safely.
                    </p>

                    <p>
                      One of the values that distinguishes Kingsbridge American College is our commitment to providing 
                      <strong> motherly care</strong> in a secure, loving, and child-friendly environment. We treat every 
                      child with the same love, patience, respect, and attention that we would give our own children. 
                      We understand that parents entrust us with their most precious responsibility, and we consider that trust 
                      a privilege that must be honoured every day.
                    </p>

                    <p>
                      Our academic programme is carefully planned and delivered by a dedicated team of qualified educators. 
                      Our teachers possess professional diplomas, degrees, honours degrees, and, in some cases, master’s degrees. 
                      Their knowledge, experience, and commitment help us maintain high educational standards while recognising 
                      the individual strengths and abilities of each student.
                    </p>

                    <p>
                      In addition to academic development, we recognise the importance of emotional well-being, social skills, 
                      discipline, creativity, and confidence. We arrange <strong>regular visits from student counsellors</strong> 
                      to provide guidance and support, helping us better understand students’ needs and promote their overall development. 
                      We believe that a successful school must educate not only the mind but also the heart and character of every child.
                    </p>

                    <p>
                      As a <strong>government-registered educational institution</strong>, we are committed to 
                      maintaining professionalism, accountability, and continuous improvement. As the founder and Principal, 
                      I continue to coordinate and guide the academic and administrative activities of our branches, working 
                      closely with our teachers, academic team, parents, and students to strengthen the quality of education we provide.
                    </p>

                    <p>
                      Together, we aspire to create an environment where children are encouraged to discover their talents, 
                      overcome challenges, embrace opportunities, and prepare confidently for the future.
                    </p>
                  </div>

                  {/* Read More / Read Less Toggle */}
                  <button 
                    className="read-more-btn"
                    onClick={() => setExpandedMessage(!expandedMessage)}
                  >
                    <span>{expandedMessage ? 'Show Less' : 'Read Full Principal’s Message'}</span>
                    {expandedMessage ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {/* Sign-off */}
                  <div className="message-signature">
                    <p className="signature-val">With heartfelt gratitude and warm regards,</p>
                    <h4 className="signature-name">Dr. Nadeesha Jayawardena</h4>
                    <span className="signature-title">Founder & Principal</span>
                    <span className="signature-school">Kingsbridge American College</span>
                    <span className="signature-branches">Boralesgamuwa, Mattegoda & Horana Branches, Sri Lanka</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab 2: Credentials & Career */}
            {activeTab === 'credentials' && (
              <motion.div 
                className="credentials-card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="credentials-section">
                  <h3 className="cred-title">
                    <GraduationCap size={20} className="cred-icon" />
                    Academic & Professional Qualifications
                  </h3>
                  <div className="qualifications-grid">
                    {qualifications.map((q) => (
                      <div key={q.degree} className="qual-card">
                        <span className="qual-type-tag">{q.type}</span>
                        <h4>{q.degree}</h4>
                        <p>{q.institution}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="credentials-section">
                  <h3 className="cred-title">
                    <Award size={20} className="cred-icon" />
                    Distinguished Career Experience
                  </h3>
                  <div className="experience-timeline">
                    {experienceList.map((exp, idx) => (
                      <div key={idx} className="timeline-item">
                        <div className="timeline-dot" />
                        <div className="timeline-content">
                          <h4>{exp.role}</h4>
                          <p>{exp.place}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="principal-pillars">
                  <div className="pillar-item">
                    <BookOpen size={20} />
                    <div>
                      <strong>20+ Years</strong>
                      <span>Local & International Experience</span>
                    </div>
                  </div>
                  <div className="pillar-item">
                    <ShieldCheck size={20} />
                    <div>
                      <strong>Approved School</strong>
                      <span>Pre-School to Secondary Pathways</span>
                    </div>
                  </div>
                  <div className="pillar-item">
                    <UserCheck size={20} />
                    <div>
                      <strong>Motherly Care</strong>
                      <span>Safe, Child-Friendly Environment</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Bottom Actions */}
            <div className="principal-bottom-actions">
              <button 
                className="btn btn-primary"
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Contact Principal's Office
              </button>
              <button 
                className="btn btn-outline"
                onClick={() => document.querySelector('#academics')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Curriculums
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
