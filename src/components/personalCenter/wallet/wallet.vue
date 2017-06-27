<template>
	<div class="wallet_container">
		<div class="wallet_header">
			<p><router-link to="personal"><i class="iconfont icon-icon"></i></router-link><span>我的钱包</span></p>
		</div>
		<div class="wallet_body">
			<div class="wallet_balance">
				<div>
					账户余额: <strong>0.00</strong>
					<i class="iconfont icon-iconfontqianjin2"></i>
				</div>
				<div>
					<p>充值<i class="iconfont icon-iconfontqianjin2"></i></p>
					<p>支付密码<span>(未设置)</span><i class="iconfont icon-iconfontqianjin2"></i></p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import './wallet.scss'

	export default {

	}
</script>