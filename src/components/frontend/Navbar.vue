<template>
    <div>
      <loading :active.sync="isLoading">
          <template slot="default">
              <img src="../../assets/images/juice-icon.png" width="70px">
              <img src="../../assets/images/juice-dribbble.gif" width="100px">
          </template>
      </loading>
      <nav class="navbar navbar-expand-md nav">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button"
            data-toggle="collapse"
            data-target="#fontNavbar"
            aria-controls="fontNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation">
              <font-awesome-icon class="text-primary" :icon="[ 'fas', 'bars' ]" />
          </button>
          <router-link to="/index" class="navbar-brand nav-logo order-0" href="#">
              health-of-day
          </router-link>
          <div class="collapse navbar-collapse justify-content-end order-2 " id="fontNavbar">
            <ul class="navbar-nav ">
              <li class="nav-item ">
                <router-link  class="nav-link nav-text" href="#" to="/index">
                  <font-awesome-icon class="mr-1" :icon="[ 'fas', 'home' ]" />
                    首頁
                  <span class="sr-only">(current)</span>
                </router-link>
              </li>
              <li class="nav-item ">
                <router-link  class="nav-link nav-text" href="#" to="/products">
                  <font-awesome-icon class="mr-1" :icon="[ 'fas', 'box-open' ]" />
                    所有產品
                </router-link>
              </li>
              <li class="nav-item ">
                <router-link  class="nav-link nav-text" href="#"  to="/login">
                  <font-awesome-icon class="mr-1" :icon="[ 'fas', 'user-cog' ]" />
                    登入
                </router-link>
              </li>
            </ul>
          </div>
          <div class="dropdown cart-list order-1 order-md-2">
            <a class="cart-list-icon dropdown-toggle" type="button" id="dropdownMenuButton"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <font-awesome-icon :icon="[ 'fas', 'shopping-cart' ]" />
            </a>
            <span class="badge  badge-danger rounded-circle"
                v-if="cartlength">{{cartlength}}
            </span>
            <div class="dropdown-menu dropdown-menu-right px-2 mt-2"
              aria-labelledby="dropdownMenuButton">
              <div v-if="cartlength !== 0">
                <p class="h5 ml-2">選購商品</p>
                <hr class="m-0">
                <table class="table">
                  <tbody>
                    <tr v-for="item in cart.carts" :key="item.id">
                      <td scope="row" width="5">
                        <button class="btn btn-sm btn-outline-danger align-middle"
                          @click.prevent="removeCartItem(item.id)">
                          <font-awesome-icon  :icon="[ 'far', 'trash-alt' ]" />
                        </button>
                      </td>
                      <td class="align-middle cart-list-product">{{item.product.title}}</td>
                      <td class="align-middle text-nowrap" width="5">
                        {{item.qty}} {{item.product.unit}}
                      </td>
                      <td class="align-middle" width="5">{{item.final_total | currency}}</td>
                    </tr>
                  </tbody>
                </table>
                <router-link href="#" class="btn btn-primary btn-block" to="/cart">
                  結帳去
                </router-link>
              </div>
              <div v-else class="py-2">
                  <p class="text-center font-weight-bold mb-3">購物車尚未有商品</p>
                  <router-link href="#" class="btn btn-primary btn-block"
                    to="/products">
                    來去逛逛
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
</template>

<script>
import $ from 'jquery';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Nav',
  data() {
    return {

    };
  },
  methods: {
    ...mapActions('cartsModules', ['getCart']),
    getrouter() {
      const { path } = this.$route;
      const search = '/index';
      if (path.indexOf(search) === -1) {
        $('.navbar').addClass('nav-light');
        $('.nav-item').each(function navitemclass() {
          $(this).removeClass('indexTop');
          $(this).addClass('otherTop');
        });
        $('.cart-list').removeClass('indexTop');
        $('.cart-list').addClass('otherTop');
      } else {
        $('.navbar').removeClass('nav-light');
        $('.nav-item').each(function navitemclass() {
          $(this).addClass('indexTop');
          $(this).removeClass('otherTop');
        });
        $('.cart-list').addClass('indexTop');
        $('.cart-list').removeClass('otherTop');
      }
    },
    removeCartItem(id) {
      this.$store.dispatch('cartsModules/removeCartItem', id);
    },
  },
  mounted() {
    const vm = this;
    vm.getrouter();
    $('.nav-item').on('click', () => {
      $('#fontNavbar').removeClass('show');
    });
    $(window).scroll(() => {
      const { path } = vm.$route;
      const search = 'index';
      const scrollPos = $(window).scrollTop();
      const windowHeight = $(window).height();
      if (path.indexOf(search) === -1) {
        return;
      }
      $('.nav').each(function navclass() {
        const thisPos = $(this).offset().top;
        if (thisPos + scrollPos >= windowHeight) {
          $(this).addClass('nav-light');
          $('.nav-item').each(function navitemclass() {
            $(this).removeClass('indexTop');
            $(this).addClass('otherTop');
          });
          $('.cart-list').removeClass('indexTop');
          $('.cart-list').addClass('otherTop');
        }
        if (thisPos + scrollPos <= windowHeight) {
          $(this).removeClass('nav-light');
          $('.nav-item').each(function navitemclass() {
            $(this).addClass('indexTop');
            $(this).removeClass('otherTop');
          });
          $('.cart-list').addClass('indexTop');
          $('.cart-list').removeClass('otherTop');
        }
      });
    });
  },
  computed: {
    ...mapGetters(['isLoading']),
    ...mapGetters('cartsModules', ['cart', 'cartlength']),
  },
  watch: {
    $route() {
      const vm = this;
      vm.getrouter();
    },
  },
  created() {
    const vm = this;
    vm.getCart();
  },
};
</script>
