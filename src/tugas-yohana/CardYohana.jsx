import React, { useState, useEffect } from 'react';

const CardYohana = ({ pokemonUrl }) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(pokemonUrl)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [pokemonUrl]);

  if (loading) {
    return (
      <div className="bg-white/60 backdrop-blur-sm animate-pulse h-64 rounded-2xl p-5 flex flex-col items-center justify-center border border-gray-100">
        <div className="w-20 h-20 bg-gray-200 rounded-full mb-3"></div>
        <div className="w-16 h-4 bg-gray-200 rounded mb-2"></div>
        <div className="w-24 h-6 bg-gray-200 rounded-full"></div>
      </div>
    );
  }

  if (!pokemon) return null;

  const mainType = pokemon.types[0].type.name;

  // Warna gradasi background & badge premium berdasarkan tipe Pokemon
  const typeStyles = {
    fire: { bg: 'from-orange-50 to-red-100 border-red-200', badge: 'bg-red-500 text-white shadow-sm shadow-red-200' },
    water: { bg: 'from-blue-50 to-indigo-100 border-blue-200', badge: 'bg-blue-500 text-white shadow-sm shadow-blue-200' },
    grass: { bg: 'from-green-50 to-emerald-100 border-green-200', badge: 'bg-emerald-600 text-white shadow-sm shadow-emerald-200' },
    bug: { bg: 'from-lime-50 to-green-100 border-lime-200', badge: 'bg-lime-600 text-white shadow-sm shadow-lime-200' },
    normal: { bg: 'from-gray-50 to-slate-100 border-slate-200', badge: 'bg-slate-500 text-white shadow-sm shadow-slate-200' },
    electric: { bg: 'from-yellow-50 to-amber-100 border-yellow-200', badge: 'bg-amber-500 text-gray-900 font-bold shadow-sm shadow-yellow-200' },
    poison: { bg: 'from-purple-50 to-fuchsia-100 border-purple-200', badge: 'bg-purple-500 text-white shadow-sm shadow-purple-200' },
  };

  const currentStyle = typeStyles[mainType] || { bg: 'from-purple-50 to-pink-100 border-purple-200', badge: 'bg-purple-500 text-white' };

  // Solusi gambar pecah/broken image (menggunakan optional chaining & fallback image)
  const pokemonImage = 
    pokemon.sprites.other?.['official-artwork']?.front_default || 
    pokemon.sprites.other?.dream_world?.front_default || 
    pokemon.sprites.front_default;

  return (
    <div className={`bg-gradient-to-br ${currentStyle.bg} border rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-5 flex flex-col items-center relative group overflow-hidden`}>
      
      {/* Dekorasi pola lingkaran transparan di background card */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/20 rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-500"></div>

      {/* Nomor Pokedex Id */}
      <span className="absolute top-3 left-4 text-xs font-mono font-bold text-gray-400/80 bg-white/60 backdrop-blur-sm px-2 py-0.5 rounded-full">
        #{String(pokemon.id).padStart(3, '0')}
      </span>

      {/* Container Gambar Berputar Halus saat Hover */}
      <div className="bg-white/80 backdrop-blur-sm rounded-full p-4 mb-4 shadow-inner border border-white/40 mt-4 group-hover:bg-white transition-colors duration-300">
        <img
          src={pokemonImage}
          alt={pokemon.name}
          className="w-24 h-24 object-contain transform group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            // Jika link gambar benar-benar hancur, ganti ke gambar bawaan siluet
            e.target.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';
          }}
        />
      </div>

      {/* Nama Pokemon */}
      <h3 className="text-xl font-black text-gray-800 capitalize mb-3 tracking-tight group-hover:text-gray-900">
        {pokemon.name}
      </h3>

      {/* Badge Kategori Tipe */}
      <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${currentStyle.badge}`}>
        {mainType}
      </span>
    </div>
  );
};

export default CardYohana;