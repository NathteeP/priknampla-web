import axios from '../config/axios'

const recipeApi = {}

recipeApi.search = body => axios.get(`/recipe/?search=${body}`)
recipeApi.create = body => axios.post('/recipe', body)

export default recipeApi