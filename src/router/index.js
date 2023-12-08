import { createRouter, createWebHistory } from 'vue-router';
import YourInfo from "../components/YourInfo.vue";
import FormCompleted from "../components/FormCompleted.vue";

const routes = [
  { path: "/", component: YourInfo, name: "YourInfo" },
  {
    path: "/FormCompleted",
    component: FormCompleted,
    name: "FormCompleted",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
