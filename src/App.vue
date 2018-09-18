<template>
  <div id="app">
    <!-- 横屏提示 -->
      <div v-transfer-dom>
          <div class="lateral-tip" v-show="showLateralTip">
              <p>为了更好的体验<br>请将您的手机或者平板竖起来</p>
          </div>
      </div>
      <transition name="vux-pop-in">
          <router-view></router-view>

      </transition>
    <bottom-tab :text-color="'red'" v-show="showTabbar"></bottom-tab>
  </div>
</template>

<script>
import BottomTab from "@/components/BottomTab.vue";
import {TransferDom} from 'vux';
import { mapState } from "vuex";
import tool from "@/utils/tool";
import api from "@/api";
export default {
  name: "app",
  data() {
    return {
      showLateralTip: false
    };
  },
  components: {
    BottomTab
  },
  directives: {
      TransferDom
  },
  computed: {
    ...mapState(["tabbarItems"]),
    showTabbar() {
      return this.tabbarItems.indexOf(this.$route.path) !== -1;
    }
  },
  methods: {
    orientationChange() {
      if (window.orientation == 90 || window.orientation == -90) {
        this.showLateralTip = true;
      } else {
        this.showLateralTip = false;
      }
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
}
html {
  font-family: "微软雅黑";
  font-size: 14px;
  color: #2f2f2f;
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
</style>
