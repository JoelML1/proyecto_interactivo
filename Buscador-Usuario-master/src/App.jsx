import { useState, useEffect } from "react";
import Card from './components/Card';
import SearchInput from './components/SearchInput';
import axios from 'axios';

export default function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Cargar usuarios desde la API
  const obtenerUsuarios = async () => {
    try {
      const res = await axios.get('http://localhost:3000/usuarios');
      setUsuarios(res.data);
    } catch (err) {
      setError('Error al cargar usuarios');
      console.error("Error al cargar los usuarios:", err);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  // Manejar búsqueda con delay de 2s
  useEffect(() => {
    if (searchTerm.trim() === "") return;

    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filtrar usuarios
  const filtrados = usuarios.filter((u) => {
    const term = searchTerm.toLowerCase();
    return (
      `${u.nombre} ${u.apellidos}`.toLowerCase().includes(term) ||
      u.perfil.toLowerCase().includes(term) ||
      u.intereses.toLowerCase().includes(term)
    );
  });

  return (
    <div className="p-8 font-sans">
      <h1 className="text-3xl font-bold text-center mb-4">
        Buscador de Usuarios
      </h1>

      <SearchInput value={searchTerm} onChange={setSearchTerm} />

      {error && <p className="text-red-500 text-center">{error}</p>}

      {loading ? (
        <p className="text-center text-gray-500 mt-4">⏳ Cargando...</p>
      ) : filtrados.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">No se encontraron resultados.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-4">
          {filtrados.map((u) => (
            <div key={u.id} onClick={() => setSelectedUser(u)}>
              <Card user={u} />
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedUser && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={() => setSelectedUser(null)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={() => setSelectedUser(null)}
            >
              ✖
            </button>
            <img
              src={selectedUser.foto}
              alt={selectedUser.nombre}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-bold text-center">
              {selectedUser.nombre} {selectedUser.apellidos}
            </h2>
            <p className="text-center text-gray-600">{selectedUser.perfil}</p>
            <p className="text-center text-gray-500 mt-2">{selectedUser.intereses}</p>
          </div>
        </div>
      )}
    </div>
  );
}
