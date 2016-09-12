import * as React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = () => (
  <div>
    <h1>React Redux Starter Kit</h1>
    <IndexLink to='/' activeClassName="activeRoute">
      Home
    </IndexLink>
    {' · '}
    <Link to='/counter' activeClassName="activeRoute">
      Counter
    </Link>
  </div>
)

export default Header
