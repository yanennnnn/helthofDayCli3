<template>
  <div>
    <nav class="navbar navbar-expand-md nav-light">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button"
          data-toggle="collapse" data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup" aria-expanded="false"
          aria-label="Toggle navigation">
          <font-awesome-icon class="text-primary" :icon="[ 'fas', 'bars' ]" />
        </button>
        <a class="navbar-brand nav-logo order-0" href="#">health-of-day</a>
        <div class="collapse navbar-collapse justify-content-end order-2 "
          id="navbarNavAltMarkup">
          <ul class="navbar-nav">
            <li class="nav-item mx-3">
              <router-link  class="nav-link nav-text" href="#"
                to="/admin/createProducts">
                <font-awesome-icon class="mr-1" :icon="[ 'fas', 'box-open' ]" />
                  產品列表
              </router-link>
            </li>
            <li class="nav-item mx-3">
              <router-link  class="nav-link nav-text" href="#"
                to="/admin/orderLists">
                <font-awesome-icon class="mr-1" :icon="[ 'fas', 'list-alt' ]" />
                  訂單列表
              </router-link>
            </li>
            <li class="nav-item mx-3">
              <router-link  class="nav-link nav-text" href="#"
                to="/admin/createCoupons">
                <font-awesome-icon class="mr-1" :icon="[ 'fas', 'money-check' ]" />
                  優惠卷
              </router-link>
            </li>
            <li class="nav-item mx-3">
              <a href="#" class="nav-link nav-text " @click.prevent="signOut">
                <font-awesome-icon class="mr-1" :icon="[ 'fas', 'user-cog' ]" />
                  登出
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    signOut() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/logout`;
      vm.axios.post(api, vm.user).then((response) => {
        if (response.data.success) {
          vm.$router.push('/login');
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
    a:hover{
        color:#A1BF5B;
    }
</style>
