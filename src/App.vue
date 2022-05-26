<template>
  <Notification />
  <Header />
  <Loader />
  <movies-list :list="moviesList" @hover-item="changePosterBg"></movies-list>
  <poster-bg :poster="posterBg"></poster-bg>
  <movies-pagination
    :total="moviesLength"
    :currentP="currentPage"
    :perPage="moviesPerPage"
    @currentPage-changing="onChangePage"
  ></movies-pagination>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MoviesList from "@/components/MoviesList";
import PosterBg from "@/components/PosterBg";
import Loader from "@/components/Loader";
import MoviesPagination from "@/components/MoviesPagination";
import Header from "@/components/Header";
import Notification from "@/components/Notification";
export default {
  name: "App",
  components: {
    MoviesList,
    PosterBg,
    MoviesPagination,
    Loader,
    Header,
    Notification,
  },
  data() {
    return {
      posterBg: "",
    };
  },
  methods: {
    ...mapActions("movies", ["changeCurrentPage"]),
    changePosterBg(poster) {
      this.posterBg = poster;
    },
    onChangePage(page) {
      this.$router.push({ query: { page } });
      localStorage.setItem("page", page);
      this.changeCurrentPage(page);
    },
  },
  created() {
    if (localStorage.getItem("page")) {
      this.changeCurrentPage(Number(localStorage.getItem("page")));
    }
  },
  computed: {
    ...mapGetters("movies", [
      "moviesList",
      "currentPage",
      "moviesPerPage",
      "moviesLength",
    ]),
  },
};
</script>

<style lang="scss">
*,
*::after,
*::before {
  box-sizing: border-box;
}
body {
  margin: 0;
  &.no-scroll {
    overflow: hidden;
  }
}
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}
#app {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
