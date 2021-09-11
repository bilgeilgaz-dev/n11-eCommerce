import Vue from "vue";
import Vuex from "vuex";
import productData from './product-data.json';

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
      //console.log('setProduct', state.product);
    },

    setAllProductImages(state, product) {
      product.productVariants.forEach(variant => {
        //console.log('variant.images', variant.images);
        state.productImages = state.productImages.concat(variant.images);
      });
      //console.log('setAllProductImages', state.productImages);
    },
  },

  // can be async 
  actions: {
    async getProduct({commit}) {
      try {
        /* const response = await Vue.http.get('product-data.json');
        console.log('response', response);
        //to clone the original data
        const clonedData = JSON.parse(JSON.stringify(response.body));
        console.log('response', response); */
        commit("setProduct", productData);
        commit("setAllProductImages", productData);
      } catch (error) {
        console.log('error', error);
      }
    }
  }
});
