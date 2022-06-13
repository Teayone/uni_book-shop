<template>
	<!-- 底部 -->
	<view class="footer">
		<view class="footet-content">
			<view class="checkbox" v-if="showCheckBox">
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
			<view class="settlement" :style="{width:width + 'rpx'}" @tap.stop="btnClick">
				{{btnText}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"FooterBar",
		props:{
			showCheckBox:{
					type:Boolean,
					default:true
			},
			totalPrice:{
				type:Number,
				default:0
			},
			btnText:{
				type:String,
				default:'结算'
			},
			checked:{
				type:Boolean,
				default:true
			},
			width:{
				type:Number,
				default:200
			},
			
		},
		methods:{
			checkChange(e){
				this.$emit('checkChange',e)
			},
			btnClick(){
				this.$emit('btnClick')
			}
		}
	}
</script>

<style lang="scss" scoped>
.footer{
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100rpx;
	// background-color: aqua;

	.footet-content{
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 40rpx;
		box-sizing: border-box;
		white-space: nowrap;
		.checkbox{
			position: relative;
			top: 10rpx;
			left: -6rpx;
		}
		.total-price{
			width: 300rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			.total{
				font-size: 24rpx
			}
			.price{
				color: #d81234;
				font-weight: 600;
				font-size: 40rpx;
				.rmb{
					font-size: 20rpx
				}
			}
		}
		.settlement{
			font-size: 28rpx;
			border-radius: 50rpx;
			background-color: #e70e24;
			color: #fff;
			padding: 20rpx;
			// width: 200rpx;
			text-align: center;
			box-sizing: border-box;
		}
	}
}

</style>