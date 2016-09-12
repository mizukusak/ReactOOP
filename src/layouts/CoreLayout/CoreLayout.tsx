import * as React from 'react'
import Header from './Header/index'
import '../../styles/core.scss'
import './CoreLayout.scss'

export const CoreLayout = ({ children }) => (
  <div className='container text-center'>
    <Header />
    <div className="mainContainer">
      {children}
    </div>
  </div>
)

export default CoreLayout
