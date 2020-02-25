<!-- vue 模板文件-->
<template>
	<div class="registerCom">
		<el-button type="success" size="mini" @click="register">注册</el-button>
	</div>
</template>

<script>
	export default {
		name: 'registerCom',
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
			register:function () {
				console.log('注册');
				//测试
				$.ajax({
					url: "/api/login",
					type: "post",
					'Content-Type':'application/x-www-form-urlencoded',
					authority:true,
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
					}
				});
			}
		}

	}
</script>

<style lang="scss">
	.registerCom{
		@include bothSidePadding;
	}

</style>