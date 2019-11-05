<template>
	<view>
		<!--主体-->
		<view class="meMain">
			<image src="../../static/img/meBg.png"></image>
			<view class="mePosition">
				<view class="meMainBox">
					<!--头部-->
					<view class="meHead flex align-center">
						<view class="meHeadAvatar round"><open-data class="round" type="userAvatarUrl"></open-data></image></view>
						<view class="meHeadName padding-lr">
							<view class="padding-bottom-xs text-xl"><open-data type="userNickName"></open-data></view>
							<view class="padding-bottom-xs">{{center.auth.xuehao?center.auth.xuehao:'未认证'}}</open-data></view>
						</view>
						<!-- <view @click="nav(3)" class="icon-settings text-white" style="font-size: 20px;"></view> -->
					</view>
					<!--头部-->
					<!--模板-->
					<view class="meOverBg">
						<view class="meVisitor">
							<navigator url="../collect/collect?action=1" class="meVisitorLt">
								<view class="meVisitorTxt_02">{{center?center.collect:'0'}}</view>
								<view class="meVisitorTxt_01">我的收藏</view>
							</navigator>
							<navigator url="../collect/collect?action=2" class="meVisitorLt">
								<view class="meVisitorTxt_02">{{center?center.download:'0'}}</view>
								<view class="meVisitorTxt_01">我的下载</view>
							</navigator>
							<navigator url="../complain/complain" class="meVisitorLt">
								<view class="meVisitorTxt_02">{{center?center.complain:'0'}}</view>
								<view class="meVisitorTxt_01">版权投诉</view>
							</navigator>
						</view>
					</view>
					<!--模板-->
					<!--订单-->
					<!-- <view class="meOverBg">
						<view class="meVisitorTitle">我的发送</view>
						<view class="meVisitor">
							<view class="meOrderLt" @click="nav(4,2)">
								<view class="meOrderTxt_01"><image src="../../static/img/wait.png"></image></view>
								<view class="meOrderTxt_02">队列中</view>
							</view>
							<view class="meOrderLt" @click="nav(4,3)">
								<view class="meOrderTxt_01"><image src="../../static/img/sent.png"></image></view>
								<view class="meOrderTxt_02">进行中</view>
							</view>
							<view class="meOrderLt" @click="nav(4,4)">
								<view class="meOrderTxt_01"><image src="../../static/img/send.png"></image></view>
								<view class="meOrderTxt_02">已完成</view>
							</view>
							<view class="meOrderLt">
								<view class="meOrderTxt_01" @click="nav(4,5)"><image src="../../static/img/cancel.png"></image></view>
								<view class="meOrderTxt_02">已取消</view>
							</view>
						</view>
					</view> -->
					<!--订单-->
					<!--其他-->
					<view class="meOverBg">
						<view @click="nav(1)" class="businessList">
							<view class="businessListTxt">我要投稿</view>
							<view class="businessListYou icon-right"></view>
						</view >
						<view @click="nav(2)" class="businessList">
							<view class="businessListTxt">校园认证</view>
							<view class="businessListYou icon-right"> </image></view>
						</view>
						<view @click="nav(3)" class="businessList">
							<view class="businessListTxt">使用帮助</view>
							<view class="businessListYou icon-right"> </image></view>
						</view>
						<view @click="nav(4)" class="businessList">
							<view class="businessListTxt">关于</view>
							<view class="businessListYou icon-right"> </image></view>
						</view>
						<view @click="nav(5)" class="businessList">
							<view class="businessListTxt">吐槽</view>
							<view class="businessListYou icon-right"> </image></view>
						</view>
					</view>
					
					<view v-if="ad.center" class="margin-sm radius">
						<ad unit-id="4068d49bf2ff2b2958e62379d9ef41dc" type="card"></ad>
					</view>
					<!--其他-->
					<!-- <view class="title_line">
						<text class="title">会员特权</text>
					</view> -->
					
					<!-- <scroll-view class="slider" scroll-x="true">
						<template v-for="(task,i) in center.levelList">
							<view :key="'task_'+i" class="s_item">
								<view class="content">
									<image :src="'http://auto.nauzone.cn'+task.cover_img" class="img" mode="aspectFill"></image>
									<text class="name">{{task.title}}</text>
									<text class="desc">每日可发{{task.post_weixin_num + task.post_sms_num}}收{{task.get_weixin_num+task.get_sms_num}}次</text>
									<text class="btn" @click="nav(11,task.level_id)">立刻开启</text>
								</view>
							</view>
						</template>
					</scroll-view> -->
				</view>
			</view>
			
		<!--主体-->
		</view>
		<view v-if="bannerShow">
			<view class="uni-banner" style="background:#FFFFFF;" >
				<view style="justify-content:flex-end;">
					<view style="justify-content:flex-end; text-align:right;" class="padding-right padding-tb-xs" @tap="closeBanner">
						<text class="text-red icon-close" style="font-size: 40upx;"></text>
					</view>
				</view>
				<view class="text-content padding-lr text-center">
					<textarea v-model="content" placeholder="使用本程序时的不好体验或希望我们改进的地方都可以吐槽噢" style="width: 100%;" class="solids padding-sm text-left"/>
					<view class="cu-form-group">
						<view class="title">联系方式</view>
						<view class="action solid-bottom">
							<input type="text" v-model="contact" placeholder="请输入联系QQ" />
						</view>
					</view>
					<view class="btn-group cu-bar padding-tb-sm">
						<button @click="submit" class="bg-gradual-green cu-btn lg radio shadow-blur">提交</button>
					</view>
				</view>
			</view>
			<view class="uni-mask"></view>
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
				center:{},
				bannerShow:false,
				content:'',
				contact:''
			}
		},
		computed: {
			...mapState(['ids','ad'])
		},
		onLoad(option) {
			if(this.ids.member_id){
				this.nau.request('api/memberMy/qq_center',{member_id:this.ids.member_id}).then(data=>{
					this.center = data;
				})
			}
		},
		methods: {
			nav(index,attach){
				switch (index){
					case 1:uni.showModal({
						title:"投稿",
						content:"如果您有想与大家分享的学习资料，可以添加小助手QQ：994878209投稿噢，感谢您的支持~",
						confirmText:"复制QQ号",
						success: (res) => {
							if(res.confirm){
								uni.setClipboardData({
									data:"994878209"
								})
							}
						}
					})
						break;
					case 2:
					if(this.center.auth.xuehao){
						uni.showModal({
							content:"校园认证已完成，如需修改请联系小助手人工核验后更改"
						});
						return false
					}
					uni.navigateTo({
						url:"../auth/auth"
					})
						break;
					case 3:uni.navigateTo({
						url:"../article/article?type=1&notice_id=5"
					})
						break;
					case 4:uni.navigateTo({
						url:"../article/article?type=2&notice_id=2"
					})
						break;
					case 5:this.bannerShow = true;
						break;
				}
			},
			closeBanner(){
				this.bannerShow = false;
			},
			submit(){
				if(this.ids.member_id && this.content){
					this.nau.request('api/suggestion/add',{
						member_id:this.ids.member_id,
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
page{ background: #F5F5F5; }
	.meMain{ width: 100%;position: relative; }
	.meMain>image{ width: 100%;height: 220upx;display: block; }
	.meMainBox{ width: 92%;margin: 0 auto; }
	.mePosition{ position: absolute;top: 0;left: 0;width: 100%;padding-top: 30upx; }
	.meHead{ overflow: hidden;position: relative; }
	.meHeadAvatar{ float: left;width: 19%;margin-top: 10upx; }
	.meHeadAvatar image{ width: 110upx;height: 110upx;display: block;border-radius: 50%; }
	.meHeadName{ float: left;width: 81%;color: #FFFFFF;font-size: 28upx;overflow:hidden;text-overflow:ellipsis;white-space:nowrap; }
	
	.me_position{
		position: relative;bottom: 40upx;left: 0;width: 100%;
	}
	
	.meOverBg{ background: #FFFFFF;overflow: hidden;border-radius: 12upx;margin-top: 30upx; }
	.meVisitor{ display: flex;flex-direction: row; }
	.meVisitorLt{ width: 50%;text-align: center;margin: 30upx 0; }
	.meVisitorLt:nth-child(1){ border-left: 1px #F5F5F5 solid;border-right: 1px #F5F5F5 solid; }
	.meVisitorTxt_01{ font-size: 28upx;color: #666666; }
	.meVisitorTxt_01 image{ width: 35upx;height: 35upx;vertical-align: middle;margin: 0 10upx 4upx 0; }
	.meVisitorTxt_02{ font-size: 30upx;color: #3B7ED5; }
	
	.meVisitorTitle{ font-size: 30upx;color: #333333;border-bottom: 1px #F5F5F5 solid;padding: 20upx 30upx; }
	.meOrderLt{ width: 25%;text-align: center;padding: 30upx 0;transition: all 0.4s; }
	.meOrderLt:active{ background: #E2E2E2; }
	.meOrderTxt_01{  }
	.meOrderTxt_01 image{ width: 40upx;height: 40upx;display: block;margin: 0 auto 6upx; }
	.meOrderTxt_02{ font-size: 24upx;color: #666666; }
	
	.businessList{ overflow: hidden;padding: 30upx;border-bottom: 1px #F5F5F5 solid;transition: all 0.4s; }
	.businessList:active{ background: #E2E2E2; }
	.businessList:last-child{ border-bottom: none; }
	.businessListTxt{ float: left;font-size: 28upx;color: #333333; }
	.businessListTxt image{ width: 35upx;height: 35upx;vertical-align: middle;margin: 0 10upx 4upx 0; }
	.businessListYou{ float: right;font-size: 28upx;color: #333333; }
	.businessListYou image{ width: 20upx;height: 20upx;vertical-align: middle;margin: 0 0 4upx 10upx; }

</style>
<style lang="scss" scoped>
	@function realSize($args) {
		@return $args / 1.5;
	}

	.page_content {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.header {
		padding-top: var(--status-bar-height);
		width: 95%;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 10px;
		margin-right: 10px;

		.btn {
			width: 27px;
			height: 27px;
		}

		.title {
			font-size: 18px;
			font-weight: 500;
			color: rgba(43, 43, 43, 1);
			line-height: 41px;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.logo {
		margin-top: 10px;
		width: 100px;
		height: 100px;
	}

	.swiper {
		width: 100%;
		margin-top: 10px;

		.swiper-item {
			border-radius: 16px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin-left: 10px;
			margin-right: 10px;
		}

		.big {
			margin-top: 0;

			.img {
				margin-top: 15px;
				width: 40px;
				height: 40px;
			}

			.title {
				font-size: 25px;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				line-height: 41px;
			}

			.sub_title {
				font-size: 11px;
				font-weight: 300;
				color: rgba(255, 255, 255, 1);
				line-height: 41px;
			}
		}

		.small {
			margin-top: 14px;
			height: 75%;

			// transition: all 0.3s;
			.img {
				margin-top: 5px;
				width: 25px;
				height: 25px;
			}

			.title {
				font-size: 15px;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				line-height: 31px;
			}

			.sub_title {
				font-size: 7px;
				font-weight: 300;
				color: rgba(255, 255, 255, 1);
			}
		}
	}

	.title_line {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		.title {
			// margin-left: 20px;
			font-size: 18px;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			line-height: 41px;
		}

		.more {
			margin-right: 20px;
			font-size: 10px;
			font-weight: 300;
			color: rgba(153, 153, 153, 1);
			line-height: 41px;
		}
	}

	.slider {
		white-space: nowrap;
		width: 100%;

		.s_item {
			display: inline-block;
			width: 35%;
			margin-left: 10px;
			margin-bottom: 10px;

			.content {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				border-radius: 8px;
				background: white;
				margin-top: 5px;
				box-shadow: 0px 2px 6px 0px rgba(103, 103, 103, 0.2);

				.img {
					margin-top: 8px;
					width: 103px;
					height: 103px;
				}

				.name {
					margin-top: 8px;
					font-size: 12px;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					line-height: 21px;
				}

				.desc {
					font-size: 10px;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
					line-height: 21px;
				}

				.btn {
					width: 80px;
					height: 30px;
					margin-bottom: 10px;
					background: linear-gradient(94deg, rgba(192, 160, 105, 1), rgba(233, 213, 172, 1));
					box-shadow: 0px 9px 28px 0px rgba(195, 164, 110, 0.23);
					border-radius: 29px;
					font-size: 12px;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
					line-height: 21px;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}

	.welfare {
		width: 92%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 1px 21px 0px rgba(103, 103, 103, 0.2);
		border-radius: 10px;
		margin-bottom: 10px;

		.item {
			padding: 10px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.border {
				margin-top: 5px;
				border: 2px solid #c9ac7a;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;

				.img {
					width: 40px;
					height: 40px;
				}
			}

			.txt {
				margin-top: 5px;
				font-size: 10px;
				font-weight: 300;
				color: rgba(153, 153, 153, 1);
			}
		}
	}
</style>
