<template>
    <div>
        <h2>Add-Ons</h2>
        <div class="addon-options">
            <div
                v-for="(addon, index) in addons"
                :key="index"
                :class="{ 'selected-addon': selectedAddons.includes(addon.name) }"
                @click="toggleAddon(addon.name)"
                >
                <input
                type="checkbox"
                :id="`addon-${index}`"
                :value="addon.name"
                v-model="selectedAddons"
                @change="checkNextButton"
                />
                <label :for="`addon-${index}`" @click="toggleAddon(addon.name)">{{
                addon.name
                }}</label>
                <p>Price: {{ addon.price }}</p>
                <p>{{ addon.description }}</p>
            </div>
        </div>
        <button @click="prevStep">Back</button>
        <button @click="nextStep" :disabled="!isNextButtonActive">Next</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
        addons: [
            {
                name: "Online Service",
                price: 5,
                description: "Access to online gaming services.",
            },
            {
                name: "Larger Storage",
                price: 10,
                description: "Get additional storage space for your games.",
            },
            {
                name: "Customizable Profile",
                price: 7,
                description: "Customize your gaming profile.",
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
        if (savedAddOns) {
            this.selectedAddons = savedAddOns;
            this.checkNextButton();
        }
    },
};
</script>
