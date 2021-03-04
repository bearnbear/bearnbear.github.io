import { GET_SUPPLY } from '../redux/types'

const INITIAL_STATE = {
  supply: 0
}

const homeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SUPPLY:
      return { ...state, ...action.payload}
    default:
      return state
  }
}

export default homeReducer
