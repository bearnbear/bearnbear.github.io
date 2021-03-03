import Web3 from 'web3'
import config from '../../connector/config'
import globalConfig from '../../global-config'
import bearNBear from '../../connector/contracts/BearNBearToken.json'
import NameChangeToken from '../../connector/contracts/NameChangeToken.json'
import { BscConnector } from '@binance-chain/bsc-connector'
export const bsc = new BscConnector({
  supportedChainIds: [56, 97] // later on 1 ethereum mainnet and 3 ethereum ropsten will be supported
})

const METAMASK = 'metamask-compatible'
const logger = {
  log: (msg) => console.log('[ethereum-auth]', msg),
  warn: (msg) => console.warn('[ethereum-auth]', msg),
  error: (msg) => console.error('[ethereum-auth]', msg)
}
const network = process.env.REACT_APP_DEFAULT_NETWORK
const initBlockchainEnvironment = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      logger.log('initBlcochainEnvironment')
      window.web3 = null
      const blockchain = {
        account: '',
        balance: 0,
        network: '',
        web3: null
      }
      const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545')
      if (web3) {
        blockchain.web3 = web3
      }
      const bearNBearInstance = new web3.eth.Contract(bearNBear.abi, globalConfig.bsc.networks[network].bearNBearTokenContractAddress)
      const hash = await bearNBearInstance.methods.IPFS_PROVENANCE().call()
      let accounts = []
      const provider = window.BinanceChain
      const activate = await bsc.activate()
      const accountsss = await bsc.getAccount()
      const chainId = await bsc.getChainId()
      console.log('activate', activate)
      console.log('accountsss', accountsss)
      console.log('chainId', chainId)
      if (provider) {
        accounts = await provider.request({
          method: 'eth_accounts'
        })
        const balanceInWei = await web3.eth.getBalance(accounts[0])
        const balance = await web3.utils.fromWei(balanceInWei, 'ether')
        blockchain.balance = balance
        if (accounts.length > 0) {
          blockchain.account = accounts[0]
          blockchain.network = network
          const isProd = process.env.REACT_APP_APP_ENV === 'prod'
          if (isProd && blockchain.network !== 'main') {
            return window.alert('You are not on mainnet! Switch back to mainnet!')
          }
          const networkToUse = isProd
            ? process.env.REACT_APP_DEFAULT_NETWORK
            : blockchain.network || process.env.REACT_APP_DEFAULT_NETWORK
          const bearNBearInfraInfo = {
            blockchain: process.env.REACT_APP_BLOCKCHAIN,
            version: process.env.REACT_APP_CONTRACT_VERSION,
            network: networkToUse
          }
          localStorage.setItem('bearNBearInfraInfo', JSON.stringify(bearNBearInfraInfo))
          console.log('init blockchain', blockchain)
          return resolve(blockchain)
        }
      }
    } catch (e) {
      console.log('e', e)
      const bearNBearInfraInfo = {
        blockchain: process.env.REACT_APP_BLOCKCHAIN,
        network: process.env.REACT_APP_DEFAULT_NETWORK
      }
      localStorage.setItem('bearNBearInfraInfo', JSON.stringify(bearNBearInfraInfo))
      reject(e)
    }
  })
}

const refreshBlockchainEnvironment = () => {
  setTimeout(() => {
    window.location.reload()
  }, 100)
}

const connectWithMetaMask = async (blockchain) => {
  if (!window.ethereum) return window.alert('Metamask wallet is not installed!')
  // prompt user to login metamask
  try {
    // const provider = new Web3.providers.HttpProvider(globalConfig.eth.networks[network].rpcEndpoint)
    const provider = window.BinanceChain
    const accounts = await provider.request({
      method: 'eth_accounts'
    })
    console.log('account in connect', accounts)
    const connected = accounts.length > 0
    if (connected) {
      logger.log('connected with METAMASK')
      localStorage.setItem('currentBlockchainWallet', METAMASK)
      console.log('account', accounts)
      // update environment
      // refreshBlockchainEnvironment()
      return { account: accounts[0] }
    }
  } catch (e) {
    logger.error(e)
  }
}

const disconnectWithMetaMask = () => {
  logger.log('disconnectWithMetaMask')
}

export default {
  initBlockchainEnvironment,
  connectWithMetaMask,
  disconnectWithMetaMask
}