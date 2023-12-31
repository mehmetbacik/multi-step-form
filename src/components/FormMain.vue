<template>
  <div class="form-content">
    <div class="progress-bar">
      <div class="steps"
        v-for="(step, index) in steps"
        :key="index"
        :class="{ active: index + 1 === currentStep }"
      >
        <div class="step-number">
          {{ step.number }}
        </div>
        <div class="step-headline">
          <span class="step-label">{{ step.label }}</span>
          <span class="step-title">{{ step.title }}</span>
        </div>
      </div>
    </div>
    <div class="content">
      <component
        :is="currentStepComponent"
        @next-step="nextStep"
        @prev-step="prevStep"
      />
    </div>
  </div>
</template>

<script>
import YourInfo from "@/components/YourInfo.vue";
import SelectPlan from "@/components/SelectPlan.vue";
import AddOns from "@/components/AddOns.vue";
import SummaryInformation from "@/components/SummaryInformation.vue";
import FormCompleted from "@/components/FormCompleted.vue";

export default {
  data() {
    return {
      currentStep: 1,
      steps: [
        { number: 1, label: "Step 1", title: "Your Info" },
        { number: 2, label: "Step 2", title: "Select Plan" },
        { number: 3, label: "Step 3", title: "Add-Ons" },
        { number: 4, label: "Step 4", title: "Summary Information" },
        { number: 5, label: "Step 5", title: "Form Completed" },
      ],
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
        case 5:
          return "FormCompleted";
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
    FormCompleted,
  },
};
</script>
