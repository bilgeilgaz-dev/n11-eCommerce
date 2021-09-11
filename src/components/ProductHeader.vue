<template>
  <div v-if="product && product.productTitle" class="product-header-container">
    <p class="product-title">{{ product.productTitle }}</p>
    <h5 class="product-prices">{{ `${minPrice} TL - ${maxPrice} TL` }}<span class="adet"> / Adet</span></h5>
    <span class="min-quantity">{{`${minQuantity} Adet(Minimum Siparis Adedi)`}}</span>
  </div>
</template>
<script>
export default {
  props: {
    product: {
      required: true,
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      minPrice: 0,
      maxPrice: 0,
      minQuantity: 0
    }
  },

  created() {
    this.getPrices();
  },

  methods: {
    getPrices() {
      this.minPrice = this.product.baremList[0].price;
      this.maxPrice = this.product.baremList[0].price;
      this.minQuantity = this.product.baremList[0].minimumQuantity;
      this.product.baremList.forEach(barem => {
        if(this.minPrice > barem.price) {
          this.minPrice = barem.price.toFixed(2);
        }

        if(this.maxPrice < barem.price) {
          this.maxPrice = barem.price.toFixed(2);
        }

        if(this.minQuantity > barem.minimumQuantity) {
          this.minQuantity = barem.minimumQuantity;
        }

      });
    }
  }
}
</script>
<style lang="scss" scoped>
.product-header-container {
  padding-left: 20px;
}

.product-title {
  font-size: 35px;
}

.adet, .min-quantity {
  font-size: 14px;
  color: gray;
  font-weight: 400;
}
</style>