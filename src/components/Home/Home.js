import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getTotalSupply } from '../../redux/actions'
import Hero from './hero'
import ProgressBar from './ProgressBar'
import content from '../content.json'
const length = 10;

const Home = ({ getTotalSupply, web3, supply }) => {
  const [startIndex, setStartIndex] = useState(0)
  useEffect(() => {
    getTotalSupply(web3)
  }, [getTotalSupply, web3])
  useEffect(()=>{
    const startIndex = Math.floor(Math.random() * length);
    setStartIndex(startIndex)
  }, [])

  const renderGallery = () => {
    const arr = new Array(12);
    return arr.map(i=>{
      return <div key={i} className='bbt-frame'>
        <img alt={`example-${i}`} src={require(`./gallery/${i}.png`.default)} />
      </div>
    })
  }
  return (
    <div className='landing-page'>
      <Hero />
      <div className='bbt-gallery'>
        <div className='bbt-gallery-container'>
          {renderGallery()}
        </div>
      </div>
      <div className='bbt-gallery'>
        <div className='bbt-frame'>
        </div>
      </div>
      <div className='page-container'>
        <ProgressBar />
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
    </div>
  )
}

const mapStateToProps = ({ blockchain, home }) => {
  return { web3: blockchain.web3, supply: home.supply }
}
export default connect(mapStateToProps, { getTotalSupply })(Home)
