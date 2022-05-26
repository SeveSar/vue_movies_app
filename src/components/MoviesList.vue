<template>
  <div class="movie-list">
    <el-container>
      <el-header>
        <h3 class="list-title">
          {{ titleChange }}
        </h3>
      </el-header>
      <el-main>
        <el-row>
          <template v-if="isExist">
            <el-col
              :sm="12"
              :md="8"
              :lg="6"
              v-for="(movie, key) in list"
              :key="key"
            >
              <movie-item
                @click="$emit('movie-click', movie)"
                :movie="movie"
                @mouseenter="hoverItem(movie)"
                @emitRemoveItem="emitItemRemove"
                @emit-info-item="showModal"
              ></movie-item>
            </el-col>
          </template>
          <template v-else>
            <div>Empty list</div>
          </template>
        </el-row>
      </el-main>
    </el-container>
    <transition name="bounce">
      <MovieContent
        @click-modal="isShowModal = false"
        :isShowModal="isShowModal"
        :movie="selectedMovie"
      />
    </transition>
  </div>
</template>
<script>
import MovieItem from "@/components/MovieItem";
import MovieContent from "@/components/MovieContent";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "MoviesList",
  components: {
    MovieItem,
    MovieContent,
  },
  data() {
    return {
      movieId: "",
      isShowModal: false,
    };
  },
  props: {
    list: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    hoverItem(movie) {
      this.$emit("hover-item", movie.Poster);
    },
    ...mapActions("movies", ["removeMovieItem"]),
    ...mapActions(["showNotify"]),
    emitItemRemove(data) {
      this.removeMovieItem(data.id);
      this.showNotify({
        title: "Success",
        msg: "Movie was deleted",
        type: "success",
      });
    },
    showModal(id) {
      this.movieId = id;
      this.isShowModal = true;
      document.body.classList.add("no-scroll");
    },
  },
  computed: {
    isExist() {
      return Boolean(Object.keys(this.list).length);
    },
    titleChange() {
      return this.isSearch ? "Searching movies" : "IMDB Top 250";
    },
    ...mapGetters("movies", ["isSearch"]),
    selectedMovie() {
      return this.movieId ? this.list[this.movieId] : null;
    },
  },
};
</script>
<style lang="scss">
.el-row {
  margin-bottom: 20px;
}
.movie-list {
  padding: 20px 0;
}
.list-title {
  font-size: 35px;
  color: #fff;
  font-size: 400;
}
.el-container {
  max-width: 1420px;
  width: 100%;
  margin: 0 auto;
  padding: 0 10px;
  height: 100%;
}
.bounce-enter-active {
  animation: bounce-in 1s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
