<!-- vue 模板文件-->
<template>
	<div class="replyCom">
		<div class="reply_wrap">
			<div class="reply_info">
				回复信息:{{replyInfo.floor}},{{replyInfo.username}}
			</div>
			<div class="reply_content">
				<div class="content_data">
					<el-input
						type="textarea"
						:autosize="{ minRows: 1, maxRows: 4}"
						placeholder="请输入内容"
						v-model="replyData">
					</el-input>
				</div>
				<div class="content_op">
					<div class="op_emoji">
						😃
					</div>
					<div class="op_issue">
						<el-button size="mini" type="primary">发送</el-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'replyCom',
		components: {},
		props:{
			replyInfo:Object
		},
		data() {
			return {
				replyData:'asdasd'
			}
		},
		computed: {

		},
		created() {

		},
		mounted() {

		},
		methods: {

		}

	}
</script>

<style lang="scss">
	$commonPadding:10px;
	.replyCom{
		width: 100%;
		height: 200px;
		padding: 20px;
		.reply_wrap{
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			flex-direction: column;
			.reply_info{
				width: 100%;
				padding: $commonPadding;
			}
			.reply_content{
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				padding: $commonPadding;
				.content_data{
					width: 90%;
				}
				.content_op{
					display: flex;
					justify-content: space-between;
					align-items: center;
					width: 10%;
    			padding: 0 $commonPadding;
					.op_emoji{

					}
					.op_issue{

					}
				}
			}
		}
	}

</style>