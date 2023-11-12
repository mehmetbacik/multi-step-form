<template>
    <div>
        <h2>Step 4: Summary</h2>
        <button @click="prevStep">Back</button>
        <button @click="confirm" :disabled="!isConfirmEnabled">Confirm</button>
    </div>
</template>

<script>
    export default {
        methods: {
            prevStep() {
                this.$emit('prev-step');
            },
            confirm() {
                this.$emit('next-step');
            }
            },
            computed: {
            isConfirmEnabled() {
                return true;
            }
        }
    };
</script>