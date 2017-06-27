<template>
    <div class="details">
        <header class="details-top">
            <div>
                <i class="iconfont icon-icon" @click="goback"></i>
                <span>商品详情</span>
            </div>
        </header>
        <div class="details-main">
            <div class="details-carousal">
                <img :src="'src/assets/imgs/'+ detailsProductMsg.bigImg" alt="">
            </div>
            <div class="details-msg">
                <div class="detailsGoodsNameBox">
                    <span class="detailsGoodsName">商品名称：{{detailsProductMsg.productName}}</span>
                </div>
                <div class="detailsPriceBox">
                    <span class="detailsNowPrice">￥{{detailsProductMsg.productNewPrice}}</span>
                    <span class="detailsOldPrice"><s>￥{{detailsProductMsg.productOldPrice}}</s></span>
                </div>
                <div class="detailsMsgBox">
                    <span class="detailsXinxiLeft">送货方式：{{detailsProductMsg.pinPai}}</span>
                    <div class="detailsXinxiLeft">规格：{{detailsProductMsg.guiGe}}</div>
                </div>
            </div>
            <div class="detailsIntroduceBox">
                <div class="detailsIntroduceBoxTop">
                    <span>服务承诺</span>
                    <ul>
                        <li>
                            <span></span>
                            <p>精心优选</p>
                        </li>
                        <li>
                            <span></span>
                            <p>品质保证</p>
                        </li>
                        <li>
                            <span></span>
                            <p>全国包邮</p>
                        </li>
                        <li>
                            <span></span>
                            <p>3-5天送达</p>
                        </li>
                    </ul>
                    <span>
                        ————— 向上拖动查看图文详情 —————
                    </span>
                </div>
                <div class="detailsIntroduceBoxBody" v-for= "(item,index) in detailsProductMsg.msgImg">
                    <img :src="'src/assets/imgs/'+item" >
                    
                </div>
            </div>
        </div>    
        <footer class="details-bottom">
            <div class="details-bottom-left">
                <span>添加商品：</span>
                <div class="detailsMinAdd">
                    <span class="detailsMin" @click = "changeDetailNum(detailsProductMsg,-1)">
                        -
                    </span>
                    <input class="detailsNum" value="0" disabled v-model="detailsProductMsg.productNum">
                    <span class="detailsAdd" @click = "changeDetailNum(detailsProductMsg,1)">
                        +
                    </span>
                </div>
            </div>
            <router-link to="/car" class="details-car">
                <span>
                    <i class="iconfont icon-gouwuche"></i>
                </span>
                <div class="detailsNumShow" v-show="msg">
                    {{detailsProductMsg.productNum}}
                </div>
            </router-link>
        </footer>
    </div>
</template>




<script type="text/javascript">
    import './DetailsComponent.scss'
    import '../../js/vue.js'
    import '../../js/vue-router.js'
    import $ from 'jquery'
    import http from '../../utils/HttpClient.js'


    export default {
        name:'details',
        data: function(){
            return {
                detailsProductMsg:{
                    productNum:'0'
                },
                msg:'',
                urlPath:{}
            }
		},
        methods:{
            changeDetailNum:function(data,way){
                var _this = this;
                if(way<0){
                    data.productNum--
                    if(data.productNum<=0){
                        _this.msg=false;
                        data.productNum='0'
                    }
                    _this.detailsProductMsg.singleTotalPrice = (parseInt(data.productNum) *parseInt(_this.detailsProductMsg.productNewPrice)).toString()
                    
                    http.post('setDetailsMsg',_this.detailsProductMsg).then(function(res){

                    })
                }else if(way>=0){
                    _this.msg=true;
                    data.productNum++
                    _this.detailsProductMsg.singleTotalPrice = (parseInt(data.productNum) *parseInt(_this.detailsProductMsg.productNewPrice)).toString()
                    console.log(_this.detailsProductMsg)
                    http.post('setDetailsMsg',_this.detailsProductMsg).then(function(res){
                    })
                }
                
            },
            goback:function(){
                history.go(-1);
            }
        },
        created:function(){
            var path = this.$root._route.query.id;
            this.urlPath.productId = path;

            console.log(this.urlPath)
            var _this = this;
            http.get('getDetailsMsg',_this.urlPath).then(function(res){
				// console.log(res.message.data[0])
                var res = res.message.data[0]
                // console.log(res)
                _this.detailsProductMsg.productId=res.id;
                _this.detailsProductMsg.productNum='0';
                _this.detailsProductMsg.bigImg=JSON.parse(res.banner)[0];
                _this.detailsProductMsg.productName=res.ProductName;
                _this.detailsProductMsg.productNewPrice=res.NewPrice;
                _this.detailsProductMsg.productOldPrice=res.OldPrice;
                _this.detailsProductMsg.pinPai=res.GigClass;
                _this.detailsProductMsg.guiGe=res.spec1;
                _this.detailsProductMsg.msgImg=JSON.parse(res.photo);
                
                _this.$set(_this.detailsProductMsg)
			});

            // console.log(this.detailsProductMsg)
        }
    }
</script>