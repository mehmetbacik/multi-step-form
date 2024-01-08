<template>
    <div class="summary">
        <div class="headline">
            <span>Finishing up</span>
            <p>Double-check everything looks OK before confirming.</p>
        </div>
        <div class="price-content">
            <div>
                <h3>Select Plan</h3>
                <p>Selected Plan: {{ selectedPlan.name }}</p>
                <p>Price: {{ selectedPlan.price[billingCycle] }} {{ billingCycle }}</p>
                <p>Billing Cycle: {{ billingCycle }}</p>
            </div>
            <div>
                <h3>Add-Ons</h3>
                <ul>
                    <li v-for="(addon, index) in selectedAddons" :key="index">
                        {{ addon.name }} - Price: {{ addon.price[billingCycle] }} {{ billingCycle }}
                    </li>
                </ul>
            </div>
        </div>
        <div class="button-area">
            <button class="back-button" @click="prevStep">Go Back</button>
            <router-link :title="title" to="/FormCompleted">
                <button class="next-button" @click="confirm" :disabled="!isConfirmEnabled">Confirm</button>
            </router-link>
        </div>
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
            return this.selectedPlan && this.billingCycle && this.selectedAddons.length > 0;
        },
        selectedPlan() {
            const selectPlanData = JSON.parse(localStorage.getItem('selectPlan'));
            const plan = this.plans.find(plan => plan.name === selectPlanData.selectedPlan);
            return plan ? { ...plan, billingCycle: selectPlanData.isYearly ? 'yearly' : 'monthly' } : null;
        },
        billingCycle() {
            const selectPlanData = JSON.parse(localStorage.getItem('selectPlan'));
            return selectPlanData ? (selectPlanData.isYearly ? 'yearly' : 'monthly') : '';
        },
        selectedAddons() {
            const savedAddOns = JSON.parse(localStorage.getItem('addOns'));
            return savedAddOns ? savedAddOns.map(addonName => {
                const addon = this.addons.find(a => a.name === addonName);
                return addon ? { ...addon, billingCycle: this.billingCycle } : null;
            }).filter(addon => addon !== null) : [];
        },
    },
    data() {
        return {
            plans: [
                { name: 'Arcade', price: { yearly: 120, monthly: 9 }},
                { name: 'Advanced', price: { yearly: 240, monthly: 12 }},
                { name: 'Pro', price: { yearly: 360, monthly: 15 }},
            ],
            addons: [
                { name: 'Online Service', price: { yearly: 50, monthly: 1 }},
                { name: 'Larger Storage', price: { yearly: 100, monthly: 2 }},
                { name: 'Customizable Profile', price: { yearly: 75, monthly: 2 }},
            ],
        };
    },
};
</script>