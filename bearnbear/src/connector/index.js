import config from './config'
import globalConfig from '../global-config'
import bearNBear from './contracts/BearNBearToken.json'
import NameChangeToken from './contracts/NameChangeToken.json'
const network = process.env.REACT_APP_DEFAULT_NETWORK
const connector = {
  mintNFT: async(amount, web3) => {
    return new Promise(async(resolve, reject) => {
      const bearNBearInstance = new web3.eth.Contract(bearNBear.abi, globalConfig.bsc[network].bearNBearTokenContractAddress)
      const accounts = await web3.eth.getAccounts()
      console.log('in mintnft', accounts)
      console.log('in mintnft', accounts[0])
      const hash = await bearNBearInstance.methods.IPFS_PROVENANCE().call()
      console.log('hash', hash)
      return bearNBearInstance.methods
        .mintNFT(amount)
        .send({ from: accounts[0], gas: '400000' })
        .on('receipt', function (receipt) {
          resolve(receipt)
        })
        .on('error', function (err) {
          console.log('error', err)
          reject(err)
        })
    })
  }
}

export default connector
