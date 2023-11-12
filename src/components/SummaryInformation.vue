<template>
    <div>
        <h2>Step 4: Summary</h2>
        <!-- Summary form fields go here -->
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
                this.$emit('confirm');
            }
            },
            computed: {
            isConfirmEnabled() {
                // Check if Summary fields are filled to enable Confirm button
                return true; // Replace with your validation logic
            }
        }
    };
</script>
