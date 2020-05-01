<!-- vue 模板文件-->
<template>
	<div class="replyCom">
		<div class="reply_wrap">
			<div class="reply_info">
				Tips : 
				<span class="info_text" v-if="replyInfo.username && replyInfo.floor">
					您当前对 <span class="info_blod"> {{replyInfo.floor}} </span> 楼用户 <span class="info_blod"> {{replyInfo.username}} </span> 回复
					<el-button size="mini" type="primary" @click="handleNewFloor">我要新开一层楼~</el-button>
				</span>
				<span class="info_text" v-else-if="replyInfo.floor && !replyInfo.isNew">
					您当前对 <span class="info_blod"> {{replyInfo.floor}} </span> 楼回复
					<el-button size="mini" type="primary" @click="handleNewFloor">我要新开一层楼~</el-button>
				</span>
				<span class="info_text" v-else-if="replyInfo.isNew">您当前新开一层楼留言或评论~</span>
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
						<el-popover
							popper-class="Reply_elPopover"
							placement="top"
							trigger="click">
							<div class="emoji_expression" v-for="(value,index) in emojiStore" :key="index" @click="handleChooseExpression(value)">{{value}}</div>
							<div slot="reference">😃</div>
						</el-popover>
					</div>
					<div class="op_issue">
						<el-button size="mini" type="success" @click="handleSendReply">发送</el-button>
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
				//评论或留言的文本
				replyData:'',
				//emoji表情库
				emojiStore:['😃','😆','😊','😅','😒','😕','😢']
			}
		},
		computed: {

		},
		created() {

		},
		mounted() {

		},
		methods: {
			//Tips中，点击新建一层楼进行评论或回复
			handleNewFloor(){
				const that = this;
				that.$emit('newFloor');
			},
			//点击发表发送评论或回复
			handleSendReply(){
				const that = this;
				//发表的内容不能为空
				if(that.replyData.trim() === ''){
					console.log('发表的内容不能为空!');
					that.$message({
						message: '发表的内容不能为空!',
						type: 'warning'
					});
					//清空数据
					that.replyData = '';
					return ;
				}
				const replyContent = {
					floor:that.replyInfo.floor,
					content:that.replyData,
					reply:that.replyInfo.username
				}
				that.$emit('sendReply',replyContent);
				//清空数据
				that.replyData = '';
			},
			//点击选择emoji表情
			handleChooseExpression(expression){
				const that = this;
				that.replyData += expression;
			}
		}

	}
</script>

<style lang="scss">
	$commonPadding:10px;
	.replyCom{
		width: 100%;
		height: 160px;
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
				color: #95a5a6;
				.info_blod{
					color: #000;
					font-weight: bold;
				}
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
    			padding: 0 $commonPadding;
					.op_emoji{
						margin: 0 4px;
						cursor: pointer;
					}
					.op_issue{
						margin: 0 4px;
					}
				}
			}
		}
	}

</style>