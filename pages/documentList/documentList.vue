<template>
	<view>
		<view class="cu-bar search bg-white">
			<view class="search-form radius">
				<text class="icon-search"></text>
				<input type="text" v-model="q" placeholder="搜索资料名/学科名/类型"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-gradual-blue shadow-blur radius" @click="serch">搜索</button>
			</view>
		</view>
		<view class="tui-banner-box">
			<swiper :indicator-dots="true" :autoplay="true" :interval="5000" :duration="150" class="tui-banner-swiper" :circular="true"
			 previous-margin="60rpx" next-margin="60rpx" @change="change">
				<swiper-item v-for="(item,index) in banner" :key="index" class="tui-banner-item">
					<image :src="item.image_url" class="tui-slide-image" :class="[current!=index?'tui-banner-scale':'']"
					 mode="scaleToFill" />
				</swiper-item>
				<swiper-item v-if="ad.index_banner" class="tui-banner-item">
					<ad unit-id="013a9ed822cfd39c62f35191672a820f"></ad>
				</swiper-item>
			</swiper>
		</view>
		<!--banner-->
		<!--headlines-->
		<view class="tui-rolling-news list-item">
			<view class="icon-notification padding-right-sm text-blue" style="font-size: 20px;"></view>
			<swiper :vertical="true" :autoplay="true" :circular="true" :interval="4000" class="tui-swiper">
				<swiper-item v-for="(item,index) in headlines" :key="index" class="tui-swiper-item">
					<navigator :url="'../article/article?type=3&notice_id='+item.notice_id" class="tui-news-item">{{item.title}}</navigator>
				</swiper-item>
			</swiper>
		</view>
		<!--headlines-->
		<view class="cu-list grid no-border margin-sm radius shadow " :class="[count >= 5 ? 'col-5':'col-4']" >
			<view class="cu-item" v-for="(item,index) in cuIconList" :key="index">
				<navigator :url="'../result/result?category_id='+item.category_id+'&key='+item.title">
					<view class="padding-lr-sm">
						<image style="height: 80upx;" :src="item.icon" mode="aspectFit"></image>
					</view>
					<text>{{item.title}}</text>
				</navigator>
			</view>
		</view>
		<view class="margin-sm bg-white radius padding-sm shadow">
			<view class="flex justify-between ">
				<view><text class="icon-titles padding-right-xs text-blue"></text>最新资料</view>
				<navigator url="../list/list?type=1" class="text-grey">更多<text class="icon-right"></text></navigator>
			</view>
			<scroll-view scroll-x="true" class="nav padding-top-sm" style="width: 100%;">
				<navigator v-for="(item,index) in newData" :key="index" :url="'../documentDetail/documentDetail?id='+item.document_id+'&tags='+item.tags" class="bg-gray padding-sm radius shadow-blur text-center margin-xs" style="width: 260upx;display: inline-block;">
					<image :src="item.cover" mode="aspectFill" style="width: 95%;height: 280upx;"></image>
					<view class="text-cut" style="width: 95%;">{{item.title}}</view>
				</navigator>
			</scroll-view>
		</view>
		<view class="margin-sm bg-white radius padding-sm shadow-blur">
			<view class="flex justify-between ">
				<view><text class="icon-titles padding-right-xs text-blue"></text>推荐资料</view>
				<navigator url="../list/list?type=2" class="text-grey">更多<text class="icon-right"></text></navigator>
			</view>
			<navigator v-for="(comItem,index) in command" :key="index" :url="'../documentDetail/documentDetail?id='+comItem.document_id+'&tags='+comItem.tags" class="flex align-center solids-bottom padding-sm">
				<image :src="comItem.cover" mode="aspectFill" style="width: 180upx;height: 200upx;"></image>
				<view class="padding-tb-sm padding-left-sm">
					<view class="">{{comItem.title}}</view>
					<view class="flex padding-top-sm" style="white-space: normal;">
						<view @click.stop="seacrh(tag)" v-for="(tag,index) in comItem.tags" :key="index" class="cu-tag round"
						:class="color[index]">{{tag}}</view>
					</view>
					<view class="flex padding-top-sm">
						<text class="icon-attention padding-right-xs">{{comItem.view}}</text>
						<text class="icon-like padding-lr-sm">{{comItem.favrote}}</text>
						<text class="icon-down padding-lr-sm">{{comItem.download}}</text>
					</view>
				</view>
			</navigator>
			<view v-if="ad.index_list_bottom" class="padding-sm">
				<ad unit-id="57bc97597ddb2dbbc65139b1f0ac4df4"></ad>
			</view>
		</view>
		<view class="cu-bar text-center justify-center text-grey bg-gray"><text class="icon-usefull"></text>我是底部</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				banner:[],
				current:0,
				headlines: [],
				cuIconList: [],
				newData:[],
				command:[],
				color:['line-blue','line-red','line-yellow'],
				q:'',
				count:4
			}
		},
		computed: {
			...mapState(['ad'])
		},
		onLoad() {
			this.setShare();
			console.log(this.ad)
			this.nau.request('api/banner/index').then(data=>{
				console.log(data);
				this.banner = data.data.list;
			})
			this.nau.request('api/notice/index',{type:3,status:1}).then(data=>{
				console.log(data);
				this.headlines = data.data.list;
			})
			this.nau.request('api/category/index',{status:1,is_index:1}).then(data=>{
				console.log(data);
				this.cuIconList = data.data.list;
				this.count = data.data.count;
			})
			this.nau.request('api/DocumentMy/index').then(data=>{
				console.log(data);
				this.newData = data.data.new;
				this.command = data.data.command;
				for (var i = 0; i < this.command.length; i++) {
					this.command[i].tags = this.command[i].tags.split(",");
				}
			})
		},
		onPullDownRefresh() {
			this.nau.request('api/DocumentMy/index').then(data=>{
				console.log(data);
				this.newData = data.data.new;
				this.command = data.data.command;
				for (var i = 0; i < this.command.length; i++) {
					this.command[i].tags = this.command[i].tags.split(",");
				}
				uni.stopPullDownRefresh();
			})
		},
		methods: {
			change: function(e) {
				this.current = e.detail.current
			},
			splitTags(tags){
				var rs = tags.split(",");
				console.log(rs);
				return rs;
			},
			serch(){
				if(!this.q){
					uni.showToast({
						title:"请输入关键词",
						icon:"none"
					});
					return false
				}
				uni.navigateTo({
					url:"../result/result?title="+this.q+"&tags="+this.q+"&key="+this.q
				})
			},
			
		}
	}
