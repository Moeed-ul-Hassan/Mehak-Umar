import React, { useState, useEffect } from 'react';
import './App.css';

interface Project {
  id: number;
  image: string;
  title: string;
  category: string;
}

interface Service {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Skill {
  name: string;
  percentage: number;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
}

// Custom SVG Icons
const Icons = {
  Residential: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Commercial: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  Color: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r=".5" />
      <circle cx="17.5" cy="10.5" r=".5" />
      <circle cx="8.5" cy="7.5" r=".5" />
      <circle cx="6.5" cy="12.5" r=".5" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.75-.13 2.5-.35 1.15-.35 1.5-1.65 1.5-2.65 0-1.5 1.5-2 2.5-2 1.5 0 3.5 1.5 3.5 3.5 0 .1-.01.2-.01.3 1.29-1.83 2.01-4.06 2.01-6.3C22 6.5 17.5 2 12 2z" />
    </svg>
  ),
  Space: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 3H3v18h18V3z" />
      <path d="M9 3v18" />
      <path d="M3 9h18" />
      <path d="M15 3v18" />
      <path d="M3 15h18" />
    </svg>
  ),
  Lighting: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
      <line x1="9" y1="18" x2="15" y2="18" />
      <line x1="10" y1="22" x2="14" y2="22" />
    </svg>
  ),
  Furniture: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 18v3" />
      <path d="M20 18v3" />
      <path d="M19 13v-4a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v4" />
      <path d="M21 13H3v5h18v-5z" />
    </svg>
  ),
  Education: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  Location: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Specialty: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
};

