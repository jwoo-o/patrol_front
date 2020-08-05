import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import store from "./store";
import requestServerApi from "./utils/request.js";

Vue.prototype.$http = axios;

// Components
import bottom_nav from "./components/bottom_nav.vue";
import submit_button from "./components/submit_button.vue";

Vue.component("bottom_nav", bottom_nav);
Vue.component("submit_button", submit_button);

//Bootstrap
import { BootstrapVue, IconsPlugin, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Install BootstrapVue
Vue.use(BootstrapVue);

// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(BootstrapVueIcons);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  requestServerApi,
  render: h => h(App)
}).$mount("#app");

export const eventBus = new Vue();
new Vue({});
