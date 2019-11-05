<template>
	<view class="bg-white">
		<view class="cu-form-group margin-top-sm">
			<view class="title">学号</view>
			<input type="text" placeholder="请输入学号" v-model="xuehao"/>
		</view>
		<view class="cu-form-group margin-top-sm">
			<view class="title">邮箱后缀</view>
			<view class="solid-bottom text-grey">
				@stu.nau.edu.cn
			</view>
		</view>
		<view class="cu-form-group margin-top-sm solid-bottom">
			<view class="title">验证码</view>
			<view class="action">
				<input v-model="code" type="text" placeholder="请输入收到的邮箱验证码" />
			</view>
			<view class="cu-btn bg-gradual-green radius" @click="sendMail">点击获取</view>
		</view>
		<view class="padding margin-top text-content">
			<view class="text-center text-bold">温馨提示</view>
			<view>
				为了更方便大家使用南审空间的产品，本程序以及今后的其他产品都将以校园邮箱进行身份认证，只需在任何一个程序内进行过认证，则可以使用学号登录所有程序，实现账户统一。</br>
				学校为大家提供了统一的学生邮箱，登录地址为：</br>
				<text class="text-blue text-bold">http://mail.stu.nau.edu.cn(点击可复制地址)</text></br>
				邮箱登录账号为：<text class="text-blue">学号+@stu.nau.edu.cn</text></br>
				初始登录密码为：<text class="text-blue">Nau+身份证后六位</text>（注意大小写）</br>
				复制上述邮箱登录地址登录学生邮箱，将收到的南审空间发出的验证码邮件中的邮件填写正确后，提交即可完成校园认证，是一名根正苗红的NAUer无疑了~</br>
				若收件箱内没有收到验证码邮件，请先查看垃圾箱是否被误判为垃圾邮件，
			</view>
		</view>
		<view class="btn-group cu-bar">
			<view @click="auth" class="cu-btn radius bg-gradual-green lg">
				提交认证
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				xuehao:'',
				key:'ca6f8053191f55f49725aa940466e3ca',
				code:''
			}
		},
		computed:{...mapState(['ids'])},
		methods: {
			sendMail(){
				if(!(this.xuehao && this.ids.member_id)){
					uni.showModal({
						title:"温馨提示",
						content:"请先确认登录或重启小程序，并填写正确学号"
					})
					return false;
				}else{
					this.nau.request('api/memberMy/send_mail',{xuehao:this.xuehao}).then(data=>{
						console.log(data);
						uni.showToast({
							title:data.msg,
							icon:'none'
						});
						this.key = data.key;
					})
				}
			},
			auth(){
				if(this.key && this.xuehao && this.code){
					this.nau.request('api/memberMy/mail_auth',{member_id:this.ids.member_id,code:this.code,
					key:this.key,xuehao:this.xuehao}).then(data=>{
						console.log(data);
						uni.showToast({
							title:data.msg,
							icon:"none"
						})
						if(data.status == 200){
							setTimeout(function() {
								uni.navigateBack({
									delta:1
								})
							}, 800);
						}
					})
				}else{
					uni.showModal({
						title:"温馨提示",
						content:"请输入完整信息"
					})
				}
			}
		}
	}
</script>

<style>

</style>
