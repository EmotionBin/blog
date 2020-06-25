<!-- vue 模板文件-->
<template>
	<div class="articleCom">
		<div class="articleCom_content">
			<template v-if="!articleData">
				<div class="article_module" v-for="(item,index) in articleList" :key="index">
					<div class="module_title">{{item.issueYear}}</div>
					<div class="article_list" v-for="(item1,index) in item.data" :key="index">
						<div class="article_title">
							<div class="title_radius"></div>
							<span class="title_text" @click="checkArticle(item1.articleName,item1.articleId)">{{item1.articleTitle}}</span>
						</div>
						<div class="article_date">{{item1.issueDate}}</div>
					</div>
				</div>
			</template>
			<div v-show="articleData">
				<!-- 返回按钮 -->
				<el-button class="returnBtn" size="small" type="warning" @click="returnListPanel">返 回</el-button>
				<div ref="article_ref" v-highlight class="article_md"></div>
				<!-- 评论区 -->
				<div class="comment_wrap">
					<h1>评论区</h1>
					<!-- 评论组件 -->
					<MessageBoard v-if="$store.getters.getCurMenu === 'Articles'"/>
				</div>
			</div>
			<div class="article-catalog" ref="catalog_ref">
				<Catalog v-if="articleData" :catalog="articleCatalog"/>
			</div>
		</div>
	</div>
</template>

<script>

	import MessageBoard from "@/components/MessageBoard.vue";
	import Catalog from "@/components/Catalog.vue";

	export default {
		name: 'articleCom',
		components: {
			MessageBoard,
			Catalog
		},
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
				articleData:'',
				//生成的文章目录
				articleCatalog:[],
				//滚动的高度
				scrollTop:0,
				//记录目录标题与距离
				catalogTop:[],
				//当前激活的目录
				curActiveCatalog:''
			}
		},
		computed: {
			getCurArticleId(){
				return this.$store.getters.getCurArticleId;
			}
		},
		created() {

		},
		mounted() {
			//初始化文章列表的渲染
			this.initArticleList();
		},
		activated(){
			//在初始化的时候监听鼠标滚轮滚动事件
			window.addEventListener('scroll', this.scroll);
		},
		deactivated(){
			//在组件销毁的时候取消对鼠标滚轮滚动事件的监听
			window.removeEventListener('scroll', this.scroll);
			//初始化当前目录
			this.initCatalog();
		},
		methods: {
			scroll(){
				this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				// this.$refs.catalog_ref.style.top = this.scrollTop > 40 ? '20px' : '60px';
				const item = this.catalogTop.find(item => this.scrollTop > item.top);
				if(!item || this.curActiveCatalog === item.title) return;
				this.curActiveCatalog = item.title;
				this.$store.commit('updateCurCatalog', item.title);
			},
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
			checkArticle:function (articleName,articleId) {
				let that = this;
				//更新当前的articleId
				that.$store.commit('updateArticleId',articleId);
				$.ajax({
					url: `/api/articles/${articleName}`,
					type: "get",
					'Content-Type':'application/x-www-form-urlencoded',
					data: {

					},
					success: res => {
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
						const articleDom = that.$refs.article_ref;
						articleDom.innerHTML = that.articleData;
						//手动给a标签加上属性
						var aSymbol = articleDom.getElementsByTagName("a");
						for(let i = 0; i < aSymbol.length;i ++){
							aSymbol[i].setAttribute("target", "_blank");
						}
						//对图片进行处理
						var imgSymbol = articleDom.getElementsByTagName("img");
						for(let i = 0; i < imgSymbol.length;i ++){
							//图片居中
							imgSymbol[i].parentNode.style['text-align'] = 'center';
							//设置图片最大宽度等于父元素宽度，防止图片过大造成溢出
							imgSymbol[i].style['max-width'] = '100%';
							//给图片统一设置白色背景
							imgSymbol[i].parentNode.style['background-color'] = '#fff';
							//这里消除图片边缘的边距，否则图片边缘会有间隙
							imgSymbol[i].parentNode.style['font-size'] = 0;
						}
						//组装目录树，这里我放到宏任务中异步生成目录树，为了防止文章过长时，阻塞文章渲染
						//如果同步生成目录树，文章过长时遍历的dom过多，性能开销大，可能会阻塞主线程中文章的渲染
						const articleDom1 = document.getElementsByClassName("article_md")[0].children;
						setTimeout(() => {
							that.getCatalog(articleDom1);
							that.getCatalogTop(articleDom1);
							//因为第一次加载目录时，当前页面的所有图片可能并未完全加载完，所以获取的元素到页面顶部的距离会有误差
							//所以要等当前页面的所有图片都加载完毕后，再重新计算页面元素到顶部距离，这才是准确的距离
							that.isImgAllLoad(imgSymbol, this.getCatalogTop, articleDom1);
						}, 0);
					}
				});
			},
			//组装文章的目录
			getCatalog(articleDom){
				let treeArray = [];
				//这里用来记录当前目录树的索引 0-h2 1-h3 2-h4
				let arrayIndex = [-1, -1, -1];
				for(let i = 0; i < articleDom.length - 1; i ++){
					const localName = articleDom[i].localName;
					//目录树节点
					const obj = {
						id:articleDom[i].id,
						innerHTML:articleDom[i].innerHTML,
						tag:localName,
						children:[]
					};
					if(localName === 'h2'){
						treeArray.push(obj);
						// catalogTop.unshift(obj1);
						arrayIndex[0]++;
						arrayIndex[1] = -1;
					}else if(localName === 'h3'){
						const [h1Index] = arrayIndex;
						treeArray[h1Index].children.push(obj);
						// treeArray[treeArray.length - 1].children.push(obj);
						// catalogTop.unshift(obj1);
						arrayIndex[1]++;
						arrayIndex[2] = -1;
					}else if(localName === 'h4'){
						const [h1Index, h2Index] = arrayIndex;
						treeArray[h1Index].children[h2Index].children.push(obj);
						// const target = treeArray[treeArray.length - 1].children[treeArray[treeArray.length - 1].children.length - 1].children;
						// target.push(obj);
						// catalogTop.unshift(obj1);
						arrayIndex[2]++;
					}
				}
				console.log(treeArray);
				this.articleCatalog = treeArray;
			},
			//获取各个目录与顶部距离
			getCatalogTop(articleDom){
				let catalogTop = [];
				for(let i = 0; i < articleDom.length - 1; i ++){
					//标题与距离顶部节点
					const obj = {
						title:articleDom[i].id,
						top:articleDom[i].offsetTop - 10
					}
					const localName = articleDom[i].localName;
					if(localName == 'h2' || localName == 'h3' || localName == 'h4') catalogTop.unshift(obj);
				}
				this.catalogTop = catalogTop;
			},
			//判断当前页面所有图片是否全部加载完毕
			isImgAllLoad(imgSymbol, cb, articleDom1){
				let count = 0;
				let timer = null;
				const total = imgSymbol.length;
				const load = function(){
					if(count < total){
						if(!imgSymbol[count]) return;
						const imgObj = new Image();
						imgObj.src = imgSymbol[count].src;
						timer = setInterval(() => {
							if(imgObj.complete){
								//图片加载完成
								clearInterval(timer);
								count ++;
								load();
							}
						}, 100);
					}else{
						console.log('所有图片加载完成');
						cb(articleDom1);
					}
				}
				load();
			},
			//点击返回文章列表页面
			returnListPanel:function () {
				let that = this;
				//清空文章数据，返回列表页面
				that.articleData = '';
				that.$store.commit('updateCurCatalog','');
			},
			//初始化目录
			initCatalog(){
				this.$store.commit('updateCurCatalog','');
			}
		}
	}
