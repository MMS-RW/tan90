<template>
	<div class="order_container">
		<div class="order_header">
			<p><router-link to="personal"><i class="iconfont icon-icon"></i></router-link><span>我的订单</span></p>
		</div>

		<div class="order_body">
			<div class="order_none">
				<i class="iconfont icon-dian"></i>
			</div>
			<div class="order_tips">
				您目前还没有任何订单~
			</div>
			<div class="order_go">
				<span>去逛逛</span>
			</div>
		</div>
	</div>
</template>

<script>
	import './order.scss'

	export default {
		mounted(){

		}
	}
</script>