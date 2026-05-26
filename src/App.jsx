import { useState } from 'react'

// Sesuaikan path berikut dengan lokasi sebenarnya file dashboard masing-masing
import DashboardNindi from './tugas-nindi/DashboardNindi'
import DashboardNovi from './tugas-novi/DashboardNovi'
import DashboardYohana from './tugas-yohana/DashboardYohana'

function App() {
  const [activeTab, setActiveTab] = useState('nindi')

  const renderContent = () => {
    switch (activeTab) {
      case 'nindi': return <DashboardNindi />
      case 'novi': return <DashboardNovi />
      case 'yohana': return <DashboardYohana />
      default: return <DashboardNindi />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-green-700 text-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-center">
            Tugas Mandiri (PjBL) Masing-Masing Anggota Kelompok
          </h1>
        </div>
      </header>

      <div className="container mx-auto px-4 mt-6">
        <div className="flex justify-center gap-4 border-b pb-2">
          <button onClick={() => setActiveTab('nindi')}
            className={`px-6 py-2 rounded-t-lg ${activeTab === 'nindi' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
            Nindi
          </button>
          <button onClick={() => setActiveTab('novi')}
            className={`px-6 py-2 rounded-t-lg ${activeTab === 'novi' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
            Novi
          </button>
          <button onClick={() => setActiveTab('yohana')}
            className={`px-6 py-2 rounded-t-lg ${activeTab === 'yohana' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
            Yohana
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {renderContent()}
      </div>

      <footer className="text-center py-4 text-gray-500 border-t mt-8">
        Tugas Kelompok - Integrasi API React
      </footer>
    </div>
  )
}

export default App