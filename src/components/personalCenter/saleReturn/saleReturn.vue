<template>
	<div class="return_container">
		<div class="return_header">
			<p><router-link to="personal"><i class="iconfont icon-icon"></i></router-link><span>售后服务</span></p>
		</div>

		<div class="return_body">
			<div class="return_none">
				<i class="iconfont icon-dian"></i>
			</div>
			<div class="return_tips">
				您目前还没有任何订单~
			</div>
			<div class="return_go">
				<span>去逛逛</span>
			</div>
		</div>
	</div>
</template>

<script>
	import './saleReturn.scss'

	export default {
		mounted(){

		}
	}
</script>