<template>
  <div class="filters-block">
    <div class="filters-block__search">
      <input
        type="text"
        v-model="localSearchByName"
        placeholder="Search by name"
        class="filters-block__input"
      />
      <div class="filters-block__select-wrapper">
        <label for="status" class="filters-block__label"
          >Filter by status:</label
        >
        <select
          name="status"
          id="status"
          v-model="localSearchByStatus"
          class="filters-block__select"
        >
          <option value="">All</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
      <div class="filters-block__buttons">
        <button @click="apply" class="filters-block__button">Apply</button>
        <button @click="reset" class="filters-block__button">Reset</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FiltersBlock",
  data() {
    return {
      localSearchByName: "",
      localSearchByStatus: "",
    };
  },
  methods: {
    apply() {
      this.$emit("applyFilters", {
        name: this.localSearchByName,
        status: this.localSearchByStatus,
      });
    },
    reset() {
      this.localSearchByName = "";
      this.localSearchByStatus = "";
      this.$emit("resetFilters");
    },
  },
};
</script>

<style scoped>
.filters-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid black;
  box-sizing: border-box;
}

.filters-block__search {
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
}

.filters-block__input,
.filters-block__select {
  margin-bottom: 10px;
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.filters-block__select-wrapper {
  margin-bottom: 10px;
  width: 100%;
  box-sizing: border-box;
}

.filters-block__label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.filters-block__buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
}

.filters-block__button {
  background: transparent;
  padding: 8px 30px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.filters-block__button:hover {
  background-color: #f0f0f0;
}
</style>
