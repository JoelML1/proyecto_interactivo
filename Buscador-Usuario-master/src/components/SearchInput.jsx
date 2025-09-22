import React from "react";

const SearchInput = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Buscar por nombre, perfil o intereses..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded mb-6"
    />
  );
};

export default SearchInput;
