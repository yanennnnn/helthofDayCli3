<template>
  <div>
    <loading :active.sync="isLoading">
      <template slot="default">
        <img src="../../assets/images/juice-icon.png" width="70px">
        <img src="../../assets/images/juice-dribbble.gif" width="100px">
      </template>
    </loading>
    <div class="container py-3 detail">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb bg-white">
          <li class="breadcrumb-item">
            <router-link to="/index" class="text-maple">首頁</router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link to="/products" class="text-maple">所有產品</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            <span>{{getCurrentProduct.title}}</span>
          </li>
        </ol>
      </nav>
      <div class="row">
        <div class="col-md-6 col-12 m-auto m-lg-0">
          <div class="item-img "
            :style="{ backgroundImage:`url(${getCurrentProduct.imageUrl})` }"></div>
        </div>
        <div class="detail-info col-md-6 col-12">
          <h2 class="detail-info-title text-primary font-weight-bold ">
              {{ getCurrentProduct.title }}
          </h2>
          <div class=" border rounded border-middle-green-yellow p-2 mt-3">
            <p class="text-muted ml-1">產品原料 : {{getCurrentProduct.description}}</p>
            <div class="detail-info-price ml-1"
              v-if="getCurrentProduct.price===getCurrentProduct.origin_price">
                <span >{{getCurrentProduct.price | currency}}</span>
            </div>
            <div class="detail-info-price ml-1" v-else>
              <span class="text-danger">{{ getCurrentProduct.price | currency }}</span>
              <span class="ml-2"
                style="font-style:oblique;text-decoration:line-through">
                  {{ getCurrentProduct.origin_price | currency }}
              </span>
            </div>
            <p class="mt-4 mr-0">{{ getCurrentProduct.content }}</p>
            <select class="form-control mt-3" id="NumSelect" v-model="counts">
              <option :value="counts"
                v-for="counts in 10"
                :key="counts">
                  總共: {{ counts }} {{ getCurrentProduct.unit }}
              </option>
            </select>
            <p class="text-right mt-1 text-danger mt-3">
              小計:
              <strong>
                {{ counts * getCurrentProduct.price | currency }}
              </strong>
            </p>
            <button class="btn btn-primary w-100 mt-3"
              @click.prevent="addtoCart(getCurrentProduct.id,counts)">
                加入購物車
            </button>
          </div>
          <div class="mt-3" v-if="getCurrentProduct.category === '經典商品'">
            <hr>
            <h3 class="text-center">{{ getCurrentProduct.category }}</h3>
            <hr>
            <p>
              選為我們的經典商品皆是我們主打推薦，
              使用7749天改良而成，而且也透過各大地方人們親自體驗後而選出的產品，
              還不知道要選什麼就選我們的推薦品吧！
              保證讓您讚不絕口
            </p>
          </div>
          <div class="mt-3" v-else-if="getCurrentProduct.category === '活力果汁'">
              <hr>
              <h3 class="text-center">{{ getCurrentProduct.category }}</h3>
              <hr>
              <p>
                我們用心選擇蔬果，每一個都經過挑選處理，
                製作過程依然保留原有的營養，
                保證原汁原味不添加人工添加物也不偷工減料，
                每個果汁所含的蔬果都是精心搭配不違和，
                讓您喝起來也無負擔！
              </p>
          </div>
          <div class="mt-3" v-else-if="getCurrentProduct.category === '營養沙拉'">
              <hr>
              <h3 class="text-center">{{ getCurrentProduct.category }}</h3>
              <hr>
              <p>
                生菜未經烹調，
                可保留維生素C、食物酵素和其他較易被高溫破壞的營養素；
                輕鬆補足日常攝取不足的蔬菜，蔬菜富含膳食纖維，
                膳食纖維可以促進腸道蠕動、增加飽足感，
                多吃蔬菜也可以幫助排便順暢！
              </p>
          </div>
          <div class="mt-3" v-else-if="getCurrentProduct.category === '酸甜優格'">
              <hr>
              <h3 class="text-center">{{ getCurrentProduct.category }}</h3>
              <hr>
              <p>
                優格因鮮乳經均質與乳酸菌發酵，脂肪更柔細，
                有利腸道吸收，豐富的維生素B群、微量的不飽和脂肪酸等，
                營養價值優於鮮乳。除此之外，搭配新鮮水果、果漿、堅果等食用，
                營養完整又具飽足感。
              </p>
          </div>
        </div>
      </div>
      <section>
        <div class="conatiner my-4">
          <hr>
          <div class="mt-4 detail-notice">
            <h3 class="text-center text-primary font-weight-bold">購物須知</h3>
            <p class="detail-notice-p">保存期限</p>
            <ul >
              <li>由於本公司產品為新鮮農產品，故收到貨後，請於內嚐鮮其食用完畢。</li>
              <li>若未立即食用，請放置於冷藏。</li>
            </ul>
            <p class="detail-notice-p">運送說明</p>
            <ul>
              <li>本公司之商品委託物流業者配送。</li>
              <li>當確認您的訂單已經付款完成，
                  您的訂單將於付款完成後預計「3~5個工作天」出貨(不含週末及國定假日)；
                  因商品為收到訂單後主廚依序手工製作，
                  部分熱門品項逢節慶檔期可能會有短暫缺貨的情況發生，敬請見諒。
              </li>
            </ul>
            <p class="detail-notice-p">退換貨注意</p>
            <ul>
              <li>圖片僅供參考，商品內容物以實際收到商品為主。</li>
              <li>因本公司堅持保持產品之新鮮度，若簽收商品時發現包裝遭受破壞，
                  建議您於商品到貨24小時內，請拍照存證並立即與我們聯繫。
              </li>
              <li>冷凍及冷藏食品、生鮮商品、短效期消耗性食物等，
                  除商品本身有瑕疵或冷凍、冷藏商品於運送過程失溫導致變質外，
                  恕將不另提供退換貨服務。
              </li>
              <li>鑑賞期不等於試用期，若您所購買的商品為食品類商品
                  （如冷凍及冷藏食品、生鮮商品、短效期消耗性食物等），因衛生考量，
                  且依據主管機關頒布之《通訊交易解除權合理例外情事適用準則》，
                  除商品本身有瑕疵外，購買後恕無法辦理退貨。建議您於收到商品後，
                  依正常程序儘速檢查商品。
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
    <div class="mt-5 container text-center">
      <h3 class="mb-4" style="font-size:39px;">其他推薦</h3>
      <productSwiper />
    </div>
  </div>
