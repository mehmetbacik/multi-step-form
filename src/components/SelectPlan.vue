<template>
    <div>
        <h2>Select Plan</h2>
        <div class="plan-options">
            <div
            v-for="(plan, index) in plans"
            :key="index"
            @click="selectPlan(plan.name)"
            :class="{ 'selected': selectedPlan === plan.name }"
            >
            <h3>{{ plan.name }}</h3>
            <p>Price: {{ plan.price[isYearly ? 'yearly' : 'monthly'] }} {{ billingCycle }}</p>
            <p>{{ plan.description }}</p>
            </div>
        </div>
        <div class="billing-toggle">
            <label class="switch">
            <input type="checkbox" v-model="isYearly" @change="toggleBillingCycle" />
            <span class="slider"></span>
            </label>
            <span>{{ billingCycle }}</span>
        </div>
        <button @click="prevStep">Back</button>
        <button @click="nextStep" :disabled="!isNextButtonActive">Next</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                plans: [
                    { name: 'Arcade', price: { yearly: 120, monthly: 10 }, description: 'Basic plan for arcade gaming.' },
                    { name: 'Advanced', price: { yearly: 240, monthly: 20 }, description: 'Advanced plan for gaming enthusiasts.' },
                    { name: 'Pro', price: { yearly: 360, monthly: 30 }, description: 'Professional plan for serious gamers.' },
                ],
                selectedPlan: null,
                isNextButtonActive: false,
                isYearly: false,
            };
        },
        computed: {
            billingCycle() {
                return this.isYearly ? 'Yearly' : 'Monthly';
            },
        },
        methods: {
            selectPlan(planName) {
                this.selectedPlan = this.selectedPlan === planName ? null : planName;
                this.checkNextButton();
                this.saveToLocalStorage();
            },
            toggleBillingCycle() {
                this.checkNextButton();
                this.saveToLocalStorage();
            },
            nextStep() {
                if (this.isNextButtonActive) {
                    this.$emit('next-step');
                }
            },
            prevStep() {
                this.$emit('prev-step');
            },
            checkNextButton() {
                this.isNextButtonActive = !!this.selectedPlan;
            },
            saveToLocalStorage() {
                localStorage.setItem('selectPlan', JSON.stringify({
                    selectedPlan: this.selectedPlan,
                    isYearly: this.isYearly,
                }));
            },
            loadFromLocalStorage() {
                const selectPlanData = JSON.parse(localStorage.getItem('selectPlan'));
                if (selectPlanData) {
                    this.selectedPlan = selectPlanData.selectedPlan;
                    this.isYearly = selectPlanData.isYearly;
                    this.checkNextButton();
                }
            },
        },
        created() {
            this.loadFromLocalStorage();
        },
    };
</script>