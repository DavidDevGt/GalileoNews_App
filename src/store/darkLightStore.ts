import { createStore } from 'vuex';
import { ActionContext } from 'vuex';

interface DarkLightState {
  isDark: boolean;
}

const darkLightStore = {
  namespaced: true, // Importante: añadir namespaced: true
  state: (): DarkLightState => ({
    isDark: localStorage.getItem('isDark') === 'true'
  }),
  mutations: {
    toggleDarkMode(state: DarkLightState) {
      state.isDark = !state.isDark;
      localStorage.setItem('isDark', state.isDark.toString());
    },
    setDarkMode(state: DarkLightState, isDark: boolean) {
      state.isDark = isDark;
      localStorage.setItem('isDark', state.isDark.toString());
    }
  },
  actions: {
    toggleDarkMode({ commit }: ActionContext<DarkLightState, unknown>) {
      commit('toggleDarkMode');
    },
    initializeDarkMode({ commit }: ActionContext<DarkLightState, unknown>) {
      const isDark = localStorage.getItem('isDark') === 'true';
      commit('setDarkMode', isDark);
    }
  },
  getters: {
    isDark(state: DarkLightState) {
      return state.isDark;
    }
  }
};

export default darkLightStore;