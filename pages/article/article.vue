<template>
	<view>
		<view class="text-content bg-white padding">
			<rich-text :nodes="notice"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				notice:"",//正经公告
			}
		},
		onLoad(option) {
			console.log(option)
			if(option.type && option.notice_id){
				var title = '';//页面标题
				switch (option.type){
					case "1":title = "查看帮助";
						break;
					case "2":title = "关于";
						break;
					case "3":title = "公告详情";
						break;
					case "4":title = "失物招领";
						break;
				}
				uni.setNavigationBarTitle({
					title:title
				})
				this.nau.request('api/notice/view',{notice_id:option.notice_id}).then(data=>{
					console.log(data);
					this.notice = data.data.content;
				})
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
