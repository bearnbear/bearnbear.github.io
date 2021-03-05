import React from 'react'
import Nav from './components/Nav.js'
import Router from './Router'
import { connect } from 'react-redux'
import { initBlockchainEnvironment, getTotalSupply } from './redux/actions'
import Web3 from 'web3'
class App extends React.Component {

  componentDidMount () {
    // init blockchain environment
    const provider = window.ethereum
    const web3 = new Web3(provider)
    console.log('props', this.props)
    this.props.initBlockchainEnvironment()
    this.props.getTotalSupply(this.props.web3 || web3)
  }

  render () {
    return (
      <>
        <Nav />
        <Router />
      </>
    )
  }
}

const mapStateToProps = ({ blockchain }) => {
  return { web3: blockchain.web3 }
}

export default connect(mapStateToProps, { initBlockchainEnvironment, getTotalSupply })(App)
