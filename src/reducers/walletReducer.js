import { GET_USER_BBT, GET_EVENTS } from '../redux/types'

const INITIAL_STATE = {
  BBTArr: [],
  events: []
}

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER_BBT:
      return { ...state, ...action.payload }
    case GET_EVENTS:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default walletReducer
