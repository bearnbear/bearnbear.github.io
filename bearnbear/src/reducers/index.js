import { combineReducers } from 'redux'
import blockchainReducer from './blockchainReducer'
import homeReducer from './homeReducer'
export default combineReducers({
  blockchain: blockchainReducer,
  home: homeReducer
})
