<template>
	<view class="page-shop" >
		<template v-if="goodsData != null">
			<view class="shop-content">
				<view class="shop-cover">
					<image :src="goodsData.goods.cover_url" mode="aspectFill"></image>
				</view>
				<view class="shop-name">
				{{goodsData.goods.title}}
				</view>
				<view class="shop-price">
					<text class="price">￥{{goodsData.goods.price}}</text>
					<text class="sales">销量 {{goodsData.goods.sales}}</text>
				</view>
				 <u-tabs 		
					lineWidth="50" 
					lineColor="#f56c6c"
					itemStyle="width:72px;height:44px"
					:scrollable="false" 
					:list="shopTabsList"
					@click="tabClick"
				>
				</u-tabs>
				<template v-if="curIndex===0">
					<view class="shop-desc">
						<mp-html :content="goodsData.goods.details"  />
					</view>
				</template>
				<template v-else-if="curIndex === 1">
					<template v-if="goodsData.goods.comments && goodsData.goods.comments.length > 0">
						<view class="shop-common-content" v-for="item in goodsData.goods.comments">
							<view class="user-avatar">
								<image :src="item.user.avatar_url" mode=""></image>
							</view>
							<view class="common-info">
								<view class="user-name_zan">
									<text class="username">{{item.user.name}}</text>
									<view class="zan">
										<text class="zan-num">{{item.star}}</text>
										<u-icon name="thumb-up" size="24"></u-icon>
									</view>
								</view>
								<view class="common-content">
								{{item.content}}
								</view>
								<view class="second-level_common" v-if="item.reply">
									<view class="second-level_common_user-box">
										<view class="second-level_common_username">
											Angela
										</view>
										<view class="second-level_common_content">
											融智商城非常棒，宇宙超级无敌彩虹螺旋好用，用它！
										</view>
									</view>
									<view class="second-level_common_user-box">
										<view class="second-level_common_username">
											Angela
										</view>
										<view class="second-level_common_content">
											融智商城非常棒，宇宙超级无敌彩虹螺旋好用，用它！
										</view>
									</view>
								</view>
							</view>
						</view>
					</template>
					<view v-else >
						暂无评论
					</view>
				</template>
				<template v-else>
					<Goods :dataList="goodsData.like_goods"/>
				</template>
			</view>
			 
			 <view class="shop-bar">
					<view class="shop-icon" @click="collect">
						<u-icon :name="isCollect ? 'star-fill' : 'star'" size="24" :color="isCollect ? '#ff6f03' :'#999'"></u-icon>
						<text>收藏</text>
					</view>
					<view class="shop-icon" @click="toCart">
						<u-icon name="shopping-cart" size="24"></u-icon>
						<text class="icon-label" v-if="cartsListLength !== 0">{{cartsListLength}}</text>
						<text>购物车</text>
					</view>
					<view class="shop-btn shop-addcart" @click="addCartsClick">加入购物车</view>
					<view class="shop-btn shop-purchase">立即购买</view>
			 </view>
		</template>
		<u-loading-page :loading="showLoading"></u-loading-page>
		<u-transition :show="isShowProductDetails" mode="slide-up" timingFunction="easy-in">
			<ProductDetails  v-if="isShowProductDetails" @close="close" :goods="goodsData.goods" @addCart="addCartAsync"/>
		</u-transition>
	
	</view>
</template>

