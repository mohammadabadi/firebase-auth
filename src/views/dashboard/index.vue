<template>
  <div class="container">
    <div class="row mt-4">
      <div class="col-12">
        <div class="card p-4 shadow-sm">
          <h4>Dashboard</h4>
          <p class="text-muted">
            Welcome <strong>{{ email || 'Guest' }}</strong>
          </p>

          <div class="mt-3">
            <button class="btn btn-outline-danger" @click="logout">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

// check undefined and null
const email = computed(() => store.getters.userEmail || '')

const logout = async () => {
  await store.dispatch('logout') // wait to logout process
  router.push('/login')
}
</script>

<style scoped>
.card {
  border-radius: 12px;
}
</style>