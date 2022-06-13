<template>
	<view class="list">
		<scroll-view scroll-y="true" >
			<view class="content">
				<view class="item">
					<image src="https://oss.shop.eduwork.cn/product/15.jpg" mode="aspectFill"></image>
					<text>细说网页制作</text>
				</view>
				<view class="item">
					<image src="https://oss.shop.eduwork.cn/product/15.jpg" mode="aspectFill"></image>
					<text>细说网页制作</text>
				</view>
				<view class="item">
					<image src="https://oss.shop.eduwork.cn/product/15.jpg" mode="aspectFill"></image>
					<text>细说网页制作</text>
				</view>
				<view class="item">
					<image src="https://oss.shop.eduwork.cn/product/15.jpg" mode="aspectFill"></image>
					<text>细说网页制作</text>
				</view>
				<view class="item">
					<image src="https://oss.shop.eduwork.cn/product/15.jpg" mode="aspectFill"></image>
					<text>细说网页制作</text>
				</view>
				<view class="item">
					<image src="https://oss.shop.eduwork.cn/product/15.jpg" mode="aspectFill"></image>
					<text>细说网页制作</text>
				</view>
				<view class="item">
					<image src="https://oss.shop.eduwork.cn/product/15.jpg" mode="aspectFill"></image>
					<text>细说网页制作</text>
				</view>
				<view class="item">
					<image src="https://oss.shop.eduwork.cn/product/15.jpg" mode="aspectFill"></image>
					<text>细说网页制作</text>
				</view>
				<view class="item">
					<image src="https://oss.shop.eduwork.cn/product/15.jpg" mode="aspectFill"></image>
					<text>细说网页制作</text>
				</view>
				<view class="item">
					<image src="https://oss.shop.eduwork.cn/product/15.jpg" mode="aspectFill"></image>
					<text>细说网页制作</text>
				</view>
				<view class="item">
					<image src="https://oss.shop.eduwork.cn/product/15.jpg" mode="aspectFill"></image>
					<text>细说网页制作</text>
				</view>				<view class="item">
					<image src="https://oss.shop.eduwork.cn/product/15.jpg" mode="aspectFill"></image>
					<text>细说网页制作</text>
				</view>				<view class="item">
					<image src="https://oss.shop.eduwork.cn/product/15.jpg" mode="aspectFill"></image>
					<text>细说网页制作</text>
				</view>				<view class="item">
					<image src="https://oss.shop.eduwork.cn/product/15.jpg" mode="aspectFill"></image>
					<text>细说网页制作</text>
				</view>				<view class="item">
					<image src="https://oss.shop.eduwork.cn/product/15.jpg" mode="aspectFill"></image>
					<text>细说网页制作</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:"List",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.list{
	height: 100%;
	.content{
		display: flex;
		flex-wrap: wrap;
	}
	.item{
		width: 50%;
		padding: 20rpx;
		box-sizing: border-box;
		image{
			width: 100%;
			height: 200rpx;
		}
		text{
			text-align: center;
			display: block;
			font-size: 28rpx;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			padding: 10rpx 0;
		}
	}
}
</style>