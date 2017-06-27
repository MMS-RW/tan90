<template >
	<div class="index_container" @scroll="Scroll" >
		<div class="index_top" v-show="top">
			<i class="iconfont icon-shouyesaoerweima01 sao"></i>
			
			<p class="index_song">送至：
			<router-link to="/citys">
				<span class="index_address">{{citys}}</span><span class="iconfont icon-xialajiantou jian"></span>
			</router-link>
			</p>
			
			<span class="iconfont icon-mp-search sear" @click="searchClick"></span>
		</div>
		<span class="index_search" v-show="searchBox" >
			<input type="text" class="searchBox" placeholder="请输入关键词">
			<span class="iconfont icon-mp-search sear1" @click="search"></span>
			<span class="search_quxiao" @click="searchquxiao">取消</span>
		</span>
		<div class="index_main">
			<div class="swiper-container">
			    <div class="swiper-wrapper">
				    <div class="swiper-slide" v-for="(arr,index) in lunboimg">
				        <router-link :to="arr[1]">
				        	<img :src="'src/assets/imgs/'+arr[0]" alt=""  class="index_lunbopic">
				        </router-link>
				    </div>
			    </div>
			    <!-- 如果需要分页器 -->
			    <div class="swiper-pagination"></div>
			</div>
			<div class="index_nav">
				<ul>
					<li v-for="(arr,index) in indexNav">
						<router-link :to="arr[1]">
							<img :src="'src/assets/imgs/'+arr[0]" alt=""  class="index_navimg">
							<p>{{arr[2]}}</p>
						</router-link>
					</li>
				</ul>
			</div>
			<div class="index_qian">
				<ul>
					<li>
						<i class="iconfont icon-qiandao qiandao"><span>签到</span></i>
					</li>
					<li>
						<i class="iconfont icon-chongzhi chongzhi"><span>充值</span></i>
					</li>
				</ul>
			</div>
			<div class="index_bignav">
				<ul>
				<router-link to="/origin">
					<li><img src="../../assets//imgs/home_chandi.jpeg" alt="" ></li>
				</router-link>
				<router-link to="/banner_food">
					<li><img src="../../assets//imgs/home_shipin.jpeg" alt="" > </li>
				</router-link>	
				<router-link to="/chufang">
					<li><img src="../../assets//imgs/home_chufang.jpeg" alt="" > </li>
				</router-link>
				<router-link to="/jiashi">
					<li><img src="../../assets//imgs/home_jiayong.jpeg" alt="" > </li>
				</router-link>
				<router-link to="/huazhuang">
					<li><img src="../../assets//imgs/home_huazhuang.jpeg" alt="" > </li>
				</router-link>
				</ul>
			</div>
			<div class="index_goods">
				<div class="index_tui">
					<p>实时推荐</p>
				</div>
				<ul>
					<li v-for='(arr,index) in goods[0]' :ref="index">
					<router-link :to="'details?id='+ arr.id">
						<img :src="'src/assets/imgs/'+ JSON.parse(arr.banner)[0]" alt=""   class="index_goodsimg">
						<span class="index_goodstitle">{{arr.ProductName}}</span>
					</router-link>
       					<span class="index_nowprice">{{arr.NewPrice}}<span class="idnex_oldprice">{{arr.OldPrice}}</span></span>
       					<i class="index_car iconfont icon-gouwuche" @click="addCart(index)"></i>
					</li>
				</ul>
			</div>
			<div class="index_no-more">
				没有更多的商品了
			</div>
		</div>
		<div class="index_gotop iconfont icon-icon" @click=backtop v-show="show"></div>
		<div class="goodscarshow">加入购物车成功！</div>
		<index-footer></index-footer>
	</div>	
</template>
<script>
import './index.scss'
import Swiper from './swiper-3.4.2.min.js'
import $ from 'jquery'
import footer from'../footer/footer.vue'
import http from '../../utils/HttpClient.js'
	export default{
		components: {
			'index-footer': footer
		},
		data() {
		    return {
		    	show:false,
		        scroll: '',
		        top:true,
		        searchBox:false,
		        lunboimg:[['home_banner1.jpeg','/banner_summer'],
		        		  ['home_banner2.jpeg','/banner_father'],
		        		  ['home_banner3.jpeg','/banner_food'],
		        		  ['home_banner4.jpeg','/hainan']],
		        indexNav:[['home_nav1.png','/shansongMarket','闪送超市'],
		        		  ['home_nav2.png','/quanqiugou','全球购'],
		        		  ['home_nav3.png','/origin','产地直达'],
		        		  ['home_nav4.png','/bianli','tan90°优选'],
		        		  ['home_nav5.png','','餐饮外卖'],
		        		  ['home_nav6.png','','洗衣干洗'],
		        		  ['home_nav7.png','','蛋糕预定'],
		        		  ['home_nav8.png','','鲜花预定'],],
		       	citys:'东山湖公园',
		       	goods:[],
			}
		},
		methods: {
	        Scroll() {
		        this.scroll = this.$el.scrollTop;
		       	if(this.scroll>400){
		       		 this.show=true;
		       	}
		       	 if(this.scroll<400){
		       		 this.show=false;
		       	}
		       	// console.log(this)
	      	},
	      	backtop(){
	      		$('.index_container').animate({scrollTop:0},300)
	      	},
	      	searchClick(){
	      		if(this.top==true){
		       		 this.top=false;
		       		 this.searchBox=true;
		       	}
		       	else{
		       		 this.top=true;
		       		 this.searchBox=false;
		       	}
		       	console.log(this.top)
	      	},
	      	searchquxiao(){
	      		console.log(3245)
      			if(this.top==true){
		       		 this.top=false;
		       		 this.searchBox=true;
		       	}
		       	else{
		       		 this.top=true;
		       		 this.searchBox=false;
		       	}
	      	},
	      	search(){
       			let val = $('.searchBox').val();
	       			if(val.trim()!=''){
			        	this.$router.push({name:'search',params:{val:val}})
			        }else{
			        	alert('请输入您要搜索的关键词！');
		    			return false
			        }
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
			
			// let city=this.$route.params.city
			// console.log(this.$route.params)
			// 	$('.index_address').html(city)

			http.post('getallgoods').then(function(res){
				// console.log(res)
				this.goods.push(res.data)
				 // console.log(this.goods[0])
				 this.$set(this.goods)

			}.bind(this))
				

			//轮播图
			var mySwiper = new Swiper ('.swiper-container', {
			    direction: 'horizontal',
			    loop: true,
			    //自动播放
			    autoplay:2000,
			    //播放速度[]
			    speed:650,
			    // 如果需要分页器
			    pagination: '.swiper-pagination',
			    // 这样，即使我们滑动之后， 定时器也不会被清除
			　　autoplayDisableOnInteraction : false,

			})

			window.addEventListener('scroll', this.Scroll);
		},

	}
</script>