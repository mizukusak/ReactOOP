import React from 'react'
import Header from './Header/index'
import classes from './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({ children }) => (
  <div className='container text-center'>
    <Header />
    <div className={classes.mainContainer}>
      {children}
    </div>
  </div>
)

export default CoreLayout
