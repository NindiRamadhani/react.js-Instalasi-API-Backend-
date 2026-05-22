import { useState } from 'react';
import axios from 'axios';

export default function AddUserForm({ onSuccess }) {
  // 1. Inisialisasi state untuk menampung data form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // State untuk status loading saat submit dan untuk pesan feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  // 2. Fungsi untuk menangani perubahan input secara dinamis (Controlled Input)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 3. Fungsi untuk menangani submit form (Koneksi ke API)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman browser
    setIsSubmitting(true);
    setMessage(null);

    try {
      // Mengirim POST request ke fake API JSONPlaceholder
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/users',
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        }
      );

      // Jika sukses, berikan feedback ke user
      setMessage({ type: 'success', text: 'Data berhasil ditambahkan (Simulasi)!' });
      
      // Kosongkan form kembali setelah berhasil
      setFormData({ name: '', email: '', phone: '' });

      // Opsi tambahan: memicu fungsi reload data di komponen induk jika ada
      if (onSuccess) onSuccess(response.data);

    } catch (error) {
      // Jika terjadi kesalahan jaringan atau API bermasalah
      setMessage({ type: 'error', text: 'Gagal menambahkan data!' });
      console.error('POST Error:', error);
    } finally {
      setIsSubmitting(false); // Matikan loading spinner/status
    }
  };

  return (
    <div style={styles.container}>
      <h3>Tambah Pengguna Baru</h3>

      {/* Menampilkan pesan sukses/gagal secara kondisional */}
      {message && (
        <div style={message.type === 'success' ? styles.success : styles.error}>
          {message.text}
        </div>
      )}

      {/* Form Input */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Nama Lengkap"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="tel"
          name="phone"
          placeholder="Nomor Telepon"
          value={formData.phone}
          onChange={handleChange}
          required
          style={styles.input}
        />

        {/* Tombol akan berubah text dan disabled saat proses pengiriman berlangsung */}
        <button type="submit" disabled={isSubmitting} style={styles.button}>
          {isSubmitting ? 'Mengirim...' : 'Simpan Data'}
        </button>
      </form>
    </div>
  );
}

// Styling internal menggunakan JavaScript Object CSS (sesuai arahan modul)
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
    transition: 'background-color 0.2s',
  },
  success: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '1rem',
    border: '1px solid #c3e6cb'
  },
  error: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '1rem',
    border: '1px solid #f5c6cb'
  },
};