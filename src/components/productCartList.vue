<template>
  <div>
    <v-card elevation="0">
      <v-row class="mx-1 mt-3">
        <v-checkbox
          v-model="checkedVal"
          color="#a6cb26"
          :true-value="listCart.id"
          :value="listCart.id"
          :false-value="`false:${listCart.id}`"
          @change="getCheckedValue($event, listCart.hargaBaru)"
        ></v-checkbox>
        <div>
          <v-card-title class="title font-weight-medium text-subtitle-1">
            {{ listCart.productName }}
          </v-card-title>
          <v-card-subtitle class="black--text text-subtitle-2">
            {{ parseRupiah(listCart.hargaBaru) }}
          </v-card-subtitle>
        </div>
        <v-spacer></v-spacer>
        <div class="d-flex justify-center text-center align-center">
          <v-btn
            elevation="0"
            fab
            x-small
            dark
            color="#A6CB26"
            @click="minQty(listCart.id, listCart.hargaBaru)"
          >
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          <div class="itemQty d-flex justify-center align-center">
            {{ getQtyById(listCart.id) }}
          </div>
          <v-btn
            elevation="0"
            fab
            x-small
            dark
            color="#A6CB26"
            @click="addQty(listCart.id, 10, listCart.hargaBaru)"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["listCart"],
  data() {
    return {
      checkedVal: ""
    };
  },
  methods: {
    parseRupiah(strMoney) {
      return parseInt(strMoney).toLocaleString("id", {
        style: "currency",
        currency: "IDR"
      });
    },
    addQty(idx, stock, harga) {
      const state = this.$store.state.cart.listCarts;
      state.forEach(item => {
        if (item.id == idx) {
          console.log(item);
          if (item.qty < stock) {
            const newQty = item.qty + 1;
            this.$set(item, "qty", newQty);
          }
        }
      });
      this.$store.commit("cart/REPLACE", state);
      this.calculatePrice(harga);
    },
    minQty(idx, harga) {
      let state = this.$store.state.cart.listCarts;
      state.forEach(item => {
        if (item.id == idx) {
          if (item.qty > 1) {
            const newQty = item.qty - 1;
            this.$set(item, "qty", newQty);
          } else {
            this.$set(item, "qty", 0);

            this.isBtnBeliClicked = false;
          }
        }
      });

      const existingItem = state.find(item => {
        return item.id == idx && item.qty == 0;
      });

      if (existingItem) {
        const newItemQty = state.filter(item => {
          return item.id !== idx;
        });
        state = newItemQty;
      }

      this.$store.commit("cart/REPLACE", state);
      this.calculatePrice(harga);
    },
    calculatePrice(harga) {
      let totalPrice = 0;
      const state = this.$store.state.cart.listCarts;
      state.forEach(item => {
        totalPrice += item.qty * harga;
      });

      this.$store.commit("cart/SET_TOTAL_PRICE", totalPrice);

      // console.log(`@price-itemQty: ${JSON.stringify(state)}`);
      // console.log(`total: ${totalPrice}`);

      this.$emit("getTotalPrice", this.$store.state.cart.totalPrice);
    },
    getQtyById(idx) {
      const state = this.$store.state.cart.listCarts;
      const item = state.find(item => {
        return item.id == idx;
      });
      if (item) return item.qty;
    },
    getCheckedValue(val, harga) {
      const isUnChecked = this.checkedVal.toString().includes(":");

      if (!isUnChecked) {
        const found = this.$store.state.cart.tempCart.find(item => {
          val == item;
        });
        if (!found) {
          this.$store.commit("cart/ADD_TEMP", val);
        }
      } else {
        const id = this.checkedVal.toString().split(":")[1];

        const newCart = this.$store.state.cart.tempCart.filter(item => {
          return item != id;
        });

        this.$store.commit("cart/REPLACE_TEMP", newCart);
      }
      // const state = this.$store.state.cart.tempCart;
      // console.log(`state: ${state}`);
      this.changeListCartState(harga);
    },
    changeListCartState(harga) {
      const temp = this.$store.state.cart.tempCart;
      // let tempListCart = [];

      // if (!temp.length) {
      const state = this.$store.state.cart.listCarts;
      const tempListCart = state.filter(item => {
        return temp.includes(item.id);
      });
      // console.log(tempListCart);
      // }

      let totalPrice = 0;

      tempListCart.forEach(item => {
        totalPrice += item.qty * harga;
      });

      console.log(totalPrice);

      this.$store.commit("cart/SET_TOTAL_PRICE", totalPrice);

      this.$emit("getTotalPrice", this.$store.state.cart.totalPrice);
    }
  }
};
</script>

<style scoped>
.itemQty {
  width: 45px;
}
.title {
  color: #54595f;
}
</style>
