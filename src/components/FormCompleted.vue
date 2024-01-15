<template>
  <div class="completed">
    <span class="headline">Thank you!</span>
    <p class="text">
      Thanks for confirming your subscription! We hope you have fun using our
      platform. If you ever need support, please feel free to email us at
      support@loremgaming.com.
    </p>
    <button class="completed.button" @click="restart">Begin Again</button>
  </div>
</template>

<script>
export default {
  methods: {
    restart() {
      localStorage.clear();
      //this.$router.push({ path: "/" });
      window.location.reload();
    },
  },
};
</script>
