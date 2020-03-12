<!-- vue 模板文件-->
<template>
	<div class="frontEndCom">
		<div class="front_content">
			<template v-if="articleData === ''">
				<div class="front_module" v-for="(item,index) in articleList" :key="index">
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
			<template v-show="articleData">
				<div v-html="articleData" class="article_md">
					{{articleData}}
				</div>
			</template>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'frontEndCom',
		components: {},
		data() {
			return {
				//这里存放文章列表数据
				articleList:[
					{
						issueYear:'2020年',
						data:[
							{
								articleId:'发布的时间戳+内容(如1532159631_JavaScript)',
								articleTitle:'测试的标题内容',
								issueDate:'2020-3-11',
								articleName:'front.md'
							},
							{
								articleId:'发布的时间戳+内容(如1532159631_JavaScript)',
								articleTitle:'测试的标题内容',
								issueDate:'2020-3-11',
								articleName:''
							}
						]
					},
					{
						issueYear:'2020年',
						data:[
							{
								articleId:'发布的时间戳+内容(如1532159631_JavaScript)',
								articleTitle:'测试的标题内容',
								issueDate:'2020-3-11',
								articleName:''
							},
							{
								articleId:'发布的时间戳+内容(如1532159631_JavaScript)',
								articleTitle:'测试的标题内容',
								issueDate:'2020-3-11',
								articleName:''
							}
						]
					}
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
				console.log('init article');
			},
			//点击文章列表获取文章详情内容
			checkArticle:function (articleName) {
				let that = this;
				$.ajax({
					url: "/api/front/front.md",
					type: "get",
					'Content-Type':'application/x-www-form-urlencoded',
					data: {

					},
					success:res => {
						//保存文章内容
						that.articleData = marked(res);
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.frontEndCom{
		width: 100%;
		@include articlePadding;
		.front_content{
			width: 100%;
			.front_module{
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
		}
	}

</style>