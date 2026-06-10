import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
})

export const getFilmes = async () => {
  const response = await api.get('/filmes')
  return response.data
}

export const postFilme = async (filme) => {
  const response = await api.post('/filmes', filme)
  return response.data
}

export default api