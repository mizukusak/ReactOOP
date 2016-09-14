import * as React from 'react'
const duckImage: any = require("./assets/duck.jpg")
const css: any = require("./Home.styl")

export const Home = () => (
  <div>
    <h4>Welcome!</h4>
    <img className={css.duck} alt="This is a duck, because Redux!" src={duckImage} />
  </div>
)

export default Home

