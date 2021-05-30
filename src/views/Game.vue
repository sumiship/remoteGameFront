<template>
  <div>
    <p>game</p>
    <button @click="getRoomData()">roomdata</button>
    <div v-if="$store.state.roomData">
      <p>roomId: {{ $store.state.roomData[0].roomId }}</p>
      <p>player1: {{ $store.state.roomData[0].player1 }}</p>
      <p>player2: {{ $store.state.roomData[0].player2 }}</p>
      <p>game: {{ $store.state.roomData[0].game }}</p>
    </div>
    <div>
      <input type="text" v-model="message" />
      <button @click="sendMessage()">sendMessage</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      roomId: this.$store.state.roomId,
      message: "",
    };
  },
  methods: {
    getRoomData() {
      this.$store.dispatch("showRoom", { roomId: this.roomId });
    },
    sendMessage() {
      this.$store.dispatch("sendGameMessage", {
        roomId: this.roomId,
        message: this.message,
        name: this.$store.state.userName,
      });
      this.message = "";
    },
  },
  mounted() {
    this.$store.dispatch("getUser");
  },
};
</script>
