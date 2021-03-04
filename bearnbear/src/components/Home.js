import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getTotalSupply } from '../redux/actions'
const Home = ({ getTotalSupply, web3, supply }) => {
  useEffect(() => {
    getTotalSupply(web3)
  }, [getTotalSupply, web3])
  return (
    <div>Homeeee
      <div>current supply: {supply}</div>
    </div>
  )
}

const mapStateToProps = ({ blockchain, home }) => {
  return { web3: blockchain.web3, supply: home.supply }
}
export default connect(mapStateToProps, { getTotalSupply })(Home)
