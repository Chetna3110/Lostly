import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function ItemDetailModal({ item, onClose, onUpdate }) {
  const { user, token } = useAuth();
  const [showContact, setShowContact] = useState(false);
  const [submitting, setSubmitting] = useState(false);

const isOwner = item?.postedBy?._id === user?.id;  const isAdmin = user?.role === 'admin';
  const canEdit = isOwner || isAdmin;

  const handleDelete = async () => {
    if (!window.confirm('Delete this item permanently?')) return;
    
    try {
      await axios.delete(`https://lostly.onrender.com/api/items/${item._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Item deleted successfully');
      onClose();
      if (onUpdate) onUpdate();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete item');
    }
  };

  const handleResolve = async () => {
    if (!window.confirm('Mark this item as resolved?')) return;
    
    try {
      await axios.put(
        `https://lostly.onrender.com/api/items/${item._id}`,
        { status: 'resolved' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Item marked as resolved');
      onClose();
      if (onUpdate) onUpdate();
    } catch (err) {
      toast.error('Failed to resolve item');
    }
  };

  const handleSubmitToAdmin = async () => {
    if (!window.confirm('Submit this item to admin for verification?')) return;
    
    setSubmitting(true);
    try {
      await axios.put(
        `https://lostly.onrender.com/api/items/${item._id}`,
        { status: 'pending_admin_review' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Item submitted to admin for review!');
      onClose();
      if (onUpdate) onUpdate();
    } catch (err) {
      toast.error('Failed to submit to admin');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClaim = async (itemId) => {
  try {
    await axios.post(
      'https://lostly.onrender.com/api/claims',
      { itemId, message: 'This belongs to me' },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    toast.success('Claim request sent!');
  } catch (err) {
    toast.error('Failed to send claim');
  }
};
  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeBtn} onClick={onClose}>✕</button>
        
        {/* Images */}
        {item.images && item.images.length > 0 && (
          <div style={styles.imageContainer}>
            <img src={item.images[0]} alt={item.title} style={styles.image} />
          </div>
        )}

        {/* Content */}
        <div style={styles.content}>
          <div style={item.type === 'lost' ? styles.badgeLost : styles.badgeFound}>
            {item.type === 'lost' ? '🔴 Lost Item' : '🟢 Found Item'}
          </div>

          {/* Status Badge */}
          {item.status === 'resolved' && (
            <div style={styles.badgeResolved}>✅ Resolved</div>
          )}
          {item.status === 'pending_admin_review' && (
            <div style={styles.badgePending}>⏳ Pending Admin Review</div>
          )}

          <h2 style={styles.title}>{item.title}</h2>
          
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Description</h3>
            <p style={styles.description}>{item.description}</p>
          </div>

          <div style={styles.infoGrid}>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>📍 Location</span>
              <span style={styles.infoValue}>{item.location}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>📅 Date</span>
              <span style={styles.infoValue}>{new Date(item.date).toLocaleDateString()}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>📦 Category</span>
              <span style={styles.infoValue}>{item.category}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>⏰ Posted</span>
              <span style={styles.infoValue}>{new Date(item.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Student Details */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>🎓 Posted By (Student Details)</h3>
            <div style={styles.studentCard}>
              <div style={styles.studentInfo}>
                <p><strong>Name:</strong> {item.studentName}</p>
                <p><strong>Enrollment No:</strong> {item.enrollmentNumber}</p>
                <p><strong>Branch:</strong> {item.branch}</p>
                <p><strong>Year:</strong> {item.year}</p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          {showContact ? (
            <div style={styles.contactCard}>
              <h3 style={styles.sectionTitle}>📞 Contact Information</h3>
              <div style={styles.contactInfo}>
                <p><strong>📧 Email:</strong> {item.postedBy?.email}</p>
                <p><strong>📱 Phone:</strong> {item.contactPhone}</p>
                <p><strong>👤 Name:</strong> {item.studentName}</p>
                <p><strong>🎓 Enrollment:</strong> {item.enrollmentNumber}</p>
              </div>
              <div style={styles.adminContact}>
                <h4 style={styles.adminTitle}>📞 Admin Contact (For Verification)</h4>
                <p><strong>Email:</strong> admin@lostandfound.com</p>
                <p><strong>Phone:</strong> +91 9876543210</p>
                <p><strong>Office:</strong> Student Affairs Office, Block A</p>
                <p style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: '#64748b' }}>
                  ℹ️ Contact admin to verify the item before claiming
                </p>
              </div>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={() => setShowContact(true)} style={{ width: '100%' }}>
              📞 View Contact Information
            </button>
          )}

          {/* Action Buttons */}
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            
            {/* Submit to Admin - Only for found items by owner */}
            {item.type === 'found' && isOwner && item.status === 'active' && (
              <button
                className="btn"
                onClick={handleSubmitToAdmin}
                disabled={submitting}
                style={{ width: '100%', background: '#f59e0b', color: 'white' }}
              >
                {submitting ? 'Submitting...' : '📦 Submit Found Item to Admin'}
              </button>
            )}

            {/* Mark as Resolved - Owner or Admin only */}
            {/* FIX: Only admin can resolve */}
              {isAdmin && item.status === 'active' && (
                <button
                  className="btn"
                  onClick={handleResolve}
                  style={{ width: '100%', background: '#10b981', color: 'white' }}
                >
                  ✅ Mark as Resolved
                </button>
              )}
                            <button
                className="btn"
                onClick={() => handleClaim(item._id)}
              >
                🙋 This is mine
              </button>
            {/* Delete - Owner or Admin only */}
            {canEdit && (
              <button
                className="btn"
                onClick={handleDelete}
                style={{ width: '100%', background: '#ef4444', color: 'white' }}
              >
                🗑️ Delete Item
              </button>
            )}

            {/* Admin Badge */}
            {isAdmin && (
              <div style={{ padding: '0.75rem', background: '#fef3c7', borderRadius: '8px', textAlign: 'center', fontSize: '0.875rem', color: '#92400e', fontWeight: '600' }}>
                🔧 You have admin privileges on this item
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    padding: '1rem',
  },
  modal: {
    background: 'white',
    borderRadius: '20px',
    maxWidth: '700px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto',
    position: 'relative',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  closeBtn: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    fontSize: '20px',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    zIndex: 10,
  },
  imageContainer: {
    width: '100%',
    height: '300px',
    overflow: 'hidden',
    borderRadius: '20px 20px 0 0',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  content: {
    padding: '2rem',
  },
  badgeLost: {
    display: 'inline-block',
    padding: '0.5rem 1rem',
    background: '#fee2e2',
    color: '#991b1b',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    marginBottom: '1rem',
    marginRight: '0.5rem',
  },
  badgeFound: {
    display: 'inline-block',
    padding: '0.5rem 1rem',
    background: '#dcfce7',
    color: '#166534',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    marginBottom: '1rem',
    marginRight: '0.5rem',
  },
  badgeResolved: {
    display: 'inline-block',
    padding: '0.5rem 1rem',
    background: '#d1fae5',
    color: '#065f46',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    marginBottom: '1rem',
    marginRight: '0.5rem',
  },
  badgePending: {
    display: 'inline-block',
    padding: '0.5rem 1rem',
    background: '#fef3c7',
    color: '#92400e',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '1.875rem',
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: '1.5rem',
  },
  section: {
    marginBottom: '1.5rem',
  },
  sectionTitle: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '0.75rem',
  },
  description: {
    color: '#64748b',
    lineHeight: '1.7',
    fontSize: '0.95rem',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  infoLabel: {
    fontSize: '0.875rem',
    color: '#94a3b8',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: '0.95rem',
    color: '#1e293b',
    fontWeight: '600',
  },
  studentCard: {
    background: '#f8fafc',
    padding: '1.25rem',
    borderRadius: '12px',
    border: '2px solid #e2e8f0',
  },
  studentInfo: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0.75rem',
  },
  contactCard: {
    background: '#f8fafc',
    padding: '1.5rem',
    borderRadius: '12px',
    marginTop: '1rem',
  },
  contactInfo: {
    marginBottom: '1.5rem',
  },
  adminContact: {
    borderTop: '2px solid #e2e8f0',
    paddingTop: '1rem',
  },
  adminTitle: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '0.75rem',
  },
};