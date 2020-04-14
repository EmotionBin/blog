<!-- vue 模板文件-->
<template>
	<div class="MainCom">
		<Navigation/>
		<!-- 每个路由切换的时候添加上切换的动画效果 -->
    <transition name="view-fade">
      <router-view/>
    </transition>
	</div>
</template>

<script>

	import Navigation from "../components/Navigation.vue";
	

	export default {
		name: 'MainCom',
		components: {
			Navigation,
		},
		data() {
			return {
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
		//加上背景色，防止在路由切换的时候，由于动画效果造成的背景白屏
  	background-color: #f5f5d5;

		/* 可以设置不同的进入和离开动画 */
		/* 设置持续时间和动画函数 */
		.view-fade-enter-active {
			transition: transform .7s cubic-bezier(.9, 0, .3, .7);
		}
		.view-fade-leave-active {
			transition: transform .5s cubic-bezier(.9, 0, .3, .7);
		}
		.view-fade-enter, .view-fade-leave-to {
			transform: translateX(100%);
		}
	}

</style>