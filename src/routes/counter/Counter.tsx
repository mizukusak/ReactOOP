import * as React from 'react'
import './Counter.scss'


export const Counter = (props) => (
  <div>
    <h2 className="counterContainer">
      Counter:
      {' '}
      <span className="counter--green">
        {props.counter}
      </span>
    </h2>
    <button className='btn btn-default' onClick={props.increment}>
      Increment
    </button>
    {' '}
    <button className='btn btn-default' onClick={props.doubleAsync}>
      Double (Async)
    </button>
  </div>
)

// export interface HelloProps { compiler?: string; framework?: string; }
// class Counter extends React.Component<HelloProps, {}> {
//   render() {
//     return <div>ffffff</div>
//   }
// }

export default Counter
