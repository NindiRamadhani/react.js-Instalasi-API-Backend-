import { useState } from 'react'

// Import untuk praktikum 1 dan 2 (tugas kelompok)
import UserList from './components/UserList'
import AddUserForm from './components/AddUserForm'

// Import untuk tugas mandiri masing-masing anggota
import DashboardNindi from './tugas-nindi/DashboardNindi'
import DashboardNovi from './tugas-novi/DashboardNovi'
import DashboardYohana from './tugas-yohana/DashboardYohana'

function App() {
  const [activeTab, setActiveTab] = useState('praktikum1') // default tab

  const renderContent = () => {
    switch (activeTab) {
      case 'praktikum1':
        return <UserList />
      case 'praktikum2':
        return <AddUserForm onSuccess={() => console.log('Data berhasil dikirim (simulasi)')} />
      case 'nindi':
        return <DashboardNindi />
      case 'novi':
        return <DashboardNovi />
      case 'yohana':
        return <DashboardYohana />
      default:
        return <UserList />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-700 text-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-center">
            React Integrasi API - Tugas Kelompok & Tugas Mandiri
          </h1>
          <p className="text-center text-blue-100 mt-1">
            Praktikum 1 (GET) | Praktikum 2 (POST) | Tugas Mandiri ( Nindi, Novi, Yohana )
          </p>
        </div>
      </header>

      {/* BARIS 1: TAB TUGAS KELOMPOK (PRAKTIKUM 1 & 2) */}
      <div className="container mx-auto px-4 mt-6">
        <div className="flex justify-center gap-4 border-b pb-2">
          <button
            onClick={() => setActiveTab('praktikum1')}
            className={`px-6 py-2 rounded-t-lg font-semibold transition ${
              activeTab === 'praktikum1'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            📋 Praktikum 1 (GET)
          </button>
          <button
            onClick={() => setActiveTab('praktikum2')}
            className={`px-6 py-2 rounded-t-lg font-semibold transition ${
              activeTab === 'praktikum2'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            ✏️ Praktikum 2 (POST)
          </button>
        </div>
      </div>

      {/* BARIS 2: TAB TUGAS MANDIRI (NINDI, NOVI, YOHANA) */}
      <div className="container mx-auto px-4 mt-2">
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setActiveTab('nindi')}
            className={`px-6 py-2 rounded-t-lg font-semibold transition ${
              activeTab === 'nindi'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            👩‍💻 Nindi (Mandiri)
          </button>
          <button
            onClick={() => setActiveTab('novi')}
            className={`px-6 py-2 rounded-t-lg font-semibold transition ${
              activeTab === 'novi'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            👨‍💻 Novi (Mandiri)
          </button>
          <button
            onClick={() => setActiveTab('yohana')}
            className={`px-6 py-2 rounded-t-lg font-semibold transition ${
              activeTab === 'yohana'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            👩‍💻 Yohana (Mandiri)
          </button>
        </div>
      </div>

      {/* AREA KONTEN */}
      <div className="container mx-auto px-4 py-6">
        {renderContent()}
      </div>

      <footer className="text-center py-4 text-gray-500 border-t mt-8">
        Tugas Integrasi API - Praktikum 1 & 2 (JSONPlaceholder) | Tugas Mandiri (Rick & Morty API)
      </footer>
    </div>
  )
}

export default App