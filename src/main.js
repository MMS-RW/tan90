//刘铁球
import $ from 'jquery'
import './assets/bootstrap/css/bootstrap.min.css'
import './assets/font-awesome/css/font-awesome.min.css'
import './assets/jquery-confirm/jquery-confirm.css'
import './assets/common.scss'
import './assets/font/iconfont.css'
import './assets/jquery-validation-1.16.0/dist/jquery.validate.min.js'
import './assets/jquery-validation-1.16.0/dist/localization/messages_zh.min.js'
import './assets/jquery-confirm/jquery-confirm.js'
import './assets/rem.js'
import './assets/swiper-3.4.2.min.js'



//白晶晶
import './assets/font/iconfont.css'
import './assets/styles/common.scss'

import Vue from 'vue'
import router from './router/index'
import store from './vuex/store'
import App from './App.vue'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
