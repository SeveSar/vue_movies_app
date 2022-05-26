<template>
  <div class="movie-item">
    <div class="movie-poster" :style="posterBg">
      <div class="movie-item-wrapp">
        <div class="movie-item-info">
          <h3 class="movie-title">{{ movie.Title }}</h3>
          <div class="movie-year">{{ movie.Year }}</div>
        </div>
        <div class="movie-item-controls">
          <el-row>
            <el-col :span="12" class="movie-col">
              <el-button
                plain
                class="btn"
                @click="$emit('emit-info-item', movie.imdbID)"
                >Info</el-button
              >
            </el-col>
            <el-col :span="12" class="movie-col">
              <el-popconfirm
                confirmButtonText="OK"
                cancelButtonText="No, Thanks"
                icon="el-icon-info"
                iconColor="red"
                :title="'Are you sure to delete' + ' ' + movie.Title + '?'"
                @confirm="deleteItem"
              >
                <template #reference>
                  <el-button plain class="btn">Remove</el-button>
                </template>
              </el-popconfirm>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieItem",
  data() {
    return {};
  },
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteItem() {
      this.$emit("emitRemoveItem", {
        id: this.movie.imdbID,
        title: this.movie.Title,
      });
    },
  },
  computed: {
    posterBg() {
      return {
        "background-image": `url(${this.movie.Poster})`,
      };
    },
  },
};
</script>

<style lang="scss">
.movie-item {
  position: relative;
  cursor: pointer;
  transition: all 0.2s linear;
  overflow: hidden;
  border-radius: 5px;
  height: 400px;
  width: 270px;
  margin: 0 auto 30px;
  z-index: 10;
  &:hover {
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.7);
    transform: scale(1.02);
    .movie-item-wrapp {
      opacity: 1;
    }
  }
}

.movie-poster {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-repeat: no-repeat;
  z-index: -1;
  background-position: center center;
  background-size: cover;
  color: #fff;
}

.movie-title {
  font-size: 20px;
  margin-bottom: 20px;
}

.movie-year {
  font-size: 16px;
}

.movie-item-wrapp {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 20px 10px;
  background-color: rgba(0, 0, 0, 0.7);
  transition: all 0.3s linear;
  opacity: 0;
}

.btn {
  width: 100%;
  background-color: transparent !important;
  color: #fff !important;
  &:hover {
    border-color: black !important;
    background-color: #fff !important;
    color: #000 !important;
  }
}
.el-button--text {
  color: #000 !important;
}
.el-button--primary {
  color: #fff !important;
  background-color: #000 !important;
  border-color: #fff !important;
  &:hover {
    border-color: #000 !important;
    background-color: #fff !important;
    color: #000 !important;
  }
}
.movie-col {
  padding: 0 3px;
}
</style>
