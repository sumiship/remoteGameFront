<template>
  <div>
    <p>game</p>
    <p>id: {{ roomId }}</p>
    <p>rooms: {{ $store.state.rooms }}</p>
    <button @click="getRoomData()">roomdata</button>
    <p>roomData: {{ $store.state.roomData }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      roomId: this.$store.state.roomId,
    };
  },
  methods: {
    getRoomData() {
      this.$store.dispatch("showRoom", { roomId: this.roomId });
    },
  },
};
</script>
