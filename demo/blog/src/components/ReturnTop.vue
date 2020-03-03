<!-- 返回顶部组件-->
<template>
	<div class="ReturnTopcom" v-if="btnFlag">
		<el-tooltip effect="dark" content="返回顶部" placement="top">
      <div class="ReturnTopcom_content"  @click="backTop">
				<img class="top_img" src="/images/top/rising.svg">
			</div>
    </el-tooltip>
	</div>
</template>

<script>
	export default {
		name: 'ReturnTopcom',
		components: {},
		data() {
			return {
				btnFlag:false,
				scrollTop:0
			}
		},
		computed: {

		},
		created() {

		},
		mounted() {
			//在初始化的时候监听鼠标滚轮滚动事件
			window.addEventListener('scroll', this.scrollToTop);
		},
		destroyed () {
			//在组件销毁的时候取消对鼠标滚轮滚动事件的监听
			window.removeEventListener('scroll', this.scrollToTop)
		},
		methods: {
			// 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
			scrollToTop () {
				const that = this;
				let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				that.scrollTop = scrollTop;
				if (that.scrollTop > 60) {
					that.btnFlag = true;
				} else {
					that.btnFlag = false;
				}
			},
			// 点击图片回到顶部方法，加计时器是为了过渡顺滑
			backTop () {
				const that = this;
				let timer = setInterval(() => {
					let ispeed = Math.floor(-that.scrollTop / 5);
					document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed;
					if (that.scrollTop === 0) {
						clearInterval(timer);
					}
				}, 16)
			}
		}

	}
</script>

<style lang="scss" scoped>
	.ReturnTopcom{
		width: 50px;
		height: 50px;
		position: fixed;
		right: 50px;
		bottom: 50px;
		.ReturnTopcom_content{
			width: 100%;
			height: 100%;
			border-radius: 50%;
			border-color: #666;
			background-color: rgba(153,153,153,0.2);
			box-shadow: 0 0 3px #666;
			cursor: pointer;
			.top_img{
				width: 100%;
				height: 100%;
			}
		}
	}

</style>