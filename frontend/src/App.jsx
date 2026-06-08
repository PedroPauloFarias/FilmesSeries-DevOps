import Navbar from './components/Navbar'
import AppRoutes from './routes/AppRoutes'
import './App.css'

export default function App() {
  return (
    <div>
      <Navbar />
      <div className="main-content">
        <AppRoutes />
      </div>
    </div>
  )
}