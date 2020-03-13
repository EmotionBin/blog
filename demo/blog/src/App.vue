<template>
  <div id="app">
    <!-- 导航栏 -->
    <Navigation/>
    <div class="route">
      <!-- 每个路由切换的时候添加上切换的动画效果 -->
      <transition name="view-fade">
        <router-view/>
      </transition>
    </div>
    <!-- 全局的提示框 -->
    <el-dialog
      class="app_dialog"
      title="提示"
      :visible.sync="getDialogInfo.isShow"
      :close-on-click-modal="false"
      width="20%"
      :before-close="handleClose"
      :append-to-body="true">
      <span>{{getDialogInfo.msg}}</span>
      <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import Navigation from '@/components/Navigation.vue'

export default {
  name: 'app',
  components: {
    Navigation
  },
  data(){
    return {
      
    }
  },
  computed:{
    getDialogInfo:function () {
      //获取提示框信息
      return this.$store.getters.getDialogInfo;
    }
  },
  methods:{
    handleClose:function () {
      let vm = this;
      //关闭提示框
      vm.$store.commit('updateDialog',{
        isShow:false,
        msg:''
      });
    }
  }
}
</script>

<style lang="scss">
//引入公共样式
@import "./sass/common.scss";
.route{
  // @include bothSidePadding;
  // min-height: calc(100vh - #{$navHeight});
  
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .view-fade-enter-active {
    transition: transform .5s cubic-bezier(.9, 0, .3, .7);
  }
  .view-fade-leave-active {
    transition: transform .5s cubic-bezier(.9, 0, .3, .7);
  }
  .view-fade-enter, .view-fade-leave-to {
    transform: translateX(100%);
  }
}
</style>
