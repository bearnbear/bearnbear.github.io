const globalConfig = {
  bsc: {
    main: {
      rpcEndpoint: 'https://bsc-dataseed.binance.org/',
      bearNBearTokenContractAddress: '',
      miniBearTokenContractAddress: ''
    },
    testnet: {
      rpcEndpoint: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      bearNBearTokenContractAddress: '0xEb9C123a668c4855EBef612c9d85540d15503c57',
      miniBearTokenContractAddress: '0x0873004b308eb2A3A678a54C9fB18770b185172c'
    }
  }
}

export default globalConfig
