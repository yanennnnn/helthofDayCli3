import axios from 'axios';
import router from '../router';

export default {
  namespaced: true,
  state: {
    order: {
      user: {},
    },
  },
  actions: {
    createOrder(context, order) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      context.commit('LOADING', true, { root: true });
      axios.post(url, { data: order }).then((response) => {
        if (response.data.success) {
          // context.dispatch('getCart');
          router.push(`/customerCheckout/${response.data.orderId}`);
          context.commit('LOADING', false, { root: true });
        } else {
          context.dispatch('updateMessage', { message: '出現錯誤，請重新再試', status: 'danger' }, { root: true });
          context.commit('LOADING', false, { root: true });
        }
      });
    },
    getOrder(context, orderId) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${orderId}`;
      axios.get(url).then((response) => {
        if (response.data.success) {
          context.commit('GETORDER', response.data.order);
          // vm.order = response.data.order;
        }
      });
    },
    payOrder(context, orderId) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${orderId}`;
      axios.post(url).then((response) => {
        if (response.data.success) {
          router.push(`/customerComplete/${orderId}`);
        } else {
          context.dispatch('updateMessage', { message: '付款失敗，請重新再試', status: 'danger' }, { root: true });
        }
      });
    },
  },
  mutations: {
    GETORDER(state, payload) {
      state.order = payload;
    },
  },
  getters: {
    order: (state) => state.order,
  },

};
