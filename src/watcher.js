const parsePath = (path) => {
  const BAIL_REG = /[^\w.$]/;
  return (data) => {
    if (BAIL_REG.test(path)) return;
    const segments = path.split(".");
    let pathName = null;
    let value = data;
    while ((pathName = segments.shift())) {
      if ([pathName] in value) {
        value = value[pathName];
      }
    }
    return value;
  };
};

export default class Watcher {
  constructor() {}
}
