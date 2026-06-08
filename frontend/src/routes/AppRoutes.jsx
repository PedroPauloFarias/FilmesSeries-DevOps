import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Cadastro from '../pages/Cadastro'
import Catalogo from '../pages/Catalogo'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/catalogo" element={<Catalogo />} />
    </Routes>
  )
}