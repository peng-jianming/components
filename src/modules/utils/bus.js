export class Bus {
  constructor() {
    this.events = {};
  }

  emit(event, data) {
    this.events[event] || (this.events[event] = []);
    this.events[event].forEach(handler => handler(data));
  }

  on(event, handler) {
    this.events[event] || (this.events[event] = []);
    this.events[event].push(handler);
  }
}
