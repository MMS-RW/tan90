<template>
	<div class="feedback_container">
		<div class="feedback_header">
			<p><router-link to="/personal"><i class="iconfont icon-icon"></i></router-link><span>意见反馈</span></p>
		</div>
		<div class="feedback_body">
			<ul>
				<li>
					<p>选择问题类型</p>
					<div class="feedback_type">
						<span  v-for="(item,index) in type" @click="issue(index)" :class="index === idx ? activeClass : null" ref="activeSpan">{{item}}</span>
					</div>
				</li>
				<li>
					<p>您的意见</p>
					<div class="input_feed">
						<textarea placeholder="您的宝贵建议是我们前进的方向" v-model="text" @input="listener" maxlength="150"></textarea>
						<span class="feed_num"><span v-text="num"></span>/150</span>
					</div>
					<div class="add_photo" @click="tips">
						<i class="iconfont icon-jia"></i>
					</div>
				</li>
				<li>
					<p>您的联系方式</p>
					<p><input type="text" v-model="phone"></p>
				</li>
			</ul>
			<div class="present">
				<span @click="btnSubmit">提交</span>
			</div>
		</div>
		
	</div>
</template>

<script>
	import './feedback.scss'
	import $ from 'jquery'

	export default {
		data(){
			return {
				num:0,
				text:'',
				type:['订单问题','商品质量','物流配送','功能建议','系统故障','其他'],
				idx:null,
				activeClass:'issue_active',
				phone:null
			}
		},
		methods:{
			listener(){
				this.num = this.text.length
			},
			btnSubmit(){
				var isActive = false;
				this.$refs.activeSpan.forEach((item)=>{
					if(item.className == 'issue_active'){
						isActive = true;
					}
				})
				if(!isActive){
					$.alert('请选择问题类型');
					return;
				}
				if(this.num === 0){
					$.alert('请输入您的宝贵建议');
					return;
				}
				if(!/^1[34578]\d{9}$/.test(this.phone)){
					$.alert('请输入正确的手机号');
					return;
				}else if(!this.phone){
					$.alert('请输入您的手机号');
					return;
				}
				$.alert('谢谢您的反馈与建议,工作人员随后将与您沟通，请您及时在线')
				this.$router.go(-1)
			},
			issue(idx){
				this.idx = idx
			},
			tips(){
				$.alert('请上移动端查看')
			}

		}
	}
</script>