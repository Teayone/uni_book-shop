<template>
	<view class="order-item">
		<view class="item-img">
			<image :src="data.goods.cover_url" mode="aspectFill"></image>
		</view>
		<view class="item-info">
			<view class="title">
				{{data.goods.title}}
			</view>
			<view class="price-num">
				<text class="price">￥{{data.goods.price}}</text>
				<text class="num">x{{data.num}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'OrderItem',
		props:{
			data:{
				type:Object,
				default:()=>({})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order-item{
		display: flex;
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx 30rpx;
		&:nth-child(odd){
			background-color: #f1f2f3;
		}
		.item-img{
			width: 200rpx;
			height: 200rpx;
			flex-shrink: 0;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.item-info{
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding-left: 40rpx;
			box-sizing: border-box;
			.title{
				font-size: 28rpx;
				font-weight: 700;
			}
			.price-num{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.price{
					color: #ec4141;
					font-weight: 600;
				}
				.num{
					font-size: 24rpx;
					color: #999;
				}
			}
		}
	}
</style>