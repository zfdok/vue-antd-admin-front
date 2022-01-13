import Vue from 'vue'
import Vuex from 'vuex'
import snackbar from "@/store/modules/snackbar";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
  },
  mutations: {
    changeLogin(state, user) {
      state.Authorization = user.Authorization;
      localStorage.setItem('Authorization', user.Authorization);
    },
    changeLogout(state){
      state.Authorization = undefined;
      localStorage.removeItem('Authorization');
    }
  },
  actions: {
  },
  modules: {
    snackbar,
  }
})
