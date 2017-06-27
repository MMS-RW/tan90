<template>
	<div class="address_container">
		<div class="address_header">
			<p><i class="iconfont icon-icon" @click="routerBack"></i><span>我的收货地址</span></p>
		</div>
		<div v-if="status" class="address_body">
			<img src="src/assets/images/address-none.png"/>
		</div>
		<div v-else>
			<div class="hasAddress_body">
				<ul>
					<li v-for="(item,idx) in address[0]">
						<div class="address_detail">
							<p v-cloak>{{item.name}}<span>{{item.phone}}</span></p>
							<p>广东省 广州市 天河区 天河客运站</p>
							<p v-cloak>{{item.tablet}}<strong v-if="item.val == '1'">默认</strong></p>
						</div>
						<div class="address_edit" @click="edit(item)">
							<i class="iconfont icon-15"></i>
						</div>
					</li>
				</ul>
			</div>
		</div>
		
		<div class="address_add">
			<router-link to="/addAddress"><p><i class="iconfont icon-jia"></i><span>添加新地址</span></p></router-link>
		</div>
	</div>
</template>

<script>
	import './address.scss'
	import $ from 'jquery'
	import {mapGetters,mapActions} from 'vuex'
	import router from '../../../router/index'
	import http from '../../../utils/HttpClient'

	export default {
		data(){
			return {
				status:null,
				address:[]
			}
		},
		created(){
			if(!window.localStorage.getItem('user')){
				$.alert('请先登录')
				router.push({name:'login'})
			}
			var _this = this;
			let email = JSON.parse(window.localStorage.getItem('user')).email
			// this.$store.dispatch('address',{email:email})
			// this.status = _this.$store.state.address.data
			// this.$set(this.status)
			http.get('fetchAddress',{email:email}).then(response => {
				_this.status = !response.status;
				_this.address.push(response.data);
				_this.$set(_this.address)
			})
		},
		methods:{
			routerBack(){
				router.push({name:'personal'});
			},
			edit(obj){
				window.localStorage.setItem('address',JSON.stringify(obj));
				router.push({name:'editAddress'})
			}
		}
	}
</script>