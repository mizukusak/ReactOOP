import {ModelBase, componentsInterface} from "./ModelBase";

export class ServiceBase {

  /**
   * re-render components that only reference model is changed
   * @param models
   */
  reRender (models: ModelBase[]) {
    let reRenderComponents: componentsInterface = <componentsInterface>{}

    for (let model of models) {
      for (let componentID of Object.keys(model.components)) {
        let component = model.components[+componentID]
        // re-render only changed component
        if (model.changed) {
          reRenderComponents[+componentID] = component
        }
      }
    }

    // console.log(reRenderComponents);
    for (let k of Object.keys(reRenderComponents)) {
      let component = reRenderComponents[+k]
      // console.log(component);
      component.forceUpdate()
    }

    for (let model of models) {
      model.changed = false   // reset changed flag
    }
  }

}
