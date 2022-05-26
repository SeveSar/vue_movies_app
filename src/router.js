import { createRouter, createWebHistory } from "vue-router";
import App from "@/App";

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: App,
    },
    // нужна корневая папка пишем path: '/'
  ],
});
