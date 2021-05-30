<template>
  <div>
    <p>createRoom</p>
    <input type="number" placeholder="number" v-model="roomId" />
    <button @click="createRoom(roomId)">create</button>
    <p>rooms: {{ $store.state.rooms }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      roomId: "",
    };
  },
  methods: {
    createRoom(num) {
      this.$store.dispatch("createRoom", {
        roomId: Number(num),
        name: this.$store.state.userName,
      });
      this.roomId = "";
    },
  },
  mounted() {
    this.$store.dispatch("getUser")
    this.$store.dispatch("setRooms");
  },
};
</script>
