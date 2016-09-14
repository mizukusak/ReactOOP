import * as React from "react";
import "./Counter.styl";
import {CounterService} from "./CounterService";
import {Count} from "../../model/Count/Count";
import {CountRepository} from "../../model/Count/CountRepository";
import {AppComponentBase, AppPropsBase} from "../../common/AppComponentBase";


export default class Counter extends AppComponentBase<AppPropsBase> {
  countRepo: CountRepository
  service: CounterService

  componentWillMount () {
    super.componentWillMount()
    this.props.appState.hoge = 2
    this.componentState.accessor.counterIndex = 111
    this.countRepo = new CountRepository(new Count).relateComponent(this)
    this.service = new CounterService(this.countRepo)
  }

  render() {
    var service = this.service
    var count = this.countRepo.model
    return (
      <div>
        <h2 className="counterContainer">
          Counter:
          {' '}
          <span className="counter--green">
            {count.count}<br/>
            main component componentstate value = {this.componentState.accessor.counterIndex}
          </span>
        </h2>
        <button className='btn btn-default' onClick={() => service.increment()}>
          Increment
        </button>
        {' '}
        <button className='btn btn-default' onClick={() => service.doubleAsync()}>
          Double (Async)
        </button>
        <SubCounter {...this.defaultProps()} countRepo={this.countRepo}/>
      </div>
    )
  }
}

interface Props extends AppPropsBase {
  countRepo?: CountRepository;
}
export class SubCounter extends AppComponentBase<Props> {
  countRepo: CountRepository

  componentWillMount () {
    super.componentWillMount()
    // this.componentState.accessor.counterIndex = 222
    this.countRepo = this.props.countRepo.relateComponent(this)
  }

  render() {
    var count = this.countRepo.model
    return (
      <div>
        sub component count value = {count.count % 10}<br />
        sub component appstate value = {this.props.appState.hoge}<br />
        sub component componentstate value = {this.componentState.accessor.counterIndex}
      </div>
    )
  }
}

