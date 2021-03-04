import React, { useState } from 'react'
import Modal from '../Global/Modal'
import { connect } from 'react-redux'
import { mintNFT } from '../../redux/actions'

const renderBuy = () => {
  const renArr = []
  for (let i = 0; i < 21; i++) {
    renArr.push(<option key={i} value={i}>{i}</option>)
  }

  return renArr
}
const BuyModal = ({ mintNFT, web3, hideModal }) => {
  const [currentAmt, setCurrentAmt] = useState(0)
  return (
    <Modal mode='primary' size='md' modalHeader='Buy NFT' hideModal={hideModal} clickToClose pressToClose>
      <form>
        <select value={currentAmt} onChange={(e) => setCurrentAmt(e.target.value)}>
          {renderBuy()}
        </select>
      </form>
      <button onClick={() => mintNFT(currentAmt, web3)}>Buy!</button>
    </Modal>
  )
}

const mapStateToProps = ({ blockchain }) => {
  return { web3: blockchain.web3 }
}

export default connect(mapStateToProps, { mintNFT })(BuyModal)
