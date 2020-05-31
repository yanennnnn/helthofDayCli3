
import Vue from 'vue';
import Vuex from 'vuex';
import productsModules from './products';
import cartsModules from './carts';
import ordersModules from './orders';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    messages: [],
  },
  actions: {
    updateMessage(context, { message, status }) {
      const timestamp = Math.floor(new Date() / 1000);
      context.commit('UPDATEMESSAGE', { timestamp, message, status });
      context.dispatch('removeMessageWithTiming', timestamp);
      // this.removeMessageWithTiming(timestamp);
    },
    removeMessageWithTiming(context, timestamp) {
      setTimeout(() => {
        context.commit('REMOVEMESSAGEWITHTIMING', timestamp);
      }, 3000);
    },
  },
  mutations: {
    UPDATEMESSAGE(state, payload) {
      state.messages.push(payload);
    },
    REMOVEMESSAGE(state, payload) {
      state.messages.splice(payload, 1);
    },
    REMOVEMESSAGEWITHTIMING(state, payload) {
      state.messages.forEach((item, i) => {
        if (item.timestamp === payload) {
          state.messages.splice(i, 1);
        }
      });
    },
    LOADING(state, status) {
      state.isLoading = status;
    },
  },
  getters: {
    isLoading: (state) => state.isLoading,
    messages: (state) => state.messages,
  },
  modules: {
    productsModules,
    cartsModules,
    ordersModules,
  },
});
