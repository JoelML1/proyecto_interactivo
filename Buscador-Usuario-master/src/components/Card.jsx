import React from "react";

const Card = ({ user, dark }) => {
  return (
    <div className={`w-64 rounded-xl p-4 text-center shadow-lg border ${dark ? 'bg-gray-800 border-blue-900' : 'bg-white border-gray-200'}`}>
      <img
        src={user.foto}
        alt={`${user.nombre} ${user.apellidos}`}
        className={`w-24 h-24 rounded-full mx-auto mb-4 object-cover ${dark ? 'border-4 border-blue-700' : ''}`}
      />
      <h2 className={`text-lg font-bold ${dark ? 'text-blue-300' : 'text-black'}`}>{user.nombre} {user.apellidos}</h2>
      <p className={`text-sm mb-2 ${dark ? 'text-blue-400' : 'text-gray-600'}`}>{user.perfil}</p>
      <p className={`text-sm ${dark ? 'text-blue-200' : 'text-gray-500'}`}>{user.intereses}</p>
    </div>
  );
};

export default Card;
