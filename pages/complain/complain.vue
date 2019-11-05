<template>
	<view>
		<view>
			<view class="text-content bg-white margin-sm radius solid shadow padding-sm" v-for="(item,index) in complain" :key="index">
				<view>
					<view class="cu-tag line-red radius margin-right-sm">{{resultStatus[item.status]}}</view>
					<text class="text-bold">{{item.content}}</text> 
				</view>
				<view class="padding-top-sm">处理结果：<text class="text-red">{{item.result}}</text></view>
				<view class="btn-group cu-bar margin-top-sm">
					<navigator :url="'../documentDetail/documentDetail?id='+item.document_id" class=" cu-btn line-blue radius">查看所属文档</navigator>
					<view @click="cancel(item.complain_id,index)" class="cu-btn line-green" v-if="item.status == 1">取消投诉</view>
				</view>
			</view>
		</view>
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
				complain:[],
				resultStatus:['已取消','待处理','已处理','已下架','已回应'],
				pageIndex:1,
				pageSize:20,
				nomore:false
			}
		},
		computed:{...mapState(['ids'])},
		onLoad() {
			this.getData();
		},
		onReachBottom() {
			if(this.nomore){
				uni.showToast({
					title:"没有更多啦！",
					icon:'none'
				})
				return false;
			}
			this.getData(this.pageIndex+1);
			this.pageIndex ++;
		},
		methods: {
			cancel(complain_id,index){
				uni.showModal({
					title:"温馨提示",
					content:"是否确认取消？",
					success: (res) => {
						if(res.confirm){
							var update = this.complain[index];
							update.status = 0;
							this.nau.request('api/complain/update',update).then(data=>{
								console.log(data);
							})
						}
					}
				})
			},
			getData(pageIndex,pageSize){
				var page = pageIndex?pageIndex:1;
				var limit = pageSize?pageSize:20;
				if(this.ids.member_id){
					this.nau.request('api/complain/index',{member_id:this.ids.member_id,page:page,pageSize}).then(data=>{
						console.log(data);
						this.complain = this.complain.concat(data.data.list)
						if(data.data.list.length < this.pageSize){
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
	}
</script>

<style>

</style>
