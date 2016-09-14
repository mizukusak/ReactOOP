import {Count} from "./Count";
import {StatefulRepositoryBase} from "../../reactOOP/StatefulRepositoryBase";

export class CountRepository extends StatefulRepositoryBase<Count> {
  increment() {
    this.model.count++;
    this.model.changed = true
  }

  doubleAsync() {

  }

}

