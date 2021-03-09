import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getTotalSupply } from '../../redux/actions'
import Hero from './Hero'
import ProgressBar from './ProgressBar'
import content from '../content.json'

const Home = ({ getTotalSupply, web3, supply }) => {
  useEffect(() => {
    getTotalSupply(web3)
  }, [getTotalSupply, web3])
  return (
    <div className='page-container'>
      <Hero />
      <ProgressBar />
      <div className='sample-BBT'>
        <img alt='sample' src={require('../../assets/images/sample1.png').default} />
        <img alt='sample' src={require('../../assets/images/sample2.png').default} />
        <img alt='sample' src={require('../../assets/images/sample3.png').default} />
        <img alt='sample' src={require('../../assets/images/sample4.png').default} />
      </div>
      <h2>Co-create the digital collectibles by community</h2>
      <p>{content.home.BBTConcepts}</p>
      {/* <div>
        <h2>The Next Generation of Digital Art Collectibles</h2>
        <p>{content.home.BBTRules.AboutArt}</p>
      </div> */}
      <div>
        <h2>How it works</h2>
        {content.home.BBTRules.AboutBBT.map((w, i) => <p key={i}>{w}</p>)}
        <img alt='timeline' style={{ width: '100%' }} src={require('../../assets/images/timeline.svg').default} />
      </div>
      <div>
        <h2>You are part of the Art. The Art is also part of you.</h2>
        <p>{content.home.BBTRules.AboutmBT.utilityOfmBT}</p>
      </div>
      <div>
        <h2>How can I get mBT?</h2>
        <p>{content.home.BBTRules.AboutmBT.mBTDistribution}</p>
      </div>
    </div>
  )
}

const mapStateToProps = ({ blockchain, home }) => {
  return { web3: blockchain.web3, supply: home.supply }
}
export default connect(mapStateToProps, { getTotalSupply })(Home)
