import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import EditItemModal from '../components/EditItemModal';

export default function AdminDashboard() {
  const [claims, setClaims] = useState([]);
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [itemFilter, setItemFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // FETCH CLAIMS
  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const res = await axios.get(
          'https://lostly.onrender.com/api/claims/owner',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setClaims(res.data);
      } catch (err) {
        console.error('Error fetching claims');
      }
    };

    if (token) fetchClaims();
  }, [token]);

  const handleClaimAction = async (id, status) => {
    try {
      await axios.put(
        `https://lostly.onrender.com/api/claims/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setClaims(prev => prev.filter(c => c._id !== id));
    } catch (err) {
      console.error('Error updating claim');
    }
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [statsRes, usersRes, itemsRes] = await Promise.all([
        axios.get('https://lostly.onrender.com/api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get('https://lostly.onrender.com/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get('https://lostly.onrender.com/api/admin/items', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setStats({ ...statsRes.data });
      setUsers([...usersRes.data]);
      setItems([...itemsRes.data]);
    } catch (err) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [token]);

  const fetchItems = useCallback(async () => {
    try {
      let url = 'https://lostly.onrender.com/api/admin/items';
      if (itemFilter !== 'all') url += `?status=${itemFilter}`;

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setItems(res.data);
    } catch {
      toast.error('Failed to load items');
    }
  }, [token, itemFilter]);

  useEffect(() => {
    if (user?.role !== 'admin') {
      toast.error('Access denied');
      navigate('/dashboard');
      return;
    }
    fetchData();
  }, [user, fetchData, navigate]);

  useEffect(() => {
    if (activeTab === 'items') {
      fetchItems();
    }
  }, [activeTab, fetchItems]);

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Delete user?')) return;

    try {
      await axios.delete(`https://lostly.onrender.com/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('User deleted');
      fetchData();
    } catch {
      toast.error('Error deleting user');
    }
  };

  const handlePromoteUser = async (id) => {
    try {
      await axios.put(
        `https://lostly.onrender.com/api/admin/users/${id}/promote`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Promoted');
      fetchData();
    } catch {
      toast.error('Error promoting');
    }
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm('Delete item?')) return;

    try {
      await axios.delete(`https://lostly.onrender.com/api/admin/items/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Deleted');
      fetchData();
    } catch {
      toast.error('Error deleting');
    }
  };

  const handleResolveItem = async (id) => {
    try {
      await axios.put(
        `https://lostly.onrender.com/api/admin/items/${id}/resolve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Resolved');
      fetchData();
    } catch {
      toast.error('Error');
    }
  };

  const handleApproveItem = async (id) => {
    try {
      await axios.put(
        `https://lostly.onrender.com/api/admin/items/${id}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Approved');
      fetchData();
    } catch {
      toast.error('Error');
    }
  };

  if (loading) return <div style={{ padding: 50 }}>Loading...</div>;

  return (
    <div className="admin-layout">

      {/* SIDEBAR */}
      <div className="admin-sidebar">
        

        <button onClick={() => setActiveTab('overview')}>📊 Overview</button>
        {/* ✅ NEW CLAIMS TAB */}
        <button onClick={() => setActiveTab('claims')}>
          📬 Claims ({claims.length})
        </button>
        <button onClick={() => setActiveTab('users')}>👥 Users</button>
        <button onClick={() => setActiveTab('items')}>📦 Items</button>

       

        <button onClick={() => {
          setActiveTab('items');
          setItemFilter('pending_admin_review');
        }}>
          ⏳ Pending
        </button>
      </div>

      {/* CONTENT */}
      <div className="admin-content">

        {/* TOP BAR */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <h2> </h2>

          <div className="profile-dropdown">
            

            {dropdownOpen && (
              <div className="dropdown-menu">
                <button className="dropdown-item" onClick={() => navigate('/profile')}>
                  Profile
                </button>
                <button
                  className="dropdown-item danger"
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="stats-grid">
            <div className="glass-card"><h3>Users</h3><div>{stats?.totalUsers}</div></div>
            <div className="glass-card"><h3>Items</h3><div>{stats?.totalItems}</div></div>
            <div className="glass-card"><h3>Lost</h3><div>{stats?.lostItems}</div></div>
            <div className="glass-card"><h3>Found</h3><div>{stats?.foundItems}</div></div>
            <div className="glass-card"><h3>Resolved</h3><div>{stats?.resolvedItems}</div></div>
            <div className="glass-card"><h3>Pending</h3><div>{stats?.pendingReview}</div></div>
          </div>
        )}

        {/* ✅ CLAIMS TAB */}
        {activeTab === 'claims' && (
          <div className="glass-card">
            <h2>Claims Requests</h2>

            <div className="claims-container">
  

  {claims.length === 0 ? (
    <p className="no-claims">No claims yet</p>
  ) : (
    claims.map((claim) => (
      <div key={claim._id} className="claim-card">

        <div className="claim-info">
          <p><strong>Item:</strong> {claim.item.title}</p>
          <p><strong>Claimed by:</strong> {claim.claimant.name}</p>
          <p><strong>Message:</strong> {claim.message}</p>
        </div>

        <div className="claim-actions">
          <button
            className="btn-approve"
            onClick={() => handleClaimAction(claim._id, 'approved')}
          >
             Approve
          </button>

          <button
            className="btn-reject"
            onClick={() => handleClaimAction(claim._id, 'rejected')}
          >
             Reject
          </button>
        </div>

      </div>
    ))
  )}
</div>
          </div>
        )}

        {/* USERS */}
        {activeTab === 'users' && (
          <div className="glass-card">
            <h2>Users</h2>
            {users.map((u) => (
  <div key={u._id} style={styles.userCard}>
    
    <div style={styles.userInfo}>
      <div style={styles.userName}>{u.name}</div>
      <div style={{
        ...styles.userRole,
        background: u.role === 'admin' ? '#fef3c7' : '#e0f2fe',
        color: u.role === 'admin' ? '#92400e' : '#0369a1'
      }}>
        {u.role}
      </div>
    </div>

    <div style={styles.userActions}>
      {u.role !== 'admin' && (
        <button
          style={styles.promoteBtn}
          onClick={() => handlePromoteUser(u._id)}
        >
          Promote
        </button>
      )}

      <button
        style={styles.deleteBtn}
        onClick={() => handleDeleteUser(u._id)}
      > Delete
      </button>
    </div>

  </div>
))}
          </div>
        )}

        {/* ITEMS */}
        {activeTab === 'items' && (
          <div>
            <div>
              <button onClick={() => setItemFilter('all')}>All</button>
              <button onClick={() => setItemFilter('active')}>Active</button>
              <button onClick={() => setItemFilter('resolved')}>Resolved</button>
              <button onClick={() => setItemFilter('pending_admin_review')}>Pending</button>
            </div>

            <div className="items-grid">
              {items.map((item) => (
                <div key={item._id}>
                  <h4>{item.title}</h4>
                  <p>{item.location}</p>
                  <p>Status: {item.status}</p>

                  {item.status === 'pending_admin_review' && (
                    <button onClick={() => handleApproveItem(item._id)}>Approve</button>
                  )}

                  {item.status === 'active' && (
                    <button onClick={() => handleResolveItem(item._id)}>Resolve</button>
                  )}

                  <button onClick={() => setEditItem(item)}>Edit</button>
                  <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {editItem && (
          <EditItemModal
            item={editItem}
            onClose={() => setEditItem(null)}
            onUpdate={fetchData}
          />
        )}

      </div>
    </div>
  );
}
const styles = {
  userCard: {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 16px',
  borderRadius: '14px',
  marginBottom: '12px',

  background: 'rgba(255,255,255,0.25)', // 🔥 glass
  backdropFilter: 'blur(10px)',

  border: '1px solid rgba(255,255,255,0.3)',
  boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
},
promoteBtn: {
  background: 'rgba(14,165,233,0.2)',
  color: '#0369a1',
  border: 'none',
  padding: '6px 12px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: '600',
},
deleteBtn: {
  background: 'rgba(239,68,68,0.2)',
  color: '#dc2626',
  border: 'none',
  padding: '6px 12px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: '600',
},
};