import { Link } from 'react-router-dom'
import './Home.css'

const destaques = [
  { id: 1, titulo: 'The Boys', tipo: 'Série', imagem: 'https://image.tmdb.org/t/p/w500/stTEycfG9928HYGEISBFaG1ngjM.jpg' },
  { id: 2, titulo: 'Origem', tipo: 'Filme', imagem: 'https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg' },
  { id: 3, titulo: 'Euphoria', tipo: 'Série', imagem: 'https://image.tmdb.org/t/p/w500/3Q0hd3heuWwDWpwcDkhQOA6TYWI.jpg' },
  { id: 4, titulo: 'Invencível', tipo: 'Série', imagem: 'https://image.tmdb.org/t/p/w500/yDWJYRAwMNKbIYT8ZB33qy84dqz.jpg' },
  { id: 5, titulo: 'O Demolidor', tipo: 'Série', imagem: 'https://image.tmdb.org/t/p/w500/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg' },
  { id: 6, titulo: 'Oppenheimer', tipo: 'Filme', imagem: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg' },
  { id: 7, titulo: 'Succession', tipo: 'Série', imagem: 'https://image.tmdb.org/t/p/w500/e2X8AlLdAQn68FcNABPGMFjzJmd.jpg' },
  { id: 8, titulo: 'Duna', tipo: 'Filme', imagem: 'https://image.tmdb.org/t/p/w500/d5NXSklpcKTx3b4gQlKgRTp8qCn.jpg' },
]

export default function Home() {
  return (
    <main className="home-container">
      <h1 className="home-titulo">Filmes e séries populares</h1>
      <p className="home-subtitulo">Explore títulos populares ou cadastre os seus favoritos.</p>

      <div className="home-filtros">
        {['Todos', 'Filmes', 'Séries'].map((f) => (
          <button key={f} className={f === 'Todos' ? 'filtro-btn ativo' : 'filtro-btn'}>
            {f}
          </button>
        ))}
      </div>

      <div className="home-grid">
        {destaques.map((item) => (
          <div key={item.id} className="home-card">
            <img src={item.imagem} alt={item.titulo} className="home-card-img" />
            <span className="home-card-tipo">{item.tipo}</span>
          </div>
        ))}
      </div>

      <div className="home-link-wrapper">
        <Link to="/catalogo" className="home-link-catalogo">
          Ver catálogo completo →
        </Link>
      </div>
    </main>
  )
}