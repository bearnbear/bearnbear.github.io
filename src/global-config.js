const globalConfig = {
  bsc: {
    main: {
      rpcEndpoint: 'https://bsc-dataseed.binance.org/',
      bearNBearTokenContractAddress: '',
      miniBearTokenContractAddress: ''
    },
    testnet: {
      rpcEndpoint: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      bearNBearTokenContractAddress: '0xe2b9B7Aa971511b081807e388A9ab319d4A63BF3',
      miniBearTokenContractAddress: '0x92f8Ab2352FffABb5D6B9D32f9f733F909C8Eed2'
    }
  }
}

export default globalConfig
