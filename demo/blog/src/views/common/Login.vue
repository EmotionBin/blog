<!-- 登录文件-->
<template>
	<div class="loginCom">
		<!-- <el-button type="success" size="mini" @click="login">登录</el-button> -->
		<div class="login_panel">
			<div class="login_panel_title">登录</div>
			<el-form class="login_panel_form" :model="loginForm" label-width="80px">
				<el-form-item label="用户名:">
					<el-input v-model="loginForm.username" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
				</el-form-item>
				<el-form-item label="密码:">
					<el-input v-model="loginForm.password" prefix-icon="el-icon-lock" placeholder="请输入密码" type="password"
            @keyup.enter.native="login" show-password></el-input>
				</el-form-item>
				<div class="login_panel_form_foot">
					<div class="login_panel_form_foot_link">
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
				console.log('登陆');
				$.ajax({
					url: "/api/login",
					type: "post",
					'Content-Type':'application/x-www-form-urlencoded',
					data: {
						username:vm.loginForm.username,
						password:vm.loginForm.password
					},
					success:function(res){
						console.log(res);
						var {status,data,detail} = res;
						if(status === 0){
							console.log('serve error');
							return ;
						}else if(detail){
							//将拿到的token写入sessionStorage
							sessionStorage.setItem('userToken', detail);
							vm.isLogin = true;
							vm.dialogInfo.isShow = true;
							vm.dialogInfo.msg = `${data},即将跳转至主界面`;
						}else if(!detail){
							vm.dialogInfo.isShow = true;
							vm.dialogInfo.msg = data;
						}
					}
				});
			},
			handleConfirm:function () {
				let vm = this;
				if(vm.isLogin){
					//登录成功跳转至首页
					vm.$store.commit('loginCheck',1);
					vm.$router.push({path:'/'});
				}else{
					vm.dialogInfo.isShow = false;
				}
			}
		}
	}
</script>

<style lang="scss">
	.loginCom{
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		.login_panel{
			padding: 20px;
			background-color: #c28e49;
			box-shadow: 0px 0px 10px #999;
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
	.loginCom_dialog{
		.el-dialog__body{
			font-size: 16px;
		}
	}
</style>