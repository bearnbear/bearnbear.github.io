// import React, { useState } from "react"
// import Card from "../Global/3DCard"
// import { connectWithMetaMask } from '../../redux/actions'
// import { connect } from 'react-redux'
// import Button from '../Global/Button'
// import BuyModal from '../Wallet/BuyModal'
// import content from '../content.json'
//
// const Backup = ({ account, connectWithMetaMask, supply }) => {
//   const [showBuyModal, setShowBuyModal] = useState(false)
//   return (
//     <div className='outter-container'>
//       <Card />
//       <div className='inner-container introduction'>
//         <h2>BearNBear</h2>
//         <div>
//           {content.introduction.slogan}
//         </div>
//         <p>
//           {content.introduction.description1}
//           <br />
//           {content.introduction.description2}
//         </p>
//         <b>Current Mint Total: {supply}</b>
//         {account.length > 0 ? <Button onClick={() => setShowBuyModal(true)}>Buy BBT</Button> : <Button onClick={() => connectWithMetaMask()}>Connect to MetaMask</Button>}
//       </div>
//       {showBuyModal && <BuyModal hideModal={() => setShowBuyModal(false)} />}
//     </div>
//   )
// }
//
// const mapStateToProps = ({ blockchain, home }) => {
//   return { account: blockchain.account, supply: home.supply }
// }
//
// export default connect(mapStateToProps, { connectWithMetaMask })(Backup)
