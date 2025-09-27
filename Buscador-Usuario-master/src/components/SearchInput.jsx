import React from "react";

const SearchInput = ({ value, onChange, dark }) => {
  return (
    <input
      type="text"
      placeholder="Buscar por nombre, perfil o intereses..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-4 py-2 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 border ${dark ? 'bg-gray-700 text-blue-200 placeholder-gray-400 border-gray-600' : 'bg-white text-black border-gray-300'}`}
    />
  );
};

export default SearchInput;
