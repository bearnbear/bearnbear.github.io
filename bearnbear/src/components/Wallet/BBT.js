import React from 'react'
import Button from '../Global/Button'

const BBT = ({ index }) => {
  return (
    <div className='item'>
      <img width={30} src={require('../../assets/images/sample.jpg').default} alt='sample' />
      Name: {index}
      <Button>Claim mBT</Button>
      <Button>Claim rewards</Button>
    </div>
  )
}

export default BBT
