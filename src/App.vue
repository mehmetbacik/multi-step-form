<template>
  <div id="app">
    <component
      :is="currentStepComponent"
      @next-step="nextStep"
      @prev-step="prevStep"
      @confirm="confirm"
    />
  </div>
</template>

<script>
import YourInfo from "@/components/YourInfo";
import SelectPlan from "@/components/SelectPlan";
import AddOns from "@/components/AddOns";
import SummaryInformation from "@/components/SummaryInformation";

export default {
  components: {
    YourInfo,
    SelectPlan,
    AddOns,
    SummaryInformation
  },
  data() {
    return {
      currentStep: 1
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
    }
  },
  methods: {
    nextStep() {
      if (this.currentStep < 4) {
        this.currentStep++;
      }
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },
    confirm() {
      // Handle confirm logic, e.g., submit the form data
      console.log("Form confirmed!");
    }
  }
};
</script>
