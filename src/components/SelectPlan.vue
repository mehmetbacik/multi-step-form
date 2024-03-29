<template>
    <div class="select-plan">
        <div class="headline">
            <span>Select your plan</span>
            <p>You have the option of monthly or yearly billing.</p>
        </div>
        <div class="plan-options">
            <div
                v-for="(plan, index) in plans"
                :key="index"
                @click="selectPlan(plan.name)"
                class="plan-content"
                :class="{ 'selected': selectedPlan === plan.name, [plan.class]: true }"
            >
                <div>
                    <span>{{ plan.name }}</span>
                    <p>${{ plan.price[isYearly ? 'yearly' : 'monthly'] }}/{{ billingCycle }}</p>
                    <p v-if="isYearly" class="plan-description">{{ plan.description }}</p>
                </div>
            </div>
        </div>
        <div class="billing-toggle">
            <span class="time-text" :class="{ 'active': !isYearly }">Monthly</span>
            <label class="switch">
                <input type="checkbox" v-model="isYearly" @change="toggleBillingCycle" />
                <span class="slider"></span>
            </label>
            <span class="time-text" :class="{ 'active': isYearly }">Yearly</span>
        </div>
        <div class="button-area">
            <button @click="prevStep" class="back-button">Go Back</button>
            <button @click="nextStep" :disabled="!isNextButtonActive" class="next-button">Next Step</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                plans: [
                    { name: 'Arcade', price: { yearly: 120, monthly: 9 }, description: '2 months free', class: 'arcade-plan' },
                    { name: 'Advanced', price: { yearly: 240, monthly: 12 }, description: '2 months free', class: 'advanced-plan' },
                    { name: 'Pro', price: { yearly: 360, monthly: 15 }, description: '2 months free', class: 'pro-plan' },
                ],
                selectedPlan: null,
                isNextButtonActive: false,
                isYearly: false,
            };
        },
        computed: {
            billingCycle() {
                return this.isYearly ? 'yr' : 'mo';
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