function App() {
  const [activeTab, setActiveTab] = useState<'projects' | 'followers' | 'clients'>('projects');
  const [scrolled, setScrolled] = useState(false);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const projects: Project[] = [
    { id: 1, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80', title: 'Modern Living Room', category: 'Residential' },
    { id: 2, image: 'https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800&q=80', title: 'Contemporary Kitchen', category: 'Residential' },
    { id: 3, image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80', title: 'Cozy Bedroom', category: 'Residential' },
    { id: 4, image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&q=80', title: 'Elegant Dining', category: 'Residential' },
    { id: 5, image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80', title: 'Home Office', category: 'Commercial' },
    { id: 6, image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80', title: 'Luxury Bathroom', category: 'Residential' },
  ];

  const services: Service[] = [
    { id: 1, icon: <Icons.Residential />, title: 'Residential Design', description: 'Creating beautiful and functional living spaces tailored to your lifestyle' },
    { id: 2, icon: <Icons.Commercial />, title: 'Commercial Spaces', description: 'Professional office and retail interior design solutions' },
    { id: 3, icon: <Icons.Color />, title: 'Color Consultation', description: 'Expert color palette selection to enhance your space' },
    { id: 4, icon: <Icons.Space />, title: 'Space Planning', description: 'Optimizing layouts for maximum functionality and flow' },
    { id: 5, icon: <Icons.Lighting />, title: 'Lighting Design', description: 'Strategic lighting solutions to transform ambiance' },
    { id: 6, icon: <Icons.Furniture />, title: 'Furniture Selection', description: 'Curating perfect pieces that complement your design' },
  ];

  const skills: Skill[] = [
    { name: 'AutoCAD', percentage: 85 },
    { name: 'SketchUp', percentage: 90 },
    { name: 'Color Theory', percentage: 95 },
    { name: 'Space Planning', percentage: 88 },
    { name: '3D Rendering', percentage: 80 },
    { name: 'Project Management', percentage: 75 },
  ];

  const testimonials: Testimonial[] = [
    { id: 1, name: 'Sarah Johnson', role: 'Homeowner', text: 'Mehak transformed our living room into a stunning space that perfectly reflects our style. Her attention to detail is remarkable!', rating: 5 },
    { id: 2, name: 'David Chen', role: 'Business Owner', text: 'Professional, creative, and efficient. The office redesign exceeded our expectations and boosted team morale.', rating: 5 },
    { id: 3, name: 'Emma Williams', role: 'Restaurant Owner', text: 'Her innovative approach to our restaurant interior created an inviting atmosphere that customers love.', rating: 5 },
  ];

  return (
    <div className="portfolio">
      <div className="noise-overlay"></div>
      <div className="background-curtain"></div>

      {/* Floating Nav */}
      <nav className={`floating-nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-content">
          <span className="nav-logo">MU.</span>
          <div className="nav-links">
            <a href="#projects">Work</a>
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#contact" className="nav-contact-link">Contact</a>
          </div>
        </div>
      </nav>

      <div className="container">
        {/* Header Section */}
        <header className="header reveal">
          <div className="header-content">
            <div className="profile-section">
              <div className="profile-image-wrapper">
                <img
                  src="/profile.png"
                  alt="Mehak Umar"
                  className="profile-image"
                />
                <div className="profile-ring"></div>
              </div>
              <div className="profile-info">
                <h1 className="profile-name">Mehak Umar</h1>
                <p className="profile-title">Interior Designer</p>
              </div>
            </div>
            <button className="contact-btn">
              <span>Contact me</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

          <div className="bio-section reveal">
            <div className="bio-quote-icon">"</div>
            <p className="bio-text">
              Aspiring Interior Designer transforming spaces with fresh perspectives and creative vision. Currently learning and developing skills in spatial planning and aesthetic design. Based in Manchester.
            </p>
            <div className="bio-quote-icon-end">"</div>
          </div>

          <div className="stats-section reveal">
            <div className="stat-item">
              <p className="stat-label">Expertise</p>
              <p className="stat-value">Spatial Planning<br />Design Concepts</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <p className="stat-label">Network</p>
              <p className="stat-value">250+</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <p className="stat-label">Portfolio</p>
              <p className="stat-value">08</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <p className="stat-label">Base</p>
              <p className="stat-value">Manchester</p>
            </div>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="tabs reveal" id="projects">
          <button
            className={`tab ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            Selected Work
          </button>
          <button
            className={`tab ${activeTab === 'followers' ? 'active' : ''}`}
            onClick={() => setActiveTab('followers')}
          >
            Insights
          </button>
          <button
            className={`tab ${activeTab === 'clients' ? 'active' : ''}`}
            onClick={() => setActiveTab('clients')}
          >
            Partners
          </button>
        </div>

        {/* Projects Grid */}
        {activeTab === 'projects' && (
          <div className="projects-grid reveal">
            {projects.map((project, index) => (
              <div key={project.id} className="project-card" style={{ '--delay': `${index * 0.1}s` } as any}>
                <div className="project-image-container">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-image"
                  />
                  <div className="project-badge">{project.category}</div>
                </div>
                <div className="project-info-minimal">
                  <h3 className="project-title-new">{project.title}</h3>
                  <div className="project-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'followers' && (
          <div className="content-placeholder reveal">
            <p>Design insights and trends coming soon...</p>
          </div>
        )}

        {activeTab === 'clients' && (
          <div className="content-placeholder reveal">
            <p>Collaborations and partnerships coming soon...</p>
          </div>
        )}

        {/* Services Section */}
        <section className="services-section reveal" id="services">
          <div className="section-header-creative">
            <span className="section-subtitle">What I Do</span>
            <h2 className="section-title-creative">Design Services</h2>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={service.id} className="service-card" style={{ '--delay': `${index * 0.1}s` } as any}>
                <div className="service-icon-wrapper">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="skills-section reveal">
          <div className="section-header-creative">
            <span className="section-subtitle">Capabilities</span>
            <h2 className="section-title-creative">Technical Proficiency</h2>
          </div>
          <div className="skills-container">
            {skills.map((skill, index) => (
              <div key={index} className="skill-item" style={{ '--delay': `${index * 0.1}s` } as any}>
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percentage">{skill.percentage}%</span>
                </div>
                <div className="skill-bar">
                  <div
                    className="skill-progress"
                    style={{ width: `${skill.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials-section reveal">
          <div className="section-header-creative">
            <span className="section-subtitle">Feedback</span>
            <h2 className="section-title-creative">Client Experiences</h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="testimonial-card" style={{ '--delay': `${index * 0.1}s` } as any}>
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="star-svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="testimonial-author">
                  <p className="author-name">{testimonial.name}</p>
                  <p className="author-role">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About Me Section */}
        <section className="about-section reveal" id="about">
          <div className="section-header-creative">
            <span className="section-subtitle">The Designer</span>
            <h2 className="section-title-creative">About Mehak</h2>
          </div>
          <div className="about-content">
            <div className="about-text">
              <p>
                Hello! I'm Mehak Umar, a passionate interior designer based in Manchester, England.
                As a fresh graduate entering the world of interior design, I bring enthusiasm,
                creativity, and a modern perspective to every project.
              </p>
              <p>
                My design philosophy centers on creating spaces that are not only aesthetically
                pleasing but also functional and reflective of my clients' personalities. I believe
                that good design has the power to transform lives and enhance daily experiences.
              </p>
            </div>
            <div className="about-highlights">
              <div className="highlight-item">
                <div className="highlight-icon-wrapper"><Icons.Education /></div>
                <div>
                  <h4>Education</h4>
                  <p>Interior Design Degree</p>
                </div>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon-wrapper"><Icons.Location /></div>
                <div>
                  <h4>Location</h4>
                  <p>Manchester, England</p>
                </div>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon-wrapper"><Icons.Specialty /></div>
                <div>
                  <h4>Specialty</h4>
                  <p>Sustainable Design</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer reveal" id="contact">
          <div className="footer-content">
            <div className="footer-section">
              <h3 className="footer-title">Let's Create Together</h3>
              <p className="footer-text">Currently accepting new projects and collaborations.</p>
              <a href="mailto:mehak.umar@example.com" className="footer-email-creative">
                mehak.umar@example.com
                <div className="email-underline"></div>
              </a>
            </div>
            <div className="footer-section">
              <h3 className="footer-title">Social Presence</h3>
              <div className="social-links-creative">
                <a href="#" className="social-link-new">Instagram</a>
                <a href="#" className="social-link-new">LinkedIn</a>
                <a href="#" className="social-link-new">Pinterest</a>
                <a href="#" className="social-link-new">Behance</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 Mehak Umar. Crafted with Creative Vision.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
