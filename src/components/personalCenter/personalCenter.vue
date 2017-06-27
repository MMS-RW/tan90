<template>
	<div class="personal_container">
		<div class="personal_top">
			<div class="personal_logo">
				<img src="../../assets/images/logo.png">
				<span>{{this.user}}</span>
			</div>
			<ul>
				<li>
					<router-link to="/wallet">
					<p><span>0.00</span></p>
					<p><span>余额</span></p></router-link>
				</li>
				<li>
					<p><span>0</span></p>
					<p><span>红包</span></p>
				</li>
				<li>
					<p><span>0</span></p>
					<p><span>贝壳</span></p>
				</li>
			</ul>
		</div>
		<div class="personal_center">
			<router-link to="/order">
			<div class="personal_allorder">
				<span>我的订单</span>
				<span class="allorder_click">查看所有订单<i class="iconfont icon-iconfontqianjin2"></i></span>
				<div></div>
			</div></router-link>
			<ul class="personal_nav">
				<li v-for="(arr,index) in person_nav">
					<router-link :to="arr[2]">
					<p><i :class="'iconfont'+' '+ arr[1]"></i></p>
					<p>{{arr[0]}}</p></router-link>
				</li>
			</ul>
		</div>
		<div class="personal_more">
			<ul>
				<span v-for="(arr,index) in person_more">
				<router-link :to="arr[2]">
					<li>
						<i :class="'iconfont'+' '+ arr[1]"></i>
						<span>{{arr[0]}}</span>
						<b class="iconfont icon-iconfontqianjin2"></b>
					</li>
				</router-link></span>
				<li>
					<i class="iconfont icon-shouji"></i>
					<span>客服电话</span>
					<span class="personal_tel">176-7304-2309</span>
				</li>
			</ul>
		</div>
		<div class="personal_login"><span @click="exitOrLogin">{{this.btn}}</span></div>
		<personal-footer></personal-footer>
	</div>
</template>

<script>
	import $ from 'jquery'
	import './personalCenter.scss'
	import footer from '../footer/footer.vue'
	import router from '../../router/index.js'

	export default {
		components:{
			'personal-footer':footer
		},
		created(){
			if(window.localStorage.getItem('user')){
				// console.log(window.localStorage.getItem('user'))
				this.user = JSON.parse(window.localStorage.getItem('user')).username
				this.btn = '退出'
			}
		},
		data(){
			return {
				person_nav:[['待支付','icon-pay','/pay'],['待收货','icon-che2','/fetch'],['待评价','icon-daipingjia','/evaluate'],['退货','icon-zuoweituihuo','/saleReturn']],
				person_more:[['收货地址','icon-shouhuodizhi','/address'],['我要开店','icon-dian','/shop'],['意见反馈','icon-yijianfankui','/feedback']],
				user:null,
				btn:'登录'
			}
		},
		methods:{
			exitOrLogin(){
				if(this.btn == '退出'){
					window.localStorage.removeItem('user');
					this.user = null;
					this.btn = '登录';
				}else if(this.btn == '登录'){
					router.push({name:'login'})
				}
				// console.log(this.btn)
			}
		}
	}
</script>