import React from 'react';

function CardNovi({ name, image, category }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      <div className="relative pt-[75%] overflow-hidden bg-gray-100">
        <img 
          src={image} 
          alt={name} 
          className="absolute top-0 left-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow justify-between">
        <h3 className="font-bold text-gray-800 text-base line-clamp-2 mb-2" title={name}>
          {name}
        </h3>
        <span className="inline-block bg-blue-50 text-blue-600 text-xs px-2.5 py-1 rounded-full font-semibold self-start mt-auto">
          {category}
        </span>
      </div>
    </div>
  );
}

export default CardNovi;