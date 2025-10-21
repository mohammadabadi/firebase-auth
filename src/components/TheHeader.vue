<template>
  <BNavbar toggleable="lg" type="dark" variant="primary" class="mb-4">
    <BContainer>
      <BNavbarBrand href="#">MyAuth</BNavbarBrand>
      <BNavbarToggle target="nav-collapse" />

      <BCollapse id="nav-collapse" is-nav>
        <BNavbarNav class="ms-auto">
          <BNavItem v-if="!isAuth" to="/login">Login</BNavItem>
          <BNavItem v-if="!isAuth" to="/signup">Signup</BNavItem>

          <BDropdown v-if="isAuth" text="Account" variant="light" right>
            <BDropdownItem disabled>{{ userEmail }}</BDropdownItem>
            <BDropdownDivider />
            <BDropdownItem @click="logout">Logout</BDropdownItem>
          </BDropdown>
        </BNavbarNav>
      </BCollapse>
    </BContainer>
  </BNavbar>
</template>

<script>
import { useStore , mapGetters } from 'vuex'
import { useRouter } from 'vue-router'
import {
  BNavbar,
  BContainer,
  BNavbarBrand,
  BNavbarToggle,
  BCollapse,
  BNavbarNav,
  BNavItem,
  BDropdown,
  BDropdownItem,
  BDropdownDivider,
} from 'bootstrap-vue-next'
export default {
  components: {
    BNavbar,
    BContainer,
    BNavbarBrand,
    BNavbarToggle,
    BCollapse,
    BNavbarNav,
    BNavItem,
    BDropdown,
    BDropdownItem,
    BDropdownDivider,
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'userEmail']),
    isAuth() {
      return this.isAuthenticated
    }
  },
  setup(){
    const store = useStore()
    const router = useRouter()
    const logout = () => {
      store.dispatch('logout')
      router.push('/login')
    }
    return{
      logout
    }
  }
}
</script>

<style scoped>
</style>