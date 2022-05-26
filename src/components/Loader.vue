<template>
  <div class="loader-wrapp" v-if="getLoader">
    <vue-element-loading
      :active="show"
      spinner="bar-fade-scale"
      is-full-screen
      background-color="rgb(82, 15, 117)"
    ></vue-element-loading>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Loader",
  props: {},
  data() {
    return {
      show: true,
    };
  },
  computed: {
    // т.к ноа глобальна (loader) т.к нету namespaced: true
    ...mapGetters(["getLoader"]),
  },
  mounted() {},
};
</script>
<style lang="scss">
.loader-wrapp {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  opacity: 0.9;
  z-index: 999;
}
</style>
