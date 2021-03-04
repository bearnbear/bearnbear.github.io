import React, { useState } from 'react'
import BuyModal from './BuyModal'

const UserNFT = () => {
  const [showBuyModal, setShowBuyModal] = useState(false)
  return (
    <div style={{ display: 'inline-block' }}>
      <div className='section-title'>
        My NFTs
        <button className='btn'>Claim all mBT</button>
        <button className='btn' onClick={() => setShowBuyModal(true)}>Buy BBT</button>
      </div>
      {showBuyModal && <BuyModal />}
    </div>
  )
}

export default UserNFT
