import {RepositoryBase} from "./RepositoryBase";
import {ModelBase} from "./ModelBase";
import {ComponentBase} from "./ComponentBase";

export class StatefulRepositoryBase<T extends ModelBase> extends RepositoryBase {

  constructor (public model: T) {
    super()
  }

  relateComponent (component: ComponentBase<any, any>) {
    super.relateComponentAndModel(this.model, component)
    return this
  }
}

