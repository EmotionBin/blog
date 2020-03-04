<!-- vue 模板文件-->
<template>
	<div class="MainCom">
		<div class="menuBar">
			<div class="menuBar_content">
				<MenuBar/>
			</div>
		</div>
		<div class="sysmentView">
			<Home/>
		</div>
	</div>
</template>

<script>

	import Home from "./Home.vue";
	import MenuBar from "../components/MenuBar.vue";

	export default {
		name: 'MainCom',
		components: {
			Home,
			MenuBar
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
			var array = ['0','1','2','3','4','5','6','7'];
			var array1 = [];
			var str = '';
			for(let i in array){
				str += array[i];
				if((Number.parseInt(i) + 1) % 4 === 0){
					array1.push(str);
					str = '';
				}
			}
			console.log(array1);
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