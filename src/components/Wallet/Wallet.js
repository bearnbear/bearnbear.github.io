import React from 'react'
import metamaskLogo from '../../assets/images/metamask-logo.png'
import { connect } from 'react-redux'
import { connectWithMetaMask } from '../../redux/actions'
import UserNFT from './UserNFT'
import Events from './Events'

class Wallet extends React.Component {
  render () {
    const { account, balance } = this.props
    return (
      <div className={`page-container wallet-container ${account.length > 0 && 'connected'}`}>
        {account.length > 0 ? (
          <>
            <div className='outter-container'>
              <img className={`logo ${account.length > 0 && 'connected'}`} alt='metamask' src={metamaskLogo} />
              <div className='inner-container'>
                <div>Account Address: {account}</div>
                <div>Current Balance: {balance}</div>
              </div>
            </div>
            <UserNFT />
            <Events />
          </>
        ) : (
          <>
            <img className='logo' alt='metamask' src={metamaskLogo} />
            <button
              className='btn connect-btn'
              onClick={() => this.props.connectWithMetaMask()}
            >
              Connect with MetaMask
            </button>
          </>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ blockchain }) => {
  return {
    ...blockchain
  }
}

export default connect(mapStateToProps, { connectWithMetaMask })(Wallet)
