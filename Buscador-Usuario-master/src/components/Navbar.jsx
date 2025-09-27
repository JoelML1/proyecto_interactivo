import { Link } from 'react-router-dom'
import { useAuth } from '../context/authcontext'

export default function Navbar() {
  const { user, logout } = useAuth()
  return (
    <nav className="flex items-center justify-between bg-gray-800 p-4 text-white">
      <div className="flex gap-4">
        <Link to="/buscador-usuarios">Usuarios</Link>
        <Link to="/login">Login</Link>
      </div>
      {user && (
        <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Cerrar sesión</button>
      )}
    </nav>
  )
}
