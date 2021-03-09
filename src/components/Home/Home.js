import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getTotalSupply } from '../../redux/actions'
import Hero from './hero'
import ProgressBar from './ProgressBar'
import content from '../content.json'
import Stars from '../stars'

const length = 17;


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
    const arr = Array.from(Array(length).keys());
    return arr.map(i=>{
      return <img key={i} alt={`example-${i}`} src={require(`./gallery/${(i+startIndex)%length}-preview.png`).default} />
    })
  }
  // const renderParagraph = (p) => {
  //   p = p.split(' ');
  //   const first = p[0];
  //   const rest = p.slice(1, p.length).join(' ');
  //   return <span>
  //     <span className='firstWord'>
  //       {`${first} `}
  //     </span>
  //     <span>
  //       {rest}
  //     </span>
  //   </span>;
  // }
  return (
    <div className='landing-page'>
      <Hero />
      <Stars />
      <div className='bbt-gallery'>
        {renderGallery()}
      </div>
      <div className='page-container timeline-container'>
        <ProgressBar />
        <div>
          <h2>You decide the life of the bear</h2>
          <p>{content.home.BBTConcepts}</p>
        </div>
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
