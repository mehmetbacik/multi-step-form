<template>
    <div>
        <h2>Step 3: Add-Ons</h2>
        <!-- Add-Ons form fields go here -->
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
                // Check if Add-Ons fields are filled to enable Next button
                return true; // Replace with your validation logic
            }
        }
    };
</script>
