<template>
	<div class="origin_container">
		<div class="origin_top">
			<i class="iconfont icon-icon goBack" @click="goBack"></i>
			<p class="origin_song">产地直达</p>
			<!-- <span class="iconfont icon-mp-search sear" @click="searchClick"></span> -->
		</div>
		<div class="origin_main">
			<div class="origin_banner">
				<img src="../../assets/imgs/home_chandi.jpeg" alt="">
			</div>
			<!-- <ul>
				<li v-for="(arr,index) in imgs" >
					<router-link :to="arr[1]">
						<img :src="'src/assets/imgs/'+arr[0]" alt="" class="origin_imgs">
					</router-link>
				</li>
			</ul> -->
			<div class="origin_goods">
				<div id="topNav" class="swiper-container origin_nav">
				    <div class="swiper-wrapper">
				    	<div class="swiper-slide a" v-for="(arr,index) in nav" :class="{'active':activeIndex === index}" @click="navClick(index)">{{arr}}</div>
				    </div>
				</div>
				<img src="../../assets/imgs/quanqiugou (1).jpeg" alt="">
				<ul>
					<li v-for='(arr,index) in goods[0]' :ref="index">
					<router-link :to="'details?id='+ arr.id">
						<img :src="'src/assets/imgs/'+ JSON.parse(arr.banner)[0]" alt=""   class="origin_goodsimg">
						<span class="origin_goodstitle">{{arr.ProductName}}</span>
					</router-link>
       					<span class="origin_nowprice">{{arr.NewPrice}}<span class="idnex_oldprice">{{arr.OldPrice}}</span></span>
       					<i class="origin_car iconfont icon-gouwuche" @click="addCart(index)"></i>
					</li>
				</ul>
				<div class="origin_no-more">没有更多的商品了</div>
				<div class="goodscarshow">加入购物车成功！</div>
			</div>
		</div>
		<index-footer></index-footer>
	</div>	
</template>
<script>
import './origin.scss'
import $ from 'jquery'
import footer from'../footer/footer.vue'
import Swiper from '../index/swiper-3.4.2.min.js'
import http from '../../utils/HttpClient.js'
	export default{
		components: {
			'index-footer': footer
		},
		data(){
			return {
				nav:['特色水果','特色美食','地域名品','肉禽蛋鱼'],
				goods:[],
				activeIndex:0
			}
		},
		methods: {
			goBack(){
				history.go(-1);
			},
			navClick(index){
				this.activeIndex=index;
				console.log(Math.random());
				this.goods=[];
				let val = $('.a').eq(index).text();
	    		// console.log(this.$route.params.val);
				http.post('origingoods',{val:val}).then(function(res){
					console.log(res)
				    // console.log(this)
					this.goods.push(res.data)
					// console.log(this.goods[0])
					this.$set(this.goods)

				}.bind(this))
				
			},

			addCart(index){
		      	let goods = this.goods[0][index];
		      	let obj= {bigImg:JSON.parse(goods.banner)[0],productId:goods.id,productName:goods.ProductName,productNewPrice:goods.NewPrice,productOldPrice:goods.OldPrice,productNum:'1',singleTotalPrice:goods.NewPrice};
		      	// console.log(this.$refs[index],index);
		      	console.log(obj);
		      	http.post('addcart',obj).then(function(res){
					// console.log(res)
					if(res.status){
						$('.goodscarshow').fadeIn(200)
						setTimeout(function(){
				    		$('.goodscarshow').fadeOut(200);
				    	},1500);

					}

				})

		    }
			
	    },
	    mounted(){
	    	if( !localStorage.getItem("city")){
				this.citys='东山湖公园'
			}else{
				this.citys=localStorage.getItem("city")
			}
			var mySwiper = new Swiper('#topNav', {
					freeMode: true,
					freeModeMomentumRatio: 0.5,
					slidesPerView: 'auto',

			});
			$('.a').eq(0).addClass('active');

			let val = $('.a').eq(0).text();
    		// console.log(this.$route.params.val);
			http.post('origingoods',{val:val}).then(function(res){
				console.log(res)
			    // console.log(this)
				this.goods.push(res.data)
				// console.log(this.goods[0])
				this.$set(this.goods)

			}.bind(this))
		
		},
	}
</script>