</script>

<style lang="scss">
	// 这里要特别的声明一下,这里的style标签没有加上scoped，加上scoped的作用是让style标签的样式只能影响本组件的元素，不会影响到外部的元素
	// 但是这里渲染文章的时候使用了innerHtml，而innerHtml相当于引入外部组件内容，为了修改innerHtml内的元素的样式，这里的style必须不能加上
	// scoped，若加上了，则样式无效。一般组件内的style标签都会加上scoped，这样比较好，这里比较例外。如果必须要加上的话也不是不可以，可以
	// 再写一个新的style标签，新的style标签不能加上scope，直接在那里面给innerHtml添加样式，这样写的话，也就是说这个组件存在两个style标签，
	// 比较臃肿，不推荐这种写法
	.articleCom{
		width: 100%;
		position: relative;
		padding-top: 20px;
		// @include articlePadding;
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
						// text-decoration: underline;
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
			.comment_wrap{
				width: 100%;
				border-top: 1px solid #d1d1d1;
			}
			//markdown渲染的文章的样式写在这里
			.article_md{
				//1.5倍的行高看起来更加舒服
				line-height: 1.5;
				//1px字间距
				letter-spacing: 1px;
				a{
					color: $priBlue;
				}
				hr{
					border: none;
					height: 1px;
					background-color: #d2d2d2;
				}
				p code,
				li code{
					display: inline-block;
					padding: 0 5px;
					font-size: 110%;
					background-color: pink;
					border-radius: 5px;
					margin: auto 3px;
				}
				h1,h2,h3,h4,h5,h6,
				code,strong,a
				{
					letter-spacing: 0;
				}
				//引用的样式
				blockquote{
					color: #666;
					border-left: 4px solid #ddd;
					padding-left: 20px;
					margin-left: 0;
					font-size: 14px;
				}
			}
		}
		.article-catalog{
			position: fixed;
			top: 60px;
			right: calc(20% - 260px);
			width: 240px;
			max-height: calc(100% - 120px);
    	overflow: auto;
		}
	}
</style>