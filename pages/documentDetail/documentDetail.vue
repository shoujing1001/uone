<template>
	<view>
		<view class="padding-sm margin-sm radius shadow bg-white">
			<view class="text-bold text-xl">{{detail.title}}</view>
			<view class="flex padding-top-sm">
				<view @click.stop="seacrh(tag)" v-for="(tag,index) in detail.tags" :key="index" class="cu-tag round"
				:class="color[index]">{{tag}}</view>
			</view>
			<view class="flex padding-top-sm justify-around">
				<text class="icon-attention padding-right-xs">{{detail.view}}</text>
				<text class="icon-like padding-lr-sm">{{detail.favrote}}</text>
				<text class="icon-down padding-lr-sm">{{detail.download}}</text>
				<text class="icon-edit padding-lr-sm">{{detail.publisher}}</text>
			</view>
		</view>
		<view class="text-bold padding-sm">在线预览</view>
		<view class="margin-sm shadow radius bg-white ">
			<swiper style="width: 100%;height: 700upx;" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="(preview,index) in detail.preview" :key="index" style="width: 100%;">
					<view @click="previewImage(index)" style="width: 100%;">
						<image class="radius" style="width: 100%;" :src="preview" mode="widthFix"></image>
					</view>
				</swiper-item>
			</swiper>
			<view class="padding-sm text-content">
				{{detail.title}}{{detail.type}}
			</view>
			<view class="padding-lr-sm padding-bottom-sm flex justify-between align-center">
				<view class="">{{detail.size}}</view>
				<view class="btn-group">
					<button open-type="share" class="cu-btn bg-gradual-orange margin-right-sm">分享给好友</button>
					<button class="cu-btn bg-gradual-green" @click="previewFile">在线阅读</button>
				</view>
			</view>
		</view>
		<view class="padding-sm shadow bg-white margin-sm radius">
			<view class="text-bold text-center padding-tb-sm">使用说明</view>
			<view class="text-content">
				<rich-text class="text-content" :nodes="useful"></rich-text>
				投稿请联系<text class="text-blue" @click="paste">南审小助手（QQ:994878209，点击复制QQ号添加)</text>。
			</view>
		</view>
		<view class="margin-sm bg-white radius padding-sm shadow-blur">
			<view class="flex justify-between ">
				<view><text class="icon-titles padding-right-xs text-blue"></text>相关推荐</view>
				<!-- <view class="text-grey">更多<text class="icon-right"></text></view> -->
			</view>
			<scroll-view scroll-x="true" class="nav padding-top-sm" style="width: 100%;">
				<navigator v-for="(item,index) in command" :key="index" :url="'../documentDetail/documentDetail?id='+item.document_id+'&tags='+item.tags" class="bg-gray padding-sm radius shadow-blur text-center margin-xs" style="width: 260upx;display: inline-block;">
					<image :src="item.cover" mode="aspectFill" style="width: 95%;height: 280upx;"></image>
					<view class="text-cut" style="width: 95%;">{{item.title}}</view>
				</navigator>
			</scroll-view>
		</view>
		<view v-if="ad.detail" class="margin-sm bg-white radius padding-sm shadow">
			<ad unit-id="fb71ec961be46d875e6e75f9a2313505" type="card"></ad>
		</view>
		<view class="cu-bar"></view>
		<view class="cu-bar bg-white tabbar border justify-between btn-group" style="position: fixed;bottom: 0;width: 100%;">
			<navigator url="../collect/collect?action=1" class="action">
				<view class="icon-file text-green">
				</view>
				我的收藏
			</navigator>
			<button type="primary" @click="act(1)" class="cu-btn bg-gradual-red">投诉</button>
			<button type="primary" @click="act(2)" class="cu-btn bg-gradual-orange">收藏</button>
			<button type="primary" class="cu-btn bg-gradual-green" @click="downloadFile">下载文档</button>
		</view>
		<view v-if="bannerShow">
			<view class="uni-banner" style="background:#FFFFFF;" >
				<view style="justify-content:flex-end;">
					<view style="justify-content:flex-end; text-align:right;" class="padding-right padding-tb-xs" @tap="closeBanner">
						<text class="text-red icon-close" style="font-size: 40upx;"></text>
					</view>
				</view>
				<view class="text-content padding-lr text-center">
					<textarea v-model="content" placeholder="请简述您的投诉理由,我们将在3个工作日内作出处理并回应" style="width: 100%;" class="solids padding-sm text-left"/>
					<view class="cu-form-group">
						<view class="title">联系方式</view>
						<view class="action solid-bottom">
							<input type="text" v-model="contact" placeholder="请输入有效联系方式" />
						</view>
					</view>
					<view class="btn-group cu-bar padding-tb-sm">
						<button @click="submit" class="bg-gradual-red cu-btn lg radio shadow-blur">确认提交</button>
					</view>
				</view>
			</view>
			<view class="uni-mask"></view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				detail:{},
				color:['line-blue','line-red','line-yellow'],
				bannerShow:false,
				content:'',//投诉理由
				contact:'',
				command:[],
				useful:'',//使用说明
			}
		},
		computed:{
			...mapState(['ids','ad'])
		},
		onLoad(option) {
			this.setShare();
			console.log(option.id)
			console.log(option.tags);
			this.useful = uni.getStorageSync('useful');
			this.nau.request('api/document/view',{document_id:option.id}).then(data=>{
				console.log(data);
				this.detail = data.data;
				this.detail.preview = this.detail.preview.split("|");
				this.detail.preview.pop();
				this.detail.tags = this.detail.tags.split(",");
				console.log(this.detail)
			})
			this.nau.request('api/documentMy/search',{tags:option.tags,limit:10},true).then(data=>{
				console.log(data);
				this.command = data;
			})
		},
		onShareAppMessage(evt) {
			console.log(evt);
			return {
			      title: '我在优易资料帮发现了一个超实用的资料，快来看看吧！',
			      path: '/pages/documentDetail/documentDetail?id='+this.detail.document_id+'&tags='+this.detail.tags
			}
		},
		methods: {
			paste(){
				uni.setClipboardData({
					data:"994878209"
				})
			},
			previewImage(index){
				uni.previewImage({
					urls:this.detail.preview,
					current:index
				})
			},
			previewFile(){
				const that = this;
				uni.showLoading({
					mask:true,
					title:'加载中...'
				})
				uni.downloadFile({
					url:this.detail.document,
					success: function (res) {
						that.nau.request('api/documentMy/view_inc',{
							document_id:that.detail.document_id,
						}).then(data=>{
							this.detail.view ++;
							console.log(data);
						})
						var filePath = res.tempFilePath;
						console.log(filePath);
						uni.hideLoading();
						// #ifdef MP-QQ
						qq.openDocument({
						     filePath,
						     success(res) {
						       console.log('打开文档成功')
						     }
						})
						// #endif
					}
				})
			},
			downloadFile(){
				const that = this;
				uni.showLoading({
					mask:true,
					title:'加载中...'
				});
				uni.downloadFile({
					url:this.detail.document,
					filePath:wx.env.USER_DATA_PATH+that.detail.title+that.detail.type,
					success: function (res) {
						that.nau.request('api/collect/add',{document_id:that.detail.document_id,
							member_id:that.ids.member_id,action:2//1 收藏 2 下载
						}).then(data=>{
							that.detail.download ++;
							console.log(data);
						})
						var filePath = res.filePath;
						console.log(filePath);
						qq.openDocument({
						     filePath,
						     success(res) {
						       console.log('打开文档成功')
						     }
						})
						uni.hideLoading();
					}
				})
			},
			act(index){
				switch (index){
					case 1:this.bannerShow = true
						break;
					case 2:this.nau.request('api/collect/add',{document_id:this.detail.document_id,
							member_id:this.ids.member_id,action:1//1 收藏 2 下载
							}).then(data=>{
								console.log(data);
								if(data.status == 200){
									this.detail.favrote ++;
								}
								uni.showToast({
									title:data.msg,
									icon:'none'
								})
							})
						break;
				}
			},
			closeBanner(){
				this.bannerShow = false;
			},
			submit(){
				console.log(this.ids)
				if(this.ids.member_id && this.content && this.contact){
					this.nau.request('api/complain/add',{
						member_id:this.ids.member_id,document_id:this.detail.document_id,
						content:this.content,contact:this.contact
					}).then(data=>{
						console.log(data);
						uni.showToast({
							title:data.msg,
							icon:'none'
						});
						this.bannerShow = false;
						this.content = '';
						this.contact = ''
					})
				}else{
					uni.showModal({
						content:"请输入完整信息！",
						title:"温馨提示"
					})
				}
			}
		}
	}
</script>

<style>

</style>
