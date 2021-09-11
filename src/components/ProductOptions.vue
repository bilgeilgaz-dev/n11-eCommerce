<template>
  <div id="product-options-container">
    <div v-for="(att, index) in selectableAttributes" :key="index" class="att-container">
      <span class="att-name">{{ att.name }}</span>
      <div 
        v-for="(value,index) in att.values" 
        :key="index" 
        :class="{'att-value': true, 'disabled-att-value': checkProductAvailability(att, value)}" 
        @click="selectAttribute(att, value)"
      >
        <span :class="{'att-button': true, 'selected-att': checkAttArray(value)}">{{ value }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    productVariants: {
      type: Array,
      default: () => []
    },

    selectableAttributes: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      attArray: [],
      enabledOptions: [],
    }
  },

  methods: {
    selectAttribute(att, value) {
      if(!this.attArray.some(attItem => attItem.name === att.name)){
        this.attArray.push({'name': att.name, 'value':value});
      } else {
        const attIndexToUpdate = this.attArray.findIndex(attItem => attItem.name == att.name);
        this.attArray[attIndexToUpdate].value = value;
      }
      this.$emit('selectAttribute', this.attArray);
      this.generateProductAvailability(att, value)
    },

    checkAttArray(value) {
      return this.attArray.some(att => (att.value === value));
    },

    generateProductAvailability(att, value) {
      if(this.attArray.length === 1) {
        let enabledVariants = [];
        this.productVariants.forEach(productVariant => {
          if(productVariant.attributes.some(attribute => attribute.value === value)) {
            enabledVariants.push(productVariant);
          }
        });
        this.enabledOptions = [];
        enabledVariants.forEach(variant => {
          variant.attributes.filter(varAtt => varAtt.name !== att.name).forEach(varAtt => this.enabledOptions.push({'name': varAtt.name, 'value':varAtt.value}));
        });
      }
    },

    checkProductAvailability(att, value) {
      console.log('att', att);
      console.log('this.enabledOptions', this.enabledOptions);
      return this.enabledOptions.length > 0 && this.enabledOptions[0].name === att.name && !this.enabledOptions.some(option => option.value === value);
    }

  }
}
</script>
<style lang="scss" scoped>
#product-options-container {
  padding: 20px;

  .att-container {
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    .att-name {
      width: 100px;
    }

    .disabled-att-value {
      opacity: 0.5;
      pointer-events: none;
    }

    .att-button {
      border: 1px solid lightgray;
      padding: 5px 15px;
      margin-right: 10px;
      display: flex;
      width: 100px;
      justify-content: center;
      cursor: pointer;
      height: 40px;
    }

    .att-button:hover {
      background-color: #d4d4d4;
    }

    .selected-att {
      border: 2px solid grey;
    }
  }
}
</style>