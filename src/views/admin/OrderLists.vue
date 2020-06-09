<template>
  <div>
    <loading :active.sync="isLoading">
      <template slot="default">
        <img src="../../assets/images/juice-icon.png" width="70px">
        <img src="../../assets/images/juice-dribbble.gif" width="100px">
      </template>
    </loading>
    <div class="container">
      <div class="mt-5">
        <table class="table">
          <thead>
            <tr>
              <th scope="col" >購買時間</th>
              <th scope="col" >收件姓名</th>
              <th scope="col">電話</th>
              <th scope="col" >應付金額</th>
              <th scope="col">是否匯款</th>
              <th scope="col" width="150"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in orders" :key="item.id">
              <td scope="row">{{ item.create_at | getTime }}</td>
              <td>{{ item.user.name }}</td>
              <td>{{ item.user.tel }}</td>
              <td>{{ item.total | currency }}</td>
              <td>
                <span v-if="item.is_paid" class="text-success">已付款</span>
                <span v-else class="text-danger">未付款</span>
              </td>
              <td >
                <button type="button" class="btn btn-primary mr-2"
                  @click.prevent="checkModal(item)">
                      查看
                </button>
                <button type="button" class="btn btn-outline-middle-green-yellow"
                  @click.prevent="updateModal(item)">
                    編輯
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="d-flex justify-content-center">
        <Pagination :pageData="pagination" @emitpage="getOrders"></Pagination>
      </div>
    </div>
    <div class="modal fade" id="checkModal" tabindex="-1" role="dialog"
        aria-labelledby="checkModlTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="checkModalLongTitle">個人訂單列表</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" v-if="tempOrder.user">
            <div class="mt-1">
              <span>訂單時間 :</span>
              <span>{{ tempOrder.create_at | getTime }}</span>
            </div>
            <div class="mt-1">
              <span>收件人姓名 :</span>
              <span>{{ tempOrder.user.name }}</span>
            </div>
            <div class="mt-1">
              <span>電話 :</span>
              <span>{{ tempOrder.user.tel }}</span>
            </div>
            <div class="mt-1">
              <span>信箱 :</span>
              <span>{{ tempOrder.user.email }}</span>
            </div>
            <div class="mt-1">
              <span>地址 :</span>
              <span>{{ tempOrder.user.address }}</span>
            </div>
            <div class="mt-1">
              <span>總金額 :</span>
              <span>{{ tempOrder.total | currency }}</span>
            </div>
            <div class="mt-1">
              <span>是否付款 :</span>
              <span v-if="tempOrder.is_paid" class="text-primary">已付款</span>
              <span v-else class="text-danger">未付款</span>
            </div>
            <div class="mt-1">
              <span>備註 :</span>
              <span>{{ tempOrder.message }}</span>
            </div>
            <div class="mt-3">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">商品名稱</th>
                    <th scope="col">數量</th>
                </tr>
                </thead>
                <tbody>
                  <tr v-for="(product,i) in tempOrder.products" :key="i">
                    <td>{{ product.product.title }}</td>
                    <td>{{ product.qty }} / {{ product.product.unit }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
      <!-- updateModal -->
    <div class="modal fade" id="updateModal" tabindex="-1" role="dialog"
        aria-labelledby="updateModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-middle-green-yellow ">
            <h5 class="modal-title" id="updateModalLongTitle">編輯訂單資料</h5>
            <button type="button" class="close " data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" v-if="tempOrder.user">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="name">收件人姓名</label>
                <input type="text" class="form-control" id="name"
                  placeholder="請輸入收件人姓名" v-model="tempOrder.user.name">
              </div>
              <div class="form-group col-md-6">
                <label for="tel">電話</label>
                <input type="text" onkeyup="value=value.replace(/[^0-9]/g,'')"
                  class="form-control" id="tel"
                  placeholder="請輸入電話" v-model="tempOrder.user.tel">
              </div>
            </div>
            <div class="form-group">
              <label for="email">信箱</label>
              <input type="text" class="form-control" id="email"
                placeholder="請輸入信箱" v-model="tempOrder.user.email">
            </div>
            <div class="form-group">
              <label for="address">地址</label>
              <input type="text" class="form-control" id="address"
                placeholder="請輸入地址" v-model="tempOrder.user.address">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-muted"
              data-dismiss="modal">
                  取消
            </button>
            <button type="button" class="btn btn-primary"
              @click.prevent="updateOrder">
                  確定
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
import Pagination from '../../components/Pagination.vue';

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      orders: [],
      tempOrder: {},
      pagination: {},
      isLoading: false,
    };
  },
  methods: {
    getOrders(page = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`;
      vm.isLoading = true;
      vm.$http.get(url).then((response) => {
        vm.orders = response.data.orders;
        vm.pagination = response.data.pagination;
        vm.isLoading = false;
      });
    },
    updateModal(item) {
      this.tempOrder = item;
      $('#updateModal').modal('show');
    },
    checkModal(item) {
      this.tempOrder = item;
      $('#checkModal').modal('show');
    },
    updateOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/order/${vm.tempOrder.id}`;
      vm.$http.put(url, { data: vm.tempOrder }).then((response) => {
        if (response.data.success) {
          $('#updateModal').modal('hide');
          vm.$store.dispatch('updateMessage', { message: '更新成功', status: 'success' });
          vm.getOrders();
        } else {
          vm.$store.dispatch('updateMessage', { message: '更新失敗，請重新再試', status: 'danger' });
        }
      });
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
