<template>
  <div id="app">
    <!-- 横屏提示 -->
      <div >
          <div class="lateral-tip" v-show="showLateralTip">
              <p>为了更好的体验<br>请将您的手机或者平板竖起来</p>
          </div>
      </div>
    <router-view></router-view>
    <bottom-tab :text-color="'red'" v-show="showTabbar"></bottom-tab>
  </div>
</template>

<script>
import BottomTab from '@/components/BottomTab.vue';
import { mapState } from "vuex";
import tool from "@/utils/tool"
import api from '@/api'
export default {
  name: 'app',
  data (){
    return {
      showLateralTip:false,
    }
  },
  components:{
    BottomTab
  },
  computed:{
      ...mapState([
        'tabbarItems'
      ]),
      showTabbar() {
          return this.tabbarItems.indexOf(this.$route.path) !== -1;
      },
  },
  methods:{
    orientationChange() {
        if (window.orientation == 90 || window.orientation == -90) {
            this.showLateralTip = true;
        } else {
            this.showLateralTip = false;
        }
    },
  },
  created() {
    let token = tool.local.get('token');
    let _this = this;
    
  },
  mounted() {
    this.orientationChange();
    window.removeEventListener("orientationchange", this.orientationChange, false);
    window.addEventListener("orientationchange", this.orientationChange, false);
    
  },
  updated() {
    // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx813ac11958aee71a&redirect_uri=http://192.168.1.123:8080&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
    
  },
  destoryed() {
      window.removeEventListener("orientationchange", this.orientationChange, false);
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import 'style/commin.less';
body {
  background-color: #fbf9fe;
}
html { 
  font-family: '微软雅黑';
  font-size: 14px;
  color: #2f2f2f;
}
</style>
