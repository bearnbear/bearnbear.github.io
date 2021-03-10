import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Wallet from './components/Wallet/Wallet'
import Gallery from './components/Gallery/Gallery'
import mBTToken from './components/mBTToken/mBTToken'

class Router extends React.Component {
  render () {
    return (
      <>
        <div className=''>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/home' component={Home} />
            <Route exact path='/wallet' component={Wallet} />
            <Route exact path='/gallery' component={Gallery} />
            <Route exact path='/mBT' component={mBTToken} />
          </Switch>
        </div>
      </>
    )
  }
}

export default Router
