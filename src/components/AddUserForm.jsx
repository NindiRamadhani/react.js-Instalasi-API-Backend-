import { useState } from 'react';
import axios from 'axios';

export default function AddUserForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    userId: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        {
          title: formData.title,
          body: formData.body,
          userId: Number(formData.userId),
        }
      );

      setMessage({ type: 'success', text: 'Data berhasil ditambahkan (Simulasi)!' });
      setFormData({ title: '', body: '', userId: '' });
      if (onSuccess) onSuccess(response.data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Gagal menambahkan data!' });
      console.error('POST Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <h3>Tambah Post Baru</h3>
      {message && (
        <div style={message.type === 'success' ? styles.success : styles.error}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Judul Post"
          value={formData.title}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <textarea
          name="body"
          placeholder="Isi Post"
          value={formData.body}
          onChange={handleChange}
          required
          style={{ ...styles.input, minHeight: '80px' }}
        />
        <input
          type="number"
          name="userId"
          placeholder="User ID (angka)"
          value={formData.userId}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" disabled={isSubmitting} style={styles.button}>
          {isSubmitting ? 'Mengirim...' : 'Simpan Data'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#f9f9f9',
    padding: '1.5rem',
    borderRadius: '8px',
    marginBottom: '2rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  success: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '1rem',
  },
  error: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '1rem',
  },
};