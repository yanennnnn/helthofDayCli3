<template>
  <div class="message-alert">
    <div class="alert alert-dismissible text-center"
      :class="'alert-' + item.status"
      v-for="(item, i) in messages" :key="i">
      {{ item.message }}
      <button type="button" class="close" @click="removeMessage(i)" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Alert',
  data() {
    return {
    };
  },
  methods: {
    ...mapMutations(['REMOVEMESSAGE']),
  },
  computed: {
    ...mapGetters(['messages']),
  },
};
</script>
<style scope lang="scss">
  .message-alert {
    position: fixed;
    width: 250px;
    top: 71px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1100;
  }
</style>
