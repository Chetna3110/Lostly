import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div style={styles.page}>
      <button style={styles.backBtn} onClick={() => navigate('/dashboard')}>
        ← Back to Dashboard
      </button>
      <div style={styles.card}>
        <div style={styles.avatar}>{user?.name?.charAt(0).toUpperCase()}</div>
        <h1 style={styles.name}>{user?.name}</h1>
        <p style={styles.email}>{user?.email}</p>
        <p style={styles.role}>Role: {user?.role}</p>
        <button style={styles.editBtn}>Edit Profile</button>
      </div>
    </div>
  );
}

const styles = {
  page: { padding: '2rem', background: '#f9fafb', minHeight: '100vh' },
  backBtn: { padding: '10px 20px', background: '#fff', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', marginBottom: '2rem' },
  card: { background: '#fff', padding: '3rem', borderRadius: '12px', maxWidth: '500px', margin: '0 auto', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  avatar: { width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '42px', fontWeight: '600', margin: '0 auto 1.5rem' },
  name: { fontSize: '28px', fontWeight: '700', marginBottom: '0.5rem' },
  email: { fontSize: '16px', color: '#666', marginBottom: '0.5rem' },
  role: { fontSize: '14px', color: '#999', marginBottom: '2rem', textTransform: 'capitalize' },
  editBtn: { padding: '12px 32px', background: '#667eea', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: '600' },
};