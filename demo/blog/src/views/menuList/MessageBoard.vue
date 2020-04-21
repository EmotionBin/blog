<!-- 留言板-->
<template>
	<div class="messageBoardCom">
		<div class="message_wrap">
			<div class="message_content" v-for="(value,index) in messageList">
				<div class="content_head">
					<span class="head_username">{{value.username}}</span>
					<div class="head_option">
						 <el-popover
							popper-class="MessageBoard_elPopover"
							placement="bottom"
							trigger="hover">
							<div class="comment_btn">评论</div>
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
					<div class="foot_wrap" v-for="(value1,index1) in value.comment" :class="{'isLastComment':index1 === value.comment.length - 1}">
						<div class="footer_data">
							<span class="data_username">
								{{value1.username}}
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
	</div>
</template>

<script>
	export default {
		name: 'messageBoardCom',
		components: {},
		data() {
			return {
				messageList:[
					{
						username:'hwb',
						date:'这是一个时间戳',
						floor:'1-0',
						content:'测试',
						comment:[
							{
								username:'test',
								date:'这是一个时间戳',
								floor:'1-1',
								content:'测试回复1',
								reply:''
							},
							{
								username:'test1',
								date:'这是一个时间戳',
								floor:'1-2',
								content:'测试回复2',
								reply:'test'
							}
						]
					},{
						username:'hwb',
						date:'这是一个时间戳',
						floor:'1-0',
						content:'测试',
						comment:[
							{
								username:'test',
								date:'这是一个时间戳',
								floor:'1-1',
								content:'测试回复1',
								reply:''
							},
							{
								username:'test1',
								date:'这是一个时间戳',
								floor:'1-2',
								content:'测试回复2',
								reply:'test'
							}
						]
					}
				]
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
	.messageBoardCom{
		width: 100%;
		padding: 20px;
		.message_wrap{
			width: 100%;
			.message_content{
				display: flex;
				flex-direction: column;
				width: 100%;
				padding: 4px 10px 20px 10px;
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
					width: 100%;
					.body_data{
						display: -webkit-box;
						overflow: hidden;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 5;
						width: 100%;
						margin: 10px 0;
					}
					.body_additional{
						display: flex;
						justify-content: flex-end;
						color: #6b6b6b;
    				font-size: 14px;
						.additional_floor{
							margin-right: 20px;
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
						padding: 20px 10px;
						position: relative;
						border-bottom: 1px solid #6b4a4a38;
						&.isLastComment{
							border-bottom: none;
						}
					}
					.footer_data{
						.data_username{
							font-size: 18px;
							font-weight: 600;
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
							margin-right: 20px;
						}
					}
				}
			}
		}
	}
</style>