const parsePath = (path) => {
  const BAIL_REG = /[^\w.$]/;
  return (data) => {
    if (BAIL_REG.test(path)) return;
    const segments = path.split(".");
    let pathName = null;
    while ((pathName = segments.shift())) {
      if ([pathName] in data) {
        data = data[pathName];
      }
    }
    return data;
  };
};

export default class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm;
    this.getter = parsePath(expOrFn);
    this.cb = cb;
  }

  get() {
    const { vm } = this;
    window.target = this;
    const value = this.getter.call(vm, vm);
    window.target = void 0;
    return value;
  }

  update() {
    const oldValue = this.value;
    this.value = this.get();
    this.cb.call(this.vm, this.value, oldValue);
  }
}
