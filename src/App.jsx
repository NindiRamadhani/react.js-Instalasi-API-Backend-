import React from 'react';
import UserList from './components/UserList';
import AddUserForm from './components/AddUserForm'; 
import './App.css';

// ==================================================================
// IMPORT TUGAS MANDIRI KELOMPOK (PJBL)
// ==================================================================
import DashboardNovi from './tugas-novi/DashboardNovi';
import DashboardNindi from './tugas-nindi/DashboardNindi';
import DashboardYohana from './tugas-yohana/DashboardYohana';

function App() {
  return (
    <div className="App">
      {/* 
        ==================================================================
        BAGIAN A: PRAKTIKUM 1 & 2 (Disembunyikan Sementara)
        ==================================================================
        Jika nanti dosen ingin memeriksa Praktikum 1 & 2, kalian tinggal 
        menghapus tanda bungkus komentar di bawah ini.
      */}
      {/* 
      <header style={styles.header}>
        <h1>🚀 React Integrasi API</h1>
        <p>Data dari JSONPlaceholder API (dummy backend)</p>
      </header>
      
      <main style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
        <AddUserForm /> 
        
        <hr style={{ margin: '2rem 0', border: '0.5px solid #eee' }} />
        
        <UserList />
      </main>
      */}

      {/* 
        ==================================================================
        BAGIAN B: TUGAS MANDIRI (PjBL) MINGGU INI
        ==================================================================
        Tempat pengerjaan tugas mini dashboard kalian bertiga.
      */}
      <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1 style={{ textAlign: 'center' }}>Dashboard Tugas Mandiri (PjBL)</h1>
        <p style={{ textAlign: 'center', color: '#666' }}>
          Aktifkan komponen masing-masing di branch kalian untuk testing
        </p>
        <hr style={{ margin: '1.5rem 0', border: '0.5px solid #ccc' }} />

        {/* 1. Jalur Kerja Novi */}
        {/*<DashboardNovi /> */}

        {/* 2. Jalur Kerja Nindi (Di-comment agar tidak bentrok tampilan di browser-mu) */}
        {/* <DashboardNindi /> */}

        {/* 3. Jalur Kerja Yohana (Di-comment agar tidak bentrok tampilan di browser-mu) */}
        {/* <DashboardYohana /> */}
      </div>
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