import React from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
  {
    name: 'home',
    tag: 'Home',
    route: '/'
  },
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
    name: 'NCTToken',
    tag: 'NCT Token',
    route: '/nct-token'
  },
  {
    name: 'myWallet',
    tag: 'My Wallet',
    route: '/wallet'
  }
]

const renderNavItems = (itemArr) => {
  return itemArr.map((item) => {
    return (
      <NavLink
        key={item.route}
        to={item.route}
        className='item'
        activeClassName='item active'
      >
        {item.tag}
      </NavLink>
    )
  })
}

const Nav = () => {
  return (
    <div className='nav-container'>
      <div className='item site-title'>BearNBear</div>
      <div>
        {renderNavItems(navItems)}
      </div>
    </div>
  )
}

export default Nav
