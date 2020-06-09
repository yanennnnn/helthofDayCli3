<template>
  <div>
    <loading :active.sync="isLoading">
      <template slot="default">
        <img src="../../assets/images/juice-icon.png" width="70px">
        <img src="../../assets/images/juice-dribbble.gif" width="100px">
      </template>
    </loading>
    <div class="banner jumbotron jumbotron-fluid d-flex align-items-center">
      <div class="container jumbotron-bg d-flex align-items-center">
        <div class="text-center mx-auto">
          <h2 class="text-light font-weight-bolder">果汁。沙拉。優格</h2>
          <p class="lead text-light">蔬果精華<br>好吃好喝又營養百分</p>
        </div>
      </div>
      <a href="#introduction"
        class="toggle-down text-white d-flex flex-column justify-content-center
          align-items-center text-decoration-none"
        @click.prevent="toTarget('introduction')">了解更多
        <ul class="justify-content-center align-items-center d-flex flex-column mt-1">
          <li class="toggle_down_group_item"></li>
          <li class="toggle_down_group_item"></li>
          <li class="toggle_down_group_item"></li>
          <li class="toggle_down_group_item itemRow">
            <font-awesome-icon  :icon="[ 'fas', 'angle-down' ]" />
          </li>
        </ul>
      </a>
    </div>
    <section class="introduction container-fluid h-auto" id="introduction">
      <div class="row">
        <div class="col-12">
          <div class="row farm">
            <div class="col-md-6 col-12 farm_bg bg-cover content"></div>
            <div class="col-md-6 col-12 farm_text px-5 align-self-center inner-hide">
              <h3 class="font-weight-bold farm_text_h3">
              <font>新鮮陽光新鮮口感</font>
              <br>
              <font>給予最真誠自在的味道</font>
              </h3>
              <hr class="bg-light">
              <p class="farm_text_p">
                <font>100%純有機天然，</font>
                <br>
                <font>真實濃郁口感</font>
                <br>
                <font>使用原汁原味，</font>
                <br>
                <font>完美而細緻。</font>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="row farm2">
            <div class="col-md-6 col-12 order-md-2 farm2_bg bg-cover content"></div>
            <div class="col-md-6 col-12 farm2_text px-5 align-self-center inner-hide">
              <h3 class="font-weight-bold farm2_text_h3 ">
                <font>和味蕾享受</font>
                <br>
                <font>當天最新鮮的快感</font>
              </h3>
              <hr class="bg-light">
              <p class="farm2_text_p mt-5 mb-5">
                  <font>當日採收當日現做</font>
                  <br>
                  <font>不添加人工香料</font>
                  <br>
                  <font>品質保證</font>
              </p>
              <hr class="bg-light mt-5">
              <p class="farm2_text_sm">
                <font><small>當你食用的瞬間</small></font>
                <br>
                <font><small>你就知道我們說的都是真的</small></font>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container-fulid delivery pt-5 pb-5 bg-beige">
        <div class="text-center text-primary delivery-tittle">
          <p class="font-weight-bold">READY TO EAT</p>
          <p class="font-weight-bolder">
              <font>最美味</font>
              <br>
              <font>最精緻的食物</font>
          </p>
          <p>交給你的蔬果，我們做了很多努力...</p>
        </div>
        <div class="mt-5 delivery-info inner-hide container">
          <div class="row justify-content-center">
            <div class="col-9 col-md-4 col-lg-3 mb-md-0 mb-4 delivery-info-card">
              <div class="card rounded-0 h-100 bg-primary box-shadow">
                <div class="card-body text-beige">
                  <h5 class="card-title">當天製作</h5>
                  <p class="card-text text-center delivery-info-card-icon">
                    <font-awesome-icon :icon="[ 'fas', 'temperature-low' ]" />
                  </p>
                  <p class="card-text text-md-left text-center">
                    冷壓榨汁技術以及HPP冷高壓殺菌，保留蔬果原味
                  </p>
                </div>
              </div>
            </div>
            <div class="col-9 col-md-4 col-lg-3 mb-md-0 mb-4 delivery-info-card">
              <div class="card rounded-0 h-100 bg-primary box-shadow" >
                <div class="card-body text-beige">
                  <h5 class="card-title">快速到貨</h5>
                  <p class="card-text text-center delivery-info-card-icon">
                    <font-awesome-icon :icon="[ 'fas', 'truck-moving' ]" />
                  </p>
                  <p class="card-text text-md-left text-center">
                    使用冷藏以及冷凍溫度宅配，保持最佳新鮮
                  </p>
                </div>
              </div>
            </div>
            <div class="col-9 col-md-4 col-lg-3 delivery-info-card ">
              <div class="card rounded-0 h-100 bg-primary box-shadow" >
                <div class="card-body text-beige">
                  <h5 class="card-title">賞味期間</h5>
                  <p class="card-text text-center delivery-info-card-icon">
                    <font-awesome-icon :icon="[ 'fas', 'snowflake' ]" />
                  </p>
                  <p class="card-text text-md-left text-center">
                    離開冰箱後，請在最佳品嘗時間內食用完畢
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="coupon d-flex align-items-center">
        <div class="container text-center ">
          <div class="container text-center coupon-text">
            <h3 class="text-light font-weight-bolder">母親節大放送</h3>
            <p class="text-light font-weight-bolder">輸入折扣碼，不限金額88折</p>
          </div>
          <div class="container text-center mt-5">
            <p class="text-primary font-weight-bolder">折扣碼: Mon5200</p>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container-fulid best-self py-5" id="best-self">
        <div class="text-center mb-5">
          <h3 class="text-primary font-weight-bold">經典商品</h3>
        </div>
        <div class="d-flex rowup">
          <div class="d-flex stop" v-if="products.length">
            <div v-for='item in hotProducts' :key="item.id ">
              <div class="card rounded-0 ml-1 mr-1 best-self-card">
                <div class="best-self-img d-flex"
                  :style="{ backgroundImage:`url(${item.imageUrl})` }">
                  <div class="card-body text-center d-flex flex-column
                        justify-content-center">
                    <h5 class="card-title font-weight-bold">{{ item.title }}</h5>
                    <router-link
                      :to="`/detail/${item.id}`"
                      class="btn btn-atomic-tangerine rounded-0"
                      style="margin:0 auto">
                      查看更多
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex stop" v-if="products.length">
            <div v-for='item in hotProducts' :key="item.id">
              <div class="card rounded-0 ml-1 mr-1 best-self-card">
                <div class="best-self-img d-flex"
                  :style="{ backgroundImage: `url(${item.imageUrl})` }">
                  <div class="card-body text-center d-flex flex-column
                        justify-content-center">
                    <h5 class="card-title font-weight-bold">{{ item.title }}</h5>
                    <router-link
                      :to="`/detail/${item.id}`"
                      class="btn btn-atomic-tangerine rounded-0"
                      style="margin:0 auto">
                      查看更多
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import $ from 'jquery';
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {};
  },
  methods: {
    toTarget(target) {
      const gettop = $(`#${target}`).offset().top - 71;
      if (target) {
        $('html,body').animate({ scrollTop: gettop }, 1000);
      }
    },
    ...mapActions('productsModules', ['getProducts']),
  },
  computed: {
    ...mapGetters(['isLoading']),
    ...mapGetters('productsModules', ['products', 'hotProducts']),
  },
  mounted() {
    $(window).scroll(() => {
      const scrollPos = $(window).scrollTop();
      const windowHeight = $(window).height();
      $('.farm').each(function animataClass() {
        const thisPos = $(this).offset().top;
        if (windowHeight + scrollPos >= thisPos + 100) {
          $('.farm_text').removeClass('inner-hide');
          $('.farm_text').addClass('inner-show');
        }
      });
      $('.farm2').each(function animataClass() {
        const thisPos = $(this).offset().top;
        if (windowHeight + scrollPos >= thisPos + 100) {
          $('.farm2_text').removeClass('inner-hide');
          $('.farm2_text').addClass('inner-show');
        }
      });
      $('.delivery-info').each(function animataClass() {
        const thisPos = $(this).offset().top;
        if (windowHeight + scrollPos >= thisPos + 100) {
          $(this).removeClass('inner-hide');
          $(this).addClass('inner-show');
        }
      });
    });
  },
  created() {
    this.getProducts();
    $('html,body').scrollTop(0);
  },
};
</script>
<style scoped lang="scss">

</style>
