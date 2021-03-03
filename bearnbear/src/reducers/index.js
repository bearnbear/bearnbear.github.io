import { combineReducers } from 'redux'
import blockchainReducer from './blockchainReducer'

export default combineReducers({
  blockchain: blockchainReducer
})
