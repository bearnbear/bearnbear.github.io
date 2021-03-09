import React from 'react'
import content from '../content.json'

const mBTToken = () => {
  return (
    <div className='page-container'>
      <div>
        <h2>What is mini Bear Token?</h2>
        <p>{content.mBTToken.description1}</p>
        <p>{content.mBTToken.description2}</p>
        <img src={require('../../assets/images/mBT-contract.svg').default} style={{ width: '100%' }} />
      </div>
      <div>
        <h2>The Naming Rules</h2>
        <ul>{content.mBTToken.theRulesOfNaming.map(r => <li key={r}>{r}</li>)}</ul>
      </div>
      <div>
        <h2>The Rules for Descriptions</h2>
        <ul>{content.mBTToken.theRulesOfDescription.map(r => <li key={r}>{r}</li>)}</ul>
      </div>
      <div>
        <h2>Emission Rate of NCTs</h2>
        <p>{content.mBTToken.emissionRate}</p>
      </div>
    </div>
  )
}

export default mBTToken
