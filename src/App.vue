<template>
  <div id="app" :class="{'padddin-bottom-50' : !showTabbar}">
    <!-- 横屏提示 -->
		<div v-transfer-dom> 
			<div class="lateral-tip" v-show="showLateralTip">
				<p>为了更好的体验<br>请将您的手机或者平板竖起来</p>
			</div>
		</div>
      	<x-header v-show="showHeader" :right-options="{showMore: true}" @on-click-more="showMenusFun">{{title}}</x-header>
		  <div class="more" v-show="showMenus && showHeader">
			<div class="triangle"></div>
			<ul>
				<li @click="$router.push('/');showMenus = false;">首页</li>
				<li @click="$router.push('/goods');showMenus = false;">PLUS会员</li>
				<li @click="$router.push('/my');showMenus = false;">我的</li>
        <li @click="clearToken">清除缓存</li>
			</ul>
		</div>
		<transition name="vux-pop-in">
			<router-view class="router-view" @click.native.stop="menusFidden"></router-view>

		</transition>
    	<bottom-tab :text-color="'red'" v-show="!showTabbar"></bottom-tab>
		
    <!-- <div v-transfer-dom>
      <actionsheet :menus="menus" v-model="showMenus" show-cancel></actionsheet>
    </div> -->
  </div>
</template>

<script>
import BottomTab from "@/components/BottomTab.vue";
import {TransferDom, XHeader, Popover, Actionsheet } from 'vux';
import { mapState } from "vuex";
import tool from "@/utils/tool";
import api from "@/api";
export default {
  name: "app",
  data() {
    return {
      showLateralTip: false,
      showMenus: false,
      menus: {
        menu1: 'Take Photo',
        menu2: 'Choose from photos'
      },
    };
  },
  components: {
    BottomTab,
    XHeader,
    Popover,
    Actionsheet 
  },
  directives: {
      TransferDom
  },
  computed: {
    ...mapState(["tabbarItems",'title','headerItems']),
    showTabbar() {
      return this.tabbarItems.indexOf(this.$route.path) === -1;
	},
	showHeader (){
		return this.headerItems.indexOf(this.$route.path) !== -1;
	}
  },
  methods: {
    orientationChange() {
      if (window.orientation == 90 || window.orientation == -90) {
        this.showLateralTip = true;
      } else {
        this.showLateralTip = false;
      }
    },
    menusFidden(){
      this.showMenus = false;
    },
    showMenusFun (){
      this.showMenus = !this.showMenus;
    },
    clearToken (){
      tool.local.clear('token');
      tool.local.clear('payOpenId');
      this.showMenus = false;
    }
  },
  created() {
    let token = tool.local.get("token");
    let _this = this;
  },
  mounted() {
    this.orientationChange();
    window.removeEventListener(
      "orientationchange",
      this.orientationChange,
      false
    );
    window.addEventListener("orientationchange", this.orientationChange, false);
  },
  updated() {
  },
  destoryed() {
    window.removeEventListener(
      "orientationchange",
      this.orientationChange,
      false
    );
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
@import "style/commin.less";
body {
  // background-color: #fbf9fe;
   background-color: #fff;
}
html {
  font-family: "微软雅黑";
  font-size: 14px;
  color: #212121;
}
.padddin-bottom-50{
   padding-bottom: 50px;
}
.more{
	position: fixed;
	right: 20px;
	top: 70px;
	z-index: 100;
	.triangle{
		width: 20px;
		height: 20px;
		position: absolute;
		top: -10px;
		right: 10px;
		background-color: #e95701;
		transform: rotate(45deg)
	}
	ul{
		background-color: #e95701;
		color: #fff;
		li{
			width: 100px;
			line-height: 40px;
			padding-left: 20px;
		}
	}
}
.router-view{
  // position: fixed;
  // left: 0;
  // top: 0;
  // bottom: 0;
  // width: 100%;
  // height: 100%;
  // overflow-x: hidden;
  // overflow-y: auto;
  // -webkit-overflow-scrolling: touch;
}
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: transform 500ms;
}

.vux-pop-out-enter {
  transform: translateX(-100%);
}

.vux-pop-out-leave-active {
  transform: translateX(100%);
}

.vux-pop-in-enter {
  transform: translateX(100%);
}

.vux-pop-in-leave-active {
  transform: translateX(-100%);
}
.weui-dialog__btn_primary{
  color: #e95701;
}
</style>
