<!-- vue 模板文件-->
<template>
	<div class="loginCom">
		<!-- <el-button type="success" size="mini" @click="login">登录</el-button> -->
		<div class="login_panel">
			<div class="login_panel_title">登录</div>
			<el-form :model="loginForm" label-width="80px">
				<el-form-item label="用户名">
					<el-input v-model="loginForm.username" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
				</el-form-item>
				<el-form-item label="密码">
					<el-input v-model="loginForm.password" prefix-icon="el-icon-lock" placeholder="请输入密码" type="password"
            @keyup.enter.native="login" show-password></el-input>
				</el-form-item>
			</el-form>
		</div>
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
				}
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
				// let vm = this;
				console.log('登陆');
				$.ajax({
					url: "/api/login",
					type: "post",
					'Content-Type':'application/x-www-form-urlencoded',
					data: {
						username:'test',
						password:123456
					},
					success:function(res){
						console.log(res);
						var {status,data,detail} = res;
						if(status === 0){
							console.log('serve error');
							return ;
						}
						//将拿到的token写入sessionStorage
						sessionStorage.setItem('userToken', detail);
					}
				});
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
			&_title{
				text-align: center;
				font-size: 24px;
				color: #000;
				padding: 20px 0;
			}
		}
	}

</style>