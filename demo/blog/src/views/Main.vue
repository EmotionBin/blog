<!-- vue 模板文件-->
<template>
	<div class="MainCom">
		<Navigation/>
		<!-- 每个路由切换的时候添加上切换的动画效果 -->
    <transition name="view-fade">
      <router-view/>
    </transition>
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

	import Navigation from "../components/Navigation.vue";
	import Home from "./menuList/Home.vue";
	import MenuBar from "../components/MenuBar.vue";
	import Articles from "./menuList/Articles.vue";
	import Write from "./menuList/Write.vue";
	import Edit from "./menuList/Edit.vue";
	import ReturnTop from '@/components/ReturnTop.vue'

	export default {
		name: 'MainCom',
		components: {
			Navigation,
			Home,
			Articles,
			MenuBar,
			Write,
			Edit,
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
		//加上背景色，防止在路由切换的时候，由于动画效果造成的背景白屏
  	background-color: #f5f5d5;
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

		/* 可以设置不同的进入和离开动画 */
		/* 设置持续时间和动画函数 */
		.view-fade-enter-active {
			transition: transform .5s cubic-bezier(.9, 0, .3, .7);
		}
		.view-fade-leave-active {
			transition: transform .5s cubic-bezier(.9, 0, .3, .7);
		}
		.view-fade-enter, .view-fade-leave-to {
			transform: translateX(100%);
		}
	}

</style>