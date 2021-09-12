<template>
  <div id="product-container">
    <div class="product-images-container">
      <ProductImages :productToBuy="productToBuy"/>
    </div>
    <div class="product-details">
      <ProductHeader 
        v-if="productDetails" 
        :product="productDetails"
      />
      <ProductOptions 
        :productVariants="productVariants"
        :selectableAttributes="selectableAttributes"
        @selectAttribute="selectAttribute"
      />
      <ProductQuantity 
        v-if="productPrices"
        :productPrices="productPrices"
        @updateProductQuantity="updateProductQuantity"
      />
      <Cart 
        :totalPrice="totalPriceToPay"
        :productToBuy="productToBuy"
        :productQuantityToBuy="productQuantityToBuy"
      />
    </div>
  </div>
</template>
<script>
import ProductImages from "./ProductImages";
import ProductHeader from "./ProductHeader";
import ProductOptions from "./ProductOptions";
import ProductQuantity from "./ProductQuantity";
import Cart from "./Cart";

export default {
  components: {
    ProductImages,
    ProductHeader,
    ProductOptions,
    ProductQuantity,
    Cart
  },

  data() {
    return {
      productQuantityToBuy: 0,
      totalPriceToPay: 0,
      productToBuy: {}
    }
  },

  computed: {
    productDetails() {
      return this.$store.getters.getProduct;
    },
    
    selectableAttributes() {
      return this.productDetails && this.productDetails.selectableAttributes;
    },

    productVariants() {
      return this.productDetails && this.productDetails.productVariants;
    },

    productPrices() {
      return this.productDetails && this.productDetails.baremList;
    }
  },

  async created() {
    await this.$store.dispatch('getProduct');
  },

  methods: {
    selectAttribute(attArray){
      this.productDetails.productVariants.forEach( product => {
        if(product.attributes.every(attribute => attArray.some(selectedAtt => selectedAtt.value === attribute.value))){
          this.productToBuy = product;
        }
      });
    },

    updateProductQuantity(quantity) {
      this.productQuantityToBuy = parseInt(quantity, 10);
      this.calculateTotalPrice();
    },

    calculateTotalPrice() {
      this.productDetails.baremList.forEach(barem => {
        if(barem.minimumQuantity <= this.productQuantityToBuy && barem.maximumQuantity >= this.productQuantityToBuy){
          this.totalPriceToPay = barem.price * this.productQuantityToBuy;
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
#product-container {
  display: flex;
  padding: 20px;

  .product-images-container {
    width: 40%;
  }

  .product-details {
    width: 60%;
    display: flex;
    padding-left: 20px;
    flex-direction: column;
  }
}

@media (max-width: 580px) {
  #product-container {
    flex-direction: column;
  }

  .product-details {
    width: 100% !important;
    padding-left: 0 !important;
  }
}
</style>