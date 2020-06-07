import axios from 'axios';

export default {
  namespaced: true,
  state: {
    allProducts: [],
    products: [],
    category: 'all',
    pagination: {},
    getCurrentProduct: {},
    slideproducts: [],
  },
  actions: {
    getProducts(context) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      context.commit('LOADING', true, { root: true });
      axios.get(url).then((response) => {
        context.commit('PRODUCTS', response.data.products);
        context.commit('LOADING', false, { root: true });
      });
    },
    getAllProducts(context, page) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
      context.commit('LOADING', true, { root: true });
      axios.get(url).then((response) => {
        context.commit('ALLPRODUCTS', response.data.products);
        context.commit('PAGINATION', response.data.pagination);
        context.commit('LOADING', false, { root: true });
      });
    },
    getPrdouct(context, id) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      context.commit('LOADING', true, { root: true });
      axios.get(url).then((response) => {
        context.commit('GETCURRENTPRODUCT', response.data.product);
        context.commit('LOADING', false, { root: true });
      });
    },
    getSlideProducts(context) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      return new Promise((resolve) => {
        axios.get(url).then((response) => {
          if (response.data.success) {
            context.commit('GETSLIDEPRODUCTS', response.data.products);
            resolve();
          } else {
            context.dispatch('updateMessage', { message: '出現異常，請刷新', status: 'danger' }, { root: true });
          }
        });
      });
    },
  },
  mutations: {
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    ALLPRODUCTS(state, payload) {
      state.allProducts = payload;
    },
    PAGINATION(state, payload) {
      state.pagination = payload;
    },
    CURRENTCATEGOTY(state, payload) {
      state.category = payload;
    },
    GETCURRENTPRODUCT(state, payload) {
      state.getCurrentProduct = payload;
    },
    GETSLIDEPRODUCTS(state, payload) {
      state.slideproducts = payload;
    },
  },
  getters: {
    products: (state) => state.products,
    hotProducts: (state) => state.products.filter((item) => item.category === '經典商品'),
    pagination: (state) => state.pagination,
    category: (state) => state.category,
    activeProducts(state) {
      if (state.category === 'all') {
        return state.allProducts.filter(
          (item) => item.is_enabled === 1,
        );
      }
      return state.products.filter(
        (item) => item.category === state.category && item.is_enabled === 1,
      );
    },
    recommendproduct: (state) => state.recommendproduct,
    getCurrentProduct: (state) => state.getCurrentProduct,
    slideproducts: (state) => state.slideproducts,
  },
};
