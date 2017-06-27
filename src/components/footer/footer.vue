<template>
	<div class="footer_container">
		<ul>
			<li v-for="(arr,index) in foot" class="footer_li" :class="{'aaa':activeIndex === index}" @click=click(index)>
				<router-link :to="arr[2]">
					<p><i :class="'iconfont'+' '+ arr[1]" class="aa"></i></p>
					<p>{{arr[0]}}</p>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	import $ from 'jquery'
	// import VueRouter from 'vue-router'
	import './footer.scss'
	export default {
		data(){
			return {
				foot:[['首页','icon-shouye-shouye','/'],['分类','icon-quanqiugou101','/list'],['购物车','icon-gouwuche','/car'],['我的','icon-gerenzhongxin','/personal']],
				activeIndex:0,
				index:0
			}
		},
		methods:{
			click(index){
				this.activeIndex=index;
				$('.aa').css('color',0.5)
				$('.aa').eq(index).css('opacity',1);
				localStorage.setItem("footer_index",index);
				
			}
		},
		mounted(){
			// if(!localStorage.getItem("footer_index")){
			// 	$('.aa').eq(0).css('opacity',1);
			// }else{
			// 	let footer_index = localStorage.getItem("footer_index")
			// 	this.index=footer_index
			// 	$('.aa').eq(this.index).css('opacity',1);
			// }
		}
	}
</script>