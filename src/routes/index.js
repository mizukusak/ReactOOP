// We only need to import the modules necessary for initial render
import React from "react";
import Home from "./home/index";
import {Router, Route, IndexRoute, useRouterHistory} from "react-router";
import createBrowserHistory from "history/lib/createBrowserHistory";
import {CoreLayout} from "../layouts/CoreLayout/CoreLayout";

const getComponentAsync = (path) => {
  return {
      /*  Async getComponent is only invoked when route matches   */
    getComponent(nextState, cb) {
      /*  Webpack - use 'require.ensure' to create a split point
       and embed an async module loader (jsonp) when bundling   */
      require.ensure([], (require) => {
        /*  Webpack - use require callback to define
         dependencies for bundling   */
        const component = require(path).default

        /*  Return getComponent   */
        cb(null, component)

        /* Webpack named bundle   */
      })
    }
  }
};
//
// const getComponentAsync = (waitForChunk) => {
//   return {
//     /*  Async getComponent is only invoked when route matches   */
//     getComponent(nextState, cb) {
//       waitForChunk(component => {
//         cb(null, component.default);
//       });
//     }
//   }
// };

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

// ========================================================
// Browser History Setup
// ========================================================
const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: __BASENAME__
})

export const createRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={CoreLayout}>
      <IndexRoute component={Home} />
      <Route path="counter" {...getComponentAsync("./counter/Counter")} />
      {/*<Route path="counter" {...getComponentAsync(require(`bundle?lazy!./counter/Counter`))} />*/}
      {/*<Route path="users" component={Users}>*/}
        {/*<Route path="/user/:userId" component={User}/>*/}
      {/*</Route>*/}
      {/*<Route path="*" component={NoMatch}/>*/}
    </Route>
  </Router>
)

export default createRoutes

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/
