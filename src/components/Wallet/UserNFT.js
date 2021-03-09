import React, { useState, useEffect } from 'react'
import BuyModal from './BuyModal'
import { getUserBBT } from '../../redux/actions'
import { connect } from 'react-redux'
import Bbt from './BBT'

const UserNFT = ({ web3, getUserBBT, account, BBTArr }) => {
  const [showBuyModal, setShowBuyModal] = useState(false)

  useEffect(() => {
    getUserBBT(account, web3)
  }, [account, web3, getUserBBT])

  return (
    <div style={{ display: 'inline-block' }}>
      <div className='section-title'>
        My NFTs
        <button className='btn'>Claim all mBT</button>
        <button className='btn' onClick={() => setShowBuyModal(true)}>Buy BBT</button>
      </div>
      {showBuyModal && <BuyModal hideModal={() => setShowBuyModal(false)} />}
      <div className='BBT-container'>{BBTArr.map(i => <Bbt key={i} index={i} />)}</div>
    </div>
  )
}

const mapStateToProps = ({ blockchain, wallet }) => {
  return { web3: blockchain.web3, account: blockchain.account, BBTArr: wallet.BBTArr }
}

export default connect(mapStateToProps, { getUserBBT })(UserNFT)
