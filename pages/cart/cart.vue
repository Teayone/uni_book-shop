<template>
	<view v-if="!isShowLoading">
		<view class="page-cart" v-if="isLogin">
			<scroll-view scroll-y="true" class="scroll-content">
				<view class="cart-content" v-for="(item,index) in cartsList" :key="item.id">
					<view class="checkbox-cart">
						<u-checkbox-group placement="column">
						    <u-checkbox
						        :customStyle="{marginBottom: '8px'}"
										shape="circle"
										v-model="item.is_checked" 
										labelSize="12"
										:checked="item.is_checked"
										@change="cartsCheckChange($event,index)"
						    >
						    </u-checkbox>
						</u-checkbox-group>
					</view>
					<view class="cart-goods">
						<view class="goods-cover" @click="toGoodsDetail(item.goods.id)">
							<u-image :src="item.goods.cover_url" width="100" height="100"></u-image>
						</view>
						<view class="goods-info">
							<view class="goods-name" @click="toGoodsDetail(item.goods.id)">
								<text class="name text_overflow">{{item.goods.title}}</text>
								<text class="desc text_overflow">{{item.goods.description}}</text>
								<text class="stock">库存:{{item.goods.stock}}</text>
							</view>
							<view class="goods-price-num">
								<view class="goods-price">
									<text >￥{{item.goods.price}}</text>
								</view>
								<view class="goods-num">
									<text class="p-text" :class="{disabled:item.num == 1}" @click.stop="jianNum(index)">-</text>
									<text class="p-text" >{{item.num}}</text>
									<text class="p-text" :class="{disabled:item.num >= item.goods.stock}" @click.stop="addNum(index,item.goods.stock)">+</text>
									<view class="delete" @click.top="deleteCartsGoods(item.id)">
										<u-icon name="trash" size="24" color="#f25e76"></u-icon>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				
			</scroll-view>
			<!-- 底部 -->
			<FooterBar :checked="checked" @changeCheckbox="checkChange" :totalPrice="totalPrice" @btnClick="toOrder"></FooterBar>
<!-- 			<view class="footer">
				<view class="footet-content">
					<view class="checkbox">
						<u-checkbox-group placement="column">
						    <u-checkbox
						        :customStyle="{marginBottom: '8px'}"
						        label="全选"
						        name="全选"
										shape="circle"
										:checked="checked"
										@change="checkChange"
										labelSize="12"
						    >
						    </u-checkbox>
						</u-checkbox-group>
					</view>
					<view class="total-price">
						<text class="total">合计：</text>
						<text class="price"><text class="rmb">￥</text>	{{totalPrice}}</text>
					</view>
					<view class="settlement">
						结算
					</view>
				</view>
			</view>
		
		 -->
		</view>
		<view v-else>
			<view class="login-text" @click="toLogin">
				<text>登录后可同步电脑和手机购物车中的商品</text>
				<u-icon name="arrow-rightward" size="16" color="#cf883a"></u-icon>
			</view>
			<u-empty
				mode="car"
				icon="http://cdn.uviewui.com/uview/empty/car.png"
			>
			</u-empty>
		</view>
	</view>
	<view v-else>
		<u-loading-page :loading="true" loadingText=""></u-loading-page>
	</view>
</template>

<script>
	import { getCartsList ,deleteCarts,changeCartsNum,selectCarts} from '@/config/carts/carts.js'
	import { handleLoginState } from '@/utils/index.js'
	export default {
		data() {
			return {
				cartsList:[],
				checked:true,
				totalPrice:0,
				isShowLoading:false,
				timer:null,
				cart_ids:[],
				initPage:false,
			};
		},
		onLoad(){
			this.initPage = true
			this.totalPrice = 0
			this.init()
		},
		onTabItemTap() {
			
			if(!this.initPage){
				this.totalPrice = 0
				this.init()
			}
		},
		mounted(){
			uni.$on('page-active',()=>{
				this.totalPrice = 0
				this.init()
			})
		},
		methods:{
			init(){
				this.isShowLoading = true
				if(this.isLogin){
					this.getCartsData()
				}else{
					setTimeout(()=>{
						this.getCartsData()
					},1500)
				}
			},
			async getCartsData(){
				if(!this.isLogin) {
						this.isShowLoading = false 
						return
				}
				const {data:res} = await getCartsList({include:'goods'})
				if(res.data.length === 0){
					this.checked = false
				}else{
					res.data.forEach(item => {
						item.is_checked = item.is_checked === 1 ? true : false
						if(!item.is_checked) {
							this.checked = false
						}	else{
						this.totalPrice += (item.goods.price * item.num)
						}
					})
					this.cartsList = res.data
				}
				this.isShowLoading = false 
				this.initPage = false
			},
			checkChange(e){
				this.checked = e
				if(!e) this.totalPrice =  0;
				this.cartsList.forEach(item => {
					item.is_checked = e
					if(item.is_checked){
						this.cart_ids.push(item.id)
					}
					if(e)this.totalPrice += (item.goods.price * item.num)
				})
				this.cartsOperation({type:'select',delay:500,data:{cart_ids:this.cart_ids}})
			},
			cartsCheckChange(e,index){
				this.cart_ids = []
				this.cartsList[index].is_checked = e
				if(e){
					this.checked = this.cartsList.every(item => item.is_checked)	
					this.totalPrice += (this.cartsList[index].goods.price * this.cartsList[index].num)
				}else{
					this.checked = false
					this.totalPrice -= (this.cartsList[index].goods.price * this.cartsList[index].num)
				}
				selectCartsAjax()
			},
			toLogin(){
				handleLoginState('navigateTo',true,0)
			},
			addNum(index,stock){
				if(this.cartsList[index].num >= stock){
					uni.$u.toast('没有库存了/(ㄒoㄒ)/~~')
					return
				}
				this.cartsList[index].num ++
				this.totalPrice += this.cartsList[index].goods.price
				this.cartsOperation({type:'change-num',delay:500,id:this.cartsList[index].id,data:{num:String(this.cartsList[index].num)}})
			},
			jianNum(index){
				if(this.cartsList[index].num === 1) {
					uni.$u.toast('宝贝数量不能再减了~~')
					return 
				}
				this.cartsList[index].num --
				this.totalPrice -= this.cartsList[index].goods.price
				this.cartsOperation({type:'change-num',delay:500,id:this.cartsList[index].id,data:{num:String(this.cartsList[index].num)}})
			},
			deleteCartsGoods(id){
				this.cartsList = this.cartsList.filter((item)=>{
					if(item.id === id){
						this.totalPrice -= (item.goods.price * item.num)
					}
					return item.id !== id
				})
				if(this.cartsList.length === 0){
					this.checked = false
				}
				this.cartsOperation({type:'delete',delay:500,id})
			},
		  cartsOperation({type,delay,id,data}){
				if(this.timer) clearTimeout(this.timer)
				this.timer = setTimeout(async ()=>{
					if(type === 'delete'){
						await deleteCarts(id)
					}else if(type === 'select'){
						await selectCarts(data)
					}else if(type === 'change-num'){
						await changeCartsNum(id,data)
					}
				},delay)
			},
			selectCartsAjax(){
				this.cartsList.forEach(item => {
					if(item.is_checked){
						this.cart_ids.push(item.id)
					}
				})
				this.cartsOperation({type:'select',delay:500,data:{cart_ids:this.cart_ids}})
			},
			toGoodsDetail(id){
				uni.$u.route({
					url:'pages/goos/shop',
					params:{
						id
					}
				})
			},
			toOrder(){
				uni.navigateTo({
					url:'/pages/order/order'
				})
			}
		},
		computed:{
			isLogin(){
				return this.$store.state.login.isLogin
			},
		},
	}
