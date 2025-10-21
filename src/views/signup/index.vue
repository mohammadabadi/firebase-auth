<template>
  <div class="container d-flex justify-content-center align-items-center" style="min-height: 75vh;">
    <div class="card p-4 shadow-sm" style="width: 420px;">
      <h4 class="mb-3 text-center">Create account</h4>

      <form @submit.prevent="onSubmit">
        <div class="row">

          <div class="mb-3">
            <label class="form-label">Email</label>
            <input v-model="emailRef" type="email" class="form-control" :class="{ 'is-invalid': $v.email.$error }" />
            <div v-if="$v.email.$error" class="invalid-feedback">
                <span v-if="$v.email.required">Email is required.</span>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input v-model="passwordRef" type="password" class="form-control" :class="{ 'is-invalid': $v.password.$error }" />
            <div v-if="$v.password.$error" class="invalid-feedback">
                <span v-if="$v.password.required">Password is required.</span>
                <span v-if="$v.password.minLength">Minimum 6 characters.</span>
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Confirm Password</label>
            <input v-model="confirmRef" type="password" class="form-control" :class="{ 'is-invalid': $v.confirm.$error }" />
            <div v-if="$v.confirm.$error" class="invalid-feedback">
                <span v-if="$v.confirm.required">Please confirm your password.</span>
                <span v-if="$v.confirm.sameAsPassword">Passwords do not match.</span>
            </div>
          </div>
        </div>

        <div class="d-grid gap-2">
            <button class="btn btn-success" type="submit" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                Sign up
            </button>
        </div>

        <div class="text-center mt-3">
          <small>Already have an account? <router-link to="/login">Login</router-link></small>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive,ref,watch } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email, sameAs, minLength } from '@vuelidate/validators'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const emailRef = ref('')
const passwordRef = ref('')
const confirmRef = ref('')

const form = reactive({
  email: emailRef,
  password: passwordRef,
  confirm: confirmRef
})

// validation rules
const rules = {
  email: { required, email },
  password: { required, minLength: minLength(6) },
  confirm: { required, sameAsPassword: sameAs(passwordRef, 'Passwords do not match') }
}

const $v = useVuelidate(rules, form)
const store = useStore()
const router = useRouter()
const loading = ref(false)

watch(form, () => $v.value.$validate(), { deep: true })

const onSubmit = async () => {
  const valid = await $v.value.$validate()
  if (!valid) return
    try {
        loading.value = true
        await store.dispatch('signup', { 
          email: emailRef.value,
          password: passwordRef.value
        })
        router.push('/')
    } catch (err) {
        alert(err.message || 'Signup failed')
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.card { border-radius: 12px; }
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
