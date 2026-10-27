import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MapPin, ChevronDown } from 'lucide-react';
import logo from '/logo.png';
import './Navbar.css';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About & History', href: '#about' },
  { 
    label: 'Academics', 
    href: '#academics', 
    hasDropdown: true,
    dropdown: [
      'Pre-School & Daycare (Age 2½+)', 
      'Primary Education (Grades 1–5)', 
      'Secondary & O/L (Grades 6–11)',
      'School Transport & Facilities'
    ] 
  },
  { label: "Principal's Message", href: '#principal' },
  { label: 'Activities & Events', href: '#news' },
  { label: 'Branches', href: '#branches' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    setActiveDropdown(null);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Bar */}
      <div className="topbar">
        <div className="container topbar-inner">
          <div className="topbar-item">
            <MapPin size={14} />
            <span>Branches: <strong>Boralesgamuwa</strong> · <strong>Mattegoda</strong> · <strong>Horana</strong></span>
          </div>
          <div className="topbar-item">
            <Phone size={14} />
            <a href="tel:0777225582">077 722 5582</a>
          </div>
          <div className="topbar-right">
            <span className="topbar-badge">Admissions Open 2026/27</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-inner">
          {/* Logo */}
          <a href="#home" className="navbar-logo" onClick={() => handleNavClick('#home')}>
            <div className="logo-icon">
              <img src={logo} alt="Kingsbridge American College Logo" />
            </div>
            <div className="logo-text">
              <span className="logo-name">Kingsbridge</span>
              <span className="logo-sub">American College</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="navbar-links">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="nav-item"
                onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={link.href}
                  className="nav-link"
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown size={14} />}
                </a>
                {link.hasDropdown && activeDropdown === link.label && (
                  <motion.div
                    className="dropdown"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.dropdown.map((item) => (
                      <a key={item} href="#academics" className="dropdown-item"
                         onClick={(e) => { e.preventDefault(); handleNavClick('#academics'); }}>
                        {item}
                      </a>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA */}
          <a href="#contact" className="btn btn-primary navbar-cta"
             onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}>
            Apply Now
          </a>

          {/* Mobile toggle */}
          <button className="mobile-toggle" id="mobile-menu-toggle" onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="mobile-link"
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                >
                  {link.label}
                </a>
              ))}
              <a href="#contact" className="btn btn-primary mobile-cta"
                 onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}>
                Apply Now
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
