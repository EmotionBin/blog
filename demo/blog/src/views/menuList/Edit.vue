<!-- vue 模板文件-->
<template>
	<div class="editCom">
		<!-- 搜索区域 -->
		<div class="edit_search">
			<el-select v-model="searchKey" filterable clearable placeholder="请选择文章标题">
				<el-option
					v-for="item in articlesList"
					:key="item.articleId"
					:label="item.articleTitle"
					:value="item.articleId">
				</el-option>
			</el-select>
			<el-button size="medium" type="success" @click="doSearch">搜索</el-button>
		</div>	
		<!-- 文章列表 -->
		<div class="articles_panel">
			<div class="article_data" v-for="(item,index) in articlesList" :key="index">
				<div class="article_title" >{{item.articleTitle}}</div>
				<div class="operation">
					<el-button v-if="item.articleId == curActive" size="mini" type="primary" @click="doUpload(item.articleId,index)">重新上传</el-button>
					<el-button v-if="item.articleId == curActive" size="mini" type="success" @click="doSave(item.articleId,index)">保存</el-button>
					<el-button v-if="item.articleId != curActive" size="mini" type="primary" @click="doModify(item.articleId,index)">修改</el-button>
					<el-button v-if="item.articleId == curActive" size="mini" type="warning" @click="doModify(item.articleId,index)">修改</el-button>
					<el-button size="mini" type="primary" @click="doDelete(item.articleId,index)">删除</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'editCom',
		components: {},
		data() {
			return {
				//所有文章的标题
				articlesList: [{
          articleId: '选项1',
          articleTitle: '黄金糕'
        }, {
          articleId: '选项2',
          articleTitle: '双皮奶'
        }, {
          articleId: '选项3',
          articleTitle: '蚵仔煎'
        }, {
          articleId: '选项4',
          articleTitle: '龙须面'
        }, {
          articleId: '选项5',
          articleTitle: '北京烤鸭'
        }],
				//搜索栏关键字
				searchKey:'',
				//当前选择要修改的文章
				curActive:''
			}
		},
		computed: {

		},
		created() {

		},
		mounted() {

		},
		methods: {
			//搜索操作
			doSearch:function () {
				console.log('搜索');
			},
			//修改操作
			doModify:function (articleId,index) {
				console.log(articleId,index);
				let that = this;
				that.curActive = articleId == that.curActive ? '' : articleId;
			},
			//删除操作
			doDelete:function (articleId,index) {
				console.log(articleId,index);
			},
			//重新上传操作
			doUpload:function (articleId,index) {
				console.log(articleId,index);
			},
			//保存操作
			doSave:function (articleId,index) {
				console.log(articleId,index);
				let that = this;
				//清空当前激活的选项
				that.curActive = '';
				//发送请求
			},
		}

	}
</script>

<style lang="scss" scoped>
	.editCom{
		width: 100%;
		@include articlePadding;
		.edit_search{
			width: 100%;
			padding: 10px;
			.el-select{
				width: calc(100% - 100px);
    		margin-right: 20px;
			}
		}
		.articles_panel{
			padding: 10px;
			.article_data{
				display: flex;
				justify-content: space-between;
				.article_title{
					padding: 6px 0;
				}
			}
		}
	}

</style>