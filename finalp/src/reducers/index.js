import {combineReducers} from 'redux'
import data from './data'
import user from './user'
import status from './status'
import comment from './comment'
import liked from './liked'
import favorite from './favorite'
import pages from './pages'
import resepdetails from './resepdetails'
import myresep from './myresep'

const rootReducer = combineReducers({
  data, user, status, comment, liked, favorite, pages, resepdetails,myresep
})

export default rootReducer
