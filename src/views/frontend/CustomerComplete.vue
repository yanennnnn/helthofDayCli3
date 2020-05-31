<template>
  <div class="customerComplete">
      <div class="container " style="margin:100px auto;">
          <h2 class="text-center mb-4">付款完成</h2>
          <div class="border border-outline-primary rounded ">
            <p class="text-center h5 mt-3">感謝訂購</p>
            <p class="text-center h5">觀迎您再度光臨！</p>
            <div class="my-3">
              <div class="mx-auto" style="width: 280px;">
                <span>訂單完成時間:</span>
                <span class="text-atomic-tangerine">{{ order.paid_date | getTime }}</span>
              </div>
                <div class="mx-auto" style="width: 280px;">
                  <span>訂單編號:</span>
                  <span class="text-atomic-tangerine">{{ orderId }}</span>
              </div>
                <div class="mx-auto" style="width: 280px;">
                  <span>訂單金額:</span>
                  <span class="text-atomic-tangerine">{{ order.total | currency }}</span>
              </div>
            </div>
          <div class="my-3 text-center">
            <span>付款成功後，我們將會盡快出貨給您</span>
            <br>
            <span>如有其它變更需求，請致電客服0800-000-000將有專員為您服務。</span>
          </div>
      </div>
      <div class="text-center mt-3">
        <button class="btn btn-primary " @click="getProducts" style="width:220px"> 繼續選購</button>
      </div>
    </div>
    <Footer/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Footer from '../../components/frontend/Footer.vue';

export default {
  components: {
    Footer,
  },
  data() {
    return {
      // order: {
      //   user: {},
      // },
      orderId: '',
    };
  },
  methods: {
    getOrder() {
      this.$store.dispatch('ordersModules/getOrder', this.orderId);
    },

    getProducts() {
      const vm = this;
      vm.$router.push('/products');
    },
  },
  computed: {
    ...mapGetters('ordersModules', ['order']),
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
  },

};
</script>
