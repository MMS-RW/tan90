<template>
	<div class="addAddress_container">
		<div class="addAddress_header">
			<p><i class="iconfont icon-icon" @click="routerBack"></i><span>新增收货地址</span></p>
		</div>
		<div class="addAddress_body">
			<div class="addAddress_detail">
				<p>
					<label for="name">收货人:</label>
					<input type="text" id="name" v-model="name" placeholder="姓名(不多于10个字符)"/>
				</p>
				<p>
					<label for="phone">手机号码:</label>
					<input type="text" id="phone" v-model="phone"/>
				</p>
				<router-link to="/map">
				<p>
					
					<label for="plot">小区/街道:</label>
					<!-- <input type="text" id="plot" disabled/> -->
					<i class="iconfont icon-iconfontqianjin2"></i>
				</p></router-link>
				<p>
					<label for="tablet">门牌号:</label>
					<input type="text" id="tablet" placeholder="请填写具体门牌号" v-model="tablet"/>
				</p>
				<p>
					<label for="address">设置为默认地址:</label>

					<b-switch type="primary" style="float:right" on-text="开启" off-text="关闭" v-model="val1"></b-switch>
					<!-- <b-switch type="primary" :on-change="onChange"></b-switch> -->
				</p>
			</div>
			<div class="save">
				<span @click="save">保存</span>
			</div>
		</div>
	</div>
</template>

<script>
	import './addAddress.scss'
	import $ from 'jquery'
	import {mapGetters,mapActions} from 'vuex'
	import Vue from 'vue'
	import VueBlu from 'vue-blu'
	// import 'vue-blu/dist/css/vue-blu.min.css'
	Vue.use(VueBlu)
	export default {
		data(){
			return {
				phone:null,
				name:'',
				tablet:'',
				val1: true
			}
		},
		created(){
			if(!window.localStorage.getItem('user')){
				$.alert('请先登录')
				router.push({name:'login'})
			}

			let phone = JSON.parse(window.localStorage.getItem('user')).phone
			this.phone = phone;
		},
		methods:{
			onChange(val) {
		        const content = val ? '开启' : '关闭';
		        this.$notify.info({content});
		    },
			routerBack(){
				this.$router.go(-1);
			},
			save(){
				var name = this.name,
					tablet = this.tablet,
					phone=this.phone,
					val=this.val1;
				var email = JSON.parse(window.localStorage.getItem('user')).email;
				var addressId = phone + '' + Math.ceil(Math.random()*10000);
				if(!name){
					$.alert('名字不能为空');
					return;
				}else if(!tablet){
					$.alert('门牌号不能为空');
					return;
				}
				val === true ? val = '1' : val = '0'; 
				// console.log(email)
				this.$store.dispatch('save',{addressId:addressId,email:email,phone:phone,tablet:tablet,name:name,val:val})
			}
		}
	}
</script>