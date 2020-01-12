import Vue from 'vue'
import Vuex from 'vuex'
import {
  generateRoutes
} from '@/permission'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    menuData: [],
  },
  getters: {
    menuData: state => state.menuData, // 后台菜单数据
  },
  mutations: {
    SET_MENU_DATA(state, data) {
      state.menuData = data
    },
  },
  actions: {
    getValidRoutes({
      commit
    }, role) {
      return new Promise(resolve => {
        let validRoutes = generateRoutes( role, commit)
        resolve(validRoutes);
      })
    },
  },
  modules: {}
})