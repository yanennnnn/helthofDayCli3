<template>
  <div>
    <loading :active.sync="isLoading">
      <template slot="default">
        <img src="../../assets/images/juice-icon.png" width="70px">
        <img src="../../assets/images/juice-dribbble.gif" width="100px">
      </template>
    </loading>
    <div class="container ">
      <div class="text-right">
        <button class="btn my-4 btn-primary " @click="openModal(true)">新增優惠碼</button>
      </div>
    <table class="table">
          <thead>
            <tr>
              <th scope="col" width="120">名稱</th>
              <th scope="col">優惠碼</th>
              <th scope="col" width="130">到期日</th>
              <th scope="col" width="80">折扣</th>
              <th scope="col" width="100">是否啟用</th>
              <th scope="col" width="150"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in coupons" :key="item.id">
              <td scope="row">{{item.title}}</td>
              <td>{{item.code}}</td>
              <td>{{item.due_date}}</td>
              <td>{{ item.percent}} %</td>
              <td>
                  <span v-if="item.is_enabled" class="text-success">啟用</span>
                  <span v-else >未啟用</span>
              </td>
              <td >
                  <button type="button" class="btn btn-primary mr-2"
                    @click="openModal(false,item)" >
                      編輯
                  </button>
                  <button type="button" class="btn btn-outline-danger"
                    @click="deleteModal(item)">
                      刪除
                  </button>
              </td>
            </tr>
            </tbody>
        </table>
    </div>
    <!--updateModal-->
    <div class="modal fade" id="CouponcodeModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content border-0">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                    <span>新增優惠碼</span>
                    </h5>
                    <button type="button" class="close text-white"
                      data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label for="title">標題</label>
                                <input type="text" class="form-control" id="title"
                                    placeholder="請輸入標題" v-model="tempCouponcode.title">
                            </div>
                            <div class="form-group ">
                                <label for="code">優惠碼</label>
                                <input type="text" class="form-control" id="code"
                                    placeholder="請輸入優惠碼" v-model="tempCouponcode.code">
                            </div>
                            <div class="form-group ">
                                <label for="date">到期日</label>
                                <input type="date" class="form-control" id="date"
                                    placeholder="請輸入到期日"  v-model="tempCouponcode.due_date">
                            </div>

                            <div class="form-group">
                                <label for="percent">折扣百分比</label>
                                <input type="num" class="form-control" id="percent"
                                    placeholder="請輸入折扣百分比"
                                    v-model="tempCouponcode.percent"
                                    onkeyup="value=value.replace(/[^0-9]/g,'')">
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox"
                                    id="is_enabled" v-model="tempCouponcode.is_enabled"
                                    :true-value="1" :false-value="0">
                                <label class="form-check-label" for="is_enabled">
                                    是否啟用
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-muted"
                      data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary"
                      @click="updateCouponcode">確認</button>
                </div>
            </div>
        </div>
    </div>
    <!--delCouponcodeModel-->
    <div class="modal fade" id="delCouponcodeModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content border-0">
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                    <span>刪除產品</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    是否刪除
                    <strong class="text-danger">{{tempCouponcode.title}}</strong>
                    商品(刪除後將無法恢復)。
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-muted" data-dismiss="modal">
                       取消
                    </button>
                    <button type="button" class="btn btn-danger" @click="delCouponcode">
                       確認刪除
                    </button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';

export default {
  data() {
    return {
      isLoading: false,
      coupons: [],
      tempCouponcode: {},
      isNew: false,
    };
  },
  methods: {
    getCoupons() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons`;
      vm.isLoading = true;
      vm.$http.get(api).then((response) => {
        vm.coupons = response.data.coupons;
        vm.isLoading = false;
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempCouponcode = {};
        this.isNew = true;
        $('#CouponcodeModal .modal-title').text('新增優惠碼');
      } else {
        this.tempCouponcode = { ...item };
        this.isNew = false;
        $('#CouponcodeModal .modal-title').text('編輯優惠碼');
      }
      $('#CouponcodeModal').modal('show');
    },
    updateCouponcode() {
      const vm = this;
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
      let httpMethod = 'post';
      let messageSuccess = '新增成功!';
      let messageDanger = '新增失敗!';
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCouponcode.id}`;
        httpMethod = 'put';
        messageSuccess = '編輯成功!';
        messageDanger = '編輯失敗!';
      }
      vm.axios[httpMethod](api, { data: vm.tempCouponcode }).then((response) => {
        if (response.data.success) {
          $('#CouponcodeModal').modal('hide');
          vm.getCoupons();
          vm.$bus.$emit('message:push', messageSuccess, 'success');
        } else {
          $('#CouponcodeModal').modal('hide');
          vm.getCoupons();
          vm.$bus.$emit('message:push', messageDanger, 'danger');
        }
      });
    },
    deleteModal(item) {
      this.tempCouponcode = item;
      $('#delCouponcodeModal').modal('show');
    },
    delCouponcode() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCouponcode.id}`;
      vm.$http.delete(api).then((response) => {
        if (response.data.success) {
          $('#delCouponcodeModal').modal('hide');
          vm.getCoupons();
          vm.$bus.$emit('message:push', '刪除成功', 'success');
        } else {
          $('#delCouponcodeModal').modal('hide');
          vm.getCoupons();
          vm.$bus.$emit('message:push', '出現錯誤!', 'danger');
        }
      });
    },

  },
  created() {
    this.getCoupons();
  },
};
</script>
