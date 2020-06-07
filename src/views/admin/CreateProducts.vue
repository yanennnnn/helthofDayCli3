<template>
  <div>
    <loading :active.sync="isLoading">
      <template slot="default">
          <img src="../../assets/images/juice-icon.png" width="70px">
          <img src="../../assets/images/juice-dribbble.gif" width="100px">
      </template>
    </loading>
    <div class="container">
      <div class="text-right">
        <button class="btn mt-4 btn-primary" @click="openModal(true)">新增產品</button>
      </div>
      <div class=" mt-4 table-responsive-md">
        <table class="table">
          <thead>
            <tr>
                <th scope="col" width="130">區域</th>
                <th scope="col">名稱</th>
                <th scope="col" width="70">原價</th>
                <th scope="col" width="70">售價</th>
                <th scope="col" width="100">是否啟用</th>
                <th width="150"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in products" :key="item.id">
              <td scope="row">
                <small class="rounded p-1" :class="textColor(item.category)">
                  {{ item.category }}
                </small>
              </td>
              <td>{{ item.title }}</td>
              <td>{{ item.origin_price | currency }}</td>
              <td :class="{ 'text-danger':item.origin_price!==item.price }">
                {{ item.price | currency }}
              </td>
              <td><span v-if="item.is_enabled" class="text-success">啟用</span>
                <span v-else >未啟用</span>
              </td>
              <td>
                <button type="button" class="btn btn-primary mr-2"
                  @click.prevent="openModal(false,item)">
                    編輯
                </button>
                <button type="button" class="btn btn-outline-danger"
                  @click.prevent="deleteModal(item)">
                    刪除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="d-flex justify-content-center">
        <Pagination :pageData="pagination" @emitpage="getProducts"></Pagination>
      </div>
    </div>
     <!-- updateModal -->
    <div class="modal fade" id="updateModal" tabindex="-1" role="dialog"
      aria-labelledby="updateModalTitle" aria-hidden="true"
      data-backdrop="static">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title " id="exampleModalLongTitle">新增商品</h5>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                    <label for="image">輸入圖片網址</label>
                    <input type="text" class="form-control" id="image"
                        placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
                </div>
                <div class="form-group">
                  <label for="customFile">或 上傳圖片
                    <font-awesome-icon v-if="status.fileUploading" class="fa-spin"
                      :icon="[ 'fas', 'spinner' ]" />
                  </label>
                  <input type="file" id="customFile" class="form-control p-1"
                    ref="files" @change="uploadFile">
                </div>
                <img class="img-fluid" :src="tempProduct.imageUrl" alt="">
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title"
                    placeholder="請輸入標題" v-model="tempProduct.title">
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input type="text" class="form-control" id="category"
                      placeholder="請輸入分類" v-model="tempProduct.category">
                  </div>
                  <div class="form-group col-md-6">
                      <label for="price">單位</label>
                      <input type="unit" class="form-control" id="unit"
                      placeholder="請輸入單位" v-model="tempProduct.unit">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input type="number" class="form-control" id="origin_price"
                      placeholder="請輸入原價" v-model="tempProduct.origin_price">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input type="number" class="form-control" id="price"
                      placeholder="請輸入售價" v-model="tempProduct.price">
                  </div>
                </div>
                  <hr>
                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea type="text" class="form-control" id="description"
                      placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea type="text" class="form-control" id="content"
                      placeholder="請輸入產品說明內容" v-model="tempProduct.content"></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                      id="is_enabled" v-model="tempProduct.is_enabled"
                      :true-value="1" :false-value="0">
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-muted" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click.prevent="updateProduct">確定</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
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
              <strong class="text-danger">{{ tempProduct.title }}</strong>
            商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-muted" data-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-danger" @click="delProduct">
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
import Pagination from '../../components/Pagination.vue';

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      products: [],
      tempProduct: {},
      status: {
        fileUploading: false,
      },
      pagination: {},
      isLoading: false,
    };
  },
  methods: {
    getProducts(page = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
        vm.isLoading = false;
      });
    },
    textColor(item) {
      let category = '';
      switch (item) {
        case '經典商品':
          category = 'badge-primary';
          break;
        case '活力果汁':
          category = 'badge-middle-green-yellow';
          break;
        case '營養沙拉':
          category = 'badge-secondary';
          break;
        case '酸甜優格':
          category = 'badge-orange';
          break;
        default:
          category = '';
          break;
      }
      return category;
    },
    updateProduct() {
      const vm = this;
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`;
      let httpMethod = 'post';
      let messageSuccess = '新增成功!';
      let messageDanger = '新增失敗!';
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = 'put';
        messageSuccess = '編輯成功!';
        messageDanger = '編輯失敗!';
      }
      this.axios[httpMethod](api, { data: vm.tempProduct }).then((response) => {
        if (response.data.success) {
          $('#updateModal').modal('hide');
          vm.getProducts();
          vm.$store.dispatch('updateMessage', { message: messageSuccess, status: 'success' });
        } else {
          $('#updateModal').modal('hide');
          vm.getProducts();
          vm.$store.dispatch('updateMessage', { message: messageDanger, status: 'danger' });
        }
      });
    },
    uploadFile() {
      const uploadFile = this.$refs.files.files[0];// 取得陣列(照片內容)
      const vm = this;
      const formData = new FormData();// 模擬表單送出
      formData.append('file-to-upload', uploadFile);
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`;
      vm.status.fileUploading = true;
      this.$http.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },

      }).then((response) => {
        vm.status.fileUploading = false;
        if (response.data.success) {
          vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);
        } else {
          vm.$store.dispatch('updateMessage', { message: 'response.data.message', status: 'danger' });
        }
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
        $('#updateModal .modal-title').text('新增商品');
        this.isNew = true;
      } else {
        this.tempProduct = { ...item };
        $('#updateModal .modal-title').text('編輯商品');
        this.isNew = false;
      }
      $('#updateModal').modal('show');
    },
    deleteModal(item) {
      this.tempProduct = item;
      $('#delProductModal').modal('show');
    },
    delProduct() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
      vm.isLoading = true;
      this.$http.delete(url).then(((response) => {
        if (response.data.success) {
          vm.$store.dispatch('updateMessage', { message: '刪除成功', status: 'success' });
          vm.getProducts();
          vm.isLoading = false;
          $('#delProductModal').modal('hide');
        } else {
          vm.$store.dispatch('updateMessage', { message: '刪除失敗，請重新再試', status: 'danger' });
          vm.isLoading = false;
          $('#delProductModal').modal('hide');
        }
      }));
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
