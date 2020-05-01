<!-- 留言板-->
<template>
	<div class="messageBoardCom">
		<div class="message_wrap">
			<div class="message_content" v-for="value in messageList" :key="value.floor">
				<div class="content_head">
					<span class="head_username">{{value.username}}</span>
					<div class="head_option">
						<el-popover
							popper-class="MessageBoard_elPopover"
							placement="bottom"
							trigger="hover">
							<div class="comment_btn" @click="handleComment(value.floor)">评论</div>
							<el-button slot="reference" type="info" size="mini" icon="el-icon-more"></el-button>
						</el-popover>
					</div>
				</div>
				<div class="content_body">
					<div class="body_data">
						<span class="data_text">{{value.content}}</span>
					</div>
					<div class="body_additional">
						<span class="additional_floor">{{value.floor}}楼</span>
						<span class="additional_time">{{value.date}}</span>
					</div>
				</div>
				<div class="content_footer">
					<div class="foot_wrap" v-for="(value1,index1) in value.comment" :key="value1.floor" :class="{'isLastComment':index1 === value.comment.length - 1}"
					@click="handleComment(value1.floor,value1.username)">
						<div class="footer_data">
							<span class="data_username">
								<template v-if="value1.reply">
									<span class="username_text">
										{{value1.username}}
									</span>
									回复 
									<span class="username_text">
									{{value1.reply}}
									</span>
								</template>
								<template v-else>
									<span class="username_text">
										{{value1.username}}
									</span>
								</template>
							</span>
							<span class="data_text">
								: {{value1.content}}
							</span>
						</div>
						<div class="footer_additional">
							<span class="additional_floor">{{value1.floor}}楼</span>
							<span class="additional_time">{{value1.date}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="message_bottom">
			<template v-if="messageList.length">
				<span class="bottom_text">我是有底线的~</span>
			</template>
			<template v-else>
				<span class="bottom_text">评论区空空如也~</span>
			</template>
		</div>
		<div class="comment_input" :class="{'isEdit':isEdit}">
			<div class="arrow_wrap">
				<div class="arrow_icon" @click="handleEdit"></div>
				<div class="arrow_mask"></div>
			</div>
			<div class="input_wrap">
				<Reply :replyInfo="editData" @newFloor="handleNewFloor" @sendReply="handleSendReply"/>
			</div>
		</div>
	</div>
</template>

<script>

	import Reply from "@/components/Reply.vue";

	export default {
		name: 'messageBoardCom',
		components: {
			Reply
		},
		data() {
			return {
				//是否输入文本
				isEdit:false,
				//要 评论/回复 的信息
				editData:{
					// 楼层
					floor:'',
					// 要回复的用户名
					username:'',
					//内容
					content:'',
					//是否新开楼层
					isNew:true
				},
				//评论的数据
				messageList:[
					// {
					// 	username:'hwb',
					// 	date:'这是一个时间戳',
					// 	floor:'1-0',
					// 	content:'测试1-0',
					// 	comment:[
					// 		{
					// 			username:'test',
					// 			date:'这是一个时间戳',
					// 			floor:'1-1',
					// 			content:'测试回复1-1',
					// 			reply:''
					// 		},
					// 		{
					// 			username:'test1',
					// 			date:'这是一个时间戳',
					// 			floor:'1-2',
					// 			content:'测试回复1-2',
					// 			reply:'test'
					// 		}
					// 	]
					// },{
					// 	username:'hwb',
					// 	date:'这是一个时间戳',
					// 	floor:'2-0',
					// 	content:'测试2-0',
					// 	comment:[
					// 		{
					// 			username:'test',
					// 			date:'这是一个时间戳',
					// 			floor:'2-1',
					// 			content:'测试回复2-1',
					// 			reply:''
					// 		},
					// 		{
					// 			username:'test1',
					// 			date:'这是一个时间戳',
					// 			floor:'2-2',
					// 			content:'测试回复2-2',
					// 			reply:'test'
					// 		}
					// 	]
					// },{
					// 	username:'hwb',
					// 	date:'这是一个时间戳',
					// 	floor:'3-0',
					// 	content:'测试3-0',
					// 	comment:[
					// 		{
					// 			username:'test',
					// 			date:'这是一个时间戳',
					// 			floor:'3-1',
					// 			content:'测试回复3-1',
					// 			reply:''
					// 		},
					// 		{
					// 			username:'test1',
					// 			date:'这是一个时间戳',
					// 			floor:'3-2',
					// 			content:'测试回复3-2',
					// 			reply:'test'
					// 		}
					// 	]
					// },{
					// 	username:'hwb',
					// 	date:'这是一个时间戳',
					// 	floor:'4-0',
					// 	content:'测试4-0',
					// 	comment:[
					// 		{
					// 			username:'test',
					// 			date:'这是一个时间戳',
					// 			floor:'4-1',
					// 			content:'测试回复4-1',
					// 			reply:''
					// 		},
					// 		{
					// 			username:'test1',
					// 			date:'这是一个时间戳',
					// 			floor:'4-2',
					// 			content:'测试回复4-2',
					// 			reply:'test'
					// 		}
					// 	]
					// },{
					// 	username:'hwb',
					// 	date:'这是一个时间戳',
					// 	floor:'5-0',
					// 	content:'测试5-0',
					// 	comment:[
					// 		{
					// 			username:'test',
					// 			date:'这是一个时间戳',
					// 			floor:'5-1',
					// 			content:'测试回复5-1',
					// 			reply:''
					// 		},
					// 		{
					// 			username:'test1',
					// 			date:'这是一个时间戳',
					// 			floor:'5-2',
					// 			content:'测试回复5-2',
					// 			reply:'test'
					// 		}
					// 	]
					// },{
					// 	username:'hwb',
					// 	date:'这是一个时间戳',
					// 	floor:'6-0',
					// 	content:'测试6-0',
					// 	comment:[
					// 		{
					// 			username:'test',
					// 			date:'这是一个时间戳',
					// 			floor:'6-1',
					// 			content:'测试回复6-1',
					// 			reply:''
					// 		},
					// 		{
					// 			username:'test1',
					// 			date:'这是一个时间戳',
					// 			floor:'6-2',
					// 			content:'测试回复6-2',
					// 			reply:'test'
					// 		}
					// 	]
					// }
				]
			}
		},
		computed: {
			getCurArticleId(){
				return this.$store.getters.getCurArticleId;
			},
			getCurUsername(){
				return this.$store.getters.getCurUsername;
			}
		},
		watch:{
			getCurArticleId:{
				handler(val){
					const that = this;
					console.log('当前的ID为:',val);
					that.getCommentList(val);
				},
				immediate: true
			}
		},
		created() {

		},
		mounted() {

		},
		beforedestory(){
			//每次组件销毁前，取消对各个事件的监听
			this.$off('newFloor');
			this.$off('sendReply');
		},
		methods: {
			//查询评论信息
			getCommentList(articleId){
				const that = this;
				//每次查数据前判断一下,若符合以下条件直接返回
				//1. articleId为空
				//2. articleId为Articles
				if(!articleId || articleId === 'Articles'){
					return;
				}
				//待优化!!
				//每次请求成功后将数据放入localStorage中，并给该数据加上一个时间戳
				//每次请求前都判断一下，当前时间戳与localStorage中的时间戳是否大于1分钟，如果大于则重新请求，不大于则使用缓存
				$.ajax({
					url: "/api/getCommentList",
					type: "get",
					'Content-Type':'application/x-www-form-urlencoded',
					data: {
						articleId:articleId
					},
					success:res => {
						console.log(res);
						var {status,data,detail} = res;
						if(status === 0){
							console.log('serve error');
							that.$message({
								message: res.data,
								type: 'error'
							});
							return ;
						}else{
							that.messageList = data;
							//把楼层定位到最新一层楼
							that.resetInfo(`${data.length + 1}-0`,'',true,'');
						}
					}
				});
			},
			//点击 打开/收起 输入区域
			handleEdit(){
				const that = this;
				that.isEdit = !that.isEdit;
			},
			//点击评论
			handleComment(floor,target = ''){
				const that = this;
				that.isEdit = true;
				console.log(floor,target);
				that.resetInfo(floor,target,false,'');
			},
			//新建一层楼进行评论或回复
			handleNewFloor(){
				const that = this;
				that.resetInfo(`${that.messageList.length + 1}-0`,'',true,'');
			},
			//点击发表评论或回复
			handleSendReply(data){
				const that = this;
				console.log(data);
				const {floor,content,reply} = data;
				//如果数组中存在当前评论的楼层，则直接在该楼层尾楼添加
				//如不存在说明为新开楼层
				let curFloor;
				const floorFirstNum = Number.parseInt(floor.split('-')[0]);
				if(floorFirstNum > that.messageList.length){
					//如果传过来的楼层数大于当前所有楼层数，则为新开楼层
					curFloor = floor;
				}else{
					//否则为评论楼中楼
					const commentList = that.messageList[floorFirstNum - 1].comment;
					curFloor = `${floorFirstNum}-${commentList.length + 1}`;
				}
				console.log(curFloor);
				$.ajax({
					url: "/api/addComment",
					type: "post",
					'Content-Type':'application/x-www-form-urlencoded',
					data: {
						username:that.getCurUsername,
						floor:curFloor,
						//这里注意上传的时候需要对内容进行编码，因为可能含有emoji表情
						content:encodeURI(content),
						reply,
						articleId:that.getCurArticleId
					},
					success:res => {
						console.log(res);
						const {status,data,detail} = res;
						if(status === 0){
							console.log('serve error');
							that.$message({
								message: data,
								type: 'error'
							});
							return ;
						}else{
							// 请求成功后，前台把评论内容加上
							const floorSectNum = Number.parseInt(floor.split('-')[1]);
							if(floorFirstNum > that.messageList.length){
								//如果传过来的楼层数大于当前所有楼层数，则为新开楼层
								const info = {
									username:that.getCurUsername,
									date:detail,
									floor:curFloor,
									content,
									comment:[]
								}
								that.messageList.push(info);
								console.log('添加评论成功');
							}else{
								//反之则为评论
								const info = {
									username:that.getCurUsername,
									date:detail,
									floor:curFloor,
									content,
									reply
								}
								that.messageList[floorFirstNum - 1].comment.push(info);
								console.log('添加评论成功');
							}
							//把楼层定位到最新一层楼
							that.resetInfo(`${that.messageList.length + 1}-0`,'',true,'');
						}
					}
				});
			},
			//重新设置参数
			resetInfo(floor,username,isNew,content){
				this.editData.floor = floor;
				this.editData.username = username;
				this.editData.isNew = isNew;
				this.editData.content = content;
			}
		}

	}
</script>

<style lang="scss">
	$padding_value:20px;
	.messageBoardCom{
		width: 100%;
		// padding: $padding_value;
		.message_wrap{
			width: 100%;
			.message_content{
				display: flex;
				flex-direction: column;
				width: 100%;
				padding: 4px 0px $padding_value 0px;
				.content_head{
					display: flex;
					width: 100%;
					padding: 4px 0;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1px solid #d1d1d1;
					.head_username{
						font-size: 24px;
    				font-weight: 600;
					}
					.el-button{
						padding: 2px 4px;
					}
				}
				.content_body{
					position: relative;
					width: 100%;
					.body_data{
						display: -webkit-box;
						overflow: hidden;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 5;
						width: 100%;
						margin: $padding_value 16px;
					}
					.body_additional{
						position: absolute;
						right: 10px;
						bottom: 2px;
						display: flex;
						justify-content: flex-end;
						color: #6b6b6b;
    				font-size: 14px;
						.additional_floor{
							margin-right: $padding_value;
						}
					}
				}
				.content_footer{
					width: 100%;
					padding: 0 10px;
					background-color: #e0dfcc;
					border-radius: 6px;
					box-shadow: 0 0 2px #d1d1d1;
					.foot_wrap{
						width: 100%;
						padding: $padding_value 10px;
						position: relative;
						border-bottom: 1px solid #6b4a4a38;
						cursor: pointer;
						&.isLastComment{
							border-bottom: none;
						}
					}
					.footer_data{
						.data_username{
							.username_text{
								font-size: 18px;
								font-weight: 600;
							}
						}
					}
					.footer_additional{
						position: absolute;
						right: 10px;
						bottom: 2px;
						display: flex;
						justify-content: flex-end;
						color: #6b6b6b;
    				font-size: 14px;
						.additional_floor{
							margin-right: $padding_value;
						}
					}
				}
			}
		}
		.message_bottom{
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			padding: 50px;
			color: #4e4646;
			font-size: 24px;
			border-top: 1px solid #d1d1d1;
		}
		.comment_input{
			position: fixed;
			bottom: 0;
			// width: calc(60% - 2 * #{$padding_value});
			width: 60%;
			// padding: 10px;
			transform: translateY(80%);
			transition: transform .3s cubic-bezier(.9, 0, .3, .7);
			.arrow_wrap{
				width: 100%;
				display: flex;
				justify-content: center;
				.arrow_icon{
					width: 60px;
					height: 24px;
					background-image: url('/images/arrow/arrow.svg');
					background-position: center center;
					background-size: 40%;
					background-repeat: no-repeat;
					background-color: #fff;
					border-radius: 3px;
					transform:rotate(180deg);
					cursor: pointer;
					@include commonShadow;
				}
				.arrow_mask{
					position: absolute;
					z-index: 1;
					top: 20px;
					left: 50%;
					width: 60px;
					height: 10px;
					background-color: #fff;
					transform: translateX(-50%);
				}
			}
			.input_wrap{
				width: 100%;
				background-color: #fff;
				border-radius: 10px;
				@include commonShadow;
			}
			&.isEdit{
				transform: translateY(20px);
				.arrow_icon{
					transform:rotate(0deg);
				}
			}
		}
	}
</style>