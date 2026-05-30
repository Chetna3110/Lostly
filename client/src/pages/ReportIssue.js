import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function ReportIssue() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '', type: 'fake_item' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Issue reported! Admin will review it.');
    navigate('/dashboard');
  };

  return (
    <div style={styles.page}>
      <button style={styles.backBtn} onClick={() => navigate('/dashboard')}>
        ← Back
      </button>
      <div style={styles.card}>
        <h2>Report an Issue</h2>
        <form onSubmit={handleSubmit}>
          <input style={styles.input} placeholder="Issue Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <textarea style={styles.textarea} placeholder="Describe the issue" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
          <select style={styles.input} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
            <option value="fake_item">Fake Item</option>
            <option value="spam">Spam</option>
            <option value="harassment">Harassment</option>
            <option value="other">Other</option>
          </select>
          <button style={styles.button} type="submit">Submit Report</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: { padding: '2rem', background: '#f9fafb', minHeight: '100vh' },
  backBtn: { padding: '10px 20px', background: '#fff', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', marginBottom: '2rem' },
  card: { background: '#fff', padding: '2rem', borderRadius: '12px', maxWidth: '600px', margin: '0 auto' },
  input: { width: '100%', padding: '12px', margin: '8px 0', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px', boxSizing: 'border-box' },
  textarea: { width: '100%', padding: '12px', margin: '8px 0', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px', boxSizing: 'border-box', minHeight: '120px', fontFamily: 'inherit' },
  button: { width: '100%', padding: '12px', marginTop: '12px', background: '#667eea', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: '600' },
};