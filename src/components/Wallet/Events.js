import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getPastEvents } from '../../redux/actions'

const Events = ({ web3, getPastEvents }) => {
  useEffect(() => {
    getPastEvents(web3)
  }, [getPastEvents, web3])
  return (
    <div>Events</div>
  )
}

const mapStateToProps = ({ blockchain }) => {
  return { web3: blockchain.web3 }
}

export default connect(mapStateToProps, { getPastEvents })(Events)
