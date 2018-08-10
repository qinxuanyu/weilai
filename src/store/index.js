import Vue from 'vue'
import Vuex from 'vuex'
import tool from '@/utils/tool'
import user from './modules/user' 
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:{},
    title:'',
    isLoading:false,
  },
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
          text: 'Loading'
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
