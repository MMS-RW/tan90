<template>
    <div class="car">
        <header class="car-top" @click="goback">
            <div>
                <i class="iconfont icon-icon"></i>
                <span>购物车</span>
            </div>
        </header>
        <div class="car-body-none" v-show="noGoods">
            <img src="src/assets/images/car/bgimg.png" alt="">
            <span>您在该店铺中还没有购物哦<br/>快去选购商品吧</span>
            <router-link to="/list" class="car-btn-none">
                去逛逛
            </router-link>
        </div>
        <div class="car-body-has" v-show="hasGoods">
            <div class="car-tips">
                温馨提示：购物车中仅显示您当前访问店铺所含商品
            </div>
            <div class="carBodyMain">
                <div class="carBodyMainTop">
                    <div class="carBodyMainTopLeftBox" @click="carSelectAll">
                        <span>
                            <i class="iconfont icon-gouxuan" v-show="carselect" v-bind:style="hateAllSelect"></i>
                        </span>
                    </div>
                    <span>tan90º全国旗舰店
                        <i >(0.00元起送)</i>
                    </span>
                </div>
                <ul class="carBodyMainTopProduct" >
                    <li v-for= "(item,index) in carDatas"  :ref="'goods' + index" >
                        <div class="carBodyMainTopProductLeft" @click="selectThis(item,index)">
                            <span>
                                <i class="iconfont icon-gouxuan" v-show="index !== num" v-bind:style="hateSelect"></i>
                            </span>
                        </div>
                        <div class="carBodyMainTopProductRight">
                            <router-link :to="'details?id='+item.productId" >
                                <img :src="'src/assets/imgs/'+item.bigImg" alt="">
                            </router-link>
                            <div class="carBodyMainTopProductRightName">
                                <span>{{item.productName.slice(0,8)}}...</span>
                            </div>
                            <div class="carBodyMainTopProductRightPrice">
                                <span>￥{{item.singleTotalPrice}}</span>
                            </div>
                            <div class="carMinAdd">
                                <span class="carMin" @click="changeCarNum(item,index,-1)">
                                    -
                                </span>
                                <input class="carNum" :value="item.productNum" disabled v-model="item.productNum">
                                <span class="carAdd" @click="changeCarNum(item,index, 1)">
                                    +
                                </span>
                            </div>
                            <div class="carDelete">
                                <i class="iconfont icon-quxiao" @click="deleteGoods(item,index)"></i>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="carPayBtnBox">
                <div class="carPayBtnLeft">
                    <div class="carPayBtnLeftSelect" @click="carSelectAll">
                        <span>
                            <i class="iconfont icon-gouxuan" v-show="carselect"  v-bind:style="hateAllSelect"></i>
                        </span>
                    </div>
                    <span>全选</span>
                </div>
                <div class="carPayBtnAdd">
                    <p>合计</p>
                    <span class="carTotalPrice">
                        ￥{{carTotalprice}}
                    </span>
                </div>
                <router-link to="/orderPayment" class="carPayBtn" @click="payOrderAll">
                    结算
                </router-link>
            </div>
        </div>
        <bj-footer></bj-footer>
    </div>
</template>



