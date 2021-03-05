import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getTotalSupply } from '../../redux/actions'
import Hero from './Hero'
import ProgressBar from './ProgressBar'

const Home = ({ getTotalSupply, web3, supply }) => {
  useEffect(() => {
    getTotalSupply(web3)
  }, [getTotalSupply, web3])
  return (
    <div className='page-container'>
      <div>current supply: {supply}</div>
      <Hero />
      <ProgressBar />
    </div>
  )
}

const mapStateToProps = ({ blockchain, home }) => {
  return { web3: blockchain.web3, supply: home.supply }
}
export default connect(mapStateToProps, { getTotalSupply })(Home)
