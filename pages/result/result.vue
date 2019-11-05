<template>
	<view>
		<view class="cu-bar search bg-white margin-bottom-sm">
			<view class="search-form radius">
				<text class="icon-search"></text>
				<view class="tui-search-key" @click="del">{{keywords}}<text class="icon-close padding-lr-xs"></text></view>
			</view>
		</view>
		<view class="margin-sm bg-white radius padding-sm shadow">
			<navigator v-for="(comItem,index) in List" :key="index" :url="'../documentDetail/documentDetail?id='+comItem.document_id+'&tags='+comItem.tags" class="flex align-center solids-bottom padding-sm">
				<image :src="comItem.cover" mode="aspectFill" style="width: 180upx;height: 200upx;"></image>
				<view class="padding-tb-sm padding-left-sm">
					<view class="">{{comItem.title}}</view>
					<view class="flex padding-top-sm" style="white-space: normal;">
						<view v-for="(tag,index) in comItem.tags" :key="index" class="cu-tag round"
						:class="color[index]">{{tag}}</view>
					</view>
					<view class="flex padding-top-sm">
						<text class="icon-attention padding-right-xs">{{comItem.view}}</text>
						<text class="icon-like padding-lr-sm">{{comItem.favrote}}</text>
						<text class="icon-down padding-lr-sm">{{comItem.download}}</text>
					</view>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keywords:'请输入关键词',
				List:[],
				color:['line-blue','line-red','line-yellow'],
				option:{},
				pageIndex:1,
				pageSize:20,
				nomore:false
			}
		},
		onLoad(option) {
			this.setShare();
			console.log(option)
			this.keywords = option.key;
			this.option = option;
			this.getData(option)
		},
		onReachBottom() {
			if(this.nomore){
				uni.showToast({
					title:"没有更多啦！",
					icon:'none'
				})
				return false;
			}
			this.getData(this.option,this.pageIndex+1);
			this.pageIndex ++;
		},
		methods: {
			del(){
				uni.navigateBack({
					delta:1
				})
			},
			getData(option,pageIndex,pageSize){
				var page = pageIndex?pageIndex:1;
				var limit = pageSize?pageSize:20;
				option.page = page;
				option.limit = limit;
				this.nau.request('api/documentMy/search',option).then(data=>{
					console.log(data);
					console.log(data);
					for (var i = 0; i < data.length; i++) {
						data[i].tags = data[i].tags.split(",");
					}
					this.List = this.List.concat(data);
					if(data.length < this.pageSize){
						uni.showToast({
							title:"已加载全部！",
							icon:'none'
						})
						this.nomore = true;
					}
				})
			}
		}
	}
</script>

<style>
	.tui-search-key {
		max-width: 80%;
		height: 95%;
		padding: 0 16upx;
		margin-left: 12upx;
		display: flex;
		align-items: center;
		border-radius: 15px;
		background: rgba(0, 0, 0, 0.5);
		color: #fff;
	}
	

</style>
