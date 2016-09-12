
export const loadComponentAsync = bundle => (location, cb) => {
  bundle(component => {
    cb(null, component.default);
  });
};
