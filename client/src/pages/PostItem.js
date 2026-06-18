import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function PostItem({ defaultType = 'lost' }) {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'other',
    type: defaultType,
    location: '',
    date: '',
    studentName: user?.name || '',
    enrollmentNumber: '',
    branch: '',
    year: '',
    contactPhone: '',
  });
  const [images, setImages] = useState([]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.location || !form.date) {
  toast.error('Please fill all required fields');
  return;
}

if (form.contactPhone.length !== 10) {
  toast.error('Enter valid phone number');
  return;
}
    setLoading(true);

    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    images.forEach((img) => formData.append('images', img));

    try {
      await axios.post('https://lostly.onrender.com/api/items', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Item posted successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to post item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
          LOstly
        </div>
        <div className="navbar-links">
          <button className="nav-link" onClick={() => navigate('/dashboard')}>
            ← Back to Dashboard
          </button>
        </div>
      </nav>

      <div className="form-container" style={{ maxWidth: '700px' }}>
        <h2>{form.type === 'lost' ? 'Report Lost Item' : 'Report Found Item'}</h2>
        <p className="form-subtitle">Fill in all details for verification</p>
        
        <form onSubmit={handleSubmit}>
          {/* Item Details Section */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1rem', color: '#1e293b' }}>
              📦 Item Details
            </h3>

            <div className="form-group">
              <label>Item Title</label>
              <input
                className="form-input"
                name="title"
                placeholder="e.g., Black iPhone 13"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-input"
                style={{ minHeight: '100px', resize: 'vertical' }}
                name="description"
                placeholder="Describe the item in detail..."
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Type</label>
                <select className="form-input" name="type" value={form.type} onChange={handleChange}>
                  <option value="lost">Lost</option>
                  <option value="found">Found</option>
                </select>
              </div>

              <div className="form-group">
                <label>Category</label>
                <select className="form-input" name="category" value={form.category} onChange={handleChange}>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="accessories">Accessories</option>
                  <option value="documents">Documents</option>
                  <option value="keys">Keys</option>
                  <option value="bags">Bags</option>
                  <option value="books">Books</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Location</label>
                <input
                  className="form-input"
                  name="location"
                  placeholder="Where was it lost/found?"
                  value={form.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Date</label>
                <input
                  className="form-input"
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Upload Images (Optional)</label>
              <input
                className="form-input"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Student Authentication Section */}
          <div style={{ marginBottom: '2rem', paddingTop: '1.5rem', borderTop: '2px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.5rem', color: '#1e293b' }}>
              🎓 Student Verification Details
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1rem' }}>
              Required for authentication and contact purposes
            </p>

            <div className="form-group">
              <label>Your Name</label>
              <input
                className="form-input"
                name="studentName"
                placeholder="Full Name"
                value={form.studentName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Enrollment Number</label>
              <input
                className="form-input"
                name="enrollmentNumber"
                placeholder="e.g., 2021CS001"
                value={form.enrollmentNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Branch</label>
                <select
                  className="form-input"
                  name="branch"
                  value={form.branch}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Branch</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Civil">Civil</option>
                  <option value="Electrical">Electrical</option>
                  <option value="IT">Information Technology</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Year</label>
                <select
                  className="form-input"
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Contact Phone Number</label>
              <input
                className="form-input"
                name="contactPhone"
                type="tel"
                placeholder="9876543210"
                value={form.contactPhone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%', marginTop: '1rem' }}>
            {loading ? 'Posting...' : 'Post Item'}
          </button>
        </form>
      </div>

      <footer className="footer">
        <p>© 2026 Lostly - Your Smart Lost & Found System. Built with <span>♥</span> for students.</p>
      </footer>
    </div>
  );
}