<template>
  <div id="product-quantity-container">
    <div class="quantity-container">
      <div class="quantity-header">
        <span>Toptan Fiyat</span>
        <span>(Adet)</span>
      </div>
      <div class="product-price-container">
        <span v-for="(productPrice,index) in productPrices" :key="index" :class="{'product-price': true, 'selected-amount': checkAmount(productPrice)}">
          <span>{{ `${productPrice.minimumQuantity} - ${productPrice.maximumQuantity}`}}</span>
          <span>{{ productPrice.price }} TL</span>
        </span>
      </div>
    </div>
    <div class="quantity-input-container">
      <span class="quantity-input-header">Adet</span>
      <input type="number" v-model="numberOfProduct" class="quantity-input">
      <span class="quantity">Adet</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    productPrices: {
      type: Array,
      required: true,
      default: () => []
    }
  },

  data() {
    return {
      numberOfProduct: 0
    }
  },

  watch: {
    numberOfProduct() {
      this.$emit('updateProductQuantity', this.numberOfProduct);
    }
  },

  methods: {
    checkAmount(product){
      return product.minimumQuantity <= this.numberOfProduct && product.maximumQuantity >= this.numberOfProduct;
    }
  }
}
</script>
<style lang="scss" scoped>
#product-quantity-container {
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 5px;

  .quantity-container {
    display: flex;

    .quantity-header {
      display: flex;
      flex-direction: column;
      width: 100px;
    }
  }

  .product-price-container {
    display: flex;

    .product-price {
      display: flex;
      flex-direction: column;
      padding: 0 20px 0 10px;
      border-right: 1px solid lightgray;
    }

    .selected-amount {
      background-color: #FFE5B4;
      font-weight: 700;
    }
  }

  .quantity-input-container {
    display: flex;
    align-items: center;
    margin-top: 20px;

    .quantity-input-header {
      width: 100px;
    }

    .quantity-input {
      width: 100px;
      padding: 5px 15px;
      height: 40px;
    }

    .quantity {
      margin-left: 10px;
    }
  }
  
}
</style>