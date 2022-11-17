import Dep from "./dep";

function isPureObject(target) {
  return {}.toString.call(target).includes("Object");
}

function defineProperty(obj, key, value) {
  const dep = new Dep();
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    get() {
      dep.depend();
      return value;
    },
    set(newVal) {
      if (newVal !== value) {
        value = newVal;
        dep.notify(newVal, value);
      }
    },
  });
}

export default class Observer {
  constructor(data) {
    this.walk(data);
  }
  walk(data) {
    if (isPureObject(data)) {
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          const value = object[key];
          defineProperty(data, key, value);
          new Observer(value);
        }
      }
    }
  }
}
