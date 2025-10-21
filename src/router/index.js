import {createRouter,createWebHistory} from 'vue-router';
import { routesConfig } from "./routesConfig";
import store from '../store'

const routes = [...routesConfig]
const router = createRouter ({
    history : createWebHistory(),
    routes,
})
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ path: '/login' })
  } else if (to.meta.guest && isAuthenticated) {
    next({ path: '/' })
  } else {
    next()
  }
})

export default router