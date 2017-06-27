<template>
    <div class="orderComplete">
        <header class="orderComplete-top">
            <div>
                <i class="iconfont icon-icon" @click="goback"></i>
                <span>支付确认</span>
            </div>
        </header>
        <div class="orderComplete-body">
            <span>应付金额:</span>
            <span class="orderCompleteBodyPay">￥{{orderMsg.totalPrice}}</span>
            <div>
                <span>订单编号：</span>
                <span>{{orderMsg.orderNum}}</span>
            </div>
            <div to="/" class="orderComplete-btn">
                立刻支付
            </div>
        </div>
    </div>
</template>




<script type="text/javascript">
    import './orderCompleteComponent.scss'
    import '../../js/vue.js'
    import '../../js/vue-router.js'
    import http from '../../utils/HttpClient.js'
   
    export default {
        name:'orderComplete',
        data:function(){
            return {
                name: 'orderComplete',
                orderMsg:{}
                }
        },
        methods:{
            goback:function(){
                history.go(-1);
            }
        },
        created:function(){
            // console.log(123)
            var _this = this;
            http.post('readOrder').then(function(res){
                
                for(var i=0; i<res.data.length;i++){
                    _this.orderMsg = res.data[i];
                }
                console.log(_this.orderMsg)
            })
        }
    }
</script>