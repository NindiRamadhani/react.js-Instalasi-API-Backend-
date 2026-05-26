import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardNovi from './CardNovi';

function DashboardNovi() {
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; 

  useEffect(() => {
    setLoading(true);
    setError(null);

    Promise.all([
      axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s='),
      axios.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    ])
      .then(([mealsResponse, categoriesResponse]) => {
        setMeals(mealsResponse.data.meals || []);
        setCategories(categoriesResponse.data.meals || []);
        setLoading(false);
      })
      .catch((err) => {
        setError('Gagal memuat data dari API. Silakan coba lagi.');
        setLoading(false);
      });
  }, []);

  const filteredMeals = meals.filter((meal) => {
    const matchesSearch = meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === '' || meal.strCategory === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMeals.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMeals.length / itemsPerPage);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600 font-semibold">Memuat resep makanan...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-5" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto font-sans">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left border-b pb-2">
        Tugas Mandiri Novi Aflin Putri(253140707111144)
        Daftar Menu Makanan 
      </h2>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Cari makanan esep..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-black bg-white"
        />
        
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full md:w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm text-black"
        >
          <option value="">Semua Kategori</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat.strCategory}>
              {cat.strCategory}
            </option>
          ))}
        </select>
      </div>

      {currentItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentItems.map((meal) => (
            <CardNovi 
              key={meal.idMeal} 
              name={meal.strMeal} 
              image={meal.strMealThumb} 
              category={meal.strCategory} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          Makanan tidak ditemukan.
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-lg bg-white text-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-sm font-medium shadow-sm"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600 mx-2">
            Halaman {currentPage} dari {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-lg bg-white text-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-sm font-medium shadow-sm"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default DashboardNovi;