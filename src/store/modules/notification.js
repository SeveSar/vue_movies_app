import mutations from "../mutations";

const { SHOW_TOAST_NOTIFY } = mutations;
const notificationStore = {
  state: {
    // messagePool: [],
    notify: null,
  },
  getters: {
    messagePool: ({ notify }) => notify,
  },
  mutations: {
    [SHOW_TOAST_NOTIFY](state, msg) {
      // state.messagePool.push(msg);
      state.notify = msg;
    },
  },
  actions: {
    showNotify({ commit }, msg) {
      commit(SHOW_TOAST_NOTIFY, msg);
    },
  },
};

export default notificationStore;
