<!-- vue 模板文件-->
<template>
	<div class="MainCom">
		<div class="menuBar">
			<div class="menuBar_content">
				<MenuBar/>
			</div>
		</div>
		<div class="sysmentView">
			<keep-alive>
				<component :is="getCurMenu"></component>
			</keep-alive>
			<!-- <Home/> -->
		</div>
	</div>
</template>

<script>

	import Home from "./Home.vue";
	import MenuBar from "../components/MenuBar.vue";
	import Test1 from "./menuList/Test1.vue";
	import Test2 from "./menuList/Test2.vue";
	import About from "./About.vue";

	export default {
		name: 'MainCom',
		components: {
			Home,
			About,
			Test1,
			Test2,
			MenuBar
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
			box-shadow: 0 0 3px #888;
		}
		.sysmentView{
			width: 100%;
			min-height: calc(100vh - #{$navHeight});
			@include bothSidePadding;
  		background-color: $themeColor;
		}
	}

</style>