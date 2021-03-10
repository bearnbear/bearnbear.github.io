import React from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
  {
    name: 'overview',
    tag: 'BearNBear',
    route: '/overview'
  },
  {
    name: 'gallery',
    tag: 'Gallery',
    route: '/gallery'
  },
  {
    name: 'mBTToken',
    tag: 'mBT Token',
    route: '/mBT'
  }
]

const renderNavItems = (itemArr) => {
  return itemArr.map((item) => {
    return (
      <NavLink
        key={item.route}
        to={item.route}
        className={`item ${item.name}`}
        activeClassName='active'
      >
        {item.tag}
      </NavLink>
    )
  })
}

const Navbar = () => {
  return (
    <div className='navbar-fixed-top'>
    <div className='navbar-component'>
      <div className='navbar-container'>
        <a href='/' className='item site-title'>
          <img alt='logo' src={require('./logo.svg').default}/>
          BearNBear
        </a>
        <NavLink to='/wallet' className='item myWallet' activeClassName='active'>My Wallet</NavLink>
      </div>
      <div className='navbar-container'>
        {renderNavItems(navItems)}
        <NavLink to='/wallet' className='item myWallet' activeClassName='active'>My Wallet</NavLink>
      </div>
    </div>
    </div>
  )
}

export default Navbar
