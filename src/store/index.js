import { createStore } from "vuex";
import movies from "./modules/movies";
import loader from "./modules/loader";
import notificationStore from "./modules/notification";
const store = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    movies,
    loader,
    notificationStore,
  },
});
store.dispatch("initMoviesStore");
export default store;
