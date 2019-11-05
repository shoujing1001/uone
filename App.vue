<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		methods:{
			init(){
				const that = this;
				var ids = uni.getStorageSync('ids');
				if(ids){
					that.login(ids)
				}else{
					uni.login({
					  success(res) {
						console.log(res);
						uni.request({//此接口返回值为模拟数据
							url:"http://pai.nauzone.cn/api/memberMy/qq_login",
							data:res
						}).then(data=>{
							var [err,res] = data;
							console.log(res);
							uni.setStorageSync('ids',res.data);
							that.login(res.data);
						})
					  }
					})
				}
				this.nau.request('api/memberMy/is_ad').then(data=>{
					console.log(data);
					this.update_ad(data);
				})
			},
			...mapMutations(['login','update_ad'])
		},
		onLaunch: function() {
			console.log('App Launch')
			this.init();
			this.nau.request('api/notice/view',{notice_id:1},true).then(data=>{
				console.log(data);
				uni.setStorageSync('useful',data.data.content);
			});
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("static/colorui.css");
	@import url("static/icon.css");
	/* 遮罩层 */
	.uni-mask {
		background: rgba(0, 0, 0, 0.6);
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		z-index: 9998;
	}
	
	/* 弹出层形式的广告 */
	.uni-banner {
		width: 80%;
		position: fixed;
		left: 50%;
		top: 50%;
		background: #FFF;
		border-radius: 10upx;
		z-index: 9999;
		transform: translate(-50%, -50%);
	}
</style>
