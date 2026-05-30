import { useState } from 'react';
import API from '../api/axiosInstance';
import toast from 'react-hot-toast';

export default function EditItemModal({ item, onClose, onUpdate }) {
  const [form, setForm] = useState({
    title: item.title,
    description: item.description,
    status: item.status,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await API.put(`/admin/items/${item._id}`, form);
      toast.success('Item updated');
      onClose();
      onUpdate();
    } catch (err) {
      toast.error('Update failed');
    }
  };

  return (
    <div className="modal">
      <h2>Edit Item</h2>

      <input name="title" value={form.title} onChange={handleChange} />
      <textarea name="description" value={form.description} onChange={handleChange} />

      <select name="status" value={form.status} onChange={handleChange}>
        <option value="active">Active</option>
        <option value="resolved">Resolved</option>
      </select>

      <button onClick={handleSubmit}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}