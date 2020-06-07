<template>
  <div >
    <loading :active.sync="isLoading">
      <template slot="default">
          <img src="../../assets/images/juice-icon.png" width="70px">
          <img src="../../assets/images/juice-dribbble.gif" width="100px">
      </template>
    </loading>
    <div class="container px-md-5 px-0 cart text-center">
      <h2 class="pt-4">購物車內容</h2>
      <div class="mt-4" v-if="cartlength!==0">
        <table class="table">
          <thead>
            <tr>
              <th scope="col" width="10"></th>
              <th scope="col" class="d-md-block d-none">商品圖片</th>
              <th scope="col">商品名稱</th>
              <th scope="col" width="170" class="d-md-table-cell d-none">數量</th>
              <th scope="col" width="130">金額</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart.carts" :key="item.id">
              <td scope="row" class="align-middle">
                <button class="btn btn-sm btn-outline-danger"
                  @click.prevent="removeCartItem(item.id)">
                  <font-awesome-icon :icon="[ 'far', 'trash-alt' ]"/>
                </button>
              </td>
              <td class="d-md-block d-none text-center">
                  <div class="cart-bg d-inline-block"
                    :style="{ backgroundImage:'url(' + item.product.imageUrl + ')' }"></div>
              </td>
              <td class="align-middle cart-list-product">
                <p>{{ item.product.title }}</p>
                <div class="d-md-none mt-3">
                  <button class="btn btn-outline-primary btn-sm mr-2"
                  @click="changeQty(item.id, item.product.id, item.qty,false)">
                    <font-awesome-icon :icon="[ 'fas', 'minus' ]" />
                  </button>
                  <input type="text" v-model="item.qty" disabled
                    class="form-control border-primary d-inline-block qtySelect">
                  <button class="btn btn-outline-primary btn-sm ml-2"
                  @click="changeQty(item.id, item.product.id, item.qty,true)">
                    <font-awesome-icon :icon="[ 'fas', 'plus' ]" />
                  </button>
                </div>
              </td>
              <td class="align-middle text-nowrap d-md-table-cell d-none">
              <div class="input-group">
                  <button class="btn btn-outline-primary btn-sm mr-2"
                  @click="changeQty(item.id,item.product.id,item.qty,false)">
                    <font-awesome-icon :icon="[ 'fas', 'minus' ]" />
                  </button>
                  <input type="text" class="form-control border-primary qtySelect"
                    v-model="item.qty" disabled>
                  <button class="btn btn-outline-primary btn-sm ml-2"
                  @click="changeQty(item.id,item.product.id,item.qty,true)">
                    <font-awesome-icon :icon="[ 'fas', 'plus' ]" />
                  </button>
                </div>
              </td>
              <td class="align-middle" v-if="cart.total == cart.final_total">
                {{ item.final_total | currency }}
              </td>
              <td class="align-middle" v-else>{{ item.final_total | currency }}
                <div class="text-success" v-if="item.coupon">已套用優惠券</div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr >
              <td colspan="5" class="text-right" v-if="cart.total === cart.final_total">
                小計: <span class="mr-1" >{{ cart.final_total | currency }}</span>
              </td>
              <td colspan="5" class="text-right text-success" v-else>
                小計: <span class="mr-1">{{ cart.final_total | currency }}</span>
              </td>
            </tr>
            <tr>
              <td colspan="5" class="text-right" style="border:none">
                運費:<span class="ml-4 mr-1">$0</span>
              </td>
            </tr>
            <tr>
              <td colspan="5" class="text-right text-danger font-weight-bold">
                總計: <span class="h2">{{ cart.final_total | currency }}</span>
              </td>
            </tr>
          </tfoot>
        </table>
        <div class="input-group mb-3 input-group-md ml-auto couponCode">
          <input type="text" class="form-control "
            v-model="coupon_code" placeholder="請輸入優惠碼" >
          <div class="input-group-append">
            <button class="btn btn-outline-primary" type="button" @click="addCouponCode">
            套用優惠碼
            </button>
          </div>
        </div>
        <div class="text-right">
          <button class="py-2 btn btn-primary m-md-0 mr-2"
            @click="goCheckOrder">確認訂單，前往下一步
            <font-awesome-icon class="text-light" :icon="[ 'fas', 'arrow-right' ]" />
          </button>
        </div>
      </div>
      <div v-else class="mt-4">
        <p style="padding:70px 0 70px 0">尚未有商品，快來去逛逛吧!</p>
        <button class="btn btn-primary py-2" style="width:30%;"
          @click="goProduct">前往商品</button>
        <p class="text-primary font-weight-bold mt-5" style="font-size:39px">為你推薦!</p>
        <hr>
        <productSwiper />
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import { mapActions, mapGetters } from 'vuex';
import productSwiper from '../../components/frontend/ProductSwiper.vue';

export default {
  components: {
    productSwiper,
  },
  data() {
    return {
      coupon_code: '',
    };
  },
  methods: {
    ...mapActions('cartsModules', ['getCart']),
    removeCartItem(id) {
      this.$store.dispatch('cartsModules/removeCartItem', id);
    },
    addCouponCode() {
      const vm = this;
      this.$store.dispatch('cartsModules/addCouponCode', vm.coupon_code);
    },
    changeQty(id, productId, qty, calc) {
      let newQty;
      if (calc === true) {
        newQty = Number(qty + 1);
      } else if (qty === 1) {
        newQty = 1;
      } else {
        newQty = Number(qty - 1);
      }
      this.$store.dispatch('cartsModules/changeQty', { id, productId, newQty });
    },
    goCheckOrder() {
      this.$router.push('/customerOrder');
    },
    goProduct() {
      this.$router.push('/products');
    },
  },
  computed: {
    ...mapGetters(['isLoading']),
    ...mapGetters('cartsModules', ['cart', 'cartlength']),
  },
  created() {
    const vm = this;
    vm.getCart();
    $('html,body').scrollTop(0);
  },
};
</script>
