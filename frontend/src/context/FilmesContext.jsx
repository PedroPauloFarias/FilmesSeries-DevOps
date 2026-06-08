import { createContext, useContext, useEffect, useState } from 'react'
import { getFilmes, postFilme } from '../services/api'

const FilmesContext = createContext()

export function FilmesProvider({ children }) {
  const [filmes, setFilmes] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    carregarFilmes()
  }, [])

  async function carregarFilmes() {
    try {
      setLoading(true)
      setErro(null)
      const dados = await getFilmes()
      setFilmes(dados)
    } catch (e) {
      setErro('Não foi possível carregar os filmes. Verifique se a API está rodando.')
    } finally {
      setLoading(false)
    }
  }

  async function adicionarFilme(novoFilme) {
    const salvo = await postFilme(novoFilme)
    setFilmes((prev) => [...prev, salvo])
  }

  return (
    <FilmesContext.Provider value={{ filmes, loading, erro, adicionarFilme }}>
      {children}
    </FilmesContext.Provider>
  )
}

export function useFilmes() {
  return useContext(FilmesContext)
}