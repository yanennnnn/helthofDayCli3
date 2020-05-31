<template>
  <div class="wrap">
    <Navbar />
    <AlertMessage />
    <router-view />
    <Footer />
  </div>
</template>


<script>
import Navbar from '../../components/frontend/Navbar.vue';
import Footer from '../../components/frontend/Footer.vue';
import AlertMessage from '../../components/AlertMessage.vue';

export default {
  name: 'layout',
  components: {
    Navbar,
    Footer,
    AlertMessage,
  },
  data() {
    return {};
  },
};
</script>
