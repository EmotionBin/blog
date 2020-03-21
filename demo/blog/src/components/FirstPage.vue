<!-- 初次进入的页面-->
<template>
	<div class="firstCom">
    <!-- 星空特效 -->
    <Star/>
    <!-- 时钟 -->
    <Clock/>
    <router-link to="/home">
      <el-button type="primary">let's get it started!</el-button>
    </router-link>
	</div>
</template>

<script>

  import Star from '@/components/Star.vue'
  import Clock from '@/components/Clock.vue'

	export default {
		name: 'firstCom',
		components: {},
		data() {
			return {

			}
    },
    components:{
      Star,
      Clock
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
	.firstCom{
		width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .starCom{
      z-index: -1;
    }
	}

</style>