import React from 'react'
import Nav from './components/Nav.js'
import Router from './Router'

class App extends React.Component {
  render () {
    return (
      <>
        <Nav/>
        <Router/>
      </>
    )
  }
}

export default App
