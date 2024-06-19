import axios from '../config/axios'

const favApi = {}

favApi.modifyFav = (userId, recipeId, body) => axios.patch(`/fav/${userId}/${recipeId}`, body)
favApi.rateRecipe = (userId, recipeId, body) => axios.patch(`/fav/${userId}/${recipeId}/rate`, body)
favApi.getUserFav = (userId) => axios.get(`/fav/${userId}`)

export default favApi