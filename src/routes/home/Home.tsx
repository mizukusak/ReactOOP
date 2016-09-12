import * as React from 'react'
const duckImage: any = require("./assets/duck.jpg")
const css: any = require("./Home.scss")

export const Home = () => (
  <div>
    <h4>Welcome!</h4>
    <img
      alt="This is a duck, because Redux!"
      className={css.duck}
      src={duckImage} />
  </div>
)

// class Home extends React.Component<{}, {}> {
//   render() {
//     return <div>ffffff</div>
//   }
// }
export default Home

