<template>
 <div>
   <div class="container customerCheckout">
     <h2 class="mt-5 text-center">訂單付款</h2>
     <form @submit.prevent="payOrder">
        <div class="row mt-3">
            <div class="col-lg-7 col-md-9 col-12 mx-auto  ">
                <div class="border border-primary rounded">
                    <h3 class=" bg-primary m-0 px-4  py-2 text-light">訂購資料</h3>
                    <table class="table " @submit.prevent="payOrder">
                        <tbody>
                          <tr>
                            <th class=" align-middle p-0 pl-2 py-3" width="120">訂單編號:</th>
                            <td class=" align-middle ">{{orderId}}</td>
                          </tr>
                          <tr>
                            <th class=" align-middle p-0 pl-2 py-3" width="120">總金額:</th>
                            <td class="text-danger align-middle">{{order.total | currency}}</td>
                          </tr>
                          <tr>
                            <th class=" align-middle p-0 pl-2 py-3" width="120">收件人姓名:</th>
                            <td  class=" align-middle ">{{order.user.name}}</td>
                          </tr>
                          <tr>
                            <th class=" align-middle p-0 pl-2 py-3" width="120">信箱</th>
                            <td  class=" align-middle ">{{order.user.email}}</td>
                          </tr>
                          <tr>
                            <th  class=" align-middle p-0 pl-2 py-3" width="120">收件人電話:</th>
                            <td  class=" align-middle ">{{order.user.tel}}</td>
                          </tr>
                          <tr>
                            <th  class=" align-middle p-0 pl-2 py-3" width="120">收件人地址:</th>
                            <td  class=" align-middle ">{{order.user.address}}</td>
                            </tr>
                          <tr>
                            <th  class=" align-middle p-0 pl-2 py-3" width="120">留言備註:</th>
                            <td  class=" align-middle ">{{order.message}}</td>
                          </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-lg-7 col-md-9 col-12 mx-auto mt-3">
                <div class="accordion " id="accordionExample">
                    <div class="card bg-beige">
                        <div class=" px-4  py-1 bg-secondary" id="headingOne">
                        <h3 class="mb-0 ">
                            <button class="btn btn-link text-decoration-none font-weight-bold"
                              type="button" data-toggle="collapse"
                              data-target="#collapseOne"
                              aria-expanded="true" aria-controls="collapseOne"
                              style="font-size:20px">
                                  匯款資訊(請點此)
                                  <font-awesome-icon class="mr-1  fa-lg align-top"
                                      :icon="[ 'fas', 'sort-down' ]" />
                            </button>
                        </h3>
                        </div>

                        <div id="collapseOne" class="collapse fade"
                          aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div>
                              <table class="table table-borderless">
                                <tbody>
                                  <tr>
                                      <th class="align-middle p-0 pl-2 py-3" width="120">
                                          銀行名稱:
                                      </th>
                                      <td class="align-middle ">台灣銀行</td>
                                  </tr>
                                  <tr>
                                      <th class="align-middle p-0 pl-2 py-3" width="120">
                                        代號:
                                      </th>
                                      <td class="align-middle ">004</td>
                                  </tr>
                                  <tr>
                                      <th class="align-middle p-0 pl-2 py-3" width="120">
                                        銀行帳號:
                                      </th>
                                      <td class="align-middle ">1223080287002961</td>
                                  </tr>
                                  <tr>
                                      <th class="align-middle p-0 pl-2 py-3" width="120">
                                          銀行帳戶名稱:
                                      </th>
                                      <td class="align-middle ">快樂萌蔬股份有限公司</td>
                                  </tr>
                                </tbody>
                              </table>
                                <p class="pl-2 text-danger">
                                    *匯款時請備註
                                    <span class="font-weight-bold">收件人姓名</span>
                                    以方便查詢*
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
        </div>
        <div class="text-center mt-3 mb-5">
            <button class="py-2 btn btn-primary" type="submit" style="width:220px" >
                確認付款
            </button>
        </div>
      </form>
    </div>
    <Footer/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Footer from '../../components/frontend/Footer.vue';

export default {
  name: 'customerCheckout',
  components: {
    Footer,
  },
  data() {
    return {
      orderId: '',
    };
  },
  methods: {
    getOrder() {
      this.$store.dispatch('ordersModules/getOrder', this.orderId);
    },
    payOrder() {
      this.$store.dispatch('ordersModules/payOrder', this.orderId);
    },
  },
  computed: {
    ...mapGetters(['isLoading']),
    ...mapGetters('ordersModules', ['order']),
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
  },
};
</script>
