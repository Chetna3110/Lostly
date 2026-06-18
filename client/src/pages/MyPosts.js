import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import './Myposts.css';

export default function MyPosts() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = async () => {
    try {
      const res = await axios.get('https://lostly.onrender.com/api/items/my/posts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(res.data);
    } catch (err) {
      toast.error('Failed to load your posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      await axios.delete(`https://lostly.onrender.com/api/items/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Item deleted');
      fetchMyPosts();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="myposts-page">
      
      <button className="back-btn" onClick={() => navigate('/dashboard')}>
        ← Back to Dashboard
      </button>

      <h1 className="myposts-title">My Posts</h1>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : items.length === 0 ? (
        <div className="empty">
          <p className="emptyIcon">📭</p>
          <p className="emptyText">You haven't posted anything yet</p>
          <button className="emptyBtn" onClick={() => navigate('/report-lost')}>
            Post Your First Item
          </button>
        </div>
      ) : (
        <div className="myposts-grid">
          {items.map((item) => (
            <div key={item._id} className="mypost-card">
              
              {item.images?.[0] && (
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="mypost-img"
                />
              )}

              <div className="mypost-body">
                
                <div className={`badge ${item.type === 'lost' ? 'badge-lost' : 'badge-found'}`}>
                  {item.type === 'lost' ? '🔴 Lost' : '🟢 Found'}
                </div>

                <h3>{item.title}</h3>
                <p>{item.description.slice(0, 60)}...</p>
                <p className="meta">📍 {item.location}</p>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item._id)}
                >
                  🗑️ Delete
                </button>

              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}