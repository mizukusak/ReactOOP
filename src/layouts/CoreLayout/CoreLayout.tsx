import * as React from 'react'
import {Header} from './Header'
import '../../styles/core.scss'
import './CoreLayout.scss'

export const CoreLayout = ({children}: {children: React.ReactNode}) => (
  <div className='container text-center'>
    <Header />
    <div className="mainContainer">
      {children}
    </div>
  </div>
)

export default CoreLayout

