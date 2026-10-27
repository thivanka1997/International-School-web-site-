import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Phone, MapPin, Clock, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import './Contact.css';

const branches = [
  {
    name: 'Boralesgamuwa Branch (Main)',
    address: 'Boralesgamuwa, Colombo District, Sri Lanka',
    phone: '077 722 5582',
    grades: 'Pre-School, Primary (Grades 1–6) & Secondary',
  },
  {
    name: 'Mattegoda Branch',
    address: 'Mattegoda (Maththegoda), Sri Lanka',
    phone: '077 722 5582',
    grades: 'Pre-School, Daycare Facility & Primary School',
  },
  {
    name: 'Horana Branch',
    address: 'Horana, Sri Lanka',
    phone: '077 722 5582',
    grades: 'Pre-School & Primary English Medium Programmes',
  },
];

const gradeOptions = [
  { value: 'Pre-School / Daycare', title: 'Pre-School & Daycare', sub: 'Age 2½ – 5' },
  { value: 'Primary School (Grade 1 - 5)', title: 'Primary School', sub: 'Grades 1 – 5' },
  { value: 'Secondary & O/L (Grades 6 - 11)', title: 'Secondary & O/L', sub: 'Grades 6 – 11' },
  { value: 'Cambridge Curriculum', title: 'Cambridge Pathway', sub: 'Cambridge Curriculum' },
];

// Enquiries are delivered two ways: by email (via FormSubmit, since the site has no
// backend of its own) and by WhatsApp to the admissions number.
const ENQUIRY_EMAIL = 'principal@kingsbridgeamericancollege.com';
const EMAIL_ENDPOINT = `https://formsubmit.co/ajax/${ENQUIRY_EMAIL}`;
const WHATSAPP_NUMBER = '94777225582'; // 077 722 5582 in international format

const enquiryText = (f) => [
  '*New Admission Enquiry – Kingsbridge American College*',
  `Parent / Guardian: ${f.name}`,
  `Phone: ${f.phone}`,
  f.email && `Email: ${f.email}`,
  `Branch: ${f.branch}`,
  `Grade / Programme: ${f.grade}`,
  f.message && `Message: ${f.message}`,
].filter(Boolean).join('\n');

