import axios from 'axios';

export default {
  namespaced: true,
  state: {
    cart: {},
    cartlength: 0,
  },
  actions: {
    getCart(context) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      context.commit('LOADING', true, { root: true });
      axios.get(url).then((response) => {
        // vm.cart = response.data.data;
        context.commit('CART', response.data.data);
        context.commit('LOADING', false, { root: true });
      });
    },
    addToCart(context, { id, qty }) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      context.commit('LOADING', true, { root: true });
      const cart = {
        product_id: id,
        qty,
      };
      axios.post(url, { data: cart }).then((response) => {
        if (response.data.success) {
          context.dispatch('updateMessage', { message: '已加入購物車', status: 'success' }, { root: true });
          context.dispatch('getCart');
          context.commit('LOADING', false, { root: true });
        } else {
          context.dispatch('updateMessage', { message: response.data.message, status: 'danger' }, { root: true });
          context.commit('LOADING', false, { root: true });
        }
      });
    },
    updateCartProductQty(context, { originCartId, originProductId, newQty }) {
      const delUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${originCartId}`;
      const addUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      context.commit('LOADING', true, { root: true });
      const cart = {
        product_id: originProductId,
        qty: newQty,
      };
      axios
        .all([axios.delete(delUrl), axios.post(addUrl, { data: cart })])
        .then(axios.spread(() => {
          context.dispatch('getCart');
          context.commit('LOADING', false, { root: true });
        }));
    },
    removeCartItem(context, id) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      context.commit('LOADING', true, { root: true });
      axios.delete(url).then((response) => {
        if (response.data.success) {
          context.dispatch('updateMessage', { message: '商品成功刪除', status: 'success' }, { root: true });
          context.dispatch('getCart');
          context.commit('LOADING', false, { root: true });
        } else {
          context.dispatch('updateMessage', { message: response.data.message, status: 'danger' }, { root: true });
          context.commit('LOADING', false, { root: true });
        }
      });
    },
    changeQty(context, { id, productId, newQty }) {
      const delUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      const addUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      context.commit('LOADING', true, { root: true });
      const cart = {
        product_id: productId,
        qty: newQty,
      };
      axios
        .all([axios.delete(delUrl), axios.post(addUrl, { data: cart })])
        .then(axios.spread(() => {
          context.dispatch('getCart');
          context.commit('LOADING', false, { root: true });
        }));
    },
    addCouponCode(context, couponCode) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const coupon = {
        code: couponCode,
      };
      context.commit('LOADING', true, { root: true });
      axios.post(url, { data: coupon }).then((response) => {
        if (response.data.success) {
          context.dispatch('updateMessage', { message: '優惠卷套用成功', status: 'success' }, { root: true });
          context.dispatch('getCart');
          context.commit('LOADING', false, { root: true });
        } else {
          context.dispatch('updateMessage', { message: '出現錯誤', status: 'danger' }, { root: true });
          context.commit('LOADING', false, { root: true });
        }
      });
    },
  },
  mutations: {
    CART(state, payload) {
      state.cart = payload;
      state.cartlength = payload.carts.length;
    },
  },
  getters: {
    cart: (state) => state.cart,
    cartlength: (state) => state.cartlength,
  },
};
