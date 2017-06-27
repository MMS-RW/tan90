<template>
	<div class="ba-good">
		<div class="ba-header-left">
			<router-link to="/">
				<i class="icon iconfont icon-icon"></i>
			</router-link>
		</div>
		<div class="ba-good-title">
			<p>倍全优选</p>
		</div>
		<div class="ba-good-goods f-cb">
			<ul class="f-cb">
				<li class="ba-good-item">
					<router-link to="origin">
						<div class="ba-select">
							<div class="ba-item-select">
								<h2>产地直达</h2>
								<span><p>小时候的...</p></span>
							</div>
							<div class="ba-item-img">
								<img src="../../assets/imgs/goodimg1.jpg" alt="">
							</div>
						</div>
					</router-link>
				</li>
				<li class="ba-good-item">
					<router-link to="/banner_food">
						<div class="ba-select">
							<div class="ba-item-select">
								<h2>休闲食品</h2>
								<span>花样美食...</span>
							</div>
							<div class="ba-item-img">
								<img src="../../assets/imgs/goodimg2.jpg" alt="">
							</div>
						</div>
					</router-link>
				</li>
				<li class="ba-good-item">
					<router-link to="/banner_father">
						<div class="ba-select">
							<div class="ba-item-select">
								<h2>饮料酒水</h2>
								<span>为您精选...</span>
							</div>
							<div class="ba-item-img">
								<img src="../../assets/imgs/goodimg3.jpg" alt="">
							</div>
						</div>
					</router-link>
				</li>
				<li class="ba-good-item">
					<router-link to="/origin">
						<div class="ba-select">
							<div class="ba-item-select">
								<h2>粮油调味</h2>
								<span>尝真五常...</span>
							</div>
							<div class="ba-item-img">
								<img src="../../assets/imgs/goodimg4.jpg" alt="">
							</div>
						</div>
					</router-link>
				</li>
				<li class="ba-good-item">
					<router-link to="/huazhuang">
						<div class="ba-select">
							<div class="ba-item-select">
								<h2>个户美妆</h2>
								<span>正品低价...</span>
							</div>
							<div class="ba-item-img">
								<img src="../../assets/imgs/goodimg5.jpg" alt="">
							</div>
						</div>
					</router-link>
				</li>
				<li class="ba-good-item">
					<router-link to="/chufang">
						<div class="ba-select">
							<div class="ba-item-select">
								<h2>清洁用品</h2>
								<span> 轻松搞定...</span>
							</div>
							<div class="ba-item-img">
								<img src="../../assets/imgs/goodimg6.jpg" alt="">
							</div>
						</div>
					</router-link>
				</li>
				<li class="ba-good-item">
					<router-link to="/jiashi">
						<div class="ba-select">
							<div class="ba-item-select">
								<h2>居家软饰</h2>
								<span>优选创意...</span>
							</div>
							<div class="ba-item-img">
								<img src="../../assets/imgs/goodimg7.jpg" alt="">
							</div>
						</div>
					</router-link>
				</li>
				<li class="ba-good-item">
					<router-link to="/jiashi">
						<div class="ba-select">
							<div class="ba-item-select">
								<h2>文具玩具</h2>
								<span>有态度更...</span>
							</div>
							<div class="ba-item-img">
								<img src="../../assets/imgs/goodimg8.jpg" alt="">
							</div>
						</div>
					</router-link>
				</li>
				<li class="ba-good-item">
					<router-link to="/chufang">
						<div class="ba-select">
							<div class="ba-item-select">
								<h2>创意厨房</h2>
								<span> 精致厨房...</span>
							</div>
							<div class="ba-item-img">
								<img src="../../assets/imgs/goodimg9.jpg" alt="">
							</div>
						</div>
					</router-link>
				</li>
				
			</ul>
		</div>
		<index-footer></index-footer>
	</div>
</template>

<script type="text/javascript">
	import './list.scss'
	import '../../assets/font/iconfont.css'
	import footer from'../footer/footer.vue'
	
	export default {
		components: {
			'index-footer': footer
		},
		data(){
			return {
				toolList: null
			}
		},
		methods: {
			
		},
		created(){
			// this.$on('dk', (a) => {
			// 	// this.msg = 'dk'
			// 	console.log(a)
			// })
		}
	}
</script>