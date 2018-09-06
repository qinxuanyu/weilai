// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import store from './store';
import router from './router'
import  { LoadingPlugin,ConfirmPlugin  } from 'vux'
import tool from '@/utils/tool'
import VueScroller from 'vue-scroller'
import api from '@/api'
Vue.use(LoadingPlugin)
Vue.use(VueRouter)
Vue.use(VueScroller)
Vue.use(ConfirmPlugin)

FastClick.attach(document.body)
Vue.prototype.showTips = function (text) {
  if (!text) {
      return;
  }

  let width = (text.length + 1.5 ) * 16;
  let maxWidth = document.documentElement.clientWidth * 0.9;
  width = width > maxWidth ? maxWidth : width;
  width /= 16;
  width = width > 7.6 ? width : 7.6;

  this.$vux.toast.show({
      position: "top",
      type: "text",
      width: width + "em",
      text
  });

  return false;
};
Vue.config.productionTip = false


if(!store.getters.token && !tool.local.get('isAuth')){
  // api.getToken({
  //   id:1
  // }).then( data =>{
  //   store.commit('SET_TOKEN',data)
  // }).catch(e =>{})
  window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx813ac11958aee71a&redirect_uri=http%3a%2f%2fplant.mikao1688.com%2f%23%2f&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
  tool.local.set('isAuth','on')
}
/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
