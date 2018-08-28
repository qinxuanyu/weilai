// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import store from './store';
import router from './router'
import  { LoadingPlugin } from 'vux'
import VueScroller from 'vue-scroller'

Vue.use(LoadingPlugin)
Vue.use(VueRouter)
Vue.use(VueScroller)

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

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