<script type = "text/javascript">
    import './CarComponent.scss'
    import '../../js/vue.js'
    import '../../js/vue-router.js'
    import footer from '../footer/footer.vue'
    import $ from 'jquery'
    import detailsComponent from '../details/DetailsComponent.vue'
    import http from '../../utils/HttpClient.js'
    const routes=[
        {path:'/details?:id',component:detailsComponent},
    ]
    export default {
        components: {
			'bj-footer': footer,
		},
        name:'car',
        data:function(){
            return {
                name: 'car',
                carDatas:{
                    // productNum:'0',
                },
                carselect:'',
                // carselectSingel:'',
                carTotalprice:0,
                noGoods:'',
                hasGoods:'',
                num:-1,
                hateSelect:{},
                hateAllSelect:{}
            }
        },
        
        methods:{
            changeCarNum:function(data,index,way){
                var _this=this;
                if(way<0){
                    data.productNum--;
                    if(data.productNum<=0){
                        data.productNum='0'
                        // console.log(this)
                        // $(this).parents('li').remove()
                         $(_this.$refs['goods'+index][0]).remove()
                         if(Object.keys(_this.$refs).length == 1){
                                this.noGoods=true;
                                this.hasGoods=false;
                            }
                    }
                    data.singleTotalPrice = (parseInt(data.productNum) *parseInt(data.productNewPrice)).toString()
                    _this.carTotalprice= parseInt(_this.carTotalprice) - parseInt(data.productNewPrice)
                    http.post('setDetailsMsg',data).then(function(res){
                        // console.log(res.message.data[0])
                    })

                }else if(way>0){
                    data.productNum++;
                    data.singleTotalPrice = (parseInt(data.productNum) *parseInt(data.productNewPrice)).toString()
                    _this.carTotalprice= parseInt(_this.carTotalprice) + parseInt(data.productNewPrice)
                    http.post('setDetailsMsg',data).then(function(res){
                        // console.log(res.message.data[0])
                    })
                }
                // console.log(_this.carDatas)
            },
            deleteGoods:function(data,index){
                // li上 v-show="index !== num"
                // this.num = index
                // console.log(this.$refs['goods'+index][0])
                $(this.$refs['goods'+index][0]).remove()
                // console.log(Object.keys(this.$refs).length)
                
                http.post('deleteDetailsData',data)
                if(Object.keys(this.$refs).length == 1){
                    this.noGoods=true;
                    this.hasGoods=false;
                    
                }
                this.carTotalprice= parseInt(this.carTotalprice) - parseInt(data.singleTotalPrice)
            },
            goback:function(){
                history.go(-1);
            },
            carSelectAll:function(){
                var _this = this;
                
                // console.log('当前选中'+ _this.carselect )
                // console.log(Object.keys(this.$refs))
                if(_this.carselect){
                    _this.carselect=false
                    _this.hateSelect.display='none'
                }else if(!_this.carselect){
                    _this.carselect=true
                    _this.hateSelect.display='block'
                }
            },
            selectThis:function(data,index){
                // console.log($('event.target'))
                var _this = this
                // console.log(index)
                if(_this.num === index){
                    console.log('变成选中')
                    _this.hateAllSelect.display='block'
                    _this.num = -1
                    return;
                }else{
                    console.log('变成未选中')
                    _this.hateAllSelect.display='none'
                    _this.num = index
                }
                
                // _this.num = index

                //li上   v-show="index !== num"
                // li上 v-show="index !== num"
                //data里 num:-1
                // this.num = index
                // console.log(this.$refs['goods'+index][0])
                // if(_this.carselectSingel){
                //     _this.carselect=false
                //     _this.carselectSingel=false
                // }else if(!_this.carselectSingel){
                //     _this.carselect=false
                //     _this.carselectSingel=true
                // }
            },
            payOrderAll:function(){
                if(this.carselectSingel){
                   
                }
            }
        },
        created:function(){
            var _this = this
            _this.carselect=true
            _this.carselectSingel=true
            http.post('getCar').then(function(res){
				// console.log(res.message.data.length=='0')
                if(res.message.data.length=='0'){
                    _this.noGoods=true;
                    _this.hasGoods=false;
                }else{
                    _this.noGoods=false;
                    _this.hasGoods=true;
                    _this.carDatas=res.message.data
                    _this.$set(_this.carDatas)
                    for(var i=0;i<_this.carDatas.length;i++){
                        _this.carTotalprice = _this.carTotalprice + parseInt(_this.carDatas[i].singleTotalPrice) 
                    }
                    // console.log(_this.carTotalprice)
                }
			});
        }
    }
</script>