<!-- 登录文件-->
<template>
	<div class="loginCom">
		<!-- <el-button type="success" size="mini" @click="login">登录</el-button> -->
		<div class="login_panel">
			<div class="login_panel_title">登录</div>
			<!-- 表单模块 -->
			<el-form class="login_panel_form"  ref="loginForm" :rules="rules" :model="loginForm" label-width="80px">
				<el-form-item label="用户名:" prop="username">
					<el-input v-model="loginForm.username" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
				</el-form-item>
				<el-form-item label="密码:" prop="password">
					<el-input v-model="loginForm.password" prefix-icon="el-icon-lock" placeholder="请输入密码" type="password"
            @keyup.enter.native="login" show-password></el-input>
				</el-form-item>
				<div class="login_panel_form_foot">
					<div class="login_panel_form_foot_link">
						<!-- <a class="login_panel_form_foot_text" href="/register">没有账号?点击注册</a> -->
						<router-link class="login_panel_form_foot_text" to="/register">没有账号?点击注册</router-link>
					</div>
					<el-button class="login_panel_form_foot_btn" type="success" size="mini" @click="login">登录</el-button>
				</div>
			</el-form>
		</div>
		<el-dialog
      class="loginCom_dialog"
      title="提示"
      :visible.sync="dialogInfo.isShow"
			:before-close="handleConfirm"
      :close-on-click-modal="false"
      width="20%"
      :append-to-body="true">
      <span>{{dialogInfo.msg}}</span>
      <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'loginCom',
		components: {},
		data() {
			return {
				loginForm:{
					username:'',
					password:''
				},
				dialogInfo:{
					isShow:false,
					msg:''
				},
				//表单校验规则
				rules:{
					username:[
						{ required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
					],
					password:[
						{ required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
					],
				},
				isLogin:false
			}
		},
		computed: {

		},
		created() {

		},
		mounted() {

		},
		methods: {
			login:function () {
				let vm = this;
				this.$refs.loginForm.validate((valid) => {
          if (valid) {
						//md5加密后的密码
						let password_md5 = utility.md5(vm.loginForm.password);
						console.log('登陆');
						//通过表单验证之后发送请求
            $.ajax({
							url: "/api/login",
							type: "post",
							'Content-Type':'application/x-www-form-urlencoded',
							data: {
								username:vm.loginForm.username,
								password:password_md5
							},
							success:res => {
								console.log(res);
								var {status,data,detail} = res;
								if(status === 0){
									console.log('serve error');
									vm.$message({
										message: res.data,
										type: 'error'
									});
									return ;
								}else if(detail){
									//将拿到的token写入sessionStorage
									sessionStorage.setItem('userToken', detail);
									vm.$store.commit('updateUserToken',detail);
									//将用户名写入vuex
									vm.$store.commit('updateCurUsername',vm.loginForm.username);
									vm.isLogin = true;
									vm.dialogInfo.isShow = true;
									vm.dialogInfo.msg = `${data},即将跳转至主界面`;
								}else if(!detail){
									vm.dialogInfo.isShow = true;
									vm.dialogInfo.msg = data;
								}
							}
						});
          } else {
            this.$message.error('输入的信息有误，请仔细核对');
            return false;
          }
        });
			},
			handleConfirm:function () {
				let vm = this;
				if(vm.isLogin){
					//登录成功跳转至首页
					// vm.$store.commit('loginCheck',1);
					vm.$router.push({path:'/home'});
				}else{
					vm.dialogInfo.isShow = false;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.loginCom{
		//防止路由切换的过渡效果出现滚动条
		position: absolute;
		width: 100%;
		// height: 100%;
		height: calc(100vh - #{$navHeight});
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: $themeColor;
		.login_panel{
			padding: 20px;
			background-color: #fff;
			@include commonShadow;
			border-radius: 5px;
			&_title{
				text-align: center;
				font-size: 24px;
				color: #000;
				padding-bottom: 20px;
			}
			&_form{
				.el-form-item__label{
					font-size: 16px;
				}
				&_foot{
					&_link{
						width: 100%;
						display: flex;
						justify-content: flex-end;
						cursor: pointer;
						&_text{
							font-size: 14px;
						}
					}
					&_btn{
						width: 100%;
						letter-spacing: 8px;
						margin-top: 8px;
						font-weight: 700;
						font-size: 16px;
					}
				}
			}
		}
	}
</style>