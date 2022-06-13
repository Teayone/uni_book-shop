<template>
	<view class="page-order">
		<view class="address">
			<u-cell-group>
				<u-cell
				    size="large"
				    title="河北省廊坊市大城县"
				    label="大尚屯镇大保村"
				    isLink
				></u-cell>
			</u-cell-group>
		</view>
		<scroll-view scroll-y="true" class="scroll-content">
			<OrderItem v-for="item in carts" :key="item.id" :data="item"/>
		</scroll-view>
		<FooterBar :showCheckBox="false" btnText="提交订单并支付" :width="300" :totalPrice="totalPrice"/></FooterBar>
	</view>
</template>

<script>
	import { orderPreview } from '@/config/order/order.js'
	export default {
		data() {
			return {
				carts:[],
				totalPrice:0,
				address:[]
			};
		},
		onLoad(){
			this.getData()
		},
		methods:{
			async getData(){
				const {data:res} = await orderPreview()
				this.carts = res.carts
				this.address = res.address
				this.carts.forEach(item => {
					this.totalPrice += (item.goods.price * item.num)
				})
				console.log(res);
			}
		}
	}
</script>

<style lang="scss" scoped>
.page-order{
	height: calc(100vh);
	// #ifdef H5
	height: calc(100vh - 94px);
	// #endif
	display: flex;
	flex-direction: column;
	.scroll-content{
		flex: 1;
		overflow: hidden;
	}
}
</style>
