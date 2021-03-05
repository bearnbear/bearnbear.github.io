import { combineReducers } from 'redux'
import blockchainReducer from './blockchainReducer'
import homeReducer from './homeReducer'
import walletReducer from './walletReducer'

export default combineReducers({
  blockchain: blockchainReducer,
  home: homeReducer,
  wallet: walletReducer
})
