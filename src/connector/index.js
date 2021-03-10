import globalConfig from '../global-config'
import bearNBear from './contracts/BearNBearToken.json'
import miniBear from './contracts/MiniBearToken.json'
import { calculateTotalPrice } from '../utils/functions'
const network = process.env.REACT_APP_DEFAULT_NETWORK
const connector = {
  mintBBT: async(amount, web3) => {
    return new Promise(async(resolve, reject) => {
      const bearNBearInstance = new web3.eth.Contract(bearNBear.abi, globalConfig.bsc[network].bearNBearTokenContractAddress)
      const accounts = await web3.eth.getAccounts()
      // get current supply and price
      const totalSupply = await bearNBearInstance.methods.totalSupply().call()
      // calculate price
      const totalPrice = calculateTotalPrice(amount, totalSupply)
      const totalPriceInWei = await web3.utils.toWei(totalPrice.toString(), 'ether')
      return bearNBearInstance.methods
        .mintBBT(amount)
        .send({ from: accounts[0], gas: '28500000', value: totalPriceInWei })
        .on('receipt', function (receipt) {
          resolve(receipt)
        })
        .on('error', function (err) {
          console.log('error', err)
          reject(err)
        })
    })
  },
  totalSupply: async (web3) => {
    console.log('totalSupply', web3)
    const bearNBearInstance = new web3.eth.Contract(bearNBear.abi, globalConfig.bsc[network].bearNBearTokenContractAddress)
    const totalSupply = await bearNBearInstance.methods.totalSupply().call()
    return totalSupply
  },
  getUserBBT: async (userAddress, web3) => {
    const bearNBearInstance = new web3.eth.Contract(bearNBear.abi, globalConfig.bsc[network].bearNBearTokenContractAddress)
    const userBalance = await bearNBearInstance.methods.balanceOf(userAddress).call()
    const indexArr = []
    for (let i = 0; i < userBalance; i++) {
      indexArr.push(await bearNBearInstance.methods.tokenOfOwnerByIndex(userAddress, i).call())
      const startingIndex = await bearNBearInstance.methods.startingIndex().call()
    }
    return indexArr
  },
  getStartingIndex: async (web3) => {
    const bearNBearInstance = new web3.eth.Contract(bearNBear.abi, globalConfig.bsc[network].bearNBearTokenContractAddress)
    const startingIndex = await bearNBearInstance.methods.startingIndex().call()
    console.log('startingIndex', startingIndex)
    return startingIndex
  },
  getPastEvent: (web3, account) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log('we3 in getPastEvent', web3)
        const bearNBearInstance = new web3.eth.Contract(bearNBear.abi, globalConfig.bsc[network].bearNBearTokenContractAddress)
        const miniBearInstance = new web3.eth.Contract(miniBear.abi, globalConfig.bsc[network].miniBearTokenContractAddress)
        const accounts = await web3.eth.getAccounts()
        console.log('accounts', accounts)
        const filter = {
          fromBlock: 0,
          toBlock: 'latest',
          filter: {}
        }
        const history = []
        if (bearNBearInstance && miniBearInstance) {
          bearNBearInstance
            .getPastEvents('Transfer', { ...filter, filter: { from: 0, to: accounts[0] } }, (err, evts) => {
              const newArr = evts.map(evt => {
                evt.event = 'Mint BBT'
                return evt
              })
              history.push(...newArr)
            })
            .then(() =>
              bearNBearInstance.getPastEvents('Transfer', { ...filter, filter: {from: accounts[0], to: 0 } }, (err, evts) => history.push(...evts))
            )
            .then(() =>
              bearNBearInstance.getPastEvents('BnbRewards', { ...filter, filter: { user: accounts[0] } }, (err, evts) => history.push(...evts))
            )
            .then(() =>
              miniBearInstance.getPastEvents('Transfer', { ...filter, filter: { from: 0, to: accounts[0] } }, (err, evts) => history.push(...evts))
            )
            .then(() =>
              miniBearInstance.getPastEvents('Transfer', { ...filter, filter: {from: accounts[0], to: 0 } }, (err, evts) => history.push(...evts))
            )
            .then(() => {
              return resolve(history)
            })
            .catch(console.error)
        } else {
          return resolve([])
        }
      } catch (err) {
        console.log(err)
      }
    })
  }
}

export default connector
