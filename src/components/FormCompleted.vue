<template>
    <div>
        <h2>Completed</h2>
        <p>Congratulations! You have completed the multi-step form.</p>
        <button @click="$router.go(-1)">Begin Again</button>
    </div>
</template>

<script>
    export default {
        methods: {
            restart() {
                this.$emit("set-step", 1);
        
                localStorage.removeItem("yourInfo");
                localStorage.removeItem("selectPlan");
                localStorage.removeItem("addOns");
                localStorage.removeItem("summaryinformation");
        
                this.$emit("next-step");
            },
        },
    };
</script>