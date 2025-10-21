export const Dashboard = {
  path: "/",
  name: "dashboard",
  component: () => import("./index.vue"),
  meta: {
    requiresAuth: true,
  }
};
