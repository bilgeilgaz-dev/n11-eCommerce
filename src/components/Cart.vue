<template>
  <div class="cart-container">
    <div class="total-price-container">
      <span class="total-price-header">Toplam</span>
      <span class="total-price">{{ totalPrice }} TL</span>
    </div>
    <div class="cargo">Kargo ucreti:<a href="#" class="cargo-option">Alici oder</a></div>
    <div class="button-container">
      <button 
        class="add-button" 
        @click="addToCart()"
        :disabled="isAddButtonDisabled"
      >
        SEPETE EKLE
      </button>
      <a href="#" class="pay-info">Odeme secenekleri</a>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    totalPrice: {
      type: Number,
      required: true,
      default: 0
    },

    productToBuy: {
      type: Object,
      required: true,
      default: () => {}
    },

    productQuantityToBuy: {
      type: Number,
      required: true,
      default: 0
    },
  },

  computed: {
    isAddButtonDisabled(){
      return !(this.totalPrice && this.totalPrice > 0 && Object.keys(this.productToBuy).length > 0); 
    }
  },

  methods: {
    addToCart() {
      console.log(`the following item is added: ${this.productToBuy.id}` , `amount: ${this.productQuantityToBuy}`)
    }
  }
}
</script>
<style lang="scss" scoped>
.cart-container {
  padding: 20px;

  .total-price-container{
    display: flex;
    font-weight: 700;
    align-items: center;

    .total-price-header {
      width: 100px;
    }

    .total-price {
      font-size: 20px;
    }
  }

  .cargo {
    font-size: 14px;
    margin: 5px 0 5px 100px;

    .cargo-option {
      margin-left: 5px;
    }
  }

  .button-container {
    margin: 20px 0 20px 100px;

    .add-button {
      height: 60px;
      padding: 15px 25px;
      background-color: #F4C430;
      border: none;
      border-radius: 5px;
      margin-right: 20px;
      color: #fff;
      font-weight: 600;
    }

    .add-button:disabled {
      cursor: no-drop;
      opacity: 0.5;
    }

    .pay-info {
      font-size: 14px;
    }
  }
}

</style>