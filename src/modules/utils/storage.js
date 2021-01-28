export default key => ({
  save(value) {
    localStorage.setItem(key, value);
  },
  get() {
    return localStorage.getItem(key);
  },
  remove() {
    return localStorage.removeItem(key);
  }
});
