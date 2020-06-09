<template>
  <div class="container customerOrder">
    <loading :active.sync="isLoading">
      <template slot="default">
        <img src="../../assets/images/juice-icon.png" width="70px">
        <img src="../../assets/images/juice-dribbble.gif" width="100px">
      </template>
    </loading>
    <h2 class="pt-5 text-center">訂購資料</h2>
    <div class=" border-primary row justify-content-center">
      <div class="col-md-5 col-10 order-md-2 order-0">
        <div class="customerOrder-cart">
          <p class="h5 my-3 ml-2 pt-3">訂單明細</p>
          <div>
            <table class="table">
              <tbody>
                <tr v-for="item in cart.carts" :key="item.id">
                  <th scope="row" class="align-middle d-sm-table-cell d-none" width="20">
                    <div  class="customerOrder-cart-bg d-inline-block"
                      :style="{ backgroundImage: 'url(' + item.product.imageUrl + ')' }">
                    </div>
                  </th>
                  <td class="align-middle" style="width:auto">
                      <span>{{ item.product.title }}</span>
                      <br>
                      <span class="text-muted">x {{ item.qty }}</span>
                  </td>
                  <td class="align-middle" width="20">{{ item.final_total | currency }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                    <td colspan="3" class="text-right p-0 pr-2 pb-2" style="border:none">
                      運費:<span class="ml-4 mr-1">$0</span></td>
                </tr>
                <tr>
                  <td colspan="3"
                    class="text-right bg-primary text-light font-weight-bold p-0 p-1"
                    style="border:none">總計:
                    <span class="pr-2" style="font-size:39px">
                      {{ cart.final_total | currency }}
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      <div class="col-md-7 col-11">
        <div class="mt-3">
          <form  @submit.prevent="createOrder">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="userName">收件人姓名*</label>
                <input type="text" class="form-control" id="userName" name="name"
                  placeholder="請輸入姓名" v-model="form.user.name"
                  :class="{'is-invalid': errors.has('name')}" v-validate="'required'">
                <small class="text-danger" v-if="errors.has('name')">姓名不得為空</small>
              </div>
              <div class="form-group col-md-6">
                <label for="userTel">手機號碼*</label>
                <input type="text" class="form-control" id="userTel" name="tel"
                  placeholder="請輸入手機號碼" v-model="form.user.tel"
                  :class="{'is-invalid': errors.has('tel')}" v-validate="'required'"
                  onkeyup="value=value.replace(/[^0-9]/g,'')">
                <small class="text-danger" v-if="errors.has('tel')">手機號碼不得為空</small>
              </div>
            </div>
            <div class="form-group">
                <label for="userEmail">信箱*</label>
                <input type="email" class="form-control" id="userEmail" name="email"
                  placeholder="請輸入信箱" v-model="form.user.email"
                  :class="{ 'is-invalid': errors.has('email') }"
                  v-validate="'required|email'">
                <small class="text-danger" v-if="errors.has('email')">
                  {{ errors.first('email') }}
                </small>
            </div>
            <div class="form-group">
                <label for="userAddress">地址*</label>
                <input type="text" class="form-control" id="userAddress" name="address"
                  placeholder="請輸入地址" v-model="form.user.address"
                  :class="{ 'is-invalid': errors.has('address') }"
                  v-validate="'required'">
                <small class="text-danger" v-if="errors.has('address')">地址不得為空</small>
            </div>
            <div class="form-group">
                <label for="userTextarea">留言備註</label>
                <textarea class="form-control" id="userTextarea" rows="3"
                  v-model="form.message">
                </textarea>
            </div>
            <div class="d-flex justify-content-center mt-5">
              <button type="submit" class="py-2 btn btn-primary mx-2 d-block"
                style="width:250px">確認送出
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- modal -->
    <div class="modal fade" id="CreateOrder" tabindex="-1" role="dialog"
        aria-labelledby="CreateOrderCenterTitle"
        aria-hidden="true"
        data-backdrop="static">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body leave-modal">
            <p>您的訂單資料尚未送出，確定要離開此頁?</p>
            <div class="text-right">
              <button type="button" class="mr-2 cancel" data-dismiss="modal">取消</button>
              <button type="button" class="confirm" data-dismiss="modal">確定</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      form: {
        user: {
          name: '',
          tel: '',
          email: '',
          address: '',
        },
        message: '',
      },
      leave: false,
    };
  },
  methods: {
    ...mapActions('cartsModules', ['getCart']),
    createOrder() {
      const vm = this;
      const order = vm.form;
      vm.$validator.validate().then((result) => { // 防止沒有驗證也能送出表單
        if (result) {
          vm.$store.dispatch('ordersModules/createOrder', order).then(() => {
            vm.leave = true;
          });
        } else {
          vm.$store.commit('LOADING', false, { root: true });
        }
      });
    },
  },
  computed: {
    ...mapGetters(['isLoading']),
    ...mapGetters('cartsModules', ['cart']),
  },
  created() {
    this.getCart();
  },
  beforeRouteLeave(to, from, next) {
    const vm = this;
    if (vm.leave) {
      next();
    } else {
      $('#CreateOrder').modal('show');
      $('.confirm').on('click', () => {
        next();
      });
      $('.cancel').on('click', () => {
        next(false);
      });
    }
  },
};
</script>
<style scoped lang="scss">
  .customerOrder{
    height: 100vh;
    margin-top:100px;
    &-cart{
      margin-top:20px;
      border-top: thick double;
      box-shadow: 0 0 10px #ccc;
    }
    &-cart-bg{
      margin-left: 15px;
      width: 40px;
      height: 45px;
      background-size: cover;
      background-position: center center;
    }
  }
</style>
