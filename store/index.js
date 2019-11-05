import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		ids:{},
		loginStatus:false,
		ad:{}
	},
	mutations: {
		login(state, userInfo) {
			state.loginStatus = true;
			state.ids = userInfo;
		},
		logout(state) {
			state.loginStatus = false;
			state.userInfo = {}
		},
		update_ad(state,ad){
			state.ad = ad;
		}
	}
})

export default store
