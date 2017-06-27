<template>
	<div class="bianli_container">
		<div class="bianli_top">
			<i class="iconfont icon-icon goBack" @click="goBack"></i>
			<p class="bianli_song">tan90°优选</p>
			<!-- <span class="iconfont icon-mp-search sear" @click="searchClick"></span> -->
		</div>
		<div class="bianli_main">
			<ul>
				<li v-for="(arr,index) in imgs" >
					<router-link :to="arr[1]">
						<img :src="'src/assets/imgs/'+arr[0]" alt="" class="bianli_imgs">
					</router-link>
				</li>
			</ul>
		</div>
		<index-footer></index-footer>
	</div>	
</template>
<script>
import './tan90bianli.scss'
import $ from 'jquery'
import footer from'../footer/footer.vue'
	export default{
		components: {
			'index-footer': footer
		},
		data(){
			return {
				imgs:[['tan90youxuan (1).jpg',''],['tan90youxuan (2).jpg','/list?kind=文具玩具'],['tan90youxuan (3).jpg','/list?kind=居家软饰'],['tan90youxuan (4).jpg','/list?kind=休闲食品'],['tan90youxuan (5).jpg','/list?kind=饮料酒水'],['tan90youxuan (6).jpg','/list?kind=个护美妆'],['tan90youxuan (7).jpg','/list?kind=创意厨房'],['tan90youxuan (8).jpg','/list?kind=粮油调味'],['tan90youxuan (9).jpg','/list?kind=清洁用品'],]
			}
		},
		methods: {
			goBack(){
				history.go(-1);
			},
			
	    },
	}
</script>