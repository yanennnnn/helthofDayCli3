<template>
  <div >
    <Navbar />
    <AlertMessage />
      <loading :active.sync="isLoading">
          <template slot="default">
              <img src="../../assets/images/juice-icon.png" width="70px">
              <img src="../../assets/images/juice-dribbble.gif" width="100px">
          </template>
      </loading>
      <div class=" container-fulid sign">
        <div class="container sign-form d-flex align-items-center ">
          <div class="m-auto form-signin" >
              <form class="" @submit.prevent="signin">
                <h2 class="mb-4 font-weight-normal text-center">SIGN IN</h2>
                <label for="inputEmail" class="sr-only">帳號</label>
                <input type="email" id="inputEmail" class="form-control"
                  placeholder="Email address" required autofocus v-model="user.username">
                <label for="inputPassword" class="sr-only">密碼</label>
                <input type="password" id="inputPassword" class="form-control"
                  placeholder="Password" required v-model="user.password">
                <div class="custom-control custom-checkbox checkbox mb-2">
                  <input type="checkbox" class="custom-control-input" id="customCheck1">
                  <label class="custom-control-label" for="customCheck1">記得我</label>
                </div>
                <button class="btn btn-lg btn-primary btn-block rounded-0" type="submit">
                  登入
                </button>
              </form>
              <hr>
              <p class="text-center mb-1">其他登入</p>
              <div class="text-center other-signin ">
                <a href="#" class="d-inline-block text-light text-decoration-none rounded">
                  <font-awesome-icon  :icon="[ 'fab', 'facebook-f' ]" />
                </a>
                <a href="#" class="d-inline-block ml-4 text-light text-decoration-none rounded">
                  <font-awesome-icon :icon="[ 'fab', 'google-plus-g' ]" />
                </a>
              </div>
          </div>
        </div>
        <div class=" sign-bg bg-filter">
        </div>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex';
import Navbar from '../../components/frontend/Navbar.vue';
import AlertMessage from '../../components/AlertMessage.vue';

export default {
  components: {
    Navbar,
    AlertMessage,
  },
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    signin() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`;
      vm.$store.commit('LOADING', true);
      vm.$http.post(api, vm.user).then((response) => {
        if (response.data.success) {
          vm.$store.commit('LOADING', false);
          vm.$router.push('/admin/createProducts');
        } else {
          vm.$store.dispatch('updateMessage', { message: '帳號密碼輸入錯誤!', status: 'danger' });
          vm.$store.commit('LOADING', false);
        }
      });
    },
  },
  computed: {
    ...mapGetters(['isLoading']),
  },
};
</script>

<style scoped lang="scss">

</style>
