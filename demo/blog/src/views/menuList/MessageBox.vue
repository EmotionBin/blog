<!-- vue 模板文件-->
<template>
	<div class="messageBoxCom">
		<!-- 评论组件 -->
		<MessageBoard v-if="$store.getters.getCurMenu === 'MessageBox'"/>
	</div>
</template>

<script>

	import MessageBoard from "@/components/MessageBoard.vue";

	export default {
		name: 'messageBoxCom',
		components: {
			MessageBoard
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
	.messageBoxCom{
		width: 100%;
	}

</style>