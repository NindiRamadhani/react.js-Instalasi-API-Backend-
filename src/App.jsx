import React from 'react';
import UserList from './components/UserList';
import AddUserForm from './components/AddUserForm'; 
import './App.css';

// ==================================================================
// IMPORT TUGAS MANDIRI KELOMPOK (PJBL)
// ==================================================================
// import DashboardNovi from './tugas-novi/DashboardNovi'; // Di-comment dulu
// import DashboardNindi from './tugas-nindi/DashboardNindi';
import DashboardYohana from './tugas-yohana/DashboardYohana'; // HAPUS DOUBLE SLASH DI SINI

function App() {
  return (
    <div className="App">
      {/* ==================================================================
        BAGIAN A: PRAKTIKUM 1 & 2 (Disembunyikan Sementara)
        ==================================================================
      */}
      {/* <header style={styles.header}>
        <h1>🚀 React Integrasi API</h1>
        <p>Data dari JSONPlaceholder API (dummy backend)</p>
      </header>
      
      <main style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
        <AddUserForm /> 
        <hr style={{ margin: '2rem 0', border: '0.5px solid #eee' }} />
        <UserList />
      </main>
      */}

      {/* ==================================================================
        BAGIAN B: TUGAS MANDIRI (PjBL) MINGGU INI
        ==================================================================
      */}
      <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1 style={{ textAlign: 'center' }}>Dashboard Tugas Mandiri (PjBL)</h1>
        <hr style={{ margin: '1.5rem 0', border: '0.5px solid #ccc' }} />

        {/* 1. Jalur Kerja Novi (Di-comment agar tidak bentrok tampilan di browser-mu) */}
        {/* <DashboardNovi /> */}

        {/* 2. Jalur Kerja Nindi */}
        {/* <DashboardNindi /> */}

        {/* 3. Jalur Kerja Yohana (AKTIF) */}
        <DashboardYohana /> 
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