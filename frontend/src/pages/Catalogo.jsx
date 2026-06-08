import { useState } from 'react'
import { useFilmes } from '../context/FilmesContext'
import './Cadastro.css'

export default function Cadastro() {
  const { adicionarFilme } = useFilmes()

  const [form, setForm] = useState({
    titulo: '',
    tipo: '',
    ano: '',
    sinopse: '',
    imagem: '',
    plataforma: '',
    nota: ''
  })

  const [sucesso, setSucesso] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    await adicionarFilme(form)

    setForm({
      titulo: '',
      tipo: '',
      ano: '',
      sinopse: '',
      imagem: '',
      plataforma: '',
      nota: ''
    })

    setSucesso(true)

    setTimeout(() => {
      setSucesso(false)
    }, 3000)
  }

  return (
    <main className="cadastro-container">
      <h2 className="cadastro-titulo">Cadastrar título</h2>

      <p className="cadastro-subtitulo">
        Adicione um filme ou série ao catálogo.
      </p>

      {sucesso && (
        <div className="alerta-sucesso">
          Filme cadastrado com sucesso!
        </div>
      )}

      <form className="cadastro-form" onSubmit={handleSubmit}>
        <div className="campo-grupo">
          <label>Título</label>

          <input
            type="text"
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="campo-linha">
          <div className="campo-grupo">
            <label>Tipo</label>

            <select
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              <option value="Filme">Filme</option>
              <option value="Série">Série</option>
            </select>
          </div>

          <div className="campo-grupo">
            <label>Ano</label>

            <input
              type="number"
              name="ano"
              value={form.ano}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="campo-grupo">
          <label>Sinopse</label>

          <textarea
            rows="4"
            name="sinopse"
            value={form.sinopse}
            onChange={handleChange}
            required
          />
        </div>

        <div className="campo-grupo">
          <label>Imagem (URL)</label>

          <input
            type="text"
            name="imagem"
            value={form.imagem}
            onChange={handleChange}
            required
          />
        </div>

        <div className="campo-grupo">
          <label>Plataforma</label>

          <input
            type="text"
            name="plataforma"
            value={form.plataforma}
            onChange={handleChange}
          />
        </div>

        <div className="campo-grupo">
          <label>Nota</label>

          <input
            type="number"
            min="0"
            max="10"
            name="nota"
            value={form.nota}
            onChange={handleChange}
          />
        </div>

        <div className="cadastro-acoes">
          <button className="btn btn-primario" type="submit">
            Cadastrar
          </button>
        </div>
      </form>
    </main>
  )
}