<template>
	<div class="editAddress_container">
		<div class="editAddress_header">
			<p><i class="iconfont icon-icon" @click="routerBack"></i><span>编辑收货地址</span>
			<strong @click="deleteAddress">删除</strong></p>
		</div>
		<div class="editAddress_body">
			<div class="editAddress_detail">
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
				<span @click="edit">保存</span>
			</div>
		</div>
	</div>
</template>

<script>
	import './editAddress.scss'
	import $ from 'jquery'
	import {mapGetters,mapActions} from 'vuex'
	import Vue from 'vue'
	import VueBlu from 'vue-blu'
	import http from '../../../utils/HttpClient'
	import router from '../../../router/index.js'
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
			var address = JSON.parse(window.localStorage.getItem('address'));
			this.name = address.name;
			this.tablet = address.tablet;
			this.phone = address.phone;
			address.val === '1' ? this.val1 = true : this.val1 = false;
		},
		methods:{
			onChange(val) {
		        const content = val ? '开启' : '关闭';
		        this.$notify.info({content});
		    },
			routerBack(){
				this.$router.go(-1);
			},
			edit(){
				var name = this.name,
					tablet = this.tablet,
					phone=this.phone,
					val=this.val1;
				var email = JSON.parse(window.localStorage.getItem('address')).email;
				var addressId = JSON.parse(window.localStorage.getItem('address')).addressId;
				if(!name){
					$.alert('名字不能为空');
					return;
				}else if(!tablet){
					$.alert('门牌号不能为空');
					return;
				}
				val === true ? val = '1' : val = '0'; 
				// console.log(val)
				// this.$store.dispatch('edit',{addressId:addressId,email:email,phone:phone,tablet:tablet,name:name,val:val})
				http.post('editAddress',{addressId:addressId,email:email,phone:phone,tablet:tablet,name:name,val:val}).then(response=>{
					if(response.status){
						router.push({name:'address'})
					}
				})
			},
			deleteAddress(){
				var email = JSON.parse(window.localStorage.getItem('address')).email;
				var addressId = JSON.parse(window.localStorage.getItem('address')).addressId;
				http.post('deleteAddress',{addressId:addressId,email:email}).then(response=>{
					if(response.status){
						router.push({name:'address'})
					}
				})
			}
		}
	}
</script>