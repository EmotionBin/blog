<!-- vue 模板文件-->
<template>
	<div class="MainCom">
		<div class="menuBar">
			<div class="menuBar_content">
				<!-- 菜单栏渲染 -->
				<el-menu
					default-active="2"
					class="menuBar-main">
					<template v-for="(item,index) in menuList">
						<!-- 这一层控制权限的显隐 -->
						<template v-if="item.show">
							<!-- 如果subMenu不为空 -->
							<template v-if="item.subMenu">
								<el-submenu :key="item.title" :index="item.title">
									<template slot="title">
										<i class="el-icon-menu"></i>
										<span>{{item.title}}</span>
									</template>
									<template v-for="(subItem,subIndex) in item.subMenu">
										<el-menu-item :key="subItem.title" :index="index + '-' + subIndex">
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
					<!-- <el-submenu index="1">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>导航一</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="1-1">选项1</el-menu-item>
							<el-menu-item index="1-2">选项2</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-menu-item index="2">
						<i class="el-icon-menu"></i>
						<span slot="title">导航二</span>
					</el-menu-item>
					<el-menu-item index="3" disabled>
						<i class="el-icon-document"></i>
						<span slot="title">导航三</span>
					</el-menu-item>
					<el-menu-item index="4">
						<i class="el-icon-setting"></i>
						<span slot="title">导航四</span>
					</el-menu-item> -->
				</el-menu>
			</div>
		</div>
		<div class="sysmentView">
			<Home/>
		</div>
	</div>
</template>

<script>

	import Home from "./Home.vue";

	export default {
		name: 'MainCom',
		components: {
			Home
		},
		data() {
			return {
				menuList:[
					{
						title:'测试1',
						iconStyle:{
							path:''
						},
						access:'1',
						show:true,
						subMenu:[
							{
								title:'测试1-1',
								iconStyle:{
									path:''
								},
								access:'1',
								show:true,
							},
							{
								title:'测试1-2',
								iconStyle:{
									path:''
								},
								access:'1',
								show:true,
							}
						]
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
	.MainCom{
		.menuBar{
			position: sticky;
			left: 0;
			top: 0;
			//为了让div的position:sticky，这里选择用float让这个div靠左，不选择使用position:absolute
			float: left;
		}
		.sysmentView{
			width: 100%;
			min-height: calc(100vh - #{$navHeight});
			@include bothSidePadding;
  		background-color: $themeColor;
		}
	}

</style>