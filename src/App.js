import React from 'react'
import Router from './Router'
import Navbar from './components/Navbar'
import { connect } from 'react-redux'
import { initBlockchainEnvironment, getTotalSupply, getStartingIndex } from './redux/actions'
import Footer from './components/Footer'
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
        <Navbar />
        <Router />
        <Footer />
      </>
    )
  }
}

const mapStateToProps = ({ blockchain }) => {
  return { web3: blockchain.web3 }
}

export default connect(mapStateToProps, { initBlockchainEnvironment, getTotalSupply, getStartingIndex })(App)
