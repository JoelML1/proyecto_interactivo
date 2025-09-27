import { useState, useEffect } from "react";
import { useAuth } from "../context/authcontext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/buscador-usuarios", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(usuario, password);
    if (result === false) {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800/90 p-8 rounded-xl shadow-2xl w-full max-w-sm flex flex-col gap-6 border border-gray-700"
      >
        <h2 className="text-3xl font-bold text-center text-blue-400 mb-4 drop-shadow">
          Iniciar Sesión
        </h2>

        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="px-4 py-2 rounded bg-gray-700 text-blue-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 rounded bg-gray-700 text-blue-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
        />

        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded transition shadow-lg border border-blue-900"
        >
          Entrar
        </button>
      </form>

      {error && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-gray-800 text-red-400 px-6 py-3 rounded-lg z-50 font-semibold shadow-lg border border-red-400">
          Contraseña o usuario incorrecto
        </div>
      )}
    </div>
  );
}
