<template>
	<view>
		<view class="margin-sm bg-white radius padding-sm shadow">
			<navigator v-for="(comItem,index) in collect" :key="index" :url="'../documentDetail/documentDetail?id='+comItem.document_id+'&tags='+comItem.tags" class="flex align-center solids-bottom padding-sm">
				<image :src="comItem.cover" mode="aspectFill" style="width: 180upx;height: 200upx;"></image>
				<view class="padding-tb-sm padding-left-sm">
					<view class="">{{comItem.title}}<text class="text-blue padding-left-sm">#{{index+1}}</text></view>
					<view @click.stop="del(comItem.document_id,index)" class="cu-btn line-red margin-top-sm sm" v-if="action == 1">取消收藏</view>
				</view>
			</navigator>
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
				collect:[],
				action:0,
				pageIndex:1,
				pageSize:20,
				nomore:false
			}
		},
		computed:{...mapState(['ids'])},
		onLoad(option) {
			if(option.action){
				this.action = option.action;
				this.getData();
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
			this.getData(this.pageIndex+1);
			this.pageIndex ++;
		},
		methods: {
			del(document_id,index){
				uni.showModal({
					title:"温馨提示",
					content:"是否取消收藏？",
					success: (res) => {
						if(res.confirm){
							this.nau.request('api/memberMy/del_collect',{member_id:this.ids.member_id,document_id:document_id}).then(data=>{
								console.log(data);
								uni.showToast({
									title:data.msg,
									icon:"none"
								})
								if(data.status == 200){
									this.collect.splice(index,1);
								}
							})
						}
					}
				})
			},
			getData(pageIndex,pageSize){
				var page = pageIndex?pageIndex:1;
				var limit = pageSize?pageSize:20;
				this.nau.request('api/memberMy/qq_collect',{member_id:this.ids.member_id,action:this.action,page:page,limit:limit}).then(data=>{
					console.log(data);
					this.collect = this.collect.concat(data);
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

</style>
