import React, { useState, useEffect } from 'react';
import CardYohana from './CardYohana';

const DashboardYohana = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=52')
      .then((res) => {
        if (!res.ok) throw new Error('Gagal mengambil data dari server API.');
        return res.json();
      })
      .then((data) => {
        setPokemonList(data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredPokemon = pokemonList.filter((pokemon) => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === '' ? true : pokemon.name.startsWith(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <div className="relative flex items-center justify-center mb-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
          <div className="absolute h-8 w-8 bg-indigo-200 rounded-full animate-ping"></div>
        </div>
        <p className="text-slate-600 font-bold text-sm tracking-wide">Menghubungkan ke Pokedex Yohana...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
        <div className="bg-white border-2 border-red-100 text-red-700 px-8 py-6 rounded-2xl max-w-md text-center shadow-xl shadow-red-50">
          <div className="text-4xl mb-2">⚠️</div>
          <p className="font-black text-lg mb-1">Koneksi Terputus!</p>
          <p className="text-sm text-slate-500 mb-3">{error}</p>
          <button onClick={() => window.location.reload()} className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors">
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/50 via-white to-slate-50 p-4 sm:p-6 md:p-8">
      {/* Header Premium */}
      <div className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-100 pb-6">
        <span className="bg-indigo-50 text-indigo-700 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
          PjBL — Integrasi API Publik
        </span>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight mt-3 mb-2 bg-gradient-to-r from-slate-900 to-indigo-950 bg-clip-text text-transparent">
          Advanced Mini Pokedex ⚡
        </h1>
        <p className="text-slate-500 font-medium text-sm">Dikembangkan secara mandiri oleh: <span className="text-indigo-600 font-bold">Yohana</span></p>
      </div>

      {/* Kontrol Search & Filter Elegan */}
      <div className="max-w-6xl mx-auto mb-8 flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        {/* Input Pencarian */}
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Cari nama Pokemon favoritmu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50/50 text-sm font-medium text-slate-700 placeholder-slate-400 transition-all"
          />
        </div>

        {/* Dropdown Filter */}
        <div className="w-full sm:w-56">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50/50 text-sm font-bold text-slate-600 capitalize cursor-pointer transition-all"
          >
            <option value="">Semua Huruf Depan</option>
            <option value="b">Awalan Huruf B</option>
            <option value="c">Awalan Huruf C</option>
            <option value="p">Awalan Huruf P</option>
            <option value="s">Awalan Huruf S</option>
          </select>
        </div>
      </div>

      {/* Grid Tampilan Pokemon */}
      <div className="max-w-6xl mx-auto">
        {filteredPokemon.length === 0 ? (
          <div className="text-center py-20 text-slate-400 bg-white border border-dashed border-slate-200 rounded-2xl shadow-sm">
            <div className="text-5xl mb-3">🔍</div>
            <p className="text-lg font-bold text-slate-700 mb-1">Pokemon Tidak Ditemukan</p>
            <p className="text-xs text-slate-400">Coba kata kunci pencarian atau filter huruf lainnya.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPokemon.map((pokemon) => (
              <CardYohana key={pokemon.name} pokemonUrl={pokemon.url} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardYohana;