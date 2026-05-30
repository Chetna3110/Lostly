import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LandingPage.css';
import { useEffect, useState } from 'react';

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);


  function CountUp({ end, duration = 1500, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
}

  return (
    <div className="landing-page">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="landing-container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="badge-dot"></span>
                Campus Lost & Found Platform
              </div>
              <h1 className="hero-title">
                Find What You Lost.
                <span className="gradient-text"> Fast & Easy.</span>
              </h1>
              <p className="hero-description">
                The ultimate platform for students to report, search, and recover lost items. 
                Connect with your campus community and reunite belongings in minutes.
              </p>
              <div className="hero-buttons">
                <button className="btn-hero-primary" onClick={() => navigate('/register')}>
                  <span>Start for Free</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="btn-hero-secondary" onClick={() => navigate('/login')}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 10L10 12L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Sign In</span>
                </button>
              </div>
              <div className="hero-stats">
                <div className="stat-pill">
                  <span className="stat-icon">📦</span>
                  <span>500+ Items Posted</span>
                </div>
                <div className="stat-pill">
                  <span className="stat-icon">✨</span>
                  <span>200+ Reunited</span>
                </div>
                <div className="stat-pill">
                  <span className="stat-icon">👥</span>
                  <span>1000+ Users</span>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="visual-card card-1">
                <div className="card-icon">🔴</div>
                <div className="card-content">
                  <div className="card-tag lost">Lost Item</div>
                  <div className="card-title">AirPods Pro</div>
                  <div className="card-meta">Library • 2 hours ago</div>
                </div>
              </div>
              <div className="visual-card card-2">
                <div className="card-icon">🟢</div>
                <div className="card-content">
                  <div className="card-tag found">Found Item</div>
                  <div className="card-title">Student ID Card</div>
                  <div className="card-meta">Cafeteria • 5 hours ago</div>
                </div>
              </div>
              <div className="visual-card card-3">
                <div className="card-icon">✅</div>
                <div className="card-content">
                  <div className="card-tag resolved">Reunited!</div>
                  <div className="card-title">Water Bottle</div>
                  <div className="card-meta">Gym • Yesterday</div>
                </div>
              </div>
              <div className="floating-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
              </div>
            </div>
          </div>
        </div>
      </section>


{/* HOW IT WORKS FLOW */}
<section className="flow-section">
  <div className="landing-container">
    
    <div className="section-header">
      <span className="section-tag">Process</span>
      <h2 className="section-title">How It Works</h2>
      <p className="section-description">
        Recover your lost items in 4 simple steps
      </p>
    </div>

    <div className="flow-steps">

      {/* STEP 1 */}
      <div className="flow-step">
        <div className="flow-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 16V4"/>
              <path d="M8 8l4-4 4 4"/>
              <rect x="4" y="16" width="16" height="4" rx="2"/>
            </svg>
        </div>
        <h3>Post Item</h3>
        <p>Report lost or found items instantly</p>
      </div>

      <div className="flow-arrow">→</div>

      {/* STEP 2 */}
      <div className="flow-step">
        <div className="flow-icon">
         <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
                    </div>
        <h3>Community Sees</h3>
        <p>Students nearby get notified</p>
      </div>

      <div className="flow-arrow">→</div>

      {/* STEP 3 */}
      <div className="flow-step">
        <div className="flow-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
        </div>
        <h3>Claim & Verify</h3>
        <p>Secure identity verification</p>
      </div>

      <div className="flow-arrow">→</div>

      {/* STEP 4 */}
      <div className="flow-step highlight">
        <div className="flow-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9 12l2 2 4-4"/>
          </svg>
        </div>
        <h3>Reunited</h3>
        <p>Item safely returned</p>
      </div>

    </div>
  </div>
</section>
      {/* Live Activity Feed */}
<section className="live-section">
  <div className="landing-container">
    <h2 className="section-title">Recent Activity</h2>

    <div className="live-feed">
      <div className="feed-item">🔴 Lost Wallet - Library (2 min ago)</div>
      <div className="feed-item">🟢 Found Keys - Canteen (10 min ago)</div>
      <div className="feed-item">🔴 Lost Phone - Hostel A (30 min ago)</div>
      <div className="feed-item">🟢 Found ID Card - Parking Area</div>
    </div>
  </div>
</section>

      {/* Features Section */}
      <section className="features-section">
        <div className="landing-container">
          <div className="section-header">
            <span className="section-tag">How It Works</span>
            <h2 className="section-title">Everything You Need in One Place</h2>
            <p className="section-description">
              A complete solution to manage lost and found items on your campus
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                  📝
                </div>
              </div>
              <h3 className="feature-title">Quick Posting</h3>
              <p className="feature-description">
                Report lost or found items in under a minute. Add photos, descriptions, 
                and location details with our intuitive form.
              </p>
              <ul className="feature-list">
                <li>Upload multiple photos</li>
                <li>Add detailed descriptions</li>
                <li>Set exact location</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                  🔍
                </div>
              </div>
              <h3 className="feature-title">Smart Search</h3>
              <p className="feature-description">
                Advanced filters help you find exactly what you're looking for. 
                Search by category, date, location, and more.
              </p>
              <ul className="feature-list">
                <li>Filter by category</li>
                <li>Search by date range</li>
                <li>Location-based results</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                  💬
                </div>
              </div>
              <h3 className="feature-title">Direct Connect</h3>
              <p className="feature-description">
                Contact owners instantly through our secure platform. 
                Verify identity with admin assistance before claiming items.
              </p>
              <ul className="feature-list">
                <li>Secure messaging</li>
                <li>Admin verification</li>
                <li>Safe meetup spots</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
                  📱
                </div>
              </div>
              <h3 className="feature-title">Mobile Ready</h3>
              <p className="feature-description">
                Access from anywhere on any device. Get real-time notifications 
                when someone finds your item.
              </p>
              <ul className="feature-list">
                <li>Responsive design</li>
                <li>Instant notifications</li>
                <li>Works offline</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
                  🔒
                </div>
              </div>
              <h3 className="feature-title">Safe & Secure</h3>
              <p className="feature-description">
                Your privacy matters. All data is encrypted and admin-verified 
                to prevent fake posts and scams.
              </p>
              <ul className="feature-list">
                <li>End-to-end encryption</li>
                <li>Admin moderation</li>
                <li>Privacy controls</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon" style={{ background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' }}>
                  ⚡
                </div>
              </div>
              <h3 className="feature-title">Lightning Fast</h3>
              <p className="feature-description">
                Built with modern technology for instant searches and real-time 
                updates. No lag, no waiting.
              </p>
              <ul className="feature-list">
                <li>Instant search results</li>
                <li>Real-time updates</li>
                <li>Optimized performance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="landing-container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">
                <CountUp end={500} suffix="+" />
              </div>       
                     <div className="stat-label">Items Posted</div>
              <div className="stat-trend">
                <span className="trend-icon">↗</span>
                <span>+25% this month</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-number">200+</div>
              <div className="stat-label">Items Reunited</div>
              <div className="stat-trend">
                <span className="trend-icon">↗</span>
                <span>95% success rate</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Active Students</div>
              <div className="stat-trend">
                <span className="trend-icon">↗</span>
                <span>Growing daily</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Platform Uptime</div>
              <div className="stat-trend">
                <span className="trend-icon">✓</span>
                <span>Always available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="landing-container">
          <div className="cta-content">
            <div className="cta-icon">🎉</div>
            <h2 className="cta-title">Ready to Get Started?</h2>
            <p className="cta-description">
              Join hundreds of students who have successfully recovered their lost items. 
              It's completely free and takes less than a minute to sign up.
            </p>
            <div className="cta-buttons">
              <button className="btn-cta-primary" onClick={() => navigate('/register')}>
                Create Free Account
              </button>
              <button className="btn-cta-secondary" onClick={() => navigate('/login')}>
                Sign In
              </button>
            </div>
           
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="logo-text">Lostly</span>
              </div>
              <p className="footer-tagline">
                Your Smart Lost & Found System
              </p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                
              </div>
              <div className="footer-column">
                
              </div>
              <div className="footer-column">
                <h4>Resources</h4>
                <a href="#help">Help Center</a>
                <a href="#privacy">Privacy</a>
                <a href="#terms">Terms</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Lostly. Built with ♥ for students.</p>
            <div className="footer-socials">
              <a href="#twitter">Twitter</a>
              <a href="#linkedin">LinkedIn</a>
              <a href="#github">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}