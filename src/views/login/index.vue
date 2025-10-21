<template>
  <div class="container d-flex justify-content-center align-items-center" style="min-height: 75vh;">
    <div class="card p-4 shadow-sm" style="width: 420px;">
      <h4 class="mb-3 text-center fw-bold text-primary">Welcome back</h4>

      <form @submit.prevent="onSubmit" novalidate>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input
            v-model="form.email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': $v.email.$error }"
          />
          <div v-if="$v.email.$error" class="invalid-feedback">
            <span v-if="$v.email.required">Email is required.</span>
            <span v-else-if="$v.email.email">Enter a valid email.</span>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Password</label>
          <input
            v-model="form.password"
            type="password"
            class="form-control"
            :class="{ 'is-invalid': $v.password.$error }"
          />
          <div v-if="$v.password.$error" class="invalid-feedback">
            <span v-if="$v.password.required">Password is required.</span>
            <span v-if="$v.password.minLength">Minimum 6 characters.</span>
          </div>
        </div>

        <div class="d-grid gap-2">
          <button class="btn btn-primary" type="submit" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
            Login
          </button>
        </div>

        <div class="text-center mt-3">
          <small>Don't have an account?
            <router-link to="/signup">Sign up</router-link>
          </small>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { useStore } from "vuex";
import { useRouter } from 'vue-router'

// reactive state
const form = reactive({
  email: '',
  password: ''
})

// validation rules
const rules = {
  email: { required, email },
  password: { required, minLength: minLength(6) }
}

const $v = useVuelidate(rules, form)
const store = useStore()
const router = useRouter()
const loading = ref(false)

watch(form, () => {
  if ($v.value.$dirty) $v.value.$validate()
}, { deep: true })

const onSubmit = async () => {
    $v.value.$touch()
    const valid = await $v.value.$validate()
    if (!valid) return
    try {
        loading.value = true
        await store.dispatch('login', {
        email: form.email,
        password: form.password
        })
        router.push('/')
    } catch (err) {
        alert(err.message || 'Login failed')
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.card {
  border-radius: 14px;
  transition: all 0.3s ease;
}
.card {
  position: relative;
  z-index: 999;
}
.card:hover {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}
.invalid-feedback span::before {
    display: inline-block;
    content: "•";
    color: red;
    padding-right: 3px;
}
.invalid-feedback span{
    display: block;
    font-size: 11px;
}
</style>