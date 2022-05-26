<template>
  <el-header class="header">
    <el-container>
      <div class="header__inner">
        <a class="header__logo" href="#">MovieDB</a>
        <el-input
          placeholder="Search"
          v-model="input"
          @change="onChangeInput"
        ></el-input>
      </div>
    </el-container>
  </el-header>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      input: "",
    };
  },
  methods: {
    ...mapActions("movies", ["searchMovies", "fetchMovies"]),
    onChangeInput() {
      if (this.input) {
        this.searchMovies(this.input);
      } else {
        this.fetchMovies();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  background-color: #000;
  &__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  &__logo {
    text-decoration: none;
    color: #fff;
    margin-right: 20px;
    font-size: 20px;
  }
}
</style>
<style lang="scss">
.el-input {
  max-width: 400px !important;
  background: rgba(255, 255, 255, 0.1) !important;
}
.el-input input {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(0, 0, 0, 0.1);
  color: #fff;
  &:focus {
    border-color: rgba(0, 0, 0, 0.6);
    background-color: rgba(255, 255, 255, 0.2);
  }
}
</style>
