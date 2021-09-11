import Vue from "vue";
import Vuex from "vuex";
//import productData from '../../public/product-data.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    product: null,
    productImages: []
  },

  getters: {
    getProduct(state) {
      return state.product;
    },

    getProductImages(state) {
      return state.productImages;
    },
  },

  mutations: {
    setProduct(state, product) {
      state.product = product;
    },

    setAllProductImages(state, product) {
      product.productVariants.forEach(variant => {
        state.productImages = state.productImages.concat(variant.images);
      });
    },
  },

  // can be async 
  actions: {
    async getProduct({commit}) {
      try {
        await fetch("/product-data.json")
          .then(r => r.json())
          .then(json => {
            //to clone the original data
            const clonedData = JSON.parse(JSON.stringify(json));
            commit("setProduct", clonedData);
            commit("setAllProductImages", clonedData);
          });
      } catch (error) {
        console.log('error', error);
      }
    }
  }
});
