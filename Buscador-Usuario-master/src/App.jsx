import { useState, useEffect } from "react";
import Card from './components/Card';
import SearchInput from './components/SearchInput';
import Navbar from './components/Navbar';
import axios from 'axios';

export default function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [pagina, setPagina] = useState(1);

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

  const porPagina = 10;
  const totalPaginas = Math.ceil(filtrados.length / porPagina);
  const usuariosPagina = filtrados.slice((pagina - 1) * porPagina, pagina * porPagina);

  return (
    <>
      <Navbar />
      <div className="min-h-screen p-8 font-sans bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <h1 className="text-3xl font-bold text-center mb-4 text-blue-400 drop-shadow">Buscador de Usuarios</h1>

        <SearchInput value={searchTerm} onChange={setSearchTerm} dark />

        {error && <p className="text-red-400 text-center font-bold">{error}</p>}

        {loading ? (
          <p className="text-center text-blue-300 mt-4">⏳ Cargando...</p>
        ) : filtrados.length === 0 ? (
          <p className="text-center text-blue-300 mt-4">No se encontraron resultados.</p>
        ) : (
          <>
            <div className="flex flex-wrap justify-center gap-6">
              {usuariosPagina.map((u) => (
                <div key={u.id} onClick={() => setSelectedUser(u)}>
                  <Card user={u} dark />
                </div>
              ))}
            </div>
            {/* Paginación visual */}
            <div className="flex justify-center items-center gap-2 mt-8 text-blue-400">
              {Array.from({ length: totalPaginas }, (_, i) => (
                <button
                  key={i + 1}
                  className={`px-2 py-1 rounded ${pagina === i + 1 ? 'bg-blue-700 text-white font-bold' : 'hover:bg-blue-900 hover:text-white'}`}
                  onClick={() => setPagina(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              {pagina < totalPaginas && (
                <button className="ml-4 px-3 py-1 rounded bg-blue-700 text-white hover:bg-blue-900" onClick={() => setPagina(pagina + 1)}>
                  Siguiente
                </button>
              )}
            </div>
          </>
        )}

        {/* Modal */}
        {selectedUser && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            onClick={() => setSelectedUser(null)}
          >
            <div
              className="bg-gray-900 p-6 rounded-lg shadow-2xl max-w-sm w-full relative border border-blue-900"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 text-blue-400 hover:text-white"
                onClick={() => setSelectedUser(null)}
              >
                ✖
              </button>
              <img
                src={selectedUser.foto}
                alt={selectedUser.nombre}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-700 object-cover"
              />
              <h2 className="text-xl font-bold text-center text-blue-300">
                {selectedUser.nombre} {selectedUser.apellidos}
              </h2>
              <p className="text-center text-blue-400">{selectedUser.perfil}</p>
              <p className="text-center text-blue-200 mt-2">{selectedUser.intereses}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
