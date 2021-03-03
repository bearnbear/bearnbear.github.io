import React from 'react'
import Nav from './components/Nav.js'
import Router from './Router'
import { connect } from 'react-redux'
import { initBlockchainEnvironment } from './redux/actions'
class App extends React.Component {

  componentDidMount () {
    // init blockchain environment
    console.log('props', this.props)
    this.props.initBlockchainEnvironment()
  }

  render () {
    return (
      <>
        <Nav />
        <Router />
      </>
    )
  }
}

export default connect(null, { initBlockchainEnvironment })(App)
