<template>
  <div class="movies-pagination">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      v-model:currentPage="currentPageModel"
      :page-size="perPage"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: "MoviesPagination",
  props: {
    total: {
      type: Number,
      default: 1,
    },
    currentP: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      currentPage: this.currentP,
    };
  },
  computed: {
    currentPageModel: {
      get() {
        return this.currentPage;
      },
      set(value) {
        this.$emit("currentPage-changing", value);
      },
    },
  },
};
</script>
<style lang="scss">
.movies-pagination {
  display: flex;
  justify-content: center;
  padding: 10px 0;
  margin-top: auto;
  overflow-x: auto;
}
.el-pagination .el-pager .number {
  background: transparent !important;
  border: 1px solid #fff;
  color: #fff !important;
  &:hover {
    color: #000 !important;
  }
  &.active {
    background-color: #fff !important;
    color: #000 !important;
  }
}
.el-pagination .el-pager .more {
  background: transparent !important;
  border: 1px solid #fff !important;
  &:hover {
    color: #000 !important;
  }
}
</style>
