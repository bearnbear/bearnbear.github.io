import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './components/Home/Home'
import Wallet from './components/Wallet/Wallet'
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
        <div className=''>
          <Switch>
            <Route exact path='/'>
              <Redirect to='/home' />
            </Route>
            <Route exact path='/home' component={Home} />
            <Route exact path='/wallet' component={Wallet} />
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
