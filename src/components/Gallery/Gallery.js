import React from 'react'
import { connect } from 'react-redux'

class Gallery extends React.Component {
  render () {
    if (this.props.startingIndex === 0) {
      return <div className='page-container'><h3>The works are not yet revealed. Please check back later.</h3></div>
    }
  }
}

const mapStateToProps = ({ home }) => {
  return { supply: home.supply, startingIndex: home.supply }
}

export default connect(mapStateToProps)(Gallery)
