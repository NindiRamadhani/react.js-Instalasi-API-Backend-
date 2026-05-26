// CardNindi.jsx - Menampilkan satu karakter dalam bentuk card
export default function CardNindi({ character }) {
  // Warna status
  const statusColor = {
    Alive: 'text-green-600 bg-green-100',
    Dead: 'text-red-600 bg-red-100',
    unknown: 'text-yellow-600 bg-yellow-100'
  }[character.status] || 'text-gray-600 bg-gray-100'

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
      <img 
        src={character.image} 
        alt={character.name}
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 truncate">{character.name}</h3>
        <div className="mt-2 flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
            {character.status}
          </span>
          <span className="text-sm text-gray-500">{character.species}</span>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          <span className="font-semibold">Gender:</span> {character.gender}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Origin:</span> {character.origin.name}
        </p>
      </div>
    </div>
  )
}