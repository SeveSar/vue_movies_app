<template>
  <div class="movie-overlay" v-if="isShowModal" @click="closeModal">
    <div class="movie-content__wrap">
      <div class="movie-content" @click.stop>
        <header class="movie-content__header">
          <h4 class="movie-content__header-title">Movie view</h4>
          <button @click="closeModal">X</button>
        </header>
        <div class="movie-content__inner">
          <el-row>
            <el-col :sm="12" :md="8">
              <div class="movie-content__poster-wrapp">
                <div class="movie-content__poster" :style="posterStyle"></div>
              </div>
            </el-col>
            <el-col :sm="12" :md="16">
              <div class="movie-content__descr">
                <h2 class="movie-content__descr-title">{{ movie.Title }}</h2>
                <StarRating
                  v-model:rating="rating"
                  :increment="0.5"
                  :fixed-points="1"
                  read-only
                  :max-rating="10"
                  :star-size="23"
                  active-color="#ffc107"
                />
                <div class="movie-content__descr-text">
                  <p>
                    {{ sliceText }}
                  </p>
                </div>
                <div class="movie-content__descr-out">
                  <el-badge class="item">
                    <el-button size="small" type="success">{{
                      movie.Year || "Undefined"
                    }}</el-button>
                  </el-badge>
                  <el-badge class="item">
                    <el-button size="small" type="success">{{
                      movie.Runtime || "Undefined"
                    }}</el-button>
                  </el-badge>
                  <el-badge class="item">
                    <el-button size="small" type="success">{{
                      movie.Genre || "Undefined"
                    }}</el-button>
                  </el-badge>
                  <el-badge class="item">
                    <el-button size="small" type="success">{{
                      movie.Language || "Undefined"
                    }}</el-button>
                  </el-badge>
                </div>
                <el-table
                  :data="tableData"
                  stripe
                  style="width: 100%"
                  :show-header="false"
                >
                  <el-table-column
                    prop="name"
                    width="180"
                    class-name="table-cell"
                  >
                  </el-table-column>
                  <el-table-column prop="value"> </el-table-column>
                </el-table>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import StarRating from "vue-star-rating";
export default {
  components: {
    StarRating,
  },
  props: {
    isShowModal: {
      type: Boolean,
      default: false,
    },
    movie: {
      type: Object,
    },
  },
  data() {
    return {
      defaultPosterBg:
        "linear-gradient(45deg,rgb(0, 3, 38) 0%,rgb(82, 15, 117) 100%)",
      rating: 0,
      tableData: [
        {
          name: "Production",
          value: "",
        },
        {
          name: "Country",
          value: "",
        },
        {
          name: "Director",
          value: "",
        },
        {
          name: "Writer",
          value: "",
        },
        {
          name: "Actors",
          value: "",
        },
        {
          name: "Awards",
          value: "",
        },
      ],
    };
  },
  computed: {
    posterStyle() {
      return {
        "background-image": this.posterBg,
      };
    },
    posterBg() {
      return this.isMovie ? `url(${this.movie.Poster})` : this.defaultPosterBg;
    },
    isMovie() {
      return this.movie ? true : false;
    },
    sliceText() {
      if (this.isMovie && this.movie.Plot) {
        return this.movie.Plot.length > 333
          ? `${this.movie.Plot.slice(0, 333)}...`
          : this.movie.Plot;
      } else {
        return "No Text";
      }
    },
  },
  methods: {
    closeModal() {
      this.$emit("click-modal");
      document.body.classList.remove("no-scroll");
    },
  },
  watch: {
    movie(data) {
      if (this.isMovie && data.imdbRating) {
        this.rating = Number(this.movie.imdbRating);
      } else {
        this.rating = 0;
      }
      this.tableData[0].value = this.movie
        ? this.movie.Production
        : "Undefined";
      this.tableData[1].value =
        this.isMovie && this.movie.Country ? this.movie.Country : "Undefined";
      this.tableData[2].value =
        this.isMovie && this.movie.Director ? this.movie.Director : "Undefined";
      this.tableData[3].value =
        this.isMovie && this.movie.Writer ? this.movie.Writer : "Undefined";
      this.tableData[4].value =
        this.isMovie && this.movie.Actors ? this.movie.Actors : "Undefined";
      this.tableData[5].value =
        this.isMovie && this.movie.Awards ? this.movie.Awards : "Undefined";
    },
  },
};
</script>
<style lang="scss">
.movie-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 300;
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
}
.movie-content {
  background: #fff;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
  &__wrap {
    border-radius: 10px;
    max-height: 90vh;
    max-width: 1000px;
    width: 100%;
  }
  &__header {
    padding: 15px 20px;
    background-image: linear-gradient(
      45deg,
      rgb(0, 3, 38) 0%,
      rgb(82, 15, 117) 100%
    );
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      border: none;
      background: none;
      font-size: 20px;
      color: #fff;
    }
    &-title {
      color: #fff;
      font-size: 20px;
    }
    button {
      cursor: pointer;
    }
  }
  &__inner {
    padding: 10px;
  }
  &__poster {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    &-wrapp {
      position: relative;
      padding-bottom: 150%;
      border-radius: 5px;
      overflow: hidden;
      transition: all 0.2s linear;
      @media (max-width: 768px) {
        margin-bottom: 20px;
      }
    }
  }
  &__descr {
    padding-left: 20px;
    &-title {
      font-size: 40px;
      margin-bottom: 10px;
    }
    &-text {
      font-size: 18px;
      font-weight: 300;
      line-height: 1.3;
    }
    &-out {
      margin-bottom: 10px;
      .item {
        margin-right: 12px;
        margin-bottom: 10px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .el-table__row {
      .table-cell:first-child {
        font-weight: bold;
      }
    }
    .table-cell {
      padding: 10px 0;
    }
  }
}
</style>
