export const Signup = {
  path: "/signup",
  name: "signup",
  component: () => import("./index.vue"),
  meta: {
    requiresAuth: false,
    guest: true
  }
};
