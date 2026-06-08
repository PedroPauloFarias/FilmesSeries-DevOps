import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001',
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