<template>
	<view class="page-goods" v-if="goods != null">
		<view class="search">
			<view class="search-inner">
				<u-icon name="search"></u-icon>
				<input class="search-text" type="text" placeholder="搜索商品" v-model="keyword">
				<u-icon @click="clearSearch" name="close" size="16" v-show="keyword != ''"></u-icon>
			</view>
			<view class="search-btn" @click.stop="searchGoods">搜索</view>
		</view>
		<view class="goods-menu-wrap">
			<scroll-view scroll-with-animation scroll-y="true" class="goods-tab">
				<view @click.stop="switchTab(item.id)" class="goods-tab-item" :class="{active:curId == item.id}" v-for="item in categories" :key="item.id">
					<text>{{item.name}}</text>
				</view>
			</scroll-view>
			<scroll-view scroll-y="true" class="right-box" @scrolltolower="scrolltolower">
				<view class="goods-list" >
					<template v-if="goodsList && goodsList.length > 0">
						<navigator :url="'/pages/goos/shop?id='+item.id" class="goods-item" v-for="(item,index) in goodsList" :key="'0' + item.id + index">
							<image class="item-img" :src="item.cover_url" mode="aspectFill"></image>
							<text class="item-text">{{item.title}}</text>
						</navigator>
					</template>
					<template v-else-if="empty">
						<view class="empty">
							<u-empty
								mode="data"
								icon="http://cdn.uviewui.com/uview/empty/data.png"
							>
							</u-empty>
						</view>
					</template>
					<view class="loading"  v-show="isShowLoading">
							<u-loading-icon mode="circle" text="加载中..."></u-loading-icon>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
	<u-loading-page v-else :loading="true" loading-text=""></u-loading-page>
</template>
<script>
	import { getGoodsList } from '@/config/goods/goods.js'
	export default {
		data(){
			return {
				page:1,
				category_id:null,
				categories:[],
				goods:null,
				goodsList:[],
				recommend_goods:[],
				curId:null,
				keyword:'',
				init:false,
				isShowLoading:false,
				empty:false
			}
		},
		onLoad(){
			this.getGoodsData()
	
		},
		methods:{
			async getGoodsData(){
				const params = {
					page:this.page,
				}
				if(this.keyword) params.title = this.title
				if(this.curId) params.category_id = this.curId
				const res = await getGoodsList(params) // 请求列表数据
				this.isShowLoading = false // 隐藏加载中提示
				if(!this.init){ // 只有当页面初始化请求资源时处理这段逻辑
					const cList = []
					const categories = res.data.categories
					categories.forEach(item => {
						cList.push(item)
						item.children.forEach(c=>{
							cList.push(c)
						})
					})
					this.categories = cList
					this.init = true
				}
				this.recommend_goods = res.data.recommend_goods 
				this.goods = res.data.goods
				if(this.goods.data.length === 0) { 
					this.empty = true // 设置数据为空的状态
					return
				}
				this.goodsList = [...this.goodsList,...this.goods.data]
		
			},
			switchTab(id){
				if(this.curId === id){
					this.curId = null
				}else{
					this.curId = id
				}
				this.commonMethod()
				this.getGoodsData()
			},
			searchGoods(){
				this.commonMethod()
				this.getGoodsData()
			},
			clearSearch(){
				this.keyword = ''
				this.commonMethod()
				this.getGoodsData()
			},
			// 滚动到底部加载更多数据
			scrolltolower(){
				if(this.empty) return	 
				this.isShowLoading = true
				this.page ++
				this.getGoodsData()
			},
			commonMethod(){
				this.empty = false // 取消数据为空状态
				this.goodsList = []
				this.page = 1
			}
		}
	}
</script>
<style lang="scss">
	.page-goods{
		height: calc(100vh);
		// #ifdef H5
		height: calc(100vh - 94px);
		// #endif
		display: flex;
		flex-direction: column;
		.search{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 18rpx 30rpx;
			.search-inner{
					flex: 1;
					background-color: rgb(234, 234, 234);
					border-radius: 100rpx;
					display: flex;
					align-items: center;
					padding: 10rpx 16rpx;
					.search-text{
						font-size: 26rpx;
						color: #999;
						margin-left: 10rpx;
						margin-right: 30rpx;
						width: 100%;
					}
			}
			.search-btn{
				font-size: 28rpx;
				padding: 0 30rpx;
				
			}
		}
	
		.goods-menu-wrap{
			flex: 1;
			display: flex;
			overflow: hidden;
			.goods-tab{
				flex-shrink: 0;
				width: 200rpx;
				height: 100%;
				.goods-tab-item{
					position: relative;
					height: 110rpx;
					background: #f6f6f6;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 26rpx;
					color: #444;
					font-weight: 400;
					line-height: 1;
					&.active{
						background-color: #fff;
						font-weight: 700;
						font-size: 30rpx;
						&::before{
							content: '';
							position: absolute;
							left: 0;
							top: 50%;
							width: 10rpx;
							height: 30rpx;
							background-color: deepskyblue;
							transform: translateY(-50%);
						}
					}
					
				}
			}
		
			.right-box{
				height: 100%;
				.goods-list{
					display: flex;
					flex-wrap: wrap;
					.goods-item{
						display: flex;
						flex-direction: column;
						align-items: center;
						width: 50%;
						box-sizing: border-box;
						padding: 40rpx 20rpx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						.item-img{
							width: 200rpx;
							height: 200rpx;
						}
						.item-text{
							font-size: 28rpx;
							padding: 10rpx 0;;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							width: 100%;
							text-align: center;
						}
					}
					.empty{
						width: 100%;
						margin: 0 auto;
					}
					.loading{
						display: flex;
						width: 100%;
						padding: 40rpx;
						justify-content: center;
					}
				
				}
			}
		}
	}
	image{
		width: 100rpx;
		height: 100rpx;
	}
</style>