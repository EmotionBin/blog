<!-- vue 模板文件-->
<template>
	<div class="homelandCom">
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
		</div>
	</div>
</template>

<script>

  import Home from "../menuList/Home.vue";
	import MenuBar from "@/components/MenuBar.vue";
	import Articles from "../menuList/Articles.vue";
	import MessageBoard from "../menuList/MessageBoard.vue";
	import Write from "../menuList/Write.vue";
	import Edit from "../menuList/Edit.vue";
	import ReturnTop from '@/components/ReturnTop.vue'

	export default {
		name: 'homelandCom',
		components: {
      Home,
			Articles,
			MessageBoard,
			MenuBar,
			Write,
			Edit,
			ReturnTop
    },
		data() {
			return {

			}
		},
		computed: {
      //当前渲染的组件
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
	.homelandCom{
		//防止路由切换的过渡效果出现滚动条
		position: absolute;
		width: 100%;
		.menuBar{
			position: sticky;
			width: 15%;
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