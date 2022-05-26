import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import VueElementLoading from "vue-element-loading";
import installElementPlus from "./plugins/element";
import router from "@/router";
const app = createApp(App);
app.component("VueElementLoading", VueElementLoading);
// const router = createRouter({
//   history: createWebHistory(),
//   routes: [
//     {
//       // нужна корневая папка пишем path: '/'
//       path: "/",
//       component: App,
//     },
//   ],
// });

app.use(installElementPlus);
app.use(store).use(router).mount("#app");

// router.ready(() => {
//  app.mount();
// });

// createRouter({
//   history: createWebHistory,
//   base: process.env.VUE_APP_API_URL,
//   routes: [
//     {
//       path: "/",
//       name: "root",
//       component: "App",
//     },
//   ],
// });
