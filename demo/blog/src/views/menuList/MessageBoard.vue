<!-- 留言板-->
<template>
	<div class="messageBoardCom">
		<div class="message_wrap">
			<div class="message_content">
				<div class="content_head">
					<span class="head_username">hwb</span>
					<div class="head_option">
						按钮
					</div>
				</div>
				<div class="content_body">
					<div class="body_data">
						<span class="data_text">asdasda</span>
					</div>
					<div class="body_additional">
						<span class="additional_floor">1楼</span>
						<span class="additional_time">2020-04-15 16:59</span>
					</div>
				</div>
				<div class="content_footer">
					
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

<style lang="scss" scoped>
	.messageBoardCom{
		width: 100%;
		padding: 20px;
	}

</style>