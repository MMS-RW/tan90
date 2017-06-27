<template>
	<div class="food_container">
		<div class="food_top">
			<i class="iconfont icon-icon goBack" @click="goBack"></i>
			<p class="food_song">好吃正能量</p>
			<!-- <span class="iconfont icon-mp-search sear" @click="searchClick"></span> -->
		</div>
		<div class="food_main">
			<div class="food_banner">
				<img src="src/assets/imgs/bannerfood.jpeg" alt="">
			</div>
			<!-- <ul>
				<li v-for="(arr,index) in imgs" >
					<router-link :to="arr[1]">
						<img :src="'src/assets/imgs/'+arr[0]" alt="" class="food_imgs">
					</router-link>
				</li>
			</ul> -->
			<div class="food_goods">
				<div id="topNav" class="swiper-container food_nav">
				    <div class="swiper-wrapper">
				    	<div class="swiper-slide a e" v-for="(arr,index) in nav" :class="{'c1':activeIndex === index}" @click="navClick(index)">{{arr}}</div>
				    </div>
				</div>
				<img src="src/assets/imgs/quanqiugou (1).jpeg" alt="">
				<ul>
					<li v-for='(arr,index) in goods[0]' :ref="index">
					<router-link :to="'details?id='+ arr.id">
						<img :src="'src/assets/imgs/'+ JSON.parse(arr.banner)[0]" alt=""   class="food_goodsimg">
						<span class="food_goodstitle">{{arr.ProductName}}</span>
					</router-link>
       					<span class="food_nowprice">{{arr.NewPrice}}<span class="idnex_oldprice">{{arr.OldPrice}}</span></span>
       					<i class="food_car iconfont icon-gouwuche" @click="addCart(index)"></i>
					</li>
				</ul>
				<div class="food_no-more">没有更多的商品了</div>
				<div class="goodscarshow">加入购物车成功！</div>
			</div>
		</div>
		<index-footer></index-footer>
	</div>	
</template>
<script>
import './banner_food.scss'
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
				nav:['休闲零嘴','饼干糕点','肉感肉脯',''],
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
	    		console.log(val);
				http.post('origingoods',{val:val}).then(function(res){
					// console.log(res)
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
    		console.log(val);
			http.post('origingoods',{val:val}).then(function(res){
				// console.log(res)
			    // console.log(this)
				this.goods.push(res.data)
				// console.log(this.goods[0])
				this.$set(this.goods)

			}.bind(this))
		
		},
	}
</script>