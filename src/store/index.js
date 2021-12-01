import { createStore } from "vuex";
import axios from "axios";
import { BASE_API_URL } from "../constants";

export default createStore({
  state: {
    // profile: {id: 1, name: "John Doe", email: "john@gmail.com" },
    profile: null,
  },
  mutations: {
    SET_USER_PROFILE(state, newProfile) {
      state.profile = newProfile;
    },
  },
  actions: {
    async getProfile({ commit }) {
      //get profile from backend
      const token = JSON.parse(localStorage.getItem("token"));
      if (token) {
        const response = await axios.get(`${BASE_API_URL}/api/profile`, {
          headers: { Authorization: "Bearer " + token.access_token },
        });
        const newProfile = JSON.parse(
          JSON.stringify(response.data?.data?.user)
        ); //{id:1, name: 'John', ...}
        commit("SET_USER_PROFILE", newProfile);
      }
    },
  },
  modules: {},
});
