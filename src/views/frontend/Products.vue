<template>
  <div>
    <loading :active.sync="isLoading">
      <template slot="default">
          <img src="../../assets/images/juice-icon.png" width="70px">
          <img src="../../assets/images/juice-dribbble.gif" width="100px">
      </template>
    </loading>
    <div class="container-fulid">
      <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
          <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div class="carousel-img-1 bg-cover">
              <div class="carousel-caption carousel-caption-text">
                <p class="text-light font-weight-bolder">果汁精華<br>回味無窮的水果香味</p>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <div class="carousel-img-2 bg-cover">
              <div class="carousel-caption carousel-caption-text">
                <p class="text-light font-weight-bolder">沙拉。自然<br>含最原始的蔬菜甜味</p>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <div class="carousel-img-3 bg-cover">
              <div class="carousel-caption carousel-caption-text">
                <p class="text-light font-weight-bolder">品質新鮮<br>給你最實在的滋味</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container products-info">
      <div class="products-info-category mt-5">
        <ul class="d-flex list-unstyled">
          <li :class="{active: category === 'all'}">
            <a href="#" class="products-list"
              @click.prevent="currentCategory('all')"
              :class="{active: category === 'all'}">
                全部商品
              </a>
          </li>
          <li :class="{ active: category === '經典商品' }">
            <a href="#" class="products-list"
              @click.prevent="currentCategory('經典商品')"
              :class="{ active: category === '經典商品' }">
                  經典商品
            </a>
          </li>
          <li :class="{ active: category === '活力果汁' }">
            <a href="#" class="products-list"
              @click.prevent="currentCategory('活力果汁')"
              :class="{ active: category === '活力果汁' }">
                活力果汁
              </a>
          </li>
          <li :class="{ active: category === '營養沙拉' }">
            <a href="#" class="products-list"
              @click.prevent="currentCategory('營養沙拉')"
              :class="{ active: category == '營養沙拉' }">
                營養沙拉
            </a>
          </li>
          <li :class="{ active: category === '酸甜優格' }">
            <a href="#" class="products-list"
              @click.prevent="currentCategory('酸甜優格')"
              :class="{ active: category == '酸甜優格' }">
                酸甜優格
            </a>
          </li>
        </ul>
      </div>
      <div class="outline">
        <div class="row">
          <div class="col-lg-4 col-md-6 col-12 mb-4"
            v-for="item in activeProducts" :key="item.id">
            <div class="card border-0 products-card">
              <div @click.stop="ToTargetDetail(item.id)" class="text-decoration-none">
                <div class="products-info-img text-center rounded"
                  :style="{ backgroundImage: `url(${item.imageUrl})` }">
                  <div><p>了解更多...</p></div>
                </div>
                <div class="card-body">
                  <h5 class="card-title text-center d-block text-decoration-none">
                      {{ item.title }}
                  </h5>
                  <p class="card-text products-info-content text-muted">{{ item.content }}</p>
                  <div class="d-flex justify-content-between mt-2">
                    <div class="products-info-price ml-1 align-self-center"
                      v-if="item.price!==item.origin_price">
                        <span class="text-danger">{{ item.price | currency }}</span>
                        <span class="ml-2" style="font-style:oblique;text-decoration:line-through">
                          {{ item.origin_price | currency }}
                        </span>
                    </div>
                    <div class="products-info-price ml-1 align-self-center" v-else>
                      <span>{{ item.price | currency }}</span>
                    </div>
                    <button @click.stop="addToCart(item.id)"
                      class="btn btn-none m-0 b-0 products-info-cart">
                      <font-awesome-icon  style="font-size:20px"
                        :icon="[ 'fas', 'shopping-basket' ]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <hr class="m-0">
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <Pagination :pageData="pagination" @emitpage="getAllProducts" @scrollTarget="scroll"
            v-if="category==='all'">
          </Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import { mapGetters, mapActions } from 'vuex';
import Pagination from '../../components/Pagination.vue';

export default {
  components: {
    Pagination,
  },
  data() {
    return {};
  },
  methods: {
    ToTargetDetail(id) {
      this.$router.push(`/detail/${id}`);
    },
    ...mapActions('productsModules', ['getProducts']),
    ...mapActions('cartsModules', ['getCart']),
    getAllProducts(page = 1) {
      this.$store.dispatch('productsModules/getAllProducts', page);
    },
    currentCategory(item) {
      this.$store.commit('productsModules/CURRENTCATEGOTY', item);
    },
    addToCart(id, qty = 1) {
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
    scroll() {
      const { top } = $('.products-info').offset();
      $('html,body').animate({ scrollTop: (top - 80) }, 1500);
    },
  },
  computed: {
    ...mapGetters(['isLoading']),
    ...mapGetters('productsModules', ['products', 'activeProducts', 'pagination', 'category']),
    ...mapGetters('cartsModules', ['cart']),
  },
  created() {
    const vm = this;
    vm.getProducts();
    vm.getAllProducts();
    vm.getCart();
    $('html,body').scrollTop(0);
  },
};
</script>
