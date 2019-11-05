import Vue from 'vue'
import App from './App'
import store from './store'
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.seacrh = function(tag){
	console.log(tag);
	uni.navigateTo({
		url:"../result/result?title="+tag+"&tags="+tag+"&key="+tag
	})
}

Vue.prototype.setShare = function(){
	qq.showShareMenu({
	  showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
	})
}
const nau = {
	apiUrl:"http://pai.nauzone.cn/",
	
	request: function(service, postData,hideLoading, method,type) {
		//接口请求
		if (!hideLoading) {
			uni.showLoading({
				mask: true,
				title: '请稍候...'
			})
		}
		return new Promise((resolve, reject) => {
			uni.request({
				url: this.apiUrl + service,
				data: postData,
				header: {
					'content-type': type ? 'application/x-www-form-urlencoded' : 'application/json'
				},
				method: method, //'GET','POST'
				dataType: 'json',
				success: (res) => {
					if (!hideLoading) {
						uni.hideLoading()
					}
					if (res.data && res.data.code === 403) {
						uni.showModal({
							title: '登录',
							content: '您尚未登录，请先登录',
							showCancel: false,
							confirmColor: "#5677FC",
							confirmText: '确定',
							success(e) {
								uni.redirectTo({
									url: '/pages/login/login'
								})
							}
						})
					} else {
						resolve(res.data)
					}
				},
				fail: (res) => {
					if (!hideLoading) {
						uni.hideLoading()
					}
					uni.showToast({
						title:"网络不太稳定，请稍后再试噢~",
						icon:"none"
					})
					reject(res)
				}
			})
		})
	},
}
Vue.prototype.nau = nau;
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
