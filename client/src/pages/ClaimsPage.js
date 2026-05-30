import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function ClaimsPage() {
  const { token } = useAuth();
  const [claims, setClaims] = useState([]);

  const fetchClaims = async () => {
    try {
      const res = await axios.get(
        'http://localhost:5000/api/claims/owner',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setClaims(res.data);
    } catch (err) {
      toast.error('Failed to load claims');
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  const handleUpdate = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/claims/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(`Claim ${status}`);
      fetchClaims(); // refresh
    } catch (err) {
      toast.error('Action failed');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📩 Claims on Your Items</h2>

      {claims.length === 0 ? (
        <p>No claims yet</p>
      ) : (
        claims.map((claim) => (
          <div
            key={claim._id}
            style={{
              border: '1px solid #ddd',
              padding: '1rem',
              marginBottom: '1rem',
              borderRadius: '10px',
            }}
          >
            <h3>{claim.item?.title}</h3>
            <p><strong>Claimed by:</strong> {claim.claimant?.name}</p>
            <p><strong>Email:</strong> {claim.claimant?.email}</p>
            <p><strong>Message:</strong> {claim.message}</p>
            <p><strong>Status:</strong> {claim.status}</p>

            {claim.status === 'pending' && (
              <div style={{ marginTop: '0.5rem' }}>
                <button
                  onClick={() => handleUpdate(claim._id, 'approved')}
                  style={{ marginRight: '0.5rem', background: 'green', color: 'white' }}
                >
                  ✅ Approve
                </button>

                <button
                  onClick={() => handleUpdate(claim._id, 'rejected')}
                  style={{ background: 'red', color: 'white' }}
                >
                  ❌ Reject
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}