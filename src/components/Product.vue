<template>
  <div id="product-container">
    <div class="product-images-container">
      <ProductImages :productToBuy="productToBuy"/>
    </div>
    <div class="product-details">
      <ProductHeader :product="productDetails"/>
      <ProductOptions 
        :productVariants="productVariants"
        :selectableAttributes="selectableAttributes"
        @selectAttribute="selectAttribute"
      />
      <ProductQuantity 
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
      return this.productDetails.selectableAttributes;
    },

    productVariants() {
      return this.productDetails.productVariants;
    },

    productPrices() {
      return this.productDetails.baremList;
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
      console.log('updateProductQuantity')
      this.productQuantityToBuy = parseInt(quantity, 10);
      this.calculateTotalPrice();
    },

    calculateTotalPrice() {
      console.log('calculateTotalPrice')
      this.productDetails.baremList.forEach(barem => {
        if(barem.minimumQuantity <= this.productQuantityToBuy && barem.maximumQuantity >= this.productQuantityToBuy){
          this.totalPriceToPay = barem.price * this.productQuantityToBuy;
          console.log('this.totalPriceToPay', this.totalPriceToPay);
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
</style>