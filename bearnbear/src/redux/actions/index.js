import blockchain from './blockchain'
import { INIT_BLOCKCHAIN_ENVIRONMENT, CONNECT_WALLET, GET_SUPPLY, GET_USER_BBT } from '../types'
import connector from '../../connector'

export const connectWithMetaMask = (b) => async (dispatch) => {
  blockchain.connectWithMetaMask(b)
    .then((data) => {
      console.log('hereee', data)
      dispatch({ 
        type: CONNECT_WALLET,
        payload: data.blockchain
      })
    })
    .catch(err => console.log(err))
}

export const mintNFT = (amount, web3) => dispatch => {
  console.log('in action mintNFT', amount, web3)
  return connector
    .mintNFT(amount, web3)
    .then((data) => {
      console.log('combe back', data)
    })
    .catch(err => console.log(err))
}

export const getTotalSupply = (web3) => dispatch => {
  return connector
    .totalSupply(web3)
    .then(supply => {
      console.log('supply', supply)
      dispatch({
        type: GET_SUPPLY,
        payload: { supply }
      })
    })
    .catch(err => console.log(err))
}

export const getEvents = () => dispatch => {
  return blockchain 
    .getEvents()
    .then((data) => {
      console.log(data)
    })
}

export const getUserBBT = (userAddress, web3) => dispatch => {
  return connector
    .getUserBBT(userAddress, web3)
    .then((data) => {
      dispatch({
        type: GET_USER_BBT,
        payload: { BBTArr: data }
      })
    })
    .catch(err => console.log(err))
}

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

// NOTE: wallet page

// transfer from -- transfer BBT to other people -> need approve => two steps - OK

// Claim mBTToken - OK

// Claim all mBTToken - OK

// burnt BBT => spend mBT(need apporve) and claim BNB rewards -OK

// getAllWalletEvents - mintBBT, transfer to, transfer from, claim mBT, burn

// NOTE: BBT detail page

// get BBT info - name description - OK but still changing

// get change log - OK

// get accumulated mbttoken -OK

// get ownership -OK

// change name - OK

// change description - OK
