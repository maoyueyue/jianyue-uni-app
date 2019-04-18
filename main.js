import Vue from 'vue'
import App from './App'

Vue.prototype.apiServer = 'http://47.101.34.195:8080/api'
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
