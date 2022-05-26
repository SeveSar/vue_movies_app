<template>
  <div class="poster-bg" :style="posterStyle"></div>
</template>
<script>
export default {
  name: "PosterBg",
  props: {
    poster: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      defaultPosterBg:
        "linear-gradient(45deg,rgb(0, 3, 38) 0%,rgb(82, 15, 117) 100%)",
    };
  },
  computed: {
    posterStyle() {
      return {
        "background-image": this.posterBg,
      };
    },
    posterBg() {
      return this.poster ? `url(${this.poster})` : this.defaultPosterBg;
    },
  },
};
</script>
<style lang="scss">
.poster-bg {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  background-image: linear-gradient(
    45deg,
    rgb(0, 3, 38) 0%,
    rgb(82, 15, 117) 100%
  );
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transition: all 0.2s linear;
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-image: linear-gradient(
      45deg,
      rgb(0, 3, 38) 0%,
      rgb(82, 15, 117) 100%
    );
    opacity: 0.7;
    z-index: 1;
  }
}
</style>
