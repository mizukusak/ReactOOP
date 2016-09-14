// We only need to import the modules necessary for initial render
import * as React from "react";
// import Home from "./Home/Home";
// import Counter from "./Counter/Counter";
import {Router, Route, IndexRoute} from "react-router";
import {CoreLayout} from "../layouts/CoreLayout";
import {loadComponentAsync} from "../reactOOP/utility/router";
import {AppState} from "../common/model/AppState";
import {ComponentState} from "../common/model/ComponentState";


/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

// ========================================================
// Browser History Setup
// ========================================================

let load = loadComponentAsync
let defaultProps = {appState: new AppState(), componentState: new ComponentState()}

export const createRoutes: StatelessComponent<{history: History.History}> = (props) => (
  <Router history={props.history}>
    <Route path="/" component={CoreLayout}>
      {/*{console.log(Home)}*/}
      <IndexRoute getComponent={load(require('bundle?lazy!./Home/Home'))} />
      <Route path="counter" getComponent={load(require('bundle?lazy!./Counter'), defaultProps)} />
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
