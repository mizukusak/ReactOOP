import * as React from "react";
import * as ReactDOM from "react-dom";
// import * as config from "../config";
// import Routes from "./routes";
import createBrowserHistory from "history/lib/createBrowserHistory";
import {useRouterHistory} from "react-router";

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

// specify history type
const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: __BASENAME__
})

let render = () => {
  const routes = require('./routes/index').default({history: browserHistory})

  ReactDOM.render(
    routes,
    MOUNT_NODE
  )
}

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        renderError(error)
      }
    }

    // Setup hot module replacement
    module.hot.accept('./routes/index', () => {
      setTimeout(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    })
  }
}

// ========================================================
// Go!
// ========================================================
render()
