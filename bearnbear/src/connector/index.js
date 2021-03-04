import globalConfig from '../global-config'
import bearNBear from './contracts/BearNBearToken.json'
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
        .send({ from: accounts[0], gasPrice: '10', gas: '28500000', value: totalPriceInWei })
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
    const bearNBearInstance = new web3.eth.Contract(bearNBear.abi, globalConfig.bsc[network].bearNBearTokenContractAddress)
    const totalSupply = await bearNBearInstance.methods.totalSupply().call()
    return totalSupply
  }
}

const priceModal = [
  {
    tier: 1,
    min: 0,
    max: 3599,
    price: 0.1
  },
  {
    tier: 2,
    min: 3600,
    max: 7099,
    price: 0.3
  },
  {
    tier: 3,
    min: 7100,
    max: 10499,
    price: 0.6
  },
  {
    tier: 4,
    min: 10500,
    max: 13799,
    price: 1.2
  },
  {
    tier: 5,
    min: 13800,
    max: 17049,
    price: 2.4
  },
  {
    tier: 6,
    min: 17050,
    max: 17150,
    price: 10
  },
  {
    tier: 7,
    min: 17150,
    max: 17153,
    price: 100
  }
]

const calculateTotalPrice = (amount, totalSupply) => {
  const currentTierIndex = getCurrentTierIndex(totalSupply)
  console.log('currentTierIndex', currentTierIndex)
  if (totalSupply + amount < priceModal[currentTierIndex].max) {
    // withinTier
    const price = priceModal[currentTierIndex].price
    return amount * price
  } else {
    // crosstier
    const price1 = priceModal[currentTierIndex].price
    const price2 = priceModal[currentTierIndex + 1].price
    const amount1 = priceModal[currentTierIndex].max - totalSupply
    const amount2 = totalSupply + amount - priceModal[currentTierIndex].max
    return amount1 * price1 + amount2 * price2
  }
}

const getCurrentTierIndex = (totalSupply) => {
  let currentTierIndex = 0
  console.log('totalSupply', totalSupply)
  for (let i = 0; i < priceModal.length; i++) {
    const tier = priceModal[i]
    console.log(tier)
    if ((totalSupply > tier.min || totalSupply === tier.min) && totalSupply < tier.max) {
      currentTierIndex = i
    }
  }
  return currentTierIndex
}

export default connector
