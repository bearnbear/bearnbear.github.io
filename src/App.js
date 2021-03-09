import React from 'react'
import Nav from './components/Nav.js'
import Router from './Router'
import { connect } from 'react-redux'
import { initBlockchainEnvironment, getTotalSupply, getStartingIndex } from './redux/actions'
class App extends React.Component {

  componentDidMount () {
    // init blockchain environment
    this.props.initBlockchainEnvironment()
      .then((web3) => {
        this.props.getTotalSupply(web3)
        this.props.getStartingIndex(web3)
      })
  }

  render () {
    return (
      <>
        {/*<Nav />*/}
        <Router />
      </>
    )
  }
}

const mapStateToProps = ({ blockchain }) => {
  return { web3: blockchain.web3 }
}

export default connect(mapStateToProps, { initBlockchainEnvironment, getTotalSupply, getStartingIndex })(App)
