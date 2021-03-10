import globalConfig from '../global-config'
import bearNBear from './contracts/BearNBearToken.json'
import { calculateTotalPrice } from '../utils/functions'
const network = process.env.REACT_APP_DEFAULT_NETWORK
const connector = {
  mintNFT: async(amount, web3) => {
    return new Promise(async(resolve, reject) => {
      const bearNBearInstance = new web3.eth.Contract(bearNBear.abi, globalConfig.bsc[network].bearNBearTokenContractAddress)
      const accounts = await web3.eth.getAccounts()
      // get current supply and price
      const totalSupply = await bearNBearInstance.methods.totalSupply().call()
      // calculate price
      const totalPrice = calculateTotalPrice(amount, totalSupply)
      const totalPriceInWei = await web3.utils.toWei(totalPrice.toString(), 'ether')
      return bearNBearInstance.methods
        .mintNFT(amount)
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
    console.log('getUserBBT')
    console.log('userAddress', userAddress)
    console.log('web3', web3)
    const bearNBearInstance = new web3.eth.Contract(bearNBear.abi, globalConfig.bsc[network].bearNBearTokenContractAddress)
    const userBalance = await bearNBearInstance.methods.balanceOf(userAddress).call()
    console.log('userBalance', userBalance)
    const indexArr = []
    for (let i = 0; i < userBalance; i++) {
      indexArr.push(await bearNBearInstance.methods.tokenOfOwnerByIndex(userAddress, i).call())
      const startingIndex = await bearNBearInstance.methods.startingIndex().call()
    }
    console.log('indexArr', indexArr)
    return indexArr
  },
  getStartingIndex: async (web3) => {
    const bearNBearInstance = new web3.eth.Contract(bearNBear.abi, globalConfig.bsc[network].bearNBearTokenContractAddress)
    const startingIndex = await bearNBearInstance.methods.startingIndex().call()
    console.log('startingIndex', startingIndex)
    return startingIndex
  }
}

export default connector
