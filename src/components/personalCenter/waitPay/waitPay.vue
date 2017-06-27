<template>
	<div class="pay_container">
		<div class="pay_header">
			<p><router-link to="personal"><i class="iconfont icon-icon"></i></router-link><span>待支付</span></p>
		</div>

		<div class="pay_body">
			<div class="pay_none">
				<i class="iconfont icon-dian"></i>
			</div>
			<div class="pay_tips">
				您目前还没有任何订单~
			</div>
			<div class="pay_go">
				<span>去逛逛</span>
			</div>
		</div>
	</div>
</template>

<script>
	import './waitPay.scss'

	export default {
		mounted(){

		}
	}
</script>