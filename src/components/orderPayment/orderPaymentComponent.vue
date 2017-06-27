<template>
        <div class="orderPayment">
            <header class="orderPayment-top">
                <div>
                    <i class="iconfont icon-icon" @click="goback"></i>
                    <span>订单结算</span>
                </div>
            </header>
            <div class="orderPaymentBody">
                <router-link to="/address" class="orderPaymentAdress orderPublic" v-show="orderAddress">
                    <i class="iconfont icon-shouhuodizhi"></i>
                    <div class="orderPaymentAdressMsg">
                        <span class="orderPayAdrMsgName">{{orderAddressMsg.name}}</span>
                        <span class="orderPayAdrMsgPhone">{{orderAddressMsg.phone}}</span>
                        <div class="orderPayAdrMsgxxdz">{{orderAddressMsg.add + orderAddressMsg.tablet}}</div>
                    </div>
                    <i class="iconfont icon-iconfontqianjin2"></i>
                </router-link>
                <router-link to="/car" class="orderPaymentAddAdress orderPublic" v-show="orderNoAddress">
                    <i class="iconfont icon-shouhuodizhi"></i>
                    <span>添加地址</span>
                    <i class="iconfont icon-iconfontqianjin2"></i>
                </router-link>
                <router-link to="/car" class="orderPaymentProduct orderPublic">
                    <ul>
                        <li v-for = "(item,index) in showCarMsg">
                            <img :src="'../../src/assets/imgs/'+item.bigImg" alt="">
                        </li>
                    </ul>
                    
                    <span>共<b class="orderPaymentNum">{{goodsNum}}</b>件</span>
                    <i class="iconfont icon-iconfontqianjin2"></i>
                </router-link>
                <div class="orderPaymentMethod orderPublic">
                    <div class="orderPaymentMethodTop">
                        <span>配送方式</span>
                        <span>快递配送（3-5天到货）</span>
                    </div>
                    <div class="orderPaymentMethodBottom">
                        <span>配送时间</span>
                        <span>09:00-21:00</span>
                    </div>
                </div>
                <div class="orderPaymentPayMethod orderPublic">
                    <div class="orderPayMethodTop" @click="showPayment">
                        <span>支付方式</span>
                        <span class="orderPayM">{{orderMsg.Payment}}</span>
                        <i class="iconfont icon-iconfontqianjin2"></i>
                    </div>
                    <div class="orderPayMethodMid">
                        <span>使用红包</span>
                        <span>无红包可用</span>
                        <i class="iconfont icon-iconfontqianjin2"></i>
                    </div>
                    <div class="orderPayMethodBottom">
                        <span>贝壳抵扣</span>
                        <span>你有0个贝壳，满30个可抵用</span>
                    </div>
                </div>
                <input type="text" placeholder="备注留言" class="orderPaymentPayTalk orderPublic">
                <div class="orderPaymentPayMoney orderPublic">
                    <div class="orderPaymentPayMoneyTop">
                        <span>订单金额：</span>
                        <span class="orderPayMoneyNum">￥{{totalPrice}}</span>
                    </div>
                    <div class="orderPaymentPayMoneyMid">
                        <span>配送费用：</span>
                        <span>￥0</span>
                    </div>
                    <div class="orderPaymentPayMoneyBottom">
                        <span>红包优惠：</span>
                        <span>-￥0</span>
                    </div>
                </div>
            </div>
            <div class="orderPayment-bottom">
                <div class="orderPayment-bottom-left">
                    <span>合计：</span>
                    <span class="orderPaymentTotalPrice">￥{{totalPrice}}</span>
                </div>
                <div to="/orderComplete" class="orderPaymentPay" @click= "submitOrder">提交订单
                </div>
            </div>
            <div class="weixinPay" v-show="showPaymentTex">
                <div class="zheguangzhao" @click="zheguangzhao"></div>
                <div>
                    <span @click="weixinPay">微信支付</span>
                    <span @click="yuePay">余额支付</span>
                </div>
            </div>
        </div>
</template>


<script type="text/javascript">
    import './orderPaymentComponent.scss'
    import '../../js/vue.js'
    import '../../js/vue-router.js'
    import http from '../../utils/HttpClient.js'
    import router from '../../router/index.js'
   
    export default {
        name:'orderPayment',
        data:function(){
            return {
                name: 'orderPayment',
                showPaymentTex:false,
                orderMsg:{},
                showCarMsg:[],
                goodsNum:'',
                totalPrice:'',
                orderList:{},
                orderAddress:false,
                orderNoAddress:true,
                orderAddressMsg:{}
                }
        },
        methods:{
            goback:function(){
                history.go(-1);
            },
            showPayment:function(){
                this.showPaymentTex=true
            },
            zheguangzhao:function(){
                this.showPaymentTex=false
            },
            weixinPay:function(){
                this.orderMsg.Payment="微信支付"
                this.showPaymentTex=false
            },
            yuePay:function(){
                this.orderMsg.Payment="余额支付"
                this.showPaymentTex=false
            },
            submitOrder:function(){


                var time = new Date();
                var myDate = time.getTime()
                // console.log(myDate)
                // this.orderList=this.showCarMsg;
                this.orderList.totalPrice = this.totalPrice;
                this.orderList.goodsNum = this.goodsNum;
                this.orderList.orderNum = Math.floor(Math.random()*1000000000000)
                this.orderList.payment = this.orderMsg.Payment;
                this.orderList.myDate = myDate;
                // console.log(this.orderList.orderNum)
                console.log(this.orderMsg.Payment)
                var _this = this;
                if(_this.orderMsg.Payment==undefined){
                    alert('请选择支付方式')
                }else{
                     http.post('readOrderAdress').then(function(res){
                        // console.log(res.data[0])
                        if(res.data[0]){
                            _this.orderAddress=true;
                            _this.orderNoAddress=false;
                            _this.orderAddressMsg = res.data[0];

                            // console.log( _this.orderAddressMsg.name)
                            http.post('saveOrder',_this.orderList).then(function(res){
                                // console.log(res)
                                if(res){
                                    router.push({name:'orderComplete'})
                                }
                            })
                        }else if(!res.data[0]){
                            _this.orderAddress=false;
                            _this.orderNoAddress=true;
                            alert('请选择地址')
                            
                        }
                    })
                }
                
               
            }
        },
        created:function(){
            var _this = this
            http.post('getCar').then(function(res){
                _this.showCarMsg=res.message.data
                _this.$set(_this.showCarMsg)
                // console.log(_this.showCarMsg)
                _this.goodsNum = 0;
                for(var i=0;i<_this.showCarMsg.length;i++){
                    
                    // console.log(parseInt(_this.showCarMsg[i].productNum))
                    _this.goodsNum = _this.goodsNum + parseInt(_this.showCarMsg[i].productNum) 
                }
                // console.log(_this.goodsNum)
                _this.totalPrice=0;
                for(var i=0;i<_this.showCarMsg.length;i++){
                    _this.totalPrice = _this.totalPrice + parseInt(_this.showCarMsg[i].singleTotalPrice) 
                }

                http.post('readOrderAdress').then(function(res){
                    // console.log(res.data[0])
                    if(res.data[0]){
                        _this.orderAddress=true;
                        _this.orderNoAddress=false;
                        _this.orderAddressMsg = res.data[0];
                        
                    }else if(!res.data[0]){
                        _this.orderAddress=false;
                        _this.orderNoAddress=true;
                    
                    }
                })

            });

            
            
        }
    }
</script>