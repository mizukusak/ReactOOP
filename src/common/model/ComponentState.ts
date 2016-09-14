import {ComponentStateInterface} from "../../reactOOP/model/ComponentStateInterface";

interface Accessor {
  counterIndex: number
}

interface Observers {
}

export class ComponentState implements ComponentStateInterface {
  accessor: Accessor = <Accessor>{}

  observers: Observers = <Observers>{}
}
