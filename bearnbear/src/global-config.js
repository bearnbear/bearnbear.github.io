const globalConfig = {
  bsc: {
    networks: {
      main: {
        rpcEndpoint: 'https://bsc-dataseed.binance.org/',
        bearNBearTokenContractAddress: '',
        nameChangeTokenContractAddress: ''
      },
      testnet: {
        rpcEndpoint: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
        bearNBearTokenContractAddress: '0xcD0d8CA816a024a10BdD507Dd63138412c93Bd1e',
        nameChangeTokenContractAddress: '0x93fa30fDc87A64cCE1C31473b2917A1bA7f95101 '
      }
    }
  }
}

export default globalConfig
