import NETWORKS from '../global-config'

const bearNBearInfraInfo = JSON.parse(
  localStorage.getItem('bearNBearInfraInfo')
) || {
  blockchain: 'eth',
  network: process.env.REACT_APP_DEFAULT_NETWORK
}

const refreshBlockchainInfraInfo = () => {
  // uncomment this to enable ropsten
  const { blockchain, network } = bearNBearInfraInfo

  const abiOfVersionNetwork = NETWORKS[blockchain].abi
  const BearNBearContract = require(`${abiOfVersionNetwork.BearNbearToken}`)
  console.log('BearNBearContract',abiOfVersionNetwork)
  const NameChangeTokenContract = require(`${abiOfVersionNetwork.NameChangeToken}`)
  const currentNetworkIsDeployed = NETWORKS[blockchain].networks[network]
  const BEARNBEARTOKEN_ADDR =
    (currentNetworkIsDeployed &&
      NETWORKS[blockchain].networks[network].bearNBearTokenContractAddress) ||
    NETWORKS[blockchain].networks.main.bearNBearTokenContractAddress
  const NAMECHANGETOKEN_ADDR =
    (currentNetworkIsDeployed &&
      NETWORKS[blockchain].networks[network].nameChangeTokenContractAddress) ||
    NETWORKS[blockchain].networks.main.nameChangeTokenContractAddress

  return {
    BearNBearContract,
    NameChangeTokenContract,
    BEARNBEARTOKEN_ADDR,
    NAMECHANGETOKEN_ADDR,
    blockchain,
    network
  }
}

const config = {
  refreshBlockchainInfraInfo,
  BearNBear: (web3) => {
    if (!web3) return null
    if (web3.utils) {
      const { BEARNBEARTOKEN_ADDR, BearNBearContract } = refreshBlockchainInfraInfo()
      const address = web3.utils.toChecksumAddress(BEARNBEARTOKEN_ADDR)
      if (address) {
        return new web3.eth.Contract(BearNBearContract.abi, address)
      } else {
        return { error: true }
      }
    }
  },
  NameChangeToken: (web3) => {
    if (!web3) return null
    if (web3.utils) {
      const { NAMECHANGETOKEN_ADDR, NameChangeTokenContract } = refreshBlockchainInfraInfo()
      const address = web3.utils.toChecksumAddress(NAMECHANGETOKEN_ADDR)
      if (address) {
        return new web3.eth.Contract(NameChangeTokenContract.abi, address)
      } else {
        return { error: true }
      }
    }
  }
}

export default config
