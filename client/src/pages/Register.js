import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', year: '',branch: '',enrollmentNumber: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form);
      login(res.data.user, res.data.token);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          🔍 Lost & Found
        </div>
        <div className="navbar-links">
          <button className="nav-link" onClick={() => navigate('/login')}>
            Sign In
          </button>
        </div>
      </nav>

      <div className="form-container">
        <h2>Create Account</h2>
        <p className="form-subtitle">Join the community today</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              className="form-input"
              name="name"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              className="form-input"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              className="form-input"
              name="password"
              type="password"
              placeholder="Minimum 6 characters"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
                    <div className="form-group">
          <label>Year</label>
          <input
            className="form-input"
            name="year"
            placeholder="2nd Year"
            value={form.year}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Branch</label>
          <input
            className="form-input"
            name="branch"
            placeholder="CSE"
            value={form.branch}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Enrollment Number</label>
          <input
            className="form-input"
            name="enrollmentNumber"
            placeholder="CSE2024001"
            value={form.enrollmentNumber}
            onChange={handleChange}
            required
          />
        </div>
          <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%', marginTop: '8px' }}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="form-link">
          Already have an account? <span onClick={() => navigate('/login')}>Sign in</span>
        </p>
      </div>

      <footer className="footer">
        <p>© 2024 Lost & Found. Built with <span>♥</span> for students.</p>
      </footer>
    </div>
  );
}