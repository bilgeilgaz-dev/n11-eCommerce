<template>
  <div v-if="productImages">
    <div class="selected-image-container">
      <img 
        :src="selectedImage" 
        class="selected-image" 
        alt="selected-img"
      />
    </div>
    <div class="row thumbnail-row">
      <div 
        v-for="(src,index) in productImages" 
        :key="index"
      >
        <img 
          :src="src" 
          class="thumbnail-img" 
          @click="selectImage(src)" 
          alt="thumbnail-img"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    productToBuy: {
      type: Object,
      required: true,
      default: () => {}
    },
  },

  data() {
    return {
      selectedImage: null
    }
  },

  watch: {
    productImages() {
      this.selectedImage = this.productImages[0];
    }
  },

  computed: {
    productImages(){
      if(this.productToBuy && this.productToBuy.images){
        return this.productToBuy.images;
      }

      return this.$store.getters.getProductImages;
    }
  },

  created() {
    if(this.productImages) {
      this.selectedImage = this.productImages[0];
    }
  },

  methods: {
    selectImage(src) {
      this.selectedImage = src;
    }
  }
}
</script>
<style lang="scss" scoped>
.selected-image {
  width: 100%;
  max-width: 450px;
}

.thumbnail-img {
  width: 70px;
  border: 1px solid lightgray;
  margin: 2px;
}
</style>
<style lang="scss">
@media (max-width: 580px) { 
  .product-images-container {
    width: 100% !important;
  }

  .thumbnail-row {
    justify-content: center;
  }
}
</style>