</script>

<style lang="scss">
	.page-cart{
		position: relative;
		height: calc(100vh);
		// #ifdef H5
		height: calc(100vh - 94px);
		// #endif
		display: flex;
		flex-direction: column;
		.scroll-content{
			flex: 1;
			overflow: hidden;
			padding-bottom: 100rpx;
			.cart-content{
				display: flex;
				align-items: center;
				padding: 30rpx;
				box-sizing: border-box;
				.checkbox-cart{
					flex-shrink: 0;
				}
				.cart-goods{
					flex: 1;
					box-sizing: border-box;
					display: flex;
					.goods-cover{
						flex-shrink: 0;
						width: 200rpx;
						height: 200rpx;
						overflow: hidden;
						padding-left: 15rpx;
					}
					.goods-info{
						flex: 1;
						display: flex;
						flex-direction: column;
						box-sizing: border-box;
						justify-content: space-between;
						margin-left: 20rpx;
						.goods-name{
							display: flex;
							flex-direction: column;
		
							.name{
								font-weight: 600;
								font-size: 28rpx;
							}
							.desc{
								font-size: 28rpx;
								color: #999;
							}
							.stock{
								padding-top: 10rpx;
								color: #999;
								font-size: 24rpx;
								text-align: right;
							}
						}
					
						.goods-price-num{
							display: flex;
							justify-content: space-between;
							align-items: center;
							.goods-price{
								color: #d81234;
								font-weight: 600;
							}
							.goods-num{
								white-space: nowrap;
								display: flex;
								align-items:center;
								.p-text{
									// display: inline-block;
									width: 60rpx;
									height: 60rpx;
									background-color: #f2f2f2;
									text-align: center;
									line-height: 60rpx;
									&:nth-child(2){
										margin: 0 2rpx;
									}
									&:not(:nth-child(2)){
										font-size: 40rpx
									}
									&.disabled{
										background-color: #f8f8f8;
										color: #dcdcdc;
									}
								}
								.delete{
									padding: 0 6rpx;
									text-align: center;
									background-color: #fff;
								}
							}
						}
					}
				}
			}
		}

	}
// .footer{
// 	position: absolute;
// 	bottom: 0;
// 	left: 0;
// 	width: 100%;
// 	height: 100rpx;
// 	// background-color: aqua;

// 	.footet-content{
// 		height: 100%;
// 		display: flex;
// 		align-items: center;
// 		justify-content: space-between;
// 		padding: 0 40rpx;
// 		box-sizing: border-box;
// 		white-space: nowrap;
// 		.checkbox{
// 			position: relative;
// 			top: 10rpx;
// 			left: -6rpx;
// 		}
// 		.total-price{
// 			width: 300rpx;
// 			overflow: hidden;
// 			text-overflow: ellipsis;
// 			.total{
// 				font-size: 24rpx
// 			}
// 			.price{
// 				color: #d81234;
// 				font-weight: 600;
// 				font-size: 40rpx;
// 				.rmb{
// 					font-size: 20rpx
// 				}
// 			}
// 		}
// 		.settlement{
// 			font-size: 28rpx;
// 			border-radius: 50rpx;
// 			background-color: #e70e24;
// 			color: #fff;
// 			padding: 20rpx;
// 			width: 200rpx;
// 			text-align: center;
// 			box-sizing: border-box;
// 		}
// 	}
// }

.login-text{
	padding: 20rpx;
	background-color: #fdf6e1;
	display: flex;
	justify-content: space-between;
	align-items: center;
	text{
		color: #cf883a;
		font-size: 28rpx;
	}
}

</style>
