<template>
	<div class="quanqiugou_container">
		<div class="quanqiugou_top" v-show="top">
			<i class="iconfont icon-icon goBack" @click="goBack"></i>
			<p class="quanqiugou_song">全球购</p>
			<!-- <span class="iconfont icon-mp-search sear" @click="searchClick"></span> -->
		</div>
		<div class="quanqiugou_main">
			<img src="../../assets/imgs/quanqiugou (6).jpg" alt="" class="quanqiugou_img1">
			<img src="../../assets/imgs/quanqiugou (2).jpg" alt="" class="quanqiugou_img1">
			<img src="../../assets/imgs/quanqiugou (5).jpg" alt="" class="quanqiugou_img1">
			<img src="../../assets/imgs/quanqiugou (4).jpg" alt="" class="quanqiugou_img1">
			<img src="../../assets/imgs/quanqiugou (3).jpg" alt="" class="quanqiugou_img1">
			<img src="../../assets/imgs/quanqiugou (1).jpeg" alt="" class="quanqiugou_img1">
		</div>
		<index-footer></index-footer>
	</div>	
</template>
<script>
import './quanqiugou.scss'
import $ from 'jquery'
import footer from'../footer/footer.vue'
	export default{
		components: {
			'index-footer': footer
		},
		data() {
		    return {
		    	show:false,
		        scroll: '',
		        top:true,
		        searchBox:false
			}
		},
		methods: {
			goBack(){
				history.go(-1);
			},
	    },
	}
</script>