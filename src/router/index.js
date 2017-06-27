import Vue from 'vue'
import VueRouter from 'vue-router'
import http from '../utils/HttpClient'
//谢林辉




//刘铁球
import LoginComponent from '../components/personalCenter/login/login.vue'
import PersonalComponent from '../components/personalCenter/personalCenter.vue'
import RegistComponent from '../components/personalCenter/regist/regist.vue'
import WalletComponent from '../components/personalCenter/wallet/wallet.vue'
import OrderComponent from '../components/personalCenter/order/order.vue'
import PayComponent from '../components/personalCenter/waitPay/waitPay.vue'
import FetchComponent from '../components/personalCenter/waitFetch/waitFetch.vue'
import EvaluateComponent from '../components/personalCenter/waitEvaluate/waitEvaluate.vue'
import SaleReturnComponent from '../components/personalCenter/saleReturn/saleReturn.vue'
import AddressComponent from '../components/personalCenter/address/address.vue'
import AddAddressComponent from '../components/personalCenter/address/addAddress.vue'
import AddressMapComponent from '../components/personalCenter/address/addressMap.vue'
import EditAddressComponent from '../components/personalCenter/address/editAddress.vue'
import FeedbackComponent from '../components/personalCenter/feedBack/feedback.vue'



//李龙威
import index from '../components/index/index.vue'
import shansongMarket from '../components/shansongMarket/shansongMarket.vue'
import quanqiugou from '../components/quanqiugou/quanqiugou.vue'
import bianli from '../components/tan90bianli/tan90bianli.vue'
import hainan from '../components/hainanshuiguo/hainanshuiguo.vue'
import origin from '../components/origin/origin.vue'
import citys from '../components/citys/citys.vue'
import search from '../components/search/search.vue'
import banner_summer from '../components/banner_summer/banner_summer.vue'
import banner_father from '../components/banner_father/banner_father.vue'
import banner_food from '../components/banner_food/banner_food.vue'
import chufang from '../components/chufang/chufang.vue'
import jiashi from '../components/jiashi/jiashi.vue'
import huazhuang from '../components/huazhuang/huazhuang.vue'
import list from '../components/list/list.vue'







//这是白晶晶
import DetailsComponent from '../components/details/DetailsComponent.vue'
import CarComponent from '../components/car/CarComponent.vue'
import orderPaymentComponent from '../components/orderPayment/orderPaymentComponent.vue'
import footer from '../components/footer/footer.vue'
import orderCompleteComponent from '../components/orderComplete/orderCompleteComponent.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes:[
        //白晶晶
        {
        path:'/details',
        name:'/details',
        component:DetailsComponent,
        children:[{
            path:'/footer',
            name:'footer',
            component:footer
        }]
    },{
        path:'/car',
        name:'/car',
        component:CarComponent
    },{
        path:'/orderPayment',
        name:'/orderPayment',
        component:orderPaymentComponent
    },{
        path:'/orderComplete',
        name:'orderComplete',
        component:orderCompleteComponent
    },
    //刘特求
    {
		path:'/login',
		name:'login',
		component:LoginComponent
	},{
		path:'/personal',
		name:'personal',
		component:PersonalComponent
	},{
		path:'/regist',
		name:'regist',
		component:RegistComponent
	},{
		path:'/wallet',
		name:'wallet',
		component:WalletComponent
	},{
		path:'/order',
		name:'order',
		component:OrderComponent
	},{
		path:'/pay',
		name:'pay',
		component:PayComponent
	},{
		path:'/fetch',
		name:'fetch',
		component:FetchComponent
	},{
		path:'/evaluate',
		name:'evaluate',
		component:EvaluateComponent
	},{
		path:'/saleReturn',
		name:'saleReturn',
		component:SaleReturnComponent
	},{
		path:'/address',
		name:'address',
		component:AddressComponent
	},{
		path:'/addAddress',
		name:'addAddress',
		component:AddAddressComponent
	},{
		path:'/map',
		name:'map',
		component:AddressMapComponent
	},{
		path:'/editAddress',
		name:'editAddress',
		component:EditAddressComponent
	},{
		path:'/feedback',
		name:'feedback',
		component:FeedbackComponent
	},

	//李龙威
    {
		path: '/',
		name: 'index',
		component:index,
	},	{
		path: '/shansongMarket',
		name: 'shansongMarket',
		component: shansongMarket
	},{
		path: '/quanqiugou',
		name: 'quanqiugou',
		component: quanqiugou
	},{
		path: '/bianli',
		name: 'bianli',
		component: bianli
	},{
		path: '/hainan',
		name: 'hainan',
		component: hainan
	},{
		path: '/origin',
		name: 'origin',
		component: origin
	},{
		path: '/citys',
		name: 'citys',
		component:citys
	},{
		path: '/search',
		name: 'search',
		component:search
	},{
		path: '/banner_summer',
		name: 'banner_summer',
		component:banner_summer
	},{
		path: '/banner_father',
		name: 'banner_father',
		component:banner_father
	},{
		path: '/banner_food',
		name: 'banner_food',
		component:banner_food
	},{
		path: '/chufang',
		name: 'chufang',
		component:chufang
	},{
		path: '/jiashi',
		name: 'jiashi',
		component:jiashi
	},{
		path: '/huazhuang',
		name: 'huazhuang',
		component:huazhuang
	},{
		path: '/list',
		name: 'list',
		component:list
	}
    
    
    ]
})

//对将要进入的路由进行权判断
router.beforeEach((to, from, next) =>{
	// console.log(to);
	if(to.path.indexOf('login') < 0 && !window.localStorage.getItem('user')){
		router.replace('login');
		next();
	} 
	next();
})

export default router