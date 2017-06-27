<template>
	<div class="fetch_container">
		<div class="fetch_header">
			<p><router-link to="personal"><i class="iconfont icon-icon"></i></router-link><span>待收货</span></p>
		</div>

		<div class="fetch_body">
			<div class="fetch_none">
				<i class="iconfont icon-dian"></i>
			</div>
			<div class="fetch_tips">
				您目前还没有任何订单~
			</div>
			<div class="fetch_go">
				<span>去逛逛</span>
			</div>
		</div>
	</div>
</template>

<script>
	import './waitFetch.scss'

	export default {
		mounted(){

		}
	}
</script>