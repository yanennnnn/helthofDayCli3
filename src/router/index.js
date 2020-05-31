// 官方元件
import Vue from 'vue';
import VueRouter from 'vue-router';


Vue.use(VueRouter);// 啟用放入的vue元件


export default new VueRouter({
  routes: [
    {
      path: '*',
      redirect: '/index',
    },
    {
      path: '/',
      redirect: '/index',
      component: () => import('../views/frontend/Layout.vue'),
      children: [
        {
          path: 'index',
          name: 'Home',
          component: () => import('@/views/frontend/Index.vue'),
        },
        {
          name: 'products',
          path: 'products',
          component: () => import('@/views/frontend/Products.vue'),
        },
        {
          name: 'detail',
          path: 'detail/:id',
          component: () => import('@/views/frontend/Detail.vue'),
        },
        {
          name: 'cart',
          path: 'cart',
          component: () => import('@/views/frontend/Cart.vue'),
        },
        {
          path: 'customerOrder',
          name: 'customerOrder',
          component: () => import('@/views/frontend/CustomerOrder.vue'),
        },

      ],
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/frontend/Login.vue'),
    },
    {
      name: 'customerCheckout',
      path: '/customerCheckout/:orderId',
      component: () => import('@/views/frontend/CustomerCheckout.vue'),
    },
    {
      name: 'customerComplete',
      path: '/customerComplete/:orderId',
      component: () => import('@/views/frontend/CustomerComplete.vue'),
    },
    {
      name: 'dashboard',
      path: '/admin',

      component: () => import('@/views/admin/Dashboard.vue'),
      children: [
        {
          name: 'createProducts',
          path: 'createProducts',
          component: () => import('@/views/admin/CreateProducts.vue'),
          meta: { requiresAuth: true },
        },
        {
          name: 'orderLists',
          path: 'orderLists',
          component: () => import('@/views/admin/OrderLists.vue'),
          meta: { requiresAuth: true },
        },
        {
          name: 'createCoupons',
          path: 'createCoupons',
          component: () => import('@/views/admin/CreateCoupons.vue'),
          meta: { requiresAuth: true },
        },
      ],
    },

  ],
});
