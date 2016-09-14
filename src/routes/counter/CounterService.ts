import {CountRepository} from "../../model/Count/CountRepository";
import {ServiceBase} from "../../reactOOP/ServiceBase";

export class CounterService extends ServiceBase {

  constructor(
    public countRepo: CountRepository,
  ) {
    super()
  }

  reRender() {
    super.reRender([
      this.countRepo.model,
    ])
  }

  increment() {
    this.countRepo.increment()
    this.reRender()
  }

  doubleAsync() {

  }
}

