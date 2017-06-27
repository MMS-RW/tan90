<template>
	<div class="evaluate_container">
		<div class="evaluate_header">
			<p><router-link to="personal"><i class="iconfont icon-icon"></i></router-link><span>评价中心</span></p>
		</div>

		<div class="evaluate_body">
			<div class="evaluate_none">
				<i class="iconfont icon-dian"></i>
			</div>
			<div class="evaluate_tips">
				您目前还没有任何订单~
			</div>
			<div class="evaluate_go">
				<span>去逛逛</span>
			</div>
		</div>
	</div>
</template>

<script>
	import './waitEvaluate.scss'

	export default {
		mounted(){

		}
	}
</script>