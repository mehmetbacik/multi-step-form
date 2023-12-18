<template>
  <div>
    <div class="progress-bar">
      <div
        v-for="(step, index) in steps"
        :key="index"
        :class="{ active: index + 1 === currentStep }"
      >
        {{ step }}
      </div>
    </div>
    <div class="content">
      <component :is="currentStepComponent" @next-step="nextStep" @prev-step="prevStep" />
    </div>
  </div>
</template>

<script>
import YourInfo from "@/components/YourInfo.vue";
import SelectPlan from "@/components/SelectPlan.vue";
import AddOns from "@/components/AddOns.vue";
import SummaryInformation from "@/components/SummaryInformation.vue";

export default {
  data() {
    return {
      currentStep: 1,
      steps: ["Your Info", "Select Plan", "Add-Ons", "SummaryInformation"],
    };
  },
  computed: {
    currentStepComponent() {
      switch (this.currentStep) {
        case 1:
          return "YourInfo";
        case 2:
          return "SelectPlan";
        case 3:
          return "AddOns";
        case 4:
          return "SummaryInformation";
        default:
          return null;
      }
    },
  },
  methods: {
    nextStep() {
      if (this.currentStep < this.steps.length) {
        this.currentStep += 1;
      } else {
        // If all steps are completed, you can take another action
      }
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep -= 1;
      }
    },
  },
  components: {
    YourInfo,
    SelectPlan,
    AddOns,
    SummaryInformation,
  },
};
</script>
