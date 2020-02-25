<!-- vue 模板文件-->
<template>
	<div class="loginCom">
		<el-button type="success" size="mini" @click="login">登录</el-button>
	</div>
</template>

<script>
	export default {
		name: 'loginCom',
		components: {},
		data() {
			return {

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
		@include bothSidePadding;
		height: calc(100% - #{$navHeight});
	}

</style>