<template>
  <div>
    <p>game</p>
    <p>id: {{ roomId }}</p>
    <p>rooms: {{ $store.state.rooms }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      roomId: this.$store.state.roomId,
    };
  },
};
</script>
