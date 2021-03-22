export default {
  namespaced: true,
  state: {
    listCarts: [],
    totalPrice: 0,
    tempCart: []
  },
  mutations: {
    ADD(state, item) {
      state.listCarts.push(item);
    },
    REPLACE(state, newList) {
      state.listCarts = newList;
    },
    SET_TOTAL_PRICE(state, price) {
      state.totalPrice = price;
    },
    ADD_TEMP(state, item) {
      state.tempCart.push(item);
    },
    REPLACE_TEMP(state, newList) {
      state.tempCart = newList;
    }
  }
};