</script>

<style>
	.container {
		padding-bottom: 100rpx;
		box-sizing: border-box;
	}
	
	/*banner*/
	
	.tui-banner-box {
		width: 100%;
		padding-top: 20rpx;
		box-sizing: border-box;
		background: #fff;
	}
	
	.tui-banner-swiper {
		width: 100%;
		height: 240rpx;
	}
	
	.tui-banner-item {
		padding: 0 16rpx;
		box-sizing: border-box;
	}
	
	.tui-slide-image {
		width: 100%;
		height: 240rpx;
		display: block;
		border-radius: 12rpx;
		/* transition: all 0.1s linear; */
	}
	
	.tui-banner-scale {
		transform: scaleY(0.9);
		transform-origin: center center;
	}
	
	/* #ifdef APP-PLUS || MP */
	.tui-banner-swiper .wx-swiper-dot {
		width: 8rpx;
		height: 8rpx;
		display: inline-flex;
		background: none;
		justify-content: space-between;
	}
	
	.tui-banner-swiper .wx-swiper-dot::before {
		content: '';
		flex-grow: 1;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 16rpx;
		overflow: hidden;
	}
	
	.tui-banner-swiper .wx-swiper-dot-active::before {
		background: #fff;
	}
	
	.tui-banner-swiper .wx-swiper-dot.wx-swiper-dot-active {
		width: 16rpx;
	}
	
	/* #endif */
	
	/* #ifdef H5 */
	>>>.tui-banner-swiper .uni-swiper-dot {
		width: 8rpx;
		height: 8rpx;
		display: inline-flex;
		background: none;
		justify-content: space-between;
	}
	
	>>>.tui-banner-swiper .uni-swiper-dot::before {
		content: '';
		flex-grow: 1;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 16rpx;
		overflow: hidden;
	}
	
	>>>.tui-banner-swiper .uni-swiper-dot-active::before {
		background: #fff;
	}
	
	>>>.tui-banner-swiper .uni-swiper-dot.uni-swiper-dot-active {
		width: 16rpx;
	}
	
	/* #endif */
	/*banner*/
	
	/*headlines*/
	
	.tui-rolling-news {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: nowrap;
		background: #fff;
	}
	
	.tui-rolling-news::after {
		left: 0;
	}
	
	.tui-swiper {
		margin-left: 8rpx;
		font-size: 28rpx;
		height: 80rpx;
		flex: 1;
	}
	
	.tui-swiper-item {
		display: flex;
		align-items: center;
	}
	
	.tui-news-item {
		line-height: 28rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: #555;
	}
	
	/*headlines*/
	
	/*classify*/
	
	.tui-classify-box {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		padding: 28rpx 0;
		background-color: #fff;
	}
	
	.tui-classify-item {
		width: 20%;
		text-align: center;
	}
	
	.tui-classify-img {
		width: 88rpx;
		height: 88rpx;
	}
	
	.tui-classify-name {
		font-size: 26rpx;
		line-height: 26rpx;
		padding-top: 8rpx;
		color: #555;
		white-space: nowrap;
	}
	
	/*classify*/
	
	/*spike*/
	
	.tui-spike-box {
		background: #fff;
		margin-top: 20rpx;
	}
	
	.tui-spike-title {
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		font-size: 30rpx;
		color: #333;
		font-weight: bold;
	}
	
	.tui-spike-title::after {
		left: 0;
	}
	
	.tui-spike-swiper {
		min-height: 440rpx;
	}
	
	.tui-pro-item {
		display: flex;
		width: 100%;
		background: #fff;
		box-sizing: border-box;
		border-radius: 12rpx;
		position: relative;
	}
	
	.tui-pro-item::after {
		left: 240rpx;
	}
	
	.tui-pro-img {
		width: 220rpx;
		height: 220rpx;
		display: block;
		flex-shrink: 0;
		border-radius: 12rpx;
	}
	
	.tui-pro-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 20rpx;
	}
	
	.tui-pro-tit {
		color: #2e2e2e;
		font-size: 26rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	
	.tui-pro-btmbox {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.tui-sale-price {
		font-size: 34rpx;
		font-weight: 500;
		color: #e41f19;
	}
	
	.tui-factory-price {
		font-size: 24rpx;
		color: #a0a0a0;
		text-decoration: line-through;
		padding-left: 12rpx;
	}
	
	.tui-countdown {
		display: flex;
		align-items: center;
	}
	
	.tui-countdown-text {
		padding: 0 8rpx;
		font-size: 24rpx;
		line-height: 24rpx;
		color: #555;
	}
	
	/*spike*/

</style>
