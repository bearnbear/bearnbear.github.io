const globalConfig = {
  bsc: {
    main: {
      rpcEndpoint: 'https://bsc-dataseed.binance.org/',
      bearNBearTokenContractAddress: '',
      nameChangeTokenContractAddress: ''
    },
    testnet: {
      rpcEndpoint: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      bearNBearTokenContractAddress: '0x8aF7608E287958Ab85c85c246B4cF54CB861F777',
      nameChangeTokenContractAddress: '0x1abb04723ff281a45bc6a7aabf5712a740dcacdb'
    }
  }
}

export default globalConfig
