import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class NavBar extends Component {
  render() {
    return (
      <nav className="navBar">
        <li><NavLink exact to='/'>Home</NavLink></li>
        <li><NavLink to='/space'>Post a Space</NavLink></li>
        <li><NavLink to='/spaces'>Find a Space</NavLink></li>
      </nav>
    )
  }
}
export default NavBar


// TODO how to test
