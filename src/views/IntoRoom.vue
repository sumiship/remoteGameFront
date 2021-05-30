<template>
  <div>
    <p>intoRoom</p>
    <input type="number" placeholder="number" v-model="roomId" />
    <button @click="join()">join</button>
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
    join() {
      this.$store.dispatch("joinRoom", {
        roomId: this.roomId,
        name: this.$store.state.userName,
      });
      this.roomId=''
    },
  },
  mounted() {
    this.$store.dispatch("getUser");
  },
};
</script>
