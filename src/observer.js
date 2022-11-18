import Dep from "./dep";

const isType = (name) => {
  const [firstLetter] = name;
  name = firstLetter.toUpperCase() + name.toLowerCase().slice(1);
  return (target) => ({}.toString.call(target).includes(name));
};

const isPureObject = isType("object");

export default class Observer {
  constructor(data) {
    this.walk(data);
  }
  walk(data) {
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const value = object[key];
        defineProperty(data, key, value);
      }
    }
  }
}

function defineProperty(obj, key, value) {
  if (isPureObject(value)) {
    new Observer();
  }
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
