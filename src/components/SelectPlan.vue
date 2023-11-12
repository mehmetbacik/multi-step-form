<template>
    <div>
        <h2>Step 2: Select Plan</h2>
        <button @click="prevStep">Back</button>
        <button @click="nextStep" :disabled="!isNextEnabled">Next</button>
    </div>
</template>

<script>
    export default {
        methods: {
            prevStep() {
                this.$emit('prev-step');
            },
            nextStep() {
                this.$emit('next-step');
            }
            },
            computed: {
            isNextEnabled() {
                return true;
            }
        }
    };
</script>  