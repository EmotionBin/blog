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
									<i class="el-icon-menu"></i>
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
									<i class="el-icon-menu"></i>
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
		data() {
			return {
				//当前选中的菜单
				curMenu:'测试2-1',
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
							path:''
						},
						//对应的权限的字段
						access:'1',
						//是否显示
						show:true
					},
					{
						title:'测试2',
						alias:'',
						iconStyle:{
							path:''
						},
						access:'1',
						show:true,
						subMenu:[
							{
								title:'测试2-1',
								alias:'Test1',
								iconStyle:{
									path:''
								},
								access:'1',
								show:true,
							},
							{
								title:'测试2-2',
								alias:'Test2',
								iconStyle:{
									path:''
								},
								access:'1',
								show:true,
							},
							{
								title:'关于',
								alias:'About',
								iconStyle:{
									path:''
								},
								access:'1',
								show:true,
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
			selectMenu:function (params) {
				let vm = this;
				// console.log(params);
				//将当前选择的导航菜单提交到vuex存储
				vm.$store.commit('updateCurMenu',params);
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