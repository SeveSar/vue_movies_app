import axios from "../../plugins/axios";
import IDs from "../mock/imdb_top250";
import mutations from "../mutations";

function serializeResponse(response) {
  return response.reduce((acc, movie) => {
    acc[movie.imdbID] = movie;
    return acc;
  }, {});
}

const { MOVIES, CURRENT_PAGE, REMOVE_ITEM, TOGGLE_SEARCH } = mutations;
const moviesStore = {
  namespaced: true,
  state: {
    top250IDs: IDs,
    // 12 фильмов на одну страницу
    moviesPerPage: 12,
    currentPage: 1,
    movies: {},
    isSearch: false,
  },
  getters: {
    slicedIDs: ({ top250IDs }) => (from, to) => top250IDs.slice(from, to),
    currentPage: ({ currentPage }) => currentPage,
    moviesPerPage: ({ moviesPerPage }) => moviesPerPage,
    moviesList: ({ movies }) => movies,
    moviesLength: ({ top250IDs }) => top250IDs.length,
    isSearch: ({ isSearch }) => isSearch,
  },
  mutations: {
    [MOVIES](state, value) {
      state.movies = value;
    },
    [CURRENT_PAGE](state, value) {
      state.currentPage = value;
    },
    [REMOVE_ITEM](state, id) {
      state.top250IDs = state.top250IDs.filter((itemId) => {
        return itemId !== id;
      });
    },
    [TOGGLE_SEARCH](state, value) {
      state.isSearch = value;
    },
  },
  actions: {
    initMoviesStore: {
      handler({ dispatch }) {
        dispatch("fetchMovies");
      },
      root: true,
    },
    async fetchMovies({ getters, commit, dispatch }) {
      try {
        dispatch("toggleLoader", true, { root: true });
        const { slicedIDs, currentPage, moviesPerPage } = getters;
        // tt0111161
        const from = currentPage * moviesPerPage - moviesPerPage;
        const to = currentPage * moviesPerPage;
        const moviesToFetch = slicedIDs(from, to);
        // если вызывать axios без await то вернутся промисы которые не будут выполнены
        const request = moviesToFetch.map((id) => axios.get(`/?i=${id}`));
        // дальше при помощи Promise.all можем дождаться выполнения всех промисов
        const response = await Promise.all(request);
        const movies = serializeResponse(response);
        commit(MOVIES, movies);
      } catch (err) {
        console.log(err);
      } finally {
        dispatch("toggleLoader", false, { root: true });
      }
    },
    changeCurrentPage({ commit, dispatch }, page = 1) {
      commit(CURRENT_PAGE, page);
      dispatch("fetchMovies");
    },
    async removeMovieItem({ commit, dispatch }, id) {
      commit(REMOVE_ITEM, id);
      await dispatch("fetchMovies");
    },
    async searchMovies({ dispatch, commit }, query) {
      try {
        dispatch("toggleLoader", true, { root: true });
        commit(TOGGLE_SEARCH, true);
        const response = await axios.get(`/?s=${query}`);
        if (response.Error) {
          throw new Error("Movie(s) was(were) not found");
        }
        const movies = serializeResponse(response.Search);
        commit(MOVIES, movies);
      } catch (err) {
        dispatch(
          "showNotify",
          {
            title: "Error",
            msg: err.message,
            type: "error",
          },
          { root: true }
        );
      } finally {
        dispatch("toggleLoader", false, { root: true });
        commit(TOGGLE_SEARCH, false);
      }
    },
  },
};

export default moviesStore;
