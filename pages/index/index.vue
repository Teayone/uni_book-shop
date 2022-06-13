<template>
	<view class="index">
		<u-toast ref="uToast"></u-toast>
		<u-swiper height="160" :list="bannerList" keyName="img_url"></u-swiper>
		<u-sticky bgColor="#fff">
			<u-tabs  
			:list="sortList" 
			lineWidth="50" 
			lineColor="#f56c6c"
			itemStyle="width:72px;height:44px"
			:scrollable="false"
			@click="tabClick"
			></u-tabs>
		</u-sticky>
		<Goods :dataList="goodsList"/>
		<view class="no-commodity" v-if="showText">
			没有商品了/(ㄒoㄒ)/~~
		</view>
	</view>
</template>

<script>
	import {
		getIndexData
	} from '@/config/index/index.js'
	export default {
		data() {
			return {
				bannerList: [],
				sortList: [
					{name: '默认'}, 
					{name: '销量'}, 
					{name: '推荐'},
					{name: '最新'},
				],
				goodsList:[],
				page:1,
				showText:false,
				curIndex:0
			}
		},
		onLoad() {
			this.getData()
		},
		// 触底事件
		onReachBottom() {
			if(this.showText)return
			this.page = this.page + 1
			this.getData()
		},
		methods: {
			async getData(index) {
				uni.showLoading({
					title:'加载中'
				})
				const params = {
					page:this.page,
				} 
				if(this.curIndex === 1) params.sales = 1
				if(this.curIndex === 2) params.recommend = 1
				if(this.curIndex === 3) params.new = 1
				const {data:res} = await getIndexData(params)
				uni.hideLoading()
				this.bannerList = Object.freeze(res.slides)
				if(res.goods.data.length === 0){
					this.showText = true
					return
				}
				this.goodsList.push(...res.goods.data)
			},
			tabClick(item){
				this.curIndex = item.index
				this.showText = false
				this.goodsList = []
				this.page = 1
				this.getData()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.no-commodity{
		text-align: center;
		color: #999;
		padding: 30rpx;
	}
</style>
