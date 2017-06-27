<template>
	<div class="search_container">
		<div class="search_top" v-show="top">
			<i class="iconfont icon-icon goBack" @click="goBack"></i>
			<p class="search_song">搜索结果
			</p>
		</div>
		<div class="search_main">
			<div class="search_goods">
				<img src="src/assets/imgs/quanqiugou (1).jpeg" alt="">
				<ul>
					<li v-for='(arr,index) in goods[0]' :ref="index">
					<router-link :to="'details?id='+ arr.id">
						<img :src="'src/assets/imgs/'+ JSON.parse(arr.banner)[0]" alt=""   class="search_goodsimg">
						<span class="search_goodstitle">{{arr.ProductName}}</span>
					</router-link>
       					<span class="search_nowprice">{{arr.NewPrice}}<span class="idnex_oldprice">{{arr.OldPrice}}</span></span>
       					<i class="search_car iconfont icon-gouwuche" @click="addCart(index)"></i>
					</li>
				</ul>
				<div class="search_no-more">没有更多的商品了</div>
				<div class="goodscarshow">加入购物车成功！</div>
			</div>
		</div>
		<index-footer></index-footer>
	</div>	
</template>
<script>
import './search.scss'
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
		        goods:[],

			}
		},
		methods: {
			goBack(){
				history.go(-1);
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
        	let val = this.$route.params.val;
    		// console.log(this.$route.params.val);
			http.post('searchgoods',{val:val}).then(function(res){
				// console.log(res)
			    // console.log(this)
				this.goods.push(res.data)
				// console.log(this.goods[0])
				this.$set(this.goods)

			}.bind(this))
		},

	}
</script>