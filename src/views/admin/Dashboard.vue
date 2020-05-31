<template>
    <div>
        <Nav />
        <AlertMessage />
        <router-view></router-view>
   </div>
</template>

<script>
import Nav from '../../components/admin/Nav.vue';
import AlertMessage from '../../components/AlertMessage.vue';

export default {
  name: 'dashboard',
  components: {
    Nav,
    AlertMessage,
  },
  data() {
    return {};
  },
};
</script>
