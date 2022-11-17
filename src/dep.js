export default class Dep {
  constructor () {
    this.subs = []
  }
  depend(){
    return this.addSub()
  }
  addSub () {
    if (window.target) {
      this.subs.push(window.target)
    }
  }
  removeSub (target) {
    if (this.subs.length) {
      const i = this.subs.indexOf(target) 
      if (~i) {
       return this.subs.splice(i, 1)
      }
    }
  }
  notify () {
    this.subs.forEach(target => {
      target?.update()
    })
  }
}