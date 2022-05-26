<template>
  <div></div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    open4({ title, msg, type }) {
      this.$notify({
        title: title,
        message: msg,
        type: type,
      });
    },
  },
  watch: {
    // messagePool: "open4",
    messagePool(msg) {
      this.open4(msg);
    },
  },
  computed: {
    ...mapGetters(["messagePool"]),
  },
};
</script>
<style lang=""></style>
