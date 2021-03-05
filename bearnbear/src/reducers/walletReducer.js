import { GET_USER_BBT } from '../redux/types'

const INITIAL_STATE = {
  BBTArr: []
}

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER_BBT:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default walletReducer
