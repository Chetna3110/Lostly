import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FiSearch, FiUser, FiAlertTriangle } from 'react-icons/fi';
import { FaBoxOpen, FaClipboardList } from 'react-icons/fa';
import { IoMdLocate } from 'react-icons/io';
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    lost: 0,
    found: 0,
    total: 0,
    myPosts: 0,
  });

  const fetchStats = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/items');
      const items = res.data;

      setStats({
        lost: items.filter(i => i.type === 'lost').length,
        found: items.filter(i => i.type === 'found').length,
        total: items.length,
        myPosts: items.filter(i => i.postedBy?._id === user?.id).length,
      });
    } catch (err) {
      console.error(err);
    }
  }, [user?.id]);

  useEffect(() => {
    if (!user) return;
    fetchStats();
  }, [user, fetchStats]);

  // ICONS
  const features = [
  { 
    title: 'Report Lost Item', 
    icon: IoMdLocate,
    path: '/report-lost', 
    desc: 'Lost something valuable?',
    color: 'red'
  },
  { 
    title: 'Report Found Item', 
    icon: FaBoxOpen,
    path: '/report-found', 
    desc: 'Found something?',
    color: 'green'
  },
  { 
    title: 'Browse All Items', 
    icon: FiSearch,
    path: '/browse-items', 
    desc: 'Search the database',
    color: 'blue'
  },
  { 
    title: 'My Posts', 
    icon: FaClipboardList,
    path: '/my-posts', 
    desc: 'View your posts',
    color: 'purple'
  },
  { 
    title: 'My Profile', 
    icon: FiUser,
    path: '/profile', 
    desc: 'Manage account',
    color: 'indigo'
  },
  { 
    title: 'Report Issue', 
    icon: FiAlertTriangle,
    path: '/report-issue', 
    desc: 'Report fake items',
    color: 'yellow'
  }
];

  return (
    <div className="dashboard">

      {/* 🔥 FLOATING BACKGROUND */}
      <div className="floating-bg"></div>

      <Navbar />

      {/* HERO */}
      <section className="hero" style={{ minHeight: '320px' }}>
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <div className="hero-badge">
            <span>✨</span> Welcome Back
          </div>

          <h1 style={{ fontSize: '2.75rem' }}>
            Hello, <em>{user?.name}</em>
          </h1>

          <p>What would you like to do today?</p>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-bar">
        <div className="stat-item">
          <h2>{stats.total}</h2>
          <p>Total Items</p>
        </div>

        <div className="stat-item">
          <h2>{stats.lost}</h2>
          <p>Lost Items</p>
        </div>

        <div className="stat-item">
          <h2>{stats.found}</h2>
          <p>Found Items</p>
        </div>

        <div className="stat-item">
          <h2>{stats.myPosts}</h2>
          <p>Your Posts</p>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="page-container">
        <div className="page-header">
          <div>
            <span className="section-label">Quick Actions</span>
            <h2 className="page-title">What would you like to do?</h2>
          </div>
        </div>

        <div className="features-grid">
          {features.map((action, idx) => {
            const Icon = action.icon;

            return (
              <div
                key={idx}
                className={`modern-card ${action.color}`}
                onClick={() => navigate(action.path)}
              >
                <div className="icon-glow">
                  <Icon size={32} />
                </div>

                <h3>{action.title}</h3>
                <p>{action.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}