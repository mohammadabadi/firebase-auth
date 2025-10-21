import { createStore } from 'vuex'
import { auth, createUserWithEmailAndPassword as firebaseSignup, signInWithEmailAndPassword as firebaseLogin, signOut, onAuthStateChanged } from '../firebase'

const store = createStore({
  state() {
    return {
      user: null,
      token: null
    }
  },
  getters: {
    isAuthenticated(state) {
      return !!state.user
    },
    userEmail(state) {
      return state.user ? state.user.email : ''
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload.user
      state.token = payload.token
    },
    clearUser(state) {
      state.user = null
      state.token = null
    }
  },
  actions: {
    async signup({ commit }, { name, email, password }) {
      const res = await firebaseSignup(auth, email, password)
      const user = res.user
      commit('setUser', { user: { email: user.email, uid: user.uid, displayName: name }, token: null })
      localStorage.setItem('user', JSON.stringify({ email: user.email, uid: user.uid, displayName: name }))
    },
    async login({ commit }, { email, password }) {
      try {
        const res = await firebaseLogin(auth, email, password)
        const user = res.user
        console.log('User signed in:', user);
        commit('setUser', { user: { email: user.email, uid: user.uid }, token: null })
        localStorage.setItem('user', JSON.stringify({ email: user.email, uid: user.uid }))
      }catch (error) { 
        console.error('Sign-in error:', error.code, error.message);
        let errorMessage = 'An unknown error occurred during sign-in.';
        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage = 'The email address is not valid.';
            break;
          case 'auth/user-not-found': // This could also lead to similar behavior as invalid credentials
            errorMessage = 'No user found with this email.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Incorrect password. Please try again or reset your password.';
            break;
          case 'auth/user-disabled':
            errorMessage = 'Your account has been disabled. Please contact support.';
            break;
          case 'auth/invalid-credential': // General catch-all for various invalid credentials
            errorMessage = 'Invalid login credentials. Please check your email and password.';
            break;
          // Add more cases for other Firebase Auth error codes if needed
          default:
            errorMessage = `Login failed: ${error.message}`;
        }
        // Display errorMessage to the user in your UI
        alert(errorMessage);
      }
    },
    async logout({ commit }) {
      await signOut(auth)
      commit('clearUser')
      localStorage.removeItem('user')
    },
    tryAutoLogin({ commit }) {
      const saved = localStorage.getItem('user')
      if (saved) {
        const user = JSON.parse(saved)
        commit('setUser', { user, token: null })
      }
    },
    listenAuthState({ commit }) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          commit('setUser', { user: { email: user.email, uid: user.uid }, token: null })
          localStorage.setItem('user', JSON.stringify({ email: user.email, uid: user.uid }))
        } else {
          commit('clearUser')
          localStorage.removeItem('user')
        }
      })
    }
  }
})

export default store
