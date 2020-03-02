<template>
  <div id="app">
    <Navigation/>
    <div class="route">
      <router-view/>
    </div>
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
      return this.$store.getters.getDialogInfo;
    }
  },
  methods:{
    handleClose:function () {
      let vm = this;
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
  @include bothSidePadding;
}
</style>
