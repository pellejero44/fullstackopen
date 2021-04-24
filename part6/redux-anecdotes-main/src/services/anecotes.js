import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}/`)
  return response.data
}

const create = async (data) => {
  const response = await axios.post(baseUrl, data)
  return response.data
}

const vote = async (id) => {
  const anecdote = await getById(id)
  anecdote.votes++;
  const response = await axios.put(`${baseUrl}/${id}`, anecdote)
  return response.data
}

export const anecdotesService = {
  getAll,
  getById,
  create,
  vote
}

