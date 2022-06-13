<template>
	<view class="goods">
		<navigator :url="'/pages/goos/shop?id='+item.id" class="goods-item" v-for="(item,index) in dataList" :key="index">
			<u--image :showLoading="true" :src="item.cover_url" width="100%" height="200px"></u--image>
			<view class="goods-name">{{item.title}}</view>
			<view class="goods-info">
				<text class="price">￥{{item.price}}</text>
				<text class="sales">销量：{{item.collects_count}}</text>
			</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		name:"Goods",
		props:{
			dataList:{
				type:Array,
				default:()=>[]
			}
		},
	}
</script>

<style lang="scss">
.goods{
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		align-items: center;
		.goods-item{
			padding: 40rpx;
			width: 50%;
			box-sizing: border-box;
			margin-top: 30rpx;
			box-shadow: 0 12rpx 20rpx 0 rgba(0, 0, 0, .1);
			.goods-name{
				margin: 10rpx 0;
				font-weight: 500;
				font-size: 32rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.goods-info{
				width: 100%;
				display: flex;
				justify-content: space-between;
				font-size: 28rpx;
				.price{
					color: red;
				}
				.sales{
					color: #999;
				}
			}
		}
	}
	
</style>