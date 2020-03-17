<!-- vue 模板文件-->
<template>
	<div class="articleCom">
		<div class="articleCom_content">
			<template v-if="articleData === ''">
				<div class="article_module" v-for="(item,index) in articleList" :key="index">
				<div class="module_title">{{item.issueYear}}</div>
				<div class="article_list" v-for="(item1,index) in item.data" :key="index">
					<div class="article_title">
						<div class="title_radius"></div>
						<span class="title_text" @click="checkArticle(item1.articleName)">{{item1.articleTitle}}</span>
					</div>
					<div class="article_date">{{item1.issueDate}}</div>
				</div>
			</div>
			</template>
			<template v-else>
				<!-- 返回按钮 -->
				<el-button class="returnBtn" size="small" type="warning" @click="returnListPanel">返 回</el-button>
				<div v-html="articleData" v-highlight class="article_md">
					{{articleData}}
				</div>
			</template>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'articleCom',
		components: {},
		data() {
			return {
				//这里存放文章列表数据
				articleList:[
					// {
					// 	issueYear:'2020年',
					// 	data:[
					// 		{
					// 			articleId:'发布的时间戳+内容(如1532159631_JavaScript)',
					// 			articleTitle:'测试的标题内容',
					// 			issueDate:'2020-3-11',
					// 			articleName:'front.txt'
					// 		},
					// 		{
					// 			articleId:'发布的时间戳+内容(如1532159631_JavaScript)',
					// 			articleTitle:'测试的标题内容',
					// 			issueDate:'2020-3-11',
					// 			articleName:'2020/test.txt'
					// 		}
					// 	]
					// },
					// {
					// 	issueYear:'2020年',
					// 	data:[
					// 		{
					// 			articleId:'发布的时间戳+内容(如1532159631_JavaScript)',
					// 			articleTitle:'测试的标题内容',
					// 			issueDate:'2020-3-11',
					// 			articleName:'front.txt'
					// 		},
					// 		{
					// 			articleId:'发布的时间戳+内容(如1532159631_JavaScript)',
					// 			articleTitle:'测试的标题内容',
					// 			issueDate:'2020-3-11',
					// 			articleName:'README.txt'
					// 		}
					// 	]
					// }
				],
				//这里存放文章内容
				articleData:''
			}
		},
		computed: {

		},
		created() {

		},
		mounted() {
			//初始化文章列表的渲染
			this.initArticleList();
		},
		methods: {
			//初始化文章列表的渲染
			initArticleList:function () {
				let that = this;
				$.ajax({
					url: `/api/getArticlesList`,
					type: "get",
					'Content-Type':'application/x-www-form-urlencoded',
					data: {

					},
					success:res => {
						if(res.status == 0) {
							console.log('请求异常');
							that.$message({
								message: res.data,
								type: 'error'
							});
							return;
						}
						console.log(res);
						that.articleList = res.data;
					}
				});
			},
			//点击文章列表获取文章详情内容
			checkArticle:function (articleName) {
				let that = this;
				$.ajax({
					url: `/api/articles/${articleName}`,
					type: "get",
					'Content-Type':'application/x-www-form-urlencoded',
					data: {

					},
					success:res => {
						if(res.status == 0) {
							console.log('请求异常');
							that.$message({
								message: res.data,
								type: 'error'
							});
							return;
						}
						//保存文章内容
						that.articleData = marked(res);
					}
				});
			},
			//点击返回文章列表页面
			returnListPanel:function () {
				let that = this;
				//清空文章数据，返回列表页面
				that.articleData = '';
			}
		}
	}
</script>

<style lang="scss" scoped>
	.articleCom{
		width: 100%;
		position: relative;
		@include articlePadding;
		.articleCom_content{
			width: 100%;
			.article_module{
				width: 100%;
				display: flex;
				flex-direction: column;
				margin-bottom: 30px;
				.module_title{
					font-weight: bold;
					font-size: 28px;
				}
				.article_list{
					@include articleFontStyle;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.article_title{
						margin: 2px 0;
					}
					.title_radius{
						display: inline-block;
						width: 10px;
						height: 10px;
						border-radius: 50%;
						background-color: #000;
						margin: 0 10px;
					}
					.title_text{
						text-decoration: underline;
						color: #000;
						cursor: pointer;
					}
				}
			}
			.returnBtn{
				position: absolute;
				top: 10px;
				right: 0;
			}
		}
	}

</style>