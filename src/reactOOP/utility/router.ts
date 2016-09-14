import * as React from "react";

export const loadComponentAsync = (bundle: any, props?: any) => (location: any, cb: any) => {
  bundle((component: any) => {
    if (props != null) {
      cb(null, () => React.createElement(component.default, props));
    } else {
      cb(null, component.default);
    }
  });
};