</template>
<script>
import $ from 'jquery';

import { mapGetters, mapActions } from 'vuex';
import productSwiper from '../../components/frontend/ProductSwiper.vue';

export default {
  components: {
    productSwiper,
  },
  data() {
    return {
      counts: '',
      id: '',
    };
  },
  methods: {
    ...mapActions('cartsModules', ['getCart']),
    getPrdouct() {
      const vm = this;
      const { id } = this.$route.params;
      vm.counts = 1;
      vm.$store.dispatch('productsModules/getPrdouct', id);
    },
    addtoCart(id, qty) {
      const vm = this;
      const target = vm.cart.carts.filter((item) => item.product_id === id);
      if (target.length > 0) {
        const originCartId = target[0].id;
        const originQty = target[0].qty;
        const originProductId = target[0].product_id;
        const newQty = Number(qty) + Number(originQty);
        vm.$store.dispatch('cartsModules/updateCartProductQty', { originCartId, originProductId, newQty });
      } else {
        vm.$store.dispatch('cartsModules/addToCart', { id, qty });
      }
    },
  },
  computed: {
    ...mapGetters(['isLoading']),
    ...mapGetters('cartsModules', ['cart']),
    ...mapGetters('productsModules', ['getCurrentProduct']),
  },
  watch: {
    $route() {
      this.getPrdouct();
      $('html,body').scrollTop(0);
    },
  },
  created() {
    this.getCart();
    this.getPrdouct();
    $('html,body').scrollTop(0);
  },
};
</script>
<style scoped lang="scss">

</style>
