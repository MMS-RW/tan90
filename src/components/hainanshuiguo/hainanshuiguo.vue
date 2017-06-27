<template>
	<div class="hainan_container">
		<div class="hainan_top">
			<i class="iconfont icon-icon goBack" @click="goBack"></i>
			<p class="hainan_song">海南水果专题</p>
			<!-- <span class="iconfont icon-mp-search sear" @click="searchClick"></span> -->
		</div>
		<div class="hainan_main">
			<ul>
				<li v-for="(arr,index) in imgs" >
					<router-link :to="arr[1]">
						<img :src="'src/assets/imgs/'+arr[0]" alt="" class="hainan_imgs">
					</router-link>
				</li>
			</ul>
		</div>
		<index-footer></index-footer>
	</div>	
</template>
<script>
import './hainanshuiguo.scss'
import $ from 'jquery'
import footer from'../footer/footer.vue'
	export default{
		components: {
			'index-footer': footer
		},
		data(){
			return {
				imgs:[['hainanshuiguo (1).jpeg',''],['hainanshuiguo (2).jpeg',''],['hainanshuiguo (3).jpeg',''],['hainanshuiguo (4).jpeg','details?id=123休闲食品'],['hainanshuiguo (5).jpeg','details?id=123饮料酒水'],['hainanshuiguo (6).jpeg','details?id=123个护美妆'],['hainanshuiguo (7).jpeg','details?id=123创意厨房'],['hainanshuiguo (8).jpeg','details?id=123粮油调味'],['hainanshuiguo (9).jpeg','details?id=123清洁用品'],['hainanshuiguo (10).jpeg','details?id=123清洁用品']]
			}
		},
		methods: {
			goBack(){
				history.go(-1);
			},
			
	    },
	}
</script>