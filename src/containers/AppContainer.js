import React, { Component, PropTypes } from 'react'
import { Router } from 'react-router'

class AppContainer extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
  }

  render () {
    const { history, routes } = this.props

    return (
      <Router history={history} children={routes} />
    )
  }
}

export default AppContainer