<script>
	import { getGoodsDetail,collectGoods,getCollects } from '@/config/goods/goods.js'
	import { addCarts,getCartsList } from '@/config/carts/carts.js'
	export default {
		data() {
			return {
				curIndex:0,
				shopTabsList:[
					{name:'商品详情'},
					{name:'商品评论'},
					{name:'推荐商品'}
				],
				goodsId:null,
				goodsData:null,
				showLoading:false,
				isCollect:false,
				isShowProductDetails:false,
				cartsListLength:0,
			}
		},
		async onLoad(options) {
			this.goodsId = options.id
			this.getGoodsDetailData()
		},
		methods: {
			async getGoodsDetailData(){
				this.showLoading = true
				try{
					const res = await getGoodsDetail(this.goodsId) // 获取商品详情
					if(res.statusCode === 200){
							this.goodsData = res.data
					}
					const collectList = await getCollects() // 获取收藏列表
					const cartsList = await getCartsList()
					this.cartsListLength = cartsList.data.data.length
					this.isCollect = collectList.data.data.some(item => item.goods_id == this.goodsId) // 匹配是否收藏

				}catch(e){
					// 未登录，获取收藏和购物车会返回 401 则只显示商品详情
				}finally{
					this.showLoading = false
				}
	

		
			},
			tabClick(e){
				this.curIndex = e.index
			},
			// 收藏商品
			async collect(){
				const res = await collectGoods(this.goodsId)
				if(res.statusCode === 201){
					this.isCollect = true
					uni.$u.toast('已收藏')
				}else if(res.statusCode === 204){
					this.isCollect = false
					uni.$u.toast('已取消收藏')
				}else{
					return
				}
			},
			// 添加购物车
			addCartsClick(){
				this.isShowProductDetails = true
			},
			close(){
				this.isShowProductDetails = false
			},
			async addCartAsync(num,stock){
				if(!this.$store.state.login.isLogin){
					uni.$u.toast('还没登陆呢亲QAQ')
					return
				}
				if(stock === 0){
					uni.$u.toast('暂无库存')
					return
				}
				uni.showLoading({
					title:'添加中'
				})

				const res = await addCarts({
					goods_id:this.goodsId,
					num
				})
				if(res.statusCode === 204 || res.statusCode === 201){
					const cartsList = await getCartsList()
					uni.$u.toast('添加成功，在购物车等您亲')
					setTimeout(()=>{
						this.isShowProductDetails = false
					},500)
					this.cartsListLength = cartsList.data.data.length
				}else{
					 uni.hideLoading()
				}

			},
			// 跳转至购物车
			toCart(){
				uni.$emit('page-active')
				uni.$u.route({
					type:'switchTab',
					url:'pages/cart/cart'
				})
			}
		}
	}
</script>

<style lang="scss">
.page-shop{
	.shop-content{
		padding-bottom: 120rpx;
		.shop-cover{
			height: 600rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.shop-name{
			font-size: 40rpx;
			font-weight: 700;
			padding: 20rpx 40rpx;
		}
		.shop-price{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 30rpx;
			.price{
				color: #ff3333;
				font-size: 36rpx;
				font-weight: 700;
			}
			.sales{
				color: #999;
				font-size: 28rpx;
			}
		}
		.shop-common-content{
			padding: 20rpx 30rpx;
			display: flex;
			.user-avatar{
				width: 80rpx;
				height: 80rpx;
				background-color: #999;
				border-radius: 50%;
				flex-shrink: 0;
				image{
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
			.common-info{
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 0 0 10rpx;
				.user-name_zan{
					display: flex;
					justify-content: space-between;
					align-items: center;
					.username{
						color: skyblue;
						font-weight: 600;
						font-size: 32rpx;
					}
					.zan{
						display: flex;
						align-items: center;
						.zan-num{
							font-size: 26rpx;
							color: #999;
						}
					}
				}
			.common-content{
				padding: 10rpx 0;
			}
				.second-level_common{
				
					margin: 10rpx 0 10rpx 0;
					background-color: #f0f0f0;
					border-radius: 10rpx;
					box-sizing: border-box;
					.second-level_common_user-box{
						padding: 20rpx;
						border-bottom: 1px solid #ccc;
						.second-level_common_username{
							font-size: 24rpx;
							color: #999;
						}
						.second-level_common_content{
							padding: 10rpx 0;
							font-size: 28rpx;
						}
						&:last-child{
							border-bottom: none;
						}
					}

				}
			
			}
		}
	}
	
	.shop-bar{
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 120rpx;
		border-top: 1px solid #ccc;
		background-color: #fff;
		padding: 0 30rpx;
		box-sizing: border-box;
		.shop-icon{
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			text{
				font-size: 28rpx;
				&.icon-label{
					display: flex;
					align-items: center;
					justify-content: center;
					position: absolute;
					top: 0;
					right: 0;
					background-color: #ff3333;
					width: 30rpx;
					height: 30rpx;
					text-align: center;
					border-radius: 50%;
					color: #fff;
					font-size: 20rpx;
					padding: 5rpx;
					box-sizing: border-box;
				}
			}
		}
		.shop-btn{
			padding: 20rpx 40rpx;
			font-size: 28rpx;
			border-radius: 50rpx;
			
			&.shop-addcart{
				background-color: #ea3715;
				color: #ffe7d3;
			}
			&.shop-purchase{
				background-color: #ff6f03;
				color: #fff;
			}
		} 
	}
}
</style>
