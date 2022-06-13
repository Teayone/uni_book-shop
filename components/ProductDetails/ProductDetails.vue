<template>
	<view class="fixd-product">
		<view class="product-details">
			<view class="goods-info">
				<view class="goods-cover">
					<image :src="goods.cover_url" mode="aspectFill"></image>
				</view>
				<view class="goods-price">￥{{goods.price}}</view>
				<view class="close" @click="close">
					<u-icon name="close" color="#333" size="20"></u-icon>
				</view>
			</view>
			
			<view class="configuration">
				<view class="package-type bt">
					<view class="title">套餐类型</view>
					<view class="package-type-item">
						<text class="active">官方标配</text>
					</view>
				</view>
				<view class="purchase-quantity bt">
					<view>
						购买数量
						<text class="tips">库存：{{goods.stock}}</text>
					</view>
					<view class="add-sum">
						<text class="sum" :class="{disable:num <= 1}" @click="sum">-</text>
						<text class="num">
							{{num}}
						</text>
						<text class="add" :class="{disable:num >= goods.stock}" @click="add">+</text>
					</view>
				</view>
			</view>
		
		
		
			<view class="add-carts-btn" @click="btnClick">
				添加至购物车
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		props:{
			goods:{
				type:Object,
				default:()=>({})
			}
		},
		data(){
			return {
				num:this.goods.stock === 0 ? 0 : 1,
			}
		},
		methods:{
			sum(){
				if(this.num <= 1){
					uni.$u.toast('数量低于范围~')
					return
				}else{
					this.num--
				}
			},
			add(){
				if(this.goods.stock<=0){
					uni.$u.toast('暂无库存')
					return
				}
				this.num++
				
			},
			close(){
				this.$emit('close')
			},
			btnClick(){
				this.$emit('addCart',this.num,this.goods.stock)
			}
		},
		computed:{
			sumDisable(){
				return this.num == 1
			}
		}
	}
</script>

<style lang="scss" scoped>
	.fixd-product{
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, .3);
		z-index: 9;
	}
	.product-details{
		position: absolute;
		width: 100%;
		height: 70vh;
		background-color: #fff;
		padding: 20rpx;
		bottom: 0;
		left: 0;
		box-sizing: border-box;
		.goods-info{
			display: flex;
			// justify-content: space-around;
			// align-items: center;
			.goods-cover{
				width: 100rpx;
				height: 100rpx;
				background-color: #ccc;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.goods-price{
				font-size: 40rpx;
				color: #ff3333;
				font-weight: 600;
				padding-left: 20rpx;
			}
			.close{
				position: absolute;
				right: 20rpx;
			}
		}
		.configuration{
			overflow-y: scroll;
			width: 100%;
			.package-type{
				.title{
					margin-bottom: 20rpx;
				}
				.package-type-item{
					display: flex;
					width: 100%;
					justify-content: space-between;
					text{
						display: inline-block;
						border: 1px solid #ccc;
						font-size: 24rpx;
						padding: 8rpx 16rpx;
						border-radius: 50rpx;
						box-sizing: border-box;
						&.active{
							border-color:#ff3333;
							color: #ff3333;
						}
					}
				}
			}
		
			.purchase-quantity{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.tips{
					font-size: 24rpx;
					color: #ccc;
					padding-left: 10rpx;
					vertical-align: -2rpx;
					font-weight: 100;
				}
				.add-sum{
					display: flex;
					text{
						text-align: center;
						line-height: 50rpx;
						width: 50rpx;
						height: 50rpx;
						background-color: #f1f1f1;
						&.disable{
							background-color: #f8f8f8;
							color: #ccc;
						}
						&.num{
							margin: 0 6rpx;
							background-color: #f1f1f1;
							font-size: 24rpx;
							width: 70rpx;
						}
					}
				}
			}
		}
		.add-carts-btn{
			position: absolute;
			bottom: 30rpx;
			left: 50%;
			transform: translateX(-50%);
			white-space: nowrap;
			// width: 60vw;
			// border: 1px solid #ff3333;
			background-color: #ff3333;
			color: #fff;
			padding: 20rpx 240rpx;
			box-sizing: border-box;
			border-radius: 100rpx;
			font-size: 28rpx;
		}
	}
	
	.bt{
		border-bottom: 1px solid #ccc;
		padding: 20rpx 0;
	}
</style>