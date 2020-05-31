<template>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <!-- 若 pagination.has_pre 是 false 就加上 disabled -->
        <li class="page-item" :class="{'disabled': !pageData.has_pre }">
          <a class="page-link" href="#" aria-label="Previous"
            @click.prevent="updatePage(pageData.current_page - 1)">
              <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <!-- 若 pagination.current_page === page 就加上 active -->
        <li class="page-item" v-for="page in pageData.total_pages" :key="page"
          :class="{'active': pageData.current_page === page}">
          <!-- 點擊切換至指定的 page 數 -->
            <a class="page-link" href="#" @click.prevent="updatePage(page)">{{page}}</a>
        </li>
        <!-- 若 pagination.has_next 是 false 就加上 disabled -->
        <li class="page-item" :class="{'disabled': !pageData.has_next }">
          <a class="page-link" href="#" aria-label="Next"
            @click.prevent="updatePage(pageData.current_page + 1)">
              <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
</template>
<script>
export default {
  name: 'Pagination',
  data() {
    return {};
  },
  props: {
    pageData: {
      type: Object,
    },
  },
  methods: {
    updatePage(page) {
      this.$emit('emitpage', page);
      this.$emit('scrollTarget');
    },
  },
};
</script>
