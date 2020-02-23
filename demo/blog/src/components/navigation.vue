<template>
  <div class="navCom">
    <div class="navCom_title">测试</div>
    <div class="navCom_profile">
      <template v-if="loginStatus === 1">
        <!-- 登录成功 -->
        admin
      </template>
      <template v-else>
        <!-- 未登录 -->
        <el-button type="success" size="mini" @click="Startlogin">登录</el-button>
        <el-button type="success" size="mini" @click="StartRegister">注册</el-button>
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
      //0未登录 1已登录 //正在注册或者登录
      loginStatus:0,
    }
  },
  computed: {

  },
  created() {

  },
  mounted() {
    this.init();
  },
  methods: {
    init:function () {

    },
    Startlogin:function () {
      let vm = this;
      vm.$router.push({path:'/login'});
    },
    StartRegister:function () {
      let vm = this;
      vm.$router.push({path:'/register'});
    },
  }
}
</script>

<style lang="scss">
.navCom{
  @include bothSidePadding;
  width: 100%;
  height: 40px;
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