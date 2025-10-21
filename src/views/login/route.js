export const Login = {
  path: "/login",
  name: "login",
  component: () => import("./index.vue"),
  meta: {
    requiresAuth: false,
    guest: true
  }
};
