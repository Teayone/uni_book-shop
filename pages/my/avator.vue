<template>
	<view class="page-avator">
		<u-upload
			:fileList="fileList"
			@afterRead="afterRead"
			@delete="deletePic"
			name="1"
			multiple
			:maxCount="5"
			:previewFullImage="true"
		></u-upload>
		<button @click="upload">上传头像</button>
	</view>
</template>

<script>
	import { getOssToken } from '@/config/auth/oss.js'
	import { updateUserAvator } from '@/config/auth/user.js'
	export default {
	data() {
			return {
				action:'',
				fileName:'',
				fileList:[
					{url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F72%2F0e%2F0b%2F720e0bfb911a38a59757b9b39e26aecc.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657506371&t=757d644a2d76a587531844fb1bab4887'},
					{url:'https://img1.baidu.com/it/u=381449748,565984455&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'},
					{url:'https://img0.baidu.com/it/u=3794879963,319104949&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'},
					{url:'https://img2.baidu.com/it/u=1146259256,2780793184&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'},
					{url:'https://img1.baidu.com/it/u=3035631865,1378443537&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'},
					]
			};
		},
		methods:{
			// 新增图片
			afterRead(event){
				const file = event.file[0]
				let fileName = ''
				// #ifdef H5
			fileName = file.name
				// #endif
				
				// #ifndef H5
				let res = file.url.split('/')
				const name = res[res.length-1]
				fileName = name
				// #endif
				const s = fileName.slice(fileName.lastIndexOf('.'))
				// 生成唯一 ID
				this.fileName = uni.$u.guid(20) + s
				this.fileList.push(file)
				
			},
			// 删除图片
			deletePic(event){
				console.log(event);
				this.fileList.splice(event.index,1)
			},
			// 执行上传
			async upload(){
				// 首先获取 阿里 OSS token
				const {data:ossToken} = await getOssToken()
				this.action = ossToken.host
				const fm = new FormData()
				fm.append('key',this.fileName)
				fm.append('policy',ossToken.policy)
				fm.append('OSSAccessKeyId',ossToken.accessid)
				fm.append('success_action_status','200')
				fm.append('signature',ossToken.signature)
				console.log(this.action);
				 await uni.$u.http.post(this.action,fm)
				 const ava = await updateUserAvator({
					 avatar:this.fileName
				 })
				 console.log(ava);
			}
		}
	}
</script>

<style lang="scss">
.page-avator{
	padding: 40rpx;
}
</style>
