import { useState, useEffect } from 'react'
import axios from 'axios'
import CardNindi from './CardNindi'

export default function DashboardNindi() {
  // ========== STATE UNTUK KARAKTER (ENDPOINT 1) ==========
  const [characters, setCharacters] = useState([])
  const [loadingChars, setLoadingChars] = useState(true)
  const [errorChars, setErrorChars] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')

  // ========== STATE UNTUK LOKASI (ENDPOINT 2) ==========
  const [locations, setLocations] = useState([])
  const [loadingLocs, setLoadingLocs] = useState(true)
  const [errorLocs, setErrorLocs] = useState(null)
  const [locPage, setLocPage] = useState(1)
  const [totalLocPages, setTotalLocPages] = useState(1)

  // ========== TAB AKTIF (character atau location) ==========
  const [activeTab, setActiveTab] = useState('characters')

  // ========== FETCH KARAKTER ==========
  useEffect(() => {
    fetchCharacters()
  }, [page, search, status])

  const fetchCharacters = async () => {
    setLoadingChars(true)
    setErrorChars(null)
    try {
      let url = `https://rickandmortyapi.com/api/character?page=${page}`
      if (search) url += `&name=${search}`
      if (status) url += `&status=${status}`
      const res = await axios.get(url)
      setCharacters(res.data.results)
      setTotalPages(res.data.info.pages)
    } catch (err) {
      if (err.response?.status === 404) {
        setCharacters([])
        setErrorChars('Tidak ada karakter yang cocok.')
      } else {
        setErrorChars('Gagal mengambil data karakter. Periksa koneksi.')
      }
    } finally {
      setLoadingChars(false)
    }
  }

  // ========== FETCH LOKASI ==========
  useEffect(() => {
    fetchLocations()
  }, [locPage])

  const fetchLocations = async () => {
    setLoadingLocs(true)
    setErrorLocs(null)
    try {
      const res = await axios.get(`https://rickandmortyapi.com/api/location?page=${locPage}`)
      setLocations(res.data.results)
      setTotalLocPages(res.data.info.pages)
    } catch (err) {
      setErrorLocs('Gagal mengambil data lokasi.')
    } finally {
      setLoadingLocs(false)
    }
  }

  // ========== RENDER KONTEN BERDASARKAN TAB ==========
  const renderContent = () => {
    if (activeTab === 'characters') {
      if (loadingChars) return <LoadingSpinner />
      if (errorChars) return <ErrorBox message={errorChars} onRetry={fetchCharacters} />
      if (characters.length === 0) return <p className="text-center text-gray-500">Tidak ada karakter.</p>

      return (
        <>
          {/* Search dan Filter */}
          <div className="mb-6 space-y-4">
            <input
              type="text"
              placeholder="Cari nama karakter (contoh: Rick, Morty)"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex gap-2 flex-wrap">
              {['', 'Alive', 'Dead', 'unknown'].map(opt => (
                <button
                  key={opt || 'all'}
                  onClick={() => { setStatus(opt); setPage(1) }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition
                    ${status === opt ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  {opt === '' ? 'All' : opt}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {characters.map(char => <CardNindi key={char.id} character={char} />)}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setPage(p => Math.max(p-1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-300 rounded-xl disabled:opacity-50"
            >Prev</button>
            <span className="font-medium">Halaman {page} dari {totalPages}</span>
            <button
              onClick={() => setPage(p => Math.min(p+1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-300 rounded-xl disabled:opacity-50"
            >Next</button>
          </div>
        </>
      )
    } 
    else { // tab Locations
      if (loadingLocs) return <LoadingSpinner />
      if (errorLocs) return <ErrorBox message={errorLocs} onRetry={fetchLocations} />
      if (locations.length === 0) return <p className="text-center text-gray-500">Tidak ada lokasi.</p>

      return (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map(loc => (
              <div key={loc.id} className="bg-gray-100 p-5 rounded-2xl shadow">
                <h3 className="text-xl font-bold text-gray-800">{loc.name}</h3>
                <p className="text-gray-600 mt-1"><span className="font-semibold">Type:</span> {loc.type}</p>
                <p className="text-gray-600"><span className="font-semibold">Dimension:</span> {loc.dimension}</p>
                <p className="text-gray-600"><span className="font-semibold">Residents:</span> {loc.residents.length}</p>
              </div>
            ))}
          </div>
          {/* Pagination Lokasi */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button onClick={() => setLocPage(p => p-1)} disabled={locPage === 1} className="px-4 py-2 bg-gray-300 rounded-xl">Prev</button>
            <span>Halaman {locPage} dari {totalLocPages}</span>
            <button onClick={() => setLocPage(p => p+1)} disabled={locPage === totalLocPages} className="px-4 py-2 bg-gray-300 rounded-xl">Next</button>
          </div>
        </>
      )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-green-700 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">Nindi's Rick & Morty Dashboard</h1>
          <p className="text-center text-green-100 mt-2">Tugas Mandiri PjBL - Integrasi API React</p>
          <p className="text-center text-green-100 mt-2">Nindi Ramadhani (253140707111126)</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Tab Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('characters')}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              activeTab === 'characters' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-blue-600 border border-blue-600'
            }`}
          >Characters</button>
          <button
            onClick={() => setActiveTab('locations')}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              activeTab === 'locations' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-blue-600 border border-blue-600'
            }`}
          >Locations</button>
        </div>

        {/* Konten Utama */}
        {renderContent()}
      </main>

      <footer className="text-center py-6 text-gray-500 border-t mt-8">
        Data from <a href="https://rickandmortyapi.com" target="_blank" className="text-blue-500">Rick and Morty API</a> | Nindi - React Integrasi API
      </footer>
    </div>
  )
}

// Komponen Loading Spinner
function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
    </div>
  )
}

// Komponen Error Box + Tombol Retry
function ErrorBox({ message, onRetry }) {
  return (
    <div className="text-center py-10">
      <p className="text-red-500 mb-4">{message}</p>
      <button onClick={onRetry} className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600">Coba Lagi</button>
    </div>
  )
}