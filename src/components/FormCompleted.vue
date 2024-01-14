<template>
  <div class="completed">
    <h2>Completed</h2>
    <p>Congratulations! You have completed the multi-step form.</p>
    <button @click="restart">Begin Again</button>
  </div>
</template>

<script>
export default {
  methods: {
    restart() {
      localStorage.clear();
      this.$router.push({ path: "/" });
    },
  },
};
</script>
