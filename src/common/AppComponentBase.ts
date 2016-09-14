import {ComponentBase, PropsBase} from "../reactOOP/ComponentBase";
import {AppState} from "./model/AppState";
import {ComponentState} from "./model/ComponentState";


export interface AppPropsBase extends PropsBase<AppState, ComponentState> {
}
// export type AppComponentBase<P> = ComponentBase<P, AppStateBase>

// if would you use common base component of application, uncommented following and comment out above AppComponentBase.
export class AppComponentBase<P> extends ComponentBase<P, ComponentState> {
}

