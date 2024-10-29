import { createStore } from 'vuex';
import darkLightStore from './darkLightStore';

const store = createStore({
  modules: {
    darkLight: darkLightStore
  }
});

export default store;
