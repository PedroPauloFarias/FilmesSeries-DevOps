import { NavLink } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">🎬 FilmesApp</div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/catalogo" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Populares
          </NavLink>
        </li>
        <li>
          <NavLink to="/cadastro" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Cadastrar
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}