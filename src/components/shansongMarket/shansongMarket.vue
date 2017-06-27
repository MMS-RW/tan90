<template>
	<div class="shansong_container">
		<div class="shansong_top" v-show="top">
			<i class="iconfont icon-icon goBack" @click="goBack"></i>
			
			<p class="shansong_song">送至：
			<router-link to="/citys">
				<span class="shansong_address">{{citys}}</span><span class="iconfont icon-xialajiantou jian"></span>
			</router-link>
			</p>
			
			<span class="iconfont icon-mp-search sear" @click="searchClick"></span>
		</div>
		<span class="shansong_search" v-show="searchBox" >
			<input type="text" class="searchBox" placeholder="请输入关键词">
			<span class="iconfont icon-mp-search sear1" @click="search"></span>
			<span class="search_quxiao" @click="searchquxiao">取消</span>
		</span>
		<div class="shansong_main">
			<img src="../../assets/imgs/home_shanchao.png" alt="" class="index_kong">
			<p class="shansong_kai">您身边暂时还没有开通闪送超市</p>
			<div class="shansong_btn">我要开店</div>
		</div>
		
		<index-footer></index-footer>
	</div>	
</template>
<script>
import './shansongMarket.scss'
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
		        searchBox:false,
		        citys:''
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
	      	search(){
       			let val = $('.searchBox').val();
	       			if(val.trim()!=''){
			        	this.$router.push({name:'search',params:{val:val}})
			        }else{
			        	alert('请输入您要搜索的关键词！');
		    			return false
			        }
		      },
	      	

	    },
	        mounted(){
	    	if( !localStorage.getItem("city")){
				this.citys='东山湖公园'
			}else{
				this.citys=localStorage.getItem("city")
			}
		},

	}
</script>