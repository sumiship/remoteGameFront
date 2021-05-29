import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: "default",
    rooms: [],
    roomId: "",
  },
  mutations: {
    userName(state, payload) {
      state.userName = payload;
    },
    // setRooms(state, payload) {
    //   state.rooms = payload;
    // },
    createRoom(state, payload) {
      state.rooms.push(payload);
    },
    deleteRoom(state, payload) {
      let index = state.rooms.indexOf(payload);
      state.rooms.splice(index, 1);
    },
    roomId(state, payload) {
      state.roomId = payload;
    },
  },
  actions: {
    async getUser({ commit }) {
      const name = await localStorage.getItem("userName");
      commit("userName", name);
    },
    async setUser({ commit }, { name }) {
      await localStorage.setItem("userName", name);
      commit("userName", name);
    },
    async setRooms({ commit }) {
      const roomsData = await axios.get("http://127.0.0.1:8000/api/game");
      const rooms = roomsData.data.data;
      console.log(rooms);
      for (let i = 0; rooms.length > i; i++) {
        commit("createRoom", rooms[i].roomId);
      }
    },
    async createRoom({ commit }, { roomId }) {
      console.log(roomId);
      if (!this.state.rooms.includes(roomId)) {
        commit("createRoom", roomId);
        commit("roomId", roomId);
        router.push("/game");
      } else {
        alert("this number is already in use");
      }
    },
  },
  modules: {},
});
