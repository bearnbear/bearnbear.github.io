import React, { useState } from 'react'
import Modal from '../Global/Modal'
import { connect } from 'react-redux'
import { mintNFT } from '../../redux/actions'
const buyArr = [1,5,10,20]

const renderBuy = (arr, setCurrentAmt, currentAmt) => {
  return arr.map(value => {
    return <div className={`buyChoice ${currentAmt === value && 'selected'}`} key={value} onClick={() => setCurrentAmt(value)}>{value}</div>
  })
}
const BuyModal = ({ mintNFT, web3 }) => {
  const [currentAmt, setCurrentAmt] = useState(0)
  return (
    <Modal mode='primary' size='md' modalHeader='Buy NFT'>
      <div>
        {renderBuy(buyArr, setCurrentAmt, currentAmt)}
      </div>
      <button onClick={() => mintNFT(currentAmt, web3)}>Buy!</button>
    </Modal>
  )
}

const mapStateToProps = ({ blockchain }) => {
  return { web3: blockchain.web3 }
}

export default connect(mapStateToProps, { mintNFT })(BuyModal)
