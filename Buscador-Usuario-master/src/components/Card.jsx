import React from "react";

const Card = ({ user }) => {
  return (
    <div className="w-64 bg-white shadow-md rounded-lg p-4 text-center">
      <img
        src={user.foto}
        alt={`${user.nombre} ${user.apellidos}`}
        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
      />
      <h2 className="text-lg font-semibold">{user.nombre} {user.apellidos}</h2>
      <p className="text-sm text-gray-600 mb-2">{user.perfil}</p>
      <p className="text-sm text-gray-500">{user.intereses}</p>
    </div>
  );
};

export default Card;
