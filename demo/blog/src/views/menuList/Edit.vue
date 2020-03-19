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
				<div class="article_title" >
					<template v-if="item.articleId == curActive">
						<el-input size="small" v-model="curModifyData.articleTitle" placeholder="请输入内容"></el-input>
					</template>
					<template v-else>
						{{item.articleTitle}}
					</template>
					</div>
				<div class="operation">
					<template v-if="item.articleId == curActive">
						<el-upload
							class="upload_op"
							action="#"
							accept=".txt"
							ref="upload"
							:auto-upload="false"
							:limit="1"
							:on-exceed="handleExceed"
							:on-change="beforeUpload"
							:on-remove="handleRemove"
							:file-list="curModifyData.articleFile"
						>
							<el-button size="mini" type="primary">重新上传</el-button>
							<!-- <div slot="tip" class="el-upload__tip">只能上传.txt文件,上传后自动保存为.md文件</div> -->
						</el-upload>
						<el-button size="mini" type="success" @click="doSave(item.articleId,index)">保存</el-button>
						<el-button size="mini" type="warning" @click="doModify(item.articleId,index)">修改</el-button>
					</template>
					<template v-else>
						<el-button size="mini" type="primary" @click="doModify(item.articleId,index)">修改</el-button>
					</template>
					<el-button size="mini" type="danger" @click="doDelete(item.articleId,index)">删除</el-button>
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
				articlesList: [
					{
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
					}
				],
				//搜索栏关键字
				searchKey:'',
				//当前选择要修改的文章
				curActive:'',
				//当前修改的内容
				curModifyData:{
					articleTitle:'',
					articleFile:[]
				}
			}
		},
		computed: {

		},
		created() {

		},
		mounted() {
			//初始化，获取文章列表信息
			this.init();
		},
		methods: {
			//初始化，请求文章列表信息
			init:function () {
				let that = this;
				//获取文章列表数据
				$.ajax({
					url: "/api/queryAticle",
					type: "get",
					'Content-Type':'application/x-www-form-urlencoded',
					data:{
						articleId:that.searchKey
					},
					success:function(res){
						console.log(res);
						const { status,data,detail } = res;
						if(status == 0){
							that.$message({
								message: data,
								type: 'error'
							});
							return;
						}
						that.articlesList = data;
					}
				});
			},
			//搜索操作
			doSearch:function () {
				let that = this;
				console.log('搜索',this.searchKey);
				// 发送请求
				$.ajax({
					url: "/api/queryAticle",
					type: "get",
					'Content-Type':'application/x-www-form-urlencoded',
					data:{
						articleId:that.searchKey
					},
					success:function(res){
						console.log(res);
						const { status,data,detail } = res;
						if(status == 0){
							that.$message({
								message: data,
								type: 'error'
							});
							return;
						}
						that.articlesList = data;
					}
				});
			},
			//修改操作
			doModify:function (articleId,index) {
				console.log(articleId,index);
				let that = this;
				that.curActive = articleId == that.curActive ? '' : articleId;
				if(that.curActive){
					//获取文章标题并渲染到输入框中
					that.curModifyData.articleTitle = that.articlesList[index].articleTitle;
				}else{
					//再次点击则取消，清空当前数据
					that.curModifyData.articleTitle = '';
					that.curModifyData.articleFile = [];
				}
			},
			//删除操作
			doDelete:function (articleId,index) {
				let that = this;
				console.log(articleId,index);
				that.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
					//发送请求
					$.ajax({
						url: "/api/deleteArticle",
						type: "post",
						'Content-Type':'application/x-www-form-urlencoded',
						data:{
							articleId:articleId
						},
						success:function(res){
							console.log(res);
							const { status,data,detail } = res;
							if(status == 0){
								that.$message({
									message: data,
									type: 'error'
								});
								return;
							}
							that.$message({
								type: 'success',
								message: '删除成功!'
							});
							//删除成功后前端更新数据显示
							that.articlesList.splice(index,1);
						}
					});
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
			},
			//保存操作
			doSave:function (articleId,index) {
				console.log(articleId,index);
				let that = this;
				//对表单内容进行校验,标题不能为空
				if(!that.curModifyData.articleTitle){
					that.$message({
						message: '文章的标题不能为空!',
						type: 'error'
					});
					return;
				}
				let formdata = new FormData();
				//组装请求数据formmdata
				formdata.append('articleId',articleId);
				formdata.append('title',that.curModifyData.articleTitle);
				//重新上传而文件是可选项，有则上传，无也无所谓
				let file = that.curModifyData.articleFile.length ? that.curModifyData.articleFile[0] : '';
				formdata.append('file',file);
				// 发送请求
				$.ajax({
					url: "/api/updataArticle",
					type: "post",
					contentType:false,
					processData:false,
					data:formdata,
					success:function(res){
						console.log(res);
						const { status,data,detail } = res;
						if(status == 0){
							//若返回的data字段为空，则提示上传失败，不为空则提示data信息
							let msg = data ? data:'上传失败';
							that.$message({
								message: msg,
								type: 'error'
							});
							return;
						}
						that.$message({
							message: data,
							type: 'success'
						});
						//更新文章标题
						that.articlesList[index].articleTitle = that.curModifyData.articleTitle;
						//清空数据
						that.curActive = '';
						that.curModifyData = {
							articleTitle:'',
							articleFile:[]
						}
					}
				});
			},
			handleExceed:function () {
				this.$message.warning(`当前限制选择 1 个文件，最多只能上传一个文件`);
			},
			beforeUpload:function (file) {
				let that = this;
				console.log(file);
				var isTxt = file.raw.name.substring(file.raw.name.length - 4) === '.txt';
				console.log(isTxt);
				if (!isTxt) {
					this.$message.error('上传的文件只能是.txt格式!');
					//清空文件
					that.curModifyData.articleFile = [];
					return;
        }
				//将照片加入待上传数组
				that.curModifyData.articleFile.push(file.raw);
				
			},
			handleRemove:function () {
				//清空文件
				this.curModifyData.articleFile = [];
			}
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
				align-items: center;
				.article_title{
					padding: 6px 0;
				}
				.operation{
					display: flex;
					align-items: center;
					.upload_op{
						display: inline-block;
						margin-right: 10px;
					}
				}
			}
		}
	}

</style>