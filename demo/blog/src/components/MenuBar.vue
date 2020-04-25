<!-- 左侧菜单栏-->
<template>
	<div class="MenuCom">
    <!-- 菜单栏渲染 -->
			<el-menu
				:default-active="curMenu"
				class="menuBar-main"
				@select="selectMenu">
				<template v-for="item in menuList">
					<!-- 这一层控制权限的显隐 -->
					<template v-if="item.show">
						<!-- 如果subMenu不为空 -->
						<template v-if="item.subMenu">
							<el-submenu :key="item.title" :index="item.alias">
								<template slot="title">
									<i :class="item.iconStyle.class"></i>
									<span>{{item.title}}</span>
								</template>
								<template v-for="subItem in item.subMenu">
									<el-menu-item :key="subItem.title" :index="subItem.alias">
										<span>{{subItem.title}}</span>
									</el-menu-item>
								</template>
							</el-submenu>
						</template>
						<!-- 如果subMenu为空 -->
						<template v-else>
							<el-menu-item :key="item.title" :index="item.alias">
								<template slot="title">
									<i :class="item.iconStyle.class"></i>
									<span>{{item.title}}</span>
								</template>
							</el-menu-item>
						</template>
					</template>
				</template>
			</el-menu>
	</div>
</template>

<script>

	export default {
		name: 'MenuCom',
		components: {},
		//当前选中的菜单
		props:{
			curMenu:String
		},
		data() {
			return {
				//左侧菜单栏配置
				menuList:[
					{
						//导航菜单栏显示的标题
						title:'首页',
						//标题对应的组件，首字母必须大写
						alias:'Home',
						//标题前方对应的图片的样式
						iconStyle:{
							//图片路径
							path:'',
							//通过class的方式添加图片
							class:'el-icon-folder'
						},
						//对应的权限的字段
						access:'1',
						//是否显示
						show:true
					},
					{
						title:'文章',
						alias:'Articles',
						iconStyle:{
							//图片路径
							path:'',
							//通过class的方式添加图片
							class:'el-icon-reading'
						},
						access:'1',
						show:true,
						// subMenu:[
						// 	{
						// 		title:'关于前端',
						// 		alias:'FrontEnd',
						// 		iconStyle:{
						// 			//图片路径
						// 			path:'',
						// 			//通过class的方式添加图片
						// 			class:''
						// 		},
						// 		access:'1',
						// 		show:true,
						// 	},
						// 	{
						// 		title:'关于后端',
						// 		alias:'BackEnd',
						// 		iconStyle:{
						// 			//图片路径
						// 			path:'',
						// 			//通过class的方式添加图片
						// 			class:''
						// 		},
						// 		access:'1',
						// 		show:true,
						// 	}
						// ]
					},
					{
						title:'留言板',
						alias:'MessageBoard',
						iconStyle:{
							path:'',
							class:'el-icon-chat-line-square'
						},
						access:'1',
						show:true
					},
					{
						title:'管理',
						alias:'Manage',
						iconStyle:{
							path:'',
							class:'el-icon-goods'
						},
						access:'Edit',
						show:false,
						subMenu:[
							{
								title:'写作',
								alias:'Write',
								iconStyle:{
									//图片路径
									path:'',
									//通过class的方式添加图片
									class:''
								},
								access:'1',
								show:true,
							},
							{
								title:'编辑',
								alias:'Edit',
								iconStyle:{
									//图片路径
									path:'',
									//通过class的方式添加图片
									class:''
								},
								access:'1',
								show:true,
							}
						]
					},
				]
			}
		},
		computed: {
			//从token中解密获取用户信息
			getUserToken:function () {
				return this.$store.getters.getUserToken;
			}
		},
		watch: {
			//加载权限控制控制菜单显示
			getUserToken:{
				handler() {
					let that = this;
					let isEdit_bool;
					//遍历菜单，修改权限
					if(!that.getUserToken){
						//token为空，说明未登录
						isEdit_bool = false;
						//如果没有权限直接跳转到Home页面
						that.$store.commit('updateCurMenu','Home');
					}else{
						//已经登录，解密token获取权限
						const { isEdit } = jwt.decode(that.getUserToken);
						isEdit_bool = Number.parseInt(isEdit) == 1;
					}
					console.log(isEdit_bool);
					for(let i in that.menuList){
						if(that.menuList[i].access === 'Edit'){
							that.menuList[i].show = isEdit_bool;
						}
					}
				},
				immediate: true
			}
		},
		created() {

		},
		mounted() {
			
		},
		methods: {
			selectMenu:function (params) {
				let vm = this;
				// console.log(params);
				//将当前选择的导航菜单提交到vuex存储
				vm.$store.commit('updateCurMenu',params);
				if(params === 'MessageBoard'){
					//更新articleId
					vm.$store.commit('updateArticleId',params);
				}
			}
		}

	}
</script>

<style lang="scss" scoped>
	.MenuCom{
		width: 100%;
    overflow: hidden;
	}

</style>