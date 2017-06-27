<template>
	<div class="login_container">
		<div class="login_logo"><img src="src/assets/images/logo.png"></div>
		<div class="login_text">
			tan90°方便小区生活
		</div>
		<div class="login_message">
			<p>
				<i class="iconfont icon-gerenzhongxin"></i>
				<input type="text" placeholder="用户名或手机号或邮箱" v-model="username">
			</p>
			<p>
				<i class="iconfont icon-pay"></i>
				<input type="password" placeholder="密码" v-model="psw">
			</p>
			<p>
				<i class="iconfont icon-yifuxuanzhong"></i>
				<input type="text" placeholder="请输入验证码" class="login_code" v-model="code">
				<input type="button" v-model="rcode" class="login_buttoncode" @click="randomCode">
			</p>
		</div>
		<div class="login_button">
			<span @click="login">登录</span>
		</div>
		<div class="login_regist"><router-link to="/regist">还没有账号，去注册 >></router-link></div>
	</div>
</template>

<script type="text/javascript">
	import { mapGetters, mapActions } from 'vuex'
	import './login.scss'
	import $ from 'jquery'

	export default {
		data(){
			return {
				username:'',
				psw:'',
				code:'',
				rcode:''
			}
		},
		created(){
			this.randomCode();
		},
		methods:{
			login(event){
				// console.log(this.$store)
				switch (''){
					case this.username:
						$.alert('用户名不能为空');
						return;
					case this.psw:
						$.alert('密码不能为空');
						return;
					case this.code:
						$.alert('请输入验证码');
						return;
				}
				if(this.code.toUpperCase() != this.rcode.toUpperCase()){
					this.randomCode();
					$.alert('验证码不正确');
					return;
				}
				this.$store.dispatch('login',{username:this.username,password:this.psw})


			},
			randomCode(){
				let code = '';
				let len = 4;
				let random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','y','w','x','y','z');
				for(let i=0;i<len;i++){
					let index = Math.floor(Math.random()*random.length);
					code += random[index];
				}
				this.rcode = code;
			}
		}
		
	}
</script>