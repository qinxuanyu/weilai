import Vue from 'vue'
import Vuex from 'vuex'
import tool from '@/utils/tool'
import user from './modules/user' 
import getters from "./getters";
Vue.use(Vuex);

const  state = {
  userInfo:{},
  title:'',
  isLoading:false,
  tabbarItems:['/','/store/index','/store/cart','/me']
};
const store = new Vuex.Store({
  state,
  getters,
  modules:{
      user
  },
  mutations: {
    UPDATE_TITLE (state,title){
        if(title){
            state.title = title;
            document.title = title
        }
    },
    UPDATE_LOADING (state,loading){
      if(loading){
        state.isLoading = loading;
        Vue.$vux.loading.show({
          text: '加载中...'
        })
      }else{
        state.isLoading = loading;
        Vue.$vux.loading.hide()
      }
    }
  },
  actions: {

  }
})
export default store;