<!-- 左侧菜单栏-->
<template>
	<div class="MenuCom">
    <!-- 菜单栏渲染 -->
			<el-menu
				:default-active="curMenu"
				class="menuBar-main">
				<template v-for="item in menuList">
					<!-- 这一层控制权限的显隐 -->
					<template v-if="item.show">
						<!-- 如果subMenu不为空 -->
						<template v-if="item.subMenu">
							<el-submenu :key="item.title" :index="item.title">
								<template slot="title">
									<i class="el-icon-menu"></i>
									<span>{{item.title}}</span>
								</template>
								<template v-for="subItem in item.subMenu">
									<el-menu-item :key="subItem.title" :index="subItem.title">
										<span>{{subItem.title}}</span>
									</el-menu-item>
								</template>
							</el-submenu>
						</template>
						<!-- 如果subMenu为空 -->
						<template v-else>
							<el-menu-item :key="item.title" :index="item.title">
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
						title:'首页',
						iconStyle:{
							path:''
						},
						access:'1',
						show:true
					},
					{
						title:'测试2',
						iconStyle:{
							path:''
						},
						access:'1',
						show:true,
						subMenu:[
							{
								title:'测试2-1',
								iconStyle:{
									path:''
								},
								access:'1',
								show:true,
							},
							{
								title:'测试2-2',
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

		}

	}
</script>

<style lang="scss" scoped>
	.MenuCom{
		
	}

</style>