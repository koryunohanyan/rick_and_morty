<template>
  <div class="home">
    <FiltersBlock @applyFilters="applyFilters" @resetFilters="resetFilters" />
    <div class="empty-container">
      <div v-if="errorMessage">
        <p>{{ errorMessage }}</p>
      </div>
      <div v-else class="card-container">
        <div v-for="(character, index) in displayedCharacters" :key="index">
          <CardItem :character="character" />
        </div>
      </div>
    </div>
    <infinite-loading
      @infinite="infiniteHandler"
      ref="infiniteLoading"
      v-if="getPagesCount > currentPage && displayedCharacters.length > 0"
    >
      <span slot="no-more">No more characters</span>
    </infinite-loading>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import CardItem from "@/components/CardItem.vue";
import FiltersBlock from "@/components/FiltersBlock.vue";

export default {
  name: "HomeView",
  components: {
    CardItem,
    FiltersBlock,
  },
  data() {
    return {
      searchByName: "",
      searchByStatus: "",
      displayedCharacters: [],
      currentPage: 1,
      pageSize: 20,
    };
  },
  methods: {
    ...mapActions(["fetchCharacters"]),
    ...mapMutations(["resetCharacters", "setCurrentPage", "setErrorMessage"]),
    async applyFilters(filters) {
      this.searchByName = filters.name;
      this.searchByStatus = filters.status;
      this.resetCharacters();
      this.currentPage = 1;
      await this.fetchCharacters({
        page: this.currentPage,
        name: this.searchByName,
        status: this.searchByStatus,
      });
      if (this.getCharacters.length) {
        this.displayedCharacters = this.getCharacters;
        this.setErrorMessage("");
        if (this.$refs.infiniteLoading) {
          this.$refs.infiniteLoading.stateChanger.reset();
        }
      } else {
        this.setErrorMessage("There is nothing here");
        this.displayedCharacters = [];
      }
    },
    async resetFilters() {
      this.searchByName = "";
      this.searchByStatus = "";
      await this.applyFilters({
        name: this.searchByName,
        status: this.searchByStatus,
      });
    },
    async infiniteHandler($state) {
      this.currentPage++;
      await this.fetchCharacters({
        page: this.currentPage,
        name: this.searchByName,
        status: this.searchByStatus,
      });
      if (this.getCharacters.length) {
        this.displayedCharacters.push(...this.getCharacters);
        $state.loaded();
      } else {
        $state.complete();
      }
    },
  },
  computed: {
    ...mapGetters(["getCharacters", "getPagesCount", "getErrorMessage"]),
    errorMessage() {
      return this.getErrorMessage;
    },
  },
  async mounted() {
    await this.fetchCharacters({
      page: this.currentPage,
      name: this.searchByName,
      status: this.searchByStatus,
    });
    this.displayedCharacters = this.getCharacters;
  },
};
</script>

<style scoped>
.home {
  overflow: hidden;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
</style>
