import React, { useState, useEffect} from 'react'
import { getCurrentTierIndex } from '../../utils/functions'
import { connect } from 'react-redux'

const tierInfo = [
  { tier: 1, price: 0.1, count: 3600, totalWidth: '17.5%', accCount: 0 },
  { tier: 2, price: 0.3, count: 3500, totalWidth: '17%', accCount: 3600 },
  { tier: 3, price: 0.6, count: 3400, totalWidth: '16.5%', accCount: 7100 },
  { tier: 4, price: 1.2, count: 3300, totalWidth: '16%', accCount: 10500 },
  { tier: 5, price: 2.4, count: 3250, totalWidth: '16.5%', accCount: 13800 },
  { tier: 6, price: 10, count: 100, totalWidth: '8.5%', accCount: 17050 },
  { tier: 7, price: 100, count: 3, totalWidth: '8%', account: 17151 }
]
const renderTier = (currentTierIndex, supply) => {
  return tierInfo.map((tier, i) => {
    if (i < currentTierIndex) {
      return (
        <div key={tier.price} className={`tier tier-${tier.tier}`} style={{ width: tier.totalWidth }}>
          <div className='count'>{tier.count}</div>
          <div className='price'>{tier.price} BNB</div>
          <div className={`progress ${tier.tier}`} style={{ width: '100%' }} />
        </div>
      )
    } else if (i > currentTierIndex) {
      return (
        <div key={tier.price} className={`tier tier-${tier.tier}`} style={{ width: tier.totalWidth }}>
          <div className='count'>{tier.count}</div>
          <div className='price'>{tier.price} BNB</div>
          <div className='progress' style={{ width: '0%' }} />
        </div>
      )
    } else {
      const percent = (supply - tier.accCount) / tier.count * 100
      return (
        <div key={tier.price} className={`tier tier-${tier.tier}`} style={{ width: tier.totalWidth }}>
          <div className='count'>{tier.count}</div>
          <div className='price'>{tier.price} BNB</div>
          <div className='progress' style={{ width: `${percent}%` }} />
        </div>
      )
    }
  })
}
const ProgressBar = ({ supply }) => {
  const [currentTierIndex, setCurrentTierIndex] = useState(0)

  useEffect(() => {
    const currentTierIndex = getCurrentTierIndex(supply)
    setCurrentTierIndex(currentTierIndex)
  }, [supply])
  return (
    <div className='progress-bar'>
      {renderTier(3, 11000)}
      {/*{renderTier(currentTierIndex, supply)}*/}
    </div>
  )
}

const mapStateToProps = ({ home }) => {
  return { supply: home.supply }
}

export default connect(mapStateToProps)(ProgressBar)
