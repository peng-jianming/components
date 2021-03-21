// index.js
import AndonHeader from './AndonHeader';

// import "../../../node_modules/element-ui/lib/theme-chalk/popover.css";
// import Tabs from "../../../node_modules/element-ui/packages/tabs";
// import "../../../node_modules/element-ui/lib/theme-chalk/tabs.css";
// import TabPane from "../../../node_modules/element-ui/packages/tab-pane";
// import "../../../node_modules/element-ui/lib/theme-chalk/tab-pane.css";
// import Dialog from "../../../node_modules/element-ui/packages/dialog";
// import "../../../node_modules/element-ui/lib/theme-chalk/dialog.css";
// import Popover from "element-ui";
AndonHeader.install = function(Vue) {
  // Vue.use(Dialog);
  // Vue.use(Tabs);
  // Vue.use(TabPane);
  Vue.component(AndonHeader.name, AndonHeader);
};
// if (typeof window !== "undefined" && window.Vue) {
//   window.Vue.use(MyPlugin);
// }
export default AndonHeader;
