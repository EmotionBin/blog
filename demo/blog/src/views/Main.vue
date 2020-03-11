<!-- vue 模板文件-->
<template>
	<div class="MainCom">
		<div class="menuBar">
			<div class="menuBar_content">
				<MenuBar :curMenu="getCurMenu" />
			</div>
		</div>
		<div class="sysmentView">
			<keep-alive>
				<!-- 动态渲染组件 -->
				<component :is="getCurMenu"></component>
			</keep-alive>
			<!-- 返回顶部的组件 -->
			<ReturnTop/>
			<!-- <Home/> -->
		</div>
	</div>
</template>

<script>

	import Home from "./menuList/Home.vue";
	import MenuBar from "../components/MenuBar.vue";
	import FrontEnd from "./menuList/FrontEnd.vue";
	import BackEnd from "./menuList/BackEnd.vue";
	import ReturnTop from '@/components/ReturnTop.vue'

	export default {
		name: 'MainCom',
		components: {
			Home,
			FrontEnd,
			BackEnd,
			MenuBar,
			ReturnTop
		},
		data() {
			return {
			}
		},
		//当前渲染的组件
		computed: {
			getCurMenu:function () {
				return this.$store.getters.getcurMenu;
			}
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
			width: 15%;
			position: sticky;
			left: 0;
			top: 0;
			//为了让div的position:sticky，这里选择用float让这个div靠左，不选择使用position:absolute
			float: left;
			@include commonShadow;
		}
		.sysmentView{
			width: 100%;
			min-height: calc(100vh - #{$navHeight});
			@include bothSidePadding;
  		background-color: $themeColor;
		}
	}

</style>