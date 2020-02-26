<!-- 注册文件-->
<template>
	<div class="registerCom">
		<!-- <el-button type="success" size="mini" @click="register">注册</el-button> -->
		<div class="register_panel">
			<div class="register_panel_title">注册</div>
			<el-form class="register_panel_form" :model="registerForm" label-width="80px">
				<el-form-item label="用户名:">
					<el-input v-model="registerForm.username" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
				</el-form-item>
				<el-form-item label="密码:">
					<el-input v-model="registerForm.password" prefix-icon="el-icon-lock" placeholder="请输入密码" type="password"
            @keyup.enter.native="register" show-password></el-input>
				</el-form-item>
				<div class="register_panel_form_foot">
					<div class="register_panel_form_foot_link">
						<router-link class="register_panel_form_foot_text" to="/login">已有账号?点击登录</router-link>
					</div>
					<el-button class="register_panel_form_foot_btn" type="success" size="mini" @click="register">注册</el-button>
				</div>
			</el-form>
		</div>
		<el-dialog
      class="registerCom_dialog"
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
		name: 'registerCom',
		components: {},
		data() {
			return {
				registerForm:{
					username:'',
					password:''
				},
				dialogInfo:{
					isShow:false,
					msg:''
				},
				isRegister:false
			}
		},
		computed: {

		},
		created() {

		},
		mounted() {

		},
		methods: {
			register:function () {
				let vm = this;
				console.log('注册');
				if(!vm.registerForm.username || !vm.registerForm.password){
					vm.dialogInfo.isShow = true;
					vm.dialogInfo.msg = '用户名或密码不能为空';
					return ;
				}
				$.ajax({
					url: "/api/register",
					type: "post",
					'Content-Type':'application/x-www-form-urlencoded',
					// authority:true,
					data: {
						username:vm.registerForm.username,
						password:vm.registerForm.password
					},
					success:function(res){
						console.log(res);
						var {status,data,detail} = res;
						if(status === 0){
							console.log('serve error');
							return ;
						}else if(detail){
							vm.isRegister = true;
							vm.dialogInfo.isShow = true;
							vm.dialogInfo.msg = `${data},您的用户名为${detail},即将跳转至登录界面`;
						}else if(!detail){
							vm.dialogInfo.isShow = true;
							vm.dialogInfo.msg = data;
						}
					}
				});
			},
			handleConfirm:function () {
				let vm = this;
				if(vm.isRegister){
					vm.$router.push({path:'/login'});
				}else{
					vm.dialogInfo.isShow = false;
				}
			}
		}
	}
</script>

<style lang="scss">
	.registerCom{
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		.register_panel{
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
	.registerCom_dialog{
		.el-dialog__body{
			font-size: 16px;
		}
	}
</style>