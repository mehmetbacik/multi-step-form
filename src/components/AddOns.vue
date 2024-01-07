<template>
    <div class="add-ons">
        <div class="headline">
            <span>Pick add-ons</span>
            <p>Add-ons help enhance your gaming experience.</p>
        </div>
        <div class="addon-options">
            <div
                v-for="(addon, index) in addons"
                :key="index"
                class="content"
                :class="{ 'selected-addon': selectedAddons.includes(addon.name) }"
                @click="toggleAddon(addon.name)"
            >
                <div class="area">
                    <input
                        type="checkbox"
                        :id="`addon-${index}`"
                        :value="addon.name"
                        v-model="selectedAddons"
                        @change="checkNextButton"
                    />
                    <div class="description">
                        <label :for="`addon-${index}`" @click="toggleAddon(addon.name)">{{ addon.name }}</label>
                        <p>{{ addon.description }}</p>
                    </div>
                </div>
                <p class="price">+${{ calculateAddonPrice(addon.price) }}/{{ billingCycle }}</p>
            </div>
        </div>
        <div class="button-area">
            <button class="back-button" @click="prevStep">Go Back</button>
            <button class="next-button" @click="nextStep" :disabled="!isNextButtonActive">Next Step</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            addons: [
                {
                    name: "Online Service",
                    price: { yearly: 50, monthly: 1 },
                    description: "Access to multiplayer games",
                },
                {
                    name: "Larger Storage",
                    price: { yearly: 100, monthly: 2 },
                    description: "Extra 1TB of cloud save",
                },
                {
                    name: "Customizable Profile",
                    price: { yearly: 75, monthly: 2 },
                    description: "Custom thme on your profile",
                },
            ],
            selectedAddons: [],
            isNextButtonActive: false,
        };
    },
    methods: {
        toggleAddon(name) {
            const index = this.selectedAddons.indexOf(name);
            if (index === -1) {
                this.selectedAddons.push(name);
            } else {
                this.selectedAddons.splice(index, 1);
            }

            this.checkNextButton();
            this.saveToLocalStorage();
        },
        calculateAddonPrice(basePrice) {
            return basePrice[this.isYearly ? 'yearly' : 'monthly'];
        },
        nextStep() {
            if (this.isNextButtonActive) {
                this.$emit("next-step");
            }
        },
        prevStep() {
            this.$emit("prev-step");
        },
        checkNextButton() {
            this.isNextButtonActive = this.selectedAddons.length > 0;
        },
        saveToLocalStorage() {
            localStorage.setItem("addOns", JSON.stringify(this.selectedAddons));
        },
    },
    created() {
        const savedAddOns = JSON.parse(localStorage.getItem("addOns"));
        if (Array.isArray(savedAddOns)) {
            this.selectedAddons = savedAddOns;
            this.checkNextButton();
        } else {
            this.selectedAddons = [];
        }
    },
    computed: {
        billingCycle() {
            return this.isYearly ? 'yr' : 'mo';
        },
        isYearly() {
            const selectPlanData = JSON.parse(localStorage.getItem("selectPlan"));
            return selectPlanData ? selectPlanData.isYearly : false;
        },
    },
};
</script>