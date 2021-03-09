import { GET_SUPPLY, GET_STARTING_INDEX } from '../redux/types'

const INITIAL_STATE = {
  supply: 0,
  startingIndex: 0
}

const homeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SUPPLY:
      return { ...state, ...action.payload }
    case GET_STARTING_INDEX:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default homeReducer
