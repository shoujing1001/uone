<template>
	<view>
		<view class="margin-sm bg-white radius padding-sm shadow-blur">
			<navigator v-for="(comItem,index) in list" :key="index" :url="'../documentDetail/documentDetail?id='+comItem.document_id+'&tags='+comItem.tags" class="flex align-center solids-bottom padding-sm">
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
				list:[],
				type:1,
				pageIndex:1,
				pageSize:20,
				nomore:false
			}
		},
		onReachBottom() {
			if(this.nomore){
				uni.showToast({
					title:"没有更多啦！",
					icon:'none'
				})
				return false;
			}
			this.getData(this.type,this.pageIndex+1);
			this.pageIndex ++;
		},
		onLoad(option) {
			this.setShare();
			if(option.type){
				this.type = option.type;
				if(option.type == 1){
					uni.setNavigationBarTitle({
						title:"最新资料"
					})
				}else{
					uni.setNavigationBarTitle({
						title:"推荐资料"
					})
				}
				this.getData(this.type);
			}
		},
		methods: {
			getData(type,pageIndex,pageSize){
				var page = pageIndex?pageIndex:1;
				var limit = pageSize?pageSize:20;
				this.nau.request('api/documentMy/new_command',{type:type,page:page,limit:limit}).then(data=>{
					console.log(data);
					for (var i = 0; i < data.data.length; i++) {
						data.data[i].tags = data.data[i].tags.split(",");
					}
					this.list = this.list.concat(data.data);
					if(data.data.length < this.pageSize){
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

</style>
