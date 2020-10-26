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
    <!-- 备案信息 -->
    <div class="beian-info">
      <div class="beian-num">
        <a href="https://beian.miit.gov.cn/">桂ICP备2020008115号-1</a>
        <span> • Version 1.0.0 • ALL RIGHTS RESERVED</span>
      </div>
      <div class="beian-year">
        huangweibinupup.cn © 2020
      </div>
    </div>
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
    .beian-info{
      position: absolute;
      bottom: 0;
      color: #666;
      a{
        color: #666;
      }
      .beian-year{
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
	}

</style>