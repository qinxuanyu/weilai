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
  tabbarItems:['/','/qr-code','/store/cart','/my'],
  headerItems:['/my-friend','/explain','/goods','/order','/my-wallet/2','/my-wallet/1','/details/1','/details/2','/details/3','/qr-code','/code']
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
            document.title = '未来商城'
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
store.dispatch("GET_SESSION_TOKEN");
export default store;