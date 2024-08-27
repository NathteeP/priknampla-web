import axios from '../config/axios'

const recipeApi = {}

recipeApi.search = body => axios.get(`/recipe/?search=${body}`)
recipeApi.getRecipe = recipeId => axios.get(`/recipe/${recipeId}`)
recipeApi.create = body => axios.post('/recipe', body)
recipeApi.uploadImage = formData => axios.patch('/recipe/picture',formData)
recipeApi.getRecipeRating = recipeId => axios.get(`/recipe/rating/${recipeId}`)
recipeApi.editRecipe = (recipeId, formData) => 
    axios.patch(`/recipe/${recipeId}/edit` , formData)


export default recipeApi
