import http from "@/api/config.js";

export default {
  state: {
    characters: [],
    pagesCount: 0,
    errorMessage: "",
  },
  getters: {
    getCharacters(state) {
      return state.characters;
    },
    getPagesCount(state) {
      return state.pagesCount;
    },
    getErrorMessage(state) {
      return state.errorMessage;
    },
  },
  mutations: {
    updateCharacters(state, characters) {
      state.characters = [...state.characters, ...characters];
    },
    resetCharacters(state) {
      state.characters = [];
    },
    updatePagesCount(state, pages) {
      state.pagesCount = pages;
    },
    setErrorMessage(state, message) {
      state.errorMessage = message;
    },
  },
  actions: {
    async fetchCharacters(
      { commit },
      { page = 1, name = undefined, status = undefined }
    ) {
      const params = { page };
      if (name) {
        params.name = name;
      }
      if (status) {
        params.status = status;
      }
      try {
        const response = await http.get(`/character/`, {
          params,
        });

        commit("updatePagesCount", response.data.info.pages);
        commit("updateCharacters", response.data.results);
        commit("setErrorMessage", "");
      } catch (error) {
        commit("setErrorMessage", "There is nothing here");
        commit("updateCharacters", []);
        commit("updatePagesCount", 0);
      }
    },
  },
};
