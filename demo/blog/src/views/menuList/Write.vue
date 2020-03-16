<!-- vue 模板文件-->
<template>
	<div class="writeCom">
		<div class="write_content">
			<div class="article_module">
				<div class="article_title">
					<div class="title_text">文章标题:</div>
					<div class="title_input">
						<el-input
							placeholder="请输入文章标题"
							v-model="articleData.title"
							clearable>
						</el-input>
					</div>
				</div>
				<div class="article_file">
					<div class="file_text">文章的文件名:</div>
					<div class="file_input">
						<el-input
							placeholder="请输入文章的文件名，命名规则xxx_xxx_xx,如javascript_promise_01，不需要添加后缀名，默认为.md后缀名"
							v-model="articleData.filename"
							clearable>
						</el-input>
					</div>
				</div>
				<div class="article_upload">
					<span class="upload_title">选择要上传的文件(.md):</span>
					<div class="upload_file">
						<el-upload
							action="#"
							accept=".md"
							ref="upload"
							:auto-upload="false"
							:limit="1"
							:on-exceed="handleExceed"
							:on-change="beforeUpload"
							:on-remove="handleRemove"
							:file-list="articleData.fileList"
						>
						<el-button size="small" type="primary">点击上传</el-button>
  					<div slot="tip" class="el-upload__tip">只能上传.md文件</div>
					</el-upload>
					</div>
				</div>
				<div class="article_setting">
					<el-button type="primary" @click="upload">提  交</el-button>
				</div>	
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'writeCom',
		components: {},
		data() {
			return {
				articleData:{
					title:'',
					filename:'',
					fileList:[]
				}
			}
		},
		computed: {

		},
		created() {

		},
		mounted() {

		},
		methods: {
			beforeUpload:function (file) {
				let that = this;
				console.log(file);
				var isMd = file.raw.name.substring(file.raw.name.length - 3) === '.md';
				console.log(isMd);
				if (!isMd) {
					this.$message.error('上传的文件只能是.md格式!');
					//清空文件
					that.articleData.fileList = [];
					return;
        }
				//将照片加入待上传数组
				that.articleData.fileList.push(file.raw);
			},
			handleExceed:function (files, fileList) {
				this.$message.warning(`当前限制选择 1 个文件，最多只能上传一个文件`);
			},
			handleRemove:function (file) {
				let that = this;
				//清空文件
				that.articleData.fileList = [];
			},
			upload:function () {
				let that = this;
				//对表单内容进行校验,三者都不为空的时候才发送请求
				if(!that.articleData.title || !that.articleData.filename || !that.articleData.fileList[0]){
					that.$message({
						message: '请确保选择的参数正确并且完整',
						type: 'error'
					});
					return;
				}
				let formdata = new FormData();
				//组装请求数据formmdata
				formdata.append('title',that.articleData.title);
				formdata.append('filename',that.articleData.filename);
				formdata.append('file',that.articleData.fileList[0]);
				//发送请求
					$.ajax({
						url: "/api/addArticle",
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
								message: '上传成功',
								type: 'success'
							});
							//清空数据
							that.articleData = {
								title:'',
								filename:'',
								fileList:[]
							}
						}
					});
			}
		}

	}
</script>

<style lang="scss" scoped>
	.writeCom{
		width: 100%;
		@include articlePadding;
	  .write_content{
			width: 100%;
			.article_module{
				width: 100%;
				.article_title,
				.article_file{
					height: 50px;
					display: flex;
					align-items: center;
					font-size: 16px;
					margin: 6px 0;
				}
				.title_text,
				.file_text{
					width: 120px;
					margin-right: 10px;
				}
				.title_input,
				.file_input{
					flex: 1;
				}
				.article_upload{
					margin: 10px 0;
					.upload_file{
						padding: 10px;
					}
				}
				.article_setting{
					display: flex;
					justify-content: center;
				}
			}
		}
	}

</style>