<!-- vue 模板文件-->
<template>
	<div class="replyCom">
		<div class="reply_wrap">
			<div class="reply_info">
				Tips : {{replyTips}}
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
			//提示当前的 评论或回复 信息
			replyTips(){
				const that = this;
				let {floor,username} = that.replyInfo;
				let replyTips;
				if(username){
					//在楼层中对某个用户的评论进行回复
					replyTips = `您当前对${floor}楼用户${username}的评论进行回复`;
				}else{
					//新开一个楼层进行评论
					replyTips = `您当前对${floor}楼进行回复`;
				}
				return replyTips;
			}
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
			overflow: auto;
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
						cursor: pointer;
					}
					.op_issue{

					}
				}
			}
		}
	}

</style>