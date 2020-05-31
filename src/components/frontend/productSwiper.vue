
<template>
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide v-for='item in recommendproduct' :key="item.id ">
      <div class="row justify-content-center">
          <div class=" mb-4 mx-2"  >
            <div class="card border-0 products-card">
              <a :href="`#/detail/${item.id}`"
                @click.prevent="ToTargetDetail(item.id)" class="text-decoration-none"
                >
                <div class="products-info-img text-center rounded"
                  :style="{backgroundImage: `url(${item.imageUrl})`}">
                  <div><p>了解更多...</p></div>
                </div>
                <div class="card-body ">
                  <h5
                    class="card-title text-center d-block text-decoration-none ">
                      {{item.title}}
                  </h5>
                  <p class="card-text products-info-content text-muted">{{item.content}}</p>
                </div>
              </a>
            </div>
            <hr>
          </div>
      </div>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import { mapGetters } from 'vuex';

export default {
  name: 'swiper-example-space-between',
  title: 'Space between slides',
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOption: {
        spaceBetween: 30,
        speed: 300,
        autoplay: true,
        loop: true, // 開啟迴圈模式,
        // slidesPerView: 1,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          // 當寬度小於等於 544
          544: {
            slidesPerView: 1,
          },
          // 當寬度小於等於 767
          767: {
            slidesPerView: 2,
            centeredSlides: false,
          },
          // 當寬度小於等於 991
          991: {
            slidesPerView: 3,
            centeredSlides: true,
          },
        },
      },
      // products: [],
      recommendproduct: [],
    };
  },
  methods: {
    ToTargetDetail(id) {
      this.$router.push(`/detail/${id}`);
    },
  },
  computed: {

    ...mapGetters('productsModules', ['slideproducts']),

  },
  created() {
    this.$store.dispatch('productsModules/getSlideProducts').then(() => {
      const vm = this;
      const array = [...vm.slideproducts];
      array.forEach((item, i) => {
        if (i < 6) {
          const randomNum = Math.floor(Math.random() * array.length);
          vm.recommendproduct.push(array.splice(randomNum, 1)[0]);
        }
      });
    });
  },
};
</script>

<style scoped lang="scss">
    .swiper-container{
        height: 450px;
    }
</style>