const whatsappUrl = (f) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(enquiryText(f))}`;

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '', phone: '', email: '', branch: 'Boralesgamuwa Branch', grade: 'Pre-School / Daycare', message: '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSending(true);

    // Open WhatsApp straight away, while the click still counts as a user action
    // (browsers block pop-ups opened after an await).
    window.open(whatsappUrl(form), '_blank', 'noopener');

    try {
      const res = await fetch(EMAIL_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `New Admission Enquiry – ${form.name} (${form.branch})`,
          _template: 'table',
          _captcha: 'false',
          _replyto: form.email || undefined,
          'Parent / Guardian Name': form.name,
          'Phone Number': form.phone,
          'Email Address': form.email || '—',
          'Preferred Branch': form.branch,
          'Grade / Programme': form.grade,
          Message: form.message || '—',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || String(data.success) === 'false') throw new Error(data.message || 'Send failed');
      setSubmitted(true);
    } catch {
      setError('Sorry, we could not send your enquiry by email. Please send it on WhatsApp or call us on 077 722 5582.');
    } finally {
      setSending(false);
    }
  };

  const resetForm = () => {
    setForm({ ...form, name: '', phone: '', email: '', message: '' });
    setSubmitted(false);
  };

  return (
    <section id="contact" className="contact-section" ref={ref}>
      {/* Top wave */}
      <div className="contact-wave">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,40 C360,0 1080,80 1440,20 L1440,0 L0,0 Z" fill="#f8fafc"/>
        </svg>
      </div>

      <div className="container">
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
            Admissions & Inquiries
          </span>
          <h2 className="section-heading" style={{ color: 'white' }}>
            Join the Kingsbridge Family
          </h2>
          <p className="section-sub" style={{ color: 'rgba(255,255,255,0.75)' }}>
            We welcome parents to visit any of our branches in Boralesgamuwa, Mattegoda, and Horana. 
            Speak with our admissions counsellors and experience our motherly care first-hand.
          </p>
        </motion.div>

        <div className="contact-grid">
          {/* Branches and Info */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="branches-overview-card">
              <div className="b-card-top">
                <MapPin size={22} className="b-icon" />
                <div>
                  <h4>Our School Branches</h4>
                  <span className="b-reg">Boralesgamuwa · Mattegoda · Horana</span>
                </div>
              </div>

              <div className="b-list">
                {branches.map((b) => (
                  <div key={b.name} className="b-item">
                    <h5>{b.name}</h5>
                    <p className="b-addr">{b.address}</p>
                    <p className="b-grades"><strong>Programmes:</strong> {b.grades}</p>
                    <a href="tel:0777225582" className="b-call"><Phone size={14} /> Call: {b.phone}</a>
                  </div>
                ))}
              </div>
            </div>

            <div className="contact-card general-hours">
              <div className="contact-card-icon"><Clock size={22} /></div>
              <div>
                <h4 className="contact-card-title">School & Admissions Hours</h4>
                <p className="contact-card-line">Monday – Friday: 7:30 AM – 4:00 PM</p>
                <p className="contact-card-line">Saturday: 8:00 AM – 1:00 PM</p>
                <p className="contact-card-line"><em>Daycare facility operates extended hours for working parents.</em></p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="contact-form-wrap"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {submitted ? (
              <div className="form-success">
                <CheckCircle2 size={56} className="success-icon" />
                <h3>Thank You for Contacting Us!</h3>
                <p>
                  We have received your admission enquiry. Our Admissions Officer will contact you 
                  at <strong>{form.phone}</strong> shortly to discuss the next steps and arrange a branch visit.
                </p>
                <p className="form-success-wa">
                  WhatsApp didn&apos;t open? Send the same details to our admissions team on WhatsApp:
                </p>
                <div className="form-success-actions">
                  <a href={whatsappUrl(form)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                    <MessageCircle size={18} />
                    Send on WhatsApp
                  </a>
                  <button className="btn btn-outline" onClick={resetForm}>
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <h3 className="form-title">Student Admission Enquiry Form</h3>
                <p className="form-subtitle">Admissions open for the 2026/27 academic year</p>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Parent / Guardian Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="e.g. Priyantha Perera"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      placeholder="e.g. 077 123 4567"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="parent@example.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="branch">Preferred Branch *</label>
                    <select
                      id="branch"
                      name="branch"
                      value={form.branch}
                      onChange={handleChange}
                    >
                      <option value="Boralesgamuwa Branch">Boralesgamuwa Branch (Main)</option>
                      <option value="Mattegoda Branch">Mattegoda Branch</option>
                      <option value="Horana Branch">Horana Branch</option>
                    </select>
                  </div>
                </div>

                <fieldset className="form-group grade-picker">
                  <legend>Grade / Programme *</legend>
                  <div className="grade-options">
                    {gradeOptions.map((g) => (
                      <label key={g.value} className={`grade-option ${form.grade === g.value ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="grade"
                          value={g.value}
                          checked={form.grade === g.value}
                          onChange={handleChange}
                        />
                        <span className="grade-option-title">{g.title}</span>
                        <span className="grade-option-sub">{g.sub}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="form-group">
                  <label htmlFor="message">Message / Any Special Requirements</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="Tell us about your child's age, previous school, or any specific questions..."
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                {error && (
                  <div className="form-error" role="alert">
                    <p>{error}</p>
                    <a href={whatsappUrl(form)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                      <MessageCircle size={18} />
                      Send on WhatsApp
                    </a>
                  </div>
                )}

                <button type="submit" className="btn btn-gold form-submit-btn" disabled={sending}>
                  <Send size={18} />
                  {sending ? 'Sending…' : 'Submit Admission Enquiry'}
                </button>
                <p className="form-note">
                  Your enquiry is emailed to our Principal&apos;s office and opened in WhatsApp for you to send.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
