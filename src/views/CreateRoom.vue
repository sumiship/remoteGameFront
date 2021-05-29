<template>
  <div>
    <p>createRoom</p>
    <input type="number" placeholder="number" v-model="roomId" />
    <button @click="createRoom(roomId)">create</button>
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
      this.$store.dispatch("createRoom", { roomId: num });
      this.roomId = "";
    },
  },
  mounted() {
    this.$store.dispatch("setRooms");
  },
};
</script>
