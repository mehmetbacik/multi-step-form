<template>
    <div>
        <h2>Step 1: Your Info</h2>
        <!-- Your Info form fields go here -->
        <button @click="nextStep" :disabled="!isNextEnabled">Next</button>
    </div>
</template>
    
<script>
    export default {
        methods: {
            nextStep() {
                this.$emit('next-step');
            }
            },
            computed: {
            isNextEnabled() {
                // Check if Your Info fields are filled to enable Next button
                return true; // Replace with your validation logic
            }
        }
    };
</script>  