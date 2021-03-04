import Web3 from 'web3'
import globalConfig from '../../global-config'
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
      if (!window.ethereum) {
        const INFURA_ENDPOINT = globalConfig.bsc[network].rpcEndpoint
        blockchain.web3 = blockchain.web3 || new Web3(
          new Web3.providers.HttpProvider(INFURA_ENDPOINT)
        )
      }
      const provider = window.ethereum
      const localWeb3 = new Web3(provider)
      const accounts = await localWeb3.eth.getAccounts()
      if (accounts.length > 0) {
        blockchain.account = accounts[0]
        const ethBalanceInWei = await localWeb3.eth.getBalance(accounts[0])
        blockchain.balance = localWeb3.utils.fromWei(ethBalanceInWei, 'ether')
        blockchain.web3 = localWeb3
        if (localStorage.getItem('currentBlockchainWallet') === METAMASK) {
          blockchain.web3 = localWeb3
          // Subscribe to accounts change
          provider.on('accountsChanged', () => refreshBlockchainEnvironment())
          // Subscribe to chainId change
          provider.on('chainChanged', () => refreshBlockchainEnvironment())
          // Subscribe to session connection/open
          provider.on('open', () => console.log('open'))
          // Subscribe to session disconnection/close
          provider.on('close', (code, reason) => {
            localStorage.removeItem('currentBlockchainWallet')
            refreshBlockchainEnvironment()
          })
        }
      } else {
        if (localStorage.getItem('currentBlockchainWallet') === METAMASK) {
          localStorage.removeItem('currentBlockchainWallet')
        }
      }
      const isProd = process.env.REACT_APP_APP_ENV === 'prod'
      const chainId = await localWeb3.eth.getChainId()
      console.log(chainId)
      if (isProd && chainId !== 56) {
        return window.alert('You are not on mainnet! Switch back to mainnet!')
      }
      return resolve(blockchain)
    } catch (e) {
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
    const provider = window.ethereum
    console.log('provider', provider)
    const accounts = await provider.request({
      method: 'eth_requestAccounts'
    })
    const web3 = new Web3(provider)
    console.log('account in connect', accounts)
    console.log('web3', web3)
    const blockchain = {
      account: '',
      balance: 0,
      network: '',
      web3: null
    }
    const connected = accounts.length > 0
    if (connected) {
      logger.log('connected with METAMASK')
      localStorage.setItem('currentBlockchainWallet', METAMASK)
      let currentWalletAddress = localStorage.getItem('currentWalletAddress')
      if (!currentWalletAddress) {
        currentWalletAddress = accounts[0]
        localStorage.setItem('currentWalletAddress', accounts[0])
      } else if (accounts[0] !== currentWalletAddress) {
        currentWalletAddress = accounts[0]
        localStorage.setItem('currentWalletAddress', accounts[0])
      }
      blockchain.account = currentWalletAddress
      const balanceInWei = await web3.eth.getBalance(currentWalletAddress)
      const balance = await web3.utils.fromWei(balanceInWei, 'ether')
      blockchain.balance = balance
      blockchain.network = network
      blockchain.web3 = web3
      console.log('blockchain', blockchain)
      return { blockchain }
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
