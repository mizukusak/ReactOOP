import * as React from 'react';
import {ModelBase} from "./ModelBase";
import {ComponentStateInterface} from "./model/ComponentStateInterface";

export interface PropsBase<A, C extends ComponentStateInterface> {
  appState?: A
  componentState?: C
}

export class ComponentBase<P extends PropsBase<any, C>, C extends ComponentStateInterface> extends React.Component<P, void> {
  static nextComponentID = 0;

  componentID: number

  // referenced models
  models: ModelBase[] = []

  // variable of each instanced component.
  componentState: C

  constructor () {
    super()
    this.componentID = ComponentBase.nextComponentID++
  }

  componentWillMount () {
    if (this.props.componentState != null) {
      this.componentState = Object.assign({}, this.props.componentState)
      if (this.componentState.accessor != null)
        this.componentState.accessor = Object.assign({}, this.componentState.accessor)
      if (this.componentState.observers != null)
        this.componentState.observers = Object.assign({}, this.componentState.observers)
    }
  }

  shouldComponentUpdate () {
    // re-render only target component. (children components doesn't re-render)
    return false
  }

  componentWillUnmount () {
    // remove relations of this component and models
    for (let model of this.models) {
      delete model.components[this.componentID]
    }
  }

  /**
   * return props that is used in the whole application and instanced component only props.
   */
  defaultProps (): PropsBase<any, any> {
    return {appState: this.props.appState, componentState: this.componentState}
  }
}

