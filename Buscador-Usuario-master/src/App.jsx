import { useState, useEffect } from "react";
import Card from './components/Card';
import SearchInput from './components/SearchInput';
import axios from 'axios';

export default function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Cargar usuarios desde la API
  const obtenerUsuarios = async () => {
    try {
      const res = await axios.get('http://localhost:8000/usuarios');
      setUsuarios(res.data);
    } catch (err) {
      setError('Error al cargar usuarios');
      console.error("Error al cargar los usuarios:", err);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  // Filtrar usuarios por nombre, perfil o intereses
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

      {filtrados.length === 0 ? (
        <p className="text-center text-gray-500">No se encontraron resultados.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-4">
          {filtrados.map((u) => (
            <Card key={u.id} user={u} />
          ))}
        </div>
      )}
    </div>
  );
}
