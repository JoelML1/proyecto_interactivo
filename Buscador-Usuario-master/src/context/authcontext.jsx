import { Children, createContext, useContext,useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const login = (username, password) => {
    if (username === 'admin' && password === '1234') {
      setUser({ username: 'admin' })
      navigate('/buscador-usuarios')
    } else {
      alert('Credenciales inválidas')
      return false
    }
  }

  const logout = () => {
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}