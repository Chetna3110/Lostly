import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ItemDetailModal from '../components/ItemDetailModal';

export default function BrowseItems() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      let url = 'https://lostly.onrender.com/api/items';
      if (filter !== 'all') url += `?type=${filter}`;
      const res = await axios.get(url);
      setItems(res.data);
    } catch (err) {
      toast.error('Failed to load items');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <div>
      <Navbar />

      <div style={styles.container}>
        <h1 style={styles.title}>Browse Items</h1>

        <div style={styles.filters}>
          <button
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'btn btn-primary' : 'btn btn-outline'}
          >
            All Items
          </button>
          <button
            onClick={() => setFilter('lost')}
            className={filter === 'lost' ? 'btn btn-primary' : 'btn btn-outline'}
          >
            🔴 Lost
          </button>
          <button
            onClick={() => setFilter('found')}
            className={filter === 'found' ? 'btn btn-primary' : 'btn btn-outline'}
          >
            🟢 Found
          </button>
        </div>

        {loading ? (
          <p style={styles.loading}>Loading...</p>
        ) : items.length === 0 ? (
          <p style={styles.empty}>No items found</p>
        ) : (
          <div style={styles.grid}>
            {items.map((item) => (
              <div
                key={item._id}
                style={styles.card}
                onClick={() => setSelectedItem(item)}
              >
                {item.images?.[0] && (
                  <img src={item.images[0]} alt={item.title} style={styles.image} />
                )}
                <div style={styles.cardBody}>
                    <div style={item.type === 'lost' ? styles.badgeLost : styles.badgeFound}>
                      {item.type === 'lost' ? ' Lost' : ' Found'}
                    </div>

                    <h3 style={styles.cardTitle}>{item.title}</h3>

                    <p style={styles.cardDesc}>
                      {item.description
                        ? item.description.slice(0, 100)
                        : 'Description hidden'}
                      ...
                    </p>

                    <p style={styles.meta}>
                      📍 {item.location || ' Hidden'}
                    </p>

                    <p style={styles.meta}>
                      📅 {new Date(item.date).toLocaleDateString()}
                    </p>

                    <button
                      className="btn btn-primary"
                      style={{ marginTop: '0.75rem', width: '100%', fontSize: '0.875rem' }}
                    >
                      View Details
                    </button>
                  </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onUpdate={fetchItems}
        />
      )}

      <Footer />
    </div>
  );
}

const styles = {
  container: { maxWidth: '1200px', margin: '0 auto', padding: '2rem' },
  title: { fontSize: '2rem', fontWeight: '800', marginBottom: '1.5rem' },
  filters: { display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' },
  loading: { textAlign: 'center', fontSize: '16px', color: '#666', marginTop: '3rem' },
  empty: { textAlign: 'center', fontSize: '16px', color: '#666', marginTop: '3rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' },
  card: { background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', cursor: 'pointer', transition: 'all 0.3s', border: '2px solid transparent' },
  image: { width: '100%', height: '200px', objectFit: 'cover' },
  cardBody: { padding: '1.25rem' },
  badgeLost: { display: 'inline-block', padding: '4px 12px', background: '#fee2e2', color: '#991b1b', borderRadius: '6px', fontSize: '12px', fontWeight: '600', marginBottom: '0.75rem' },
  badgeFound: { display: 'inline-block', padding: '4px 12px', background: '#dcfce7', color: '#166534', borderRadius: '6px', fontSize: '12px', fontWeight: '600', marginBottom: '0.75rem' },
  cardTitle: { fontSize: '18px', fontWeight: '700', marginBottom: '0.5rem' },
  cardDesc: { fontSize: '14px', color: '#666', marginBottom: '0.75rem' },
  meta: { fontSize: '13px', color: '#999', margin: '0.25rem 0' },
};