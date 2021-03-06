import React, { useState } from "react"
import Card from "../Global/3DCard"
import { connectWithMetaMask } from '../../redux/actions'
import { connect } from 'react-redux'
import Button from '../Global/Button'
import BuyModal from '../Wallet/BuyModal'
const Hero = ({ account, connectWithMetaMask, supply }) => {
  const [showBuyModal, setShowBuyModal] = useState(false)
  return (
    <div className='outter-container'>
      <Card />
      <div className='inner-container introduction'>
        <h2>BearNBear</h2>
        <div>
          Slogan: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Hac
          adipiscing ut morbi purus eget sed diam interdum. Diam elementum
          faucibus tortor dictum diam, massa mollis auctor. Mattis consectetur
          malesuada quisque vel eget cursus risus convallis. Eu suspendisse
          magna turpis vulputate vitae. Sagittis, scelerisque viverra ultrices
          integer proin. Vitae a nunc commodo eros semper sapien, lacus, odio
          nibh. Vel orci posuere elit in.
        </p>
        <b>Current Mint Total: {supply}</b>
        {account.length > 0 ? <Button onClick={() => setShowBuyModal(true)}>Buy BBT</Button> : <Button onClick={() => connectWithMetaMask()}>Connect to MetaMask</Button>}
      </div>
      {showBuyModal && <BuyModal hideModal={() => setShowBuyModal(false)} />}
    </div>
  )
}

const mapStateToProps = ({ blockchain, home }) => {
  return { account: blockchain.account, supply: home.supply }
}

export default connect(mapStateToProps, { connectWithMetaMask })(Hero)
