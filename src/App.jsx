import UserList from './components/UserList';
import AddUserForm from './components/AddUserForm'; // 1. TRAMBAHKAN IMPOR INI
import './App.css';

function App() {
  return (
    <div className="App">
      <header style={styles.header}>
        <h1>🚀 React Integrasi API</h1>
        <p>Data dari JSONPlaceholder API (dummy backend)</p>
      </header>
      
      {/* Batasi lebar halaman di inline style agar tampilan form dan tabel rapi */}
      <main style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* 2. PASANG KOMPONEN FORM DI SINI */}
        <AddUserForm /> 
        
        {/* Garis pembatas visual antara Form dan Tabel */}
        <hr style={{ margin: '2rem 0', border: '0.5px solid #eee' }} />
        
        {/* Komponen tabel daftar pengguna bawaan praktikum 1 */}
        <UserList />
        
      </main>
    </div>
  );
}

const styles = {
  header: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '1.5rem',
    textAlign: 'center',
  },
};

export default App;