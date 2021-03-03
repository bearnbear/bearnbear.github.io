import { INIT_BLOCKCHAIN_ENVIRONMENT, CONNECT_WALLET } from '../redux/types'
const INITIAL_STATE = {
  account: '',
  balance: 0,
  network: '',
  web3: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_BLOCKCHAIN_ENVIRONMENT:
      return { ...state, ...action.payload }
    case CONNECT_WALLET:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
