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
    roomData: "",
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
    getRoomData(state, payload) {
      state.roomData = payload;
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
      this.state.rooms = [];
      const roomsData = await axios.get("http://127.0.0.1:8000/api/game");
      const rooms = roomsData.data.data;
      console.log("setRooms" + rooms);
      for (let i = 0; rooms.length > i; i++) {
        commit("createRoom", rooms[i].roomId);
      }
    },
    async createRoom({ commit }, { roomId, name }) {
      console.log(this.state.userName);
      if (!this.state.rooms.includes(roomId)) {
        const sendData = {
          roomId: roomId,
          player1: name,
        };
        await axios.post("http://127.0.0.1:8000/api/game", sendData);
        commit("createRoom", roomId);
        commit("roomId", roomId);
        router.push("/game");
      } else {
        alert("this number is already in use");
      }
    },
    async showRoom({ commit }, { roomId }) {
      console.log(roomId);
      const roomData = await axios.get(
        "http://127.0.0.1:8000/api/game/test/" + roomId
      );
      commit("getRoomData", roomData.data.data);
    },
  },
  modules: {},
});
