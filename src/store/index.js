import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: "default",
  },
  mutations: {
    userName(state, payload) {
      state.userName = payload;
    },
  },
  actions: {
    async getUser({ commit }) {
      const name = await localStorage.getItem("userName");
      commit("userName", name);
    },
    async setUser({ commit }, { name }) {
      console.log(name);
      await localStorage.setItem("userName", name);
      commit("userName", name);
    },
  },
  modules: {},
});
