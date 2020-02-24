<template>
  <div class="navCom">
    <div class="navCom_title">测试</div>
    <div class="navCom_profile">
      <template v-if="getLoginStatus === 1">
        <!-- 登录成功 -->
        admin
      </template>
      <template v-else-if="getLoginStatus === 0">
        <!-- 未登录 -->
        <el-button type="success" size="mini" @click="changeStatus(2,'login')">登录</el-button>
        <el-button type="success" size="mini" @click="changeStatus(2,'register')">注册</el-button>
      </template>
      <template v-else>
        <!-- 正在登陆或注册 -->
        <el-button type="success" size="mini" @click="changeStatus(0,'')">返回</el-button>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navCom',
  components: {},
  data() {
    return {

    }
  },
  computed: {
    getLoginStatus(){
      return this.$store.getters.getLoginStatus;
    }
  },
  created() {

  },
  mounted() {
    this.init();
  },
  methods: {
    init:function () {

    },
    changeStatus:function (value,status) {
      let vm = this;
      vm.$store.commit('loginCheck',value);
      vm.$router.push({path:`/${status}`});
    },
  }
}
</script>

<style lang="scss">
  .navCom{
    @include bothSidePadding;
    height: $navHeight;
    background-color: $priBlue;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &_title{
      max-width: 200px;
      height: 100%;
      font-size: 22px;
      color: #fff;
      display: flex;
      align-items: center;
    }
    &_profile{
      .el-button{
        padding: 5px;
        font-size: 14px;
      }
    }
  }
</style>