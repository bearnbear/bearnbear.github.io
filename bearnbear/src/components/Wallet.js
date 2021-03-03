import React from 'react'
import metamaskLogo from '../assets/images/metamask-logo.png'
import { connect } from 'react-redux'
import { connectWithMetaMask } from '../redux/actions'

class Wallet extends React.Component {

  render () {
    return (
      <div className='page-container wallet-container'>
        <img className='logo' alt='metamask' src={metamaskLogo} />
        <button className='btn connect-btn' onClick={() => this.props.connectWithMetaMask()}>Connect with MetaMask</button>
      </div>
    )
  }
}

export default connect(null, { connectWithMetaMask })(Wallet)
