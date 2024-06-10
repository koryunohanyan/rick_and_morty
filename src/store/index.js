import Vue from "vue";
import Vuex from "vuex";
import characters from "./characters";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    characters,
  },
});
