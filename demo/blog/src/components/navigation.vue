<template>
  <div class="navCom">
    <div class="navCom_title">测试</div>
    <div class="navCom_profile">
      <template v-if="getLoginStatus === 1">
        <!-- 登录成功 -->
        <el-dropdown class="user_list" @command="handleClick">
          <span class="el-dropdown-link">
            {{getCurUsername}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command='login'>切换账户</el-dropdown-item>
            <el-dropdown-item command=''>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
    },
    getCurUsername(){
      return this.$store.getters.getCurUsername;
    },
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
      vm.$router.push({path:`/${status}`});
      if(value === 0){
        vm.$store.commit('loginCheck',value);
      }
    },
    //切换用户和注销
    handleClick:function (params) {
      let vm = this;
      //从sessionStorage中删除所有用户信息
      window.sessionStorage.clear();
      if(params){
        //切换用户 跳至登录页面
        vm.$router.push({path:`/${params}`});
        vm.$store.commit('loginCheck',2);
      }else{
        //退出
        vm.$store.commit('loginCheck',0);
      }
    }
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
      .user_list{
        .el-dropdown-link {
          cursor: pointer;
          color: #fff;
        }
        .el-icon-arrow-down {
          font-size: 12px;
        }
      }
    }
  }
</style>