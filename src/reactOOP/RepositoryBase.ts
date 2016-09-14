import {ComponentBase} from "./ComponentBase";
import {ModelBase} from "./ModelBase";

export class RepositoryBase {
  /**
   * create relationship component and model
   * @param model
   * @param component
   */
  relateComponentAndModel (model: ModelBase, component: ComponentBase<any, any>) {
    model.components[component.componentID] = component
    component.models.push(model)
  }
}
