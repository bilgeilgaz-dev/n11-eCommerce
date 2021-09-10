import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },

  getters: {
  },

  mutations: {
  },

  // can be async 
  actions: {
    async getProduct() {
      try {
        console.log('getProduct');
      } catch (error) {
        console.log('error');
      }
    }
  }
});
