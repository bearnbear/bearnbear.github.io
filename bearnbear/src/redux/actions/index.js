import blockchain from './blockchain'
import { INIT_BLOCKCHAIN_ENVIRONMENT, CONNECT_WALLET } from '../types'

export const initBlockchainEnvironment = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    blockchain
      .initBlockchainEnvironment()
      .then((data) => {
        resolve(data)
        dispatch({
          type: INIT_BLOCKCHAIN_ENVIRONMENT,
          payload: data
        })
      })
      .catch((err) => {
        console.error(err)
        reject(err)
      })
  })
}

export const connectWithMetaMask = (b) => async (dispatch) => {
  blockchain.connectWithMetaMask(b)
    .then((data) => {
      console.log('hereee', data)
      dispatch({ 
        type: CONNECT_WALLET,
        payload: data
      })
    })
    .catch(err => console.log(err))
}
