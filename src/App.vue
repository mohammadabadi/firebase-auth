<template>
  <div>
    <TheHeader />
    <router-view />
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useStore } from "vuex";
import TheHeader from './components/TheHeader.vue'
export default {
  components: { TheHeader },
  setup(){
    const store = useStore()
    onMounted(() => {
      store.dispatch('tryAutoLogin')
      store.dispatch('listenAuthState')
    });
  }
}
</script>

<style>
body { background: #f6f8fb; }
</style>
