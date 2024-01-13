<template>
    <div class="summary">
      <div class="headline">
        <span>Finishing up</span>
        <p>Double-check everything looks OK before confirming.</p>
      </div>
      <div class="price-content">
        <div class="plan-content">
          <div class="plan-name">
            <span>{{ selectedPlan.name }} ({{ billingCycle }})</span>
            <button @click="changeBillingCycle">Change</button>
          </div>
          <div class="plan-price">
            <span>${{ selectedPlan.price[billingCycle] }}/{{ shortBillingCycle }}</span>
          </div>
        </div>
        <div class="addons-content">
          <ul>
            <li v-for="(addon, index) in selectedAddons" :key="index">
              <div class="addon-name">{{ addon.name }}</div>
              <div class="addon-price">${{ addon.price[billingCycle] }}/{{ shortBillingCycle }}</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="total-content">
        <span>Total(per {{ totalBillingCycle }})</span>
        <span>${{ totalAmount.toFixed(2) }}/{{ shortBillingCycle }}</span>
      </div>
      <div class="button-area">
        <button class="back-button" @click="prevStep">Go Back</button>
        <router-link :title="title" to="/FormCompleted">
          <button class="next-button" @click="confirm" :disabled="!isConfirmEnabled">
            Confirm
          </button>
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
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
        isYearly: false,
      };
    },
    methods: {
      prevStep() {
        this.$emit('prev-step');
      },
      confirm() {
        this.$emit('next-step');
      },
      changeBillingCycle() {
        this.isYearly = !this.isYearly;
        this.saveToLocalStorage();
      },
      saveToLocalStorage() {
        localStorage.setItem('selectPlan', JSON.stringify({
          selectedPlan: this.selectedPlan,
          isYearly: this.isYearly,
        }));
      },
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
        return this.isYearly ? 'yearly' : 'monthly';
      },
      shortBillingCycle() {
        return this.isYearly ? 'yr' : 'mo';
      },
      totalBillingCycle() {
        return this.isYearly ? 'year' : 'month';
      },
      selectedAddons() {
        const savedAddOns = JSON.parse(localStorage.getItem('addOns'));
        return savedAddOns ? savedAddOns.map(addonName => {
          const addon = this.addons.find(a => a.name === addonName);
          return addon ? { ...addon, billingCycle: this.billingCycle } : null;
        }).filter(addon => addon !== null) : [];
      },
      totalAmount() {
        const planPrice = this.selectedPlan ? this.selectedPlan.price[this.billingCycle] : 0;
        const addonsTotal = this.selectedAddons.reduce((total, addon) => {
          return total + addon.price[this.billingCycle];
        }, 0);
  
        return planPrice + addonsTotal;
      },
    },
  };
  </script>
  