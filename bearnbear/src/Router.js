import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './components/Home'
// import Wallet from './Wallet'
// import Explorer from './Explorer'
// import Trade from './Trade'
// import Calculator from './Calculator'
// import Graph from './Graph'
// import Admin from './_Admin'
// import networkConfig from '../global-config'

class Router extends React.Component {
  render () {
    return (
      <>
        <div className='page-container'>
          <Switch>
            <Route exact path='/' component={Home} />
            {/* <Route exact path='/overview'/>
            <Route exact path='/gallery'/>
            <Route exact path='/nct_token'/>
            <Route exact path='/wallet'/>
            <Route exact path='*'/> */}
          </Switch>
        </div>
      </>
    )
  }
}

export default Router
