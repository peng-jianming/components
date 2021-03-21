// index.js
import NavMenuBtn from './NavMenuBtn';

NavMenuBtn.install = function(Vue) {
  Vue.component(NavMenuBtn.name, NavMenuBtn);
};

// if (typeof window !== "undefined" && window.Vue) {
//   window.Vue.use(MyPlugin);
// }

export default NavMenuBtn;
