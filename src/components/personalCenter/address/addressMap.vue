<template>
	<div class="map_container">
		<div class="map_top">
			<i class="iconfont icon-shouhuodizhi"></i><span v-once>{{location}}</span>
			<input type="text" placeholder="请输入送货地址" v-model="location">
			<span @click="back">取消</span>
		</div>
		<baidu-map 
			class="map"
			ak="K7b3ArpyD9gHq50ej7wSNWZZ"
			:center="center"
			:zoom="15" 
		>
			<!-- <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale> -->
			<bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
			<bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
			<bm-local-search :keyword="keyword" :auto-viewport="true" :selectFirstResult="true" :location="location"></bm-local-search>
			<bm-overview-map anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-overview-map>
			<bm-scale anchor="BMAP_ANCHOR_TOP_LEFT" :offset="offset"></bm-scale>
		</baidu-map>
	</div>
	
</template>

<script>
	import Vue from 'vue'
	import {BaiduMap,BmScale,BmNavigation,BmGeolocation,BmLocalSearch,
		BmOverviewMap} from 'vue-baidu-map'
	import './addressMap.scss'
	export default {
		components: {
			BaiduMap,
			BmScale,
			BmNavigation,
			BmGeolocation,
			BmLocalSearch,
			BmOverviewMap
		},
		data(){
			return {
				scale:true,
				location:'广州',
				keyword:'小区',
				center:'',
				offset:{width:4,height:8}
			}
		},
		methods:{
			back(){
				this.$router.go(-1)
			},
			handler({BMap, map}){
				
				
			}
		}
	}
</script>
