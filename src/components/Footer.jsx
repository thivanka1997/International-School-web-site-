import { Phone, MapPin } from 'lucide-react';
import logo from '/logo.png';
import './Footer.css';

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const YEAR = new Date().getFullYear();

const quickLinks = ['Home', 'About Us', 'Academics', "Principal's Message", 'Activities & Events', 'Branches', 'Gallery', 'Contact'];
const gradeLevels = [
  'Pre-School & Daycare (2½+)',
  'Primary (Grades 1 – 5)',
  'Secondary & O/L (Grades 6 – 11)',
  'National & Cambridge Pathways',
  'School Transport Service'
];

export default function Footer() {
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <img src={logo} alt="Kingsbridge American College" style={{ width: 60, height: 60, objectFit: 'contain' }} />
              <div>
                <span className="footer-logo-name">Kingsbridge</span>
                <span className="footer-logo-sub">American College</span>
              </div>
            </div>
            <p className="footer-desc">
              Founded in 2015 by Dr. Nadeesha Jayawardena. Providing quality English-medium education from 
              Pre-School through Primary and Secondary with loving motherly care across Boralesgamuwa, Mattegoda, and Horana.
            </p>
            <div className="footer-socials">
              <a 
                href="https://www.facebook.com/share/p/14k9xrnLJBn/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-btn" 
                aria-label="Official Facebook Page"
                title="Follow on Facebook"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a href="#home"
                    onClick={(e) => { 
                      e.preventDefault(); 
                      const target = link === "Principal's Message" 
                        ? '#principal' 
                        : link === 'About Us' 
                        ? '#about' 
                        : link === 'Activities & Events'
                        ? '#news'
                        : `#${link.toLowerCase().replace(/\s+/g,'')}`;
                      scrollTo(target); 
                    }}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Grade Levels */}
          <div className="footer-col">
            <h4 className="footer-col-title">Academics</h4>
            <ul className="footer-links">
              {gradeLevels.map((l) => (
                <li key={l}>
                  <a href="#academics" onClick={(e) => { e.preventDefault(); scrollTo('#academics'); }}>{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="footer-col-title">Our 3 Branches</h4>
            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <MapPin size={16} />
                <span><strong>Boralesgamuwa Branch</strong> (Main)</span>
              </div>
              <div className="footer-contact-item">
                <MapPin size={16} />
                <span><strong>Mattegoda Branch</strong></span>
              </div>
              <div className="footer-contact-item">
                <MapPin size={16} />
                <span><strong>Horana Branch</strong></span>
              </div>
              <div className="footer-contact-item">
                <Phone size={16} />
                <a href="tel:0777225582">077 722 5582</a>
              </div>
            </div>

            {/* Admissions CTA */}
            <div className="footer-admissions">
              <p>Admissions Open 2026/27</p>
              <button className="btn btn-gold footer-admit-btn"
                onClick={() => scrollTo('#contact')}>
                Apply for Admission
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {YEAR} Kingsbridge American College. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="tel:0777225582">077 722 5582</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
