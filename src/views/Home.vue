<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <p>UserName: {{ $store.state.userName }}</p>
    <input type="text" v-model="name" />
    <button @click="setUser(name)">setName</button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data() {
    return {
      name: "",
    };
  },
  methods: {
    setUser(name) {
      console.log(name);
      this.$store.dispatch("setUser", { name: name });
    },
  },
  mounted() {
    this.$store.dispatch("getUser");
  },
};
</script>
