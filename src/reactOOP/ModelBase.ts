import {ComponentBase} from "./ComponentBase";

/**
 * components list type
 */
export interface componentsInterface {
  [componentID: number]: ComponentBase<any, any>
}

export class ModelBase {
  /**
   * reference components
   * @type {componentsInterface}
   */
  components: componentsInterface = <componentsInterface>{}

  /**
   * whether it was changed after it was finally re-renderd
   * @type {boolean}
   */
  changed = false
}

