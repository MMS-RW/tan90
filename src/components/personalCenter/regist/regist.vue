<template>
	<div class="regist_container">
		<div class="regist_logo"><img src="../../../assets/images/logo.png"></div>
		<div class="regist_text">
			tan90°方便小区生活
		</div>
		<div class="regist_message">
			<p>
				<i class="iconfont icon-gerenzhongxin"></i>
				<input type="text" placeholder="用户名" v-model="username" @change="judgeUser">
				<br/><span :style="{color:'red',marginLeft:'25px'}" v-show="this.$store.state.judge.data.data == 'username'" :class="this.$store.state.judge.data.data == 'username' ? this.tip = 'username' : this.tip = null" v-cloak>{{this.$store.state.judge.data.message}}</span>
			</p>
			<p>
				<i class="iconfont icon-yijianfankui"></i>
				<input type="text" placeholder="邮箱" v-model="email" @change="judgeEmail">
				<br/><span :style="{color:'red',marginLeft:'25px'}" v-show="this.$store.state.judge.data.data == 'email'" :class="this.$store.state.judge.data.data == 'email' ? this.tip = 'email' : this.tip = null" v-cloak>{{this.$store.state.judge.data.message}}
				</span>
			</p>
			<p>
				<i class="iconfont icon-shouji"></i>
				<input type="text" placeholder="手机号" v-model="phone" @change="judgePhone">
				<br/><span :style="{color:'red',marginLeft:'25px'}" v-show="this.$store.state.judge.data.data == 'phone'" :class="this.$store.state.judge.data.data == 'phone' ? this.tip = 'phone' : this.tip = null" v-cloak>{{this.$store.state.judge.data.message}}</span>
			</p>
			<p>
				<i class="iconfont icon-pay"></i>
				<input type="password" placeholder="密码" v-model="password">
			</p>
			<p>
				<i class="iconfont icon-pay"></i>
				<input type="password" placeholder="确认密码" v-model="psw">
			</p>
			<p>
				<i class="iconfont icon-yifuxuanzhong"></i>
				<input type="text" placeholder="请输入验证码" class="regist_code" v-model="code">
				<input type="button" v-model="rcode" class="regist_buttoncode" @click="randomCode">
			</p>
		</div>
		<div class="regist_button">
			<span @click.prevent="regist">注册</span>
		</div>
		<div class="regist_regist"><router-link to="/login">已有账号，去登录 >></router-link></div>
	</div>
</template>

<script type="text/javascript">
	import { mapGetters, mapActions } from 'vuex'
	import './regist.scss'
	import $ from 'jquery'

	export default {
		data(){
			return {
				username:'',
				phone:'',
				email:'',
				password:'',
				psw:'',
				code:'',
				rcode:'',
				tip:null
			}
		},
		created(){
			this.randomCode();
		},
		methods:{
			judgeUser(event){
				if(this.username){
					this.$store.dispatch('judge',{username:this.username})
				}
				$('.dk-spinner.dk-spinner-three-bounce, dk-spinner-mask').parent('div').hide()
				
			
			},
			judgeEmail(event){
				if(this.email && /^[\w\-\.]+@[a-z\d\-]+(\.[a-z]+){1,2}$/.test(this.email)){
					this.$store.dispatch('judge',{email:this.email})
				}else{
					$.alert('请输入正确的邮箱');
				}
				$('.dk-spinner.dk-spinner-three-bounce, dk-spinner-mask').parent('div').hide()
			},
			judgePhone(event){
				if(this.phone && /^1[34578]\d{9}$/.test(this.phone)){
					this.$store.dispatch('judge',{phone:this.phone})
				}else{
					$.alert('请输入正确的手机号');
				}
				$('.dk-spinner.dk-spinner-three-bounce, dk-spinner-mask').parent('div').hide()
			},
			regist(event){
				switch (''){
					case this.username:
						$.alert('用户名不能为空');
						return;
					case this.phone:
						$.alert('手机号不能为空');
						return;
					case this.email:
						$.alert('邮箱不能为空');
						return;
					case this.password:
						$.alert('密码不能为空');
						return;
					case this.psw:
						$.alert('密码不能为空');
						return;
					case this.code:
						$.alert('请输入验证码');
						return;
				}

				if(this.password !== this.psw){
					$.alert('两次输入密码不一致');
					return ;
				}
				// let reg = new RegExp("^\s+"+this.rcode+"\s+$","gi");
				
				if(this.code.toUpperCase() != this.rcode.toUpperCase()){
					this.randomCode();
					$.alert('验证码不正确');
					return;
				}

				if(!/^[\w\-\.]+@[a-z\d\-]+(\.[a-z]+){1,2}$/.test(this.email)){
					$.alert('请输入正确的邮箱');
					return;
				}

				if(!/^1[34578]\d{9}$/.test(this.phone)){
					$.alert('请输入正确的手机号');
					return;
				}
				switch (this.tip){
					case 'username':
						$.alert('用户名已被注册');
						return;
					case 'email':
						$.alert('邮箱已被注册');
						return;
					case 'phone':
						$.alert('手机号已被注册');
						return;
				}
				this.$store.dispatch('regist',{username:this.username,phone:this.phone,email:this.email,password:this.password})

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