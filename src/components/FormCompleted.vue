<template>
  <div class="completed">
    <div class="complete-content">
      <span class="headline">Thank you!</span>
      <div class="text">
        Thanks for confirming your subscription! We hope you have <br>fun using our
        platform. If you ever need support, please feel <br>free to email us at
        support@loremgaming.com.
      </div>
      <div class="button-area">
        <button class="completed-button" @click="restart">Begin Again</button>
      </div>
    </div>
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
