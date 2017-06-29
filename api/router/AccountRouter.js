var DB = require('../module/DBHelper');
var ApiResult = require('../module/ApiResult');

var bodyParser = require('body-parser');
// var MongoDB = require('mongodb');
// var MongoDBServer = new MongoDB.Server('localhost', 27017);
// var db = new MongoDB.Db('tan90', MongoDBServer);

var urlencodedParser = bodyParser.urlencoded({ extended: false })

exports.Register = function(app) {
    // app.get('/getDetailsMsg',function(request, response){
       
    //         // console.log(typeof request.query.productId)
    //         // console.log(request.query.productId)
    //     DB.get('goods', { id: request.query.productId }, function(result) {
    //         // console.log(result)
    //         if (!result.status) {
    //             response.send(result);
    //         } else {
    //             var data = result.data;
    //             response.send(ApiResult(true,result));
    //         }
    //     })
        
    // })

   
    //tan90便利details数据获取
    app.get('/getDetailsMsg',function(request, response){
       
            // console.log(typeof request.query.productId)
            // console.log(request.query.productId)
        DB.fetch('goods', { id: request.query.productId }, function(result) {
            // console.log(result)
            if (!result.status) {
                response.send(result);
            } else {
                var data = result.data;
                response.send(ApiResult(true,result));
            }
        })
        
    })


    //tan90便利details数据获取
    // app.get('/getDetailsMsg',urlencodedParser, function(request, response){
    //     if (!request.query || !request.query.productId) {
    //         response.send(ApiResult(false, '没有找到该商品'));
    //     } else {
    //         // console.log(typeof request.query.productId)
    //         // console.log(request.query.productId)
    //         DB.get('goods', { productId: request.query.productId }, function(result) {
    //             // console.log(result)
    //             if (!result.status) {
    //                 response.send(result);
    //             } else {
    //                 var data = result.data;
    //                 response.send(ApiResult(true,result));
    //             }
    //         })
    //     }
    // })
  
    //存储car商品信息
    app.post('/setDetailsMsg', urlencodedParser, function(request, response) {
        console.log(111)
        DB.detailMsg('cargoods', request.body, function(result) {
            
            // console.log(result)
            if (!result.status) {
                response.send(result);
            } else {
                // console.log(result)
                // var data = result.data;
                response.send(result);
            }
        })
        // console.log(request.query.productId)
        // console.log(111)
        
    });


    //tan90便利car数据获取
    app.post('/getCar',urlencodedParser, function(request, response){

            // console.log(typeof request.body.productId)
            // console.log(request.body.productId)
            DB.fetch('cargoods', {}, function(result) {
                // console.log(result)
                if (!result.status) {
                    response.send(result);
                } else {
                    var data = result.data;
                    response.send(ApiResult(true,result));
                }
            })
        
    })
  
    //删除某条car数据
    // deleteDetailsData
    app.post('/deleteDetailsData', urlencodedParser, function(request, response) {
        // console.log(request.query.productId)
         DB.deleteGoods('cargoods', { productId:request.body.productId }, function(result) {
            // console.log(result)
            if (!result.status) {
                response.send(result);
            } else {
                // console.log(result)
                // var data = result.data;
                response.send(result);
            }
        })
        
    });

    //存入订单
    app.post('/saveOrder',urlencodedParser, function(request, response) {
        if (!request.body || !request.body.orderNum) {
            response.send(ApiResult(false, '没有找到该商品'));
        } else {
            DB.insert('orderMsg', request.body, function(result){
                response.send(result);
            })
        }
    })

    //读取订单
    app.post('/readOrder',urlencodedParser, function(request, response) {
        DB.fetch('orderMsg',{}, function(result){
            response.send(result);
        })
    })
    
    //读取地址
    app.post('/readOrderAdress',urlencodedParser, function(request, response){
        DB.fetch('address',{}, function(result){
            response.send(result);
        })
    })

    //刘铁球
    //注册用户
    app.post('/regist',urlencodedParser,function(request,response){
        console.log(123);
        DB.regist('user',request.body,function(data){
            console.log(data)
            switch(data){
                case 'username':
                    response.send(ApiResult(false, '您的用户名已被注册',data))
                    break;
                case 'phone':
                    response.send(ApiResult(false, '您的手机号已被注册',data))
                    break;
                case 'email':
                    response.send(ApiResult(false, '您的邮箱已被注册',data))
                    break;
                default :
                    response.send(ApiResult(true, '',data))
            }
        })
    })
    //判断用户名或邮箱或手机是否被注册
    app.post('/judge',urlencodedParser,function(request,response){
        console.log(444)
        DB.judge('user',request.body,function(data){
            switch(data){
                case 'username':
                    response.send(ApiResult(false, '您的用户名已被注册',data))
                    break;
                case 'phone':
                    response.send(ApiResult(false, '您的手机号已被注册',data))
                    break;
                case 'email':
                    response.send(ApiResult(false, '您的邮箱已被注册',data))
                    break;
                default :
                    response.send(ApiResult(true, '',data))
            }
             
        })
    })
    //用户登录
    app.post('/login',urlencodedParser,function(request,response){
        // console.log(444)
        DB.login('user',request.body,function(data){
            switch(data){
                case 'username':
                    response.send(ApiResult(false, '您的用户名不正确',data))
                    break;
                case 'psw':
                    response.send(ApiResult(false, '您的密码不正确',data))
                    break;
                default :
                    response.send(ApiResult(true, '',data))
            }
             
        })
    })
    //获取地址
    app.get('/fetchAddress',function(request,response){
        // console.log(444)
        DB.fetchAddress('address',request.query,function(data){
            if(data[0]){
                response.send(ApiResult(true, '',data))
            }else{
                response.send(ApiResult(false, '',data))
            }
            
            
        })
    })
    //保存地址
    app.post('/saveAddress',urlencodedParser,function(request,response){
        // console.log(444)
        DB.saveAddress('address',request.body,function(data){

            response.send(ApiResult(true, '',data))
        })
    })
    //编辑地址
    app.post('/editAddress',urlencodedParser,function(request,response){
        // console.log(444)
        DB.editAddress('address',request.body,function(data){
            if(data){
                response.send(ApiResult(true, '',data))
            }else{
                response.send(ApiResult(false, '',data))
            }
            
        })
    })
    //删除地址
    app.post('/deleteAddress',urlencodedParser,function(request,response){
        // console.log(444)
        DB.deleteAddress('address',request.body,function(data){
            data[0] ? response.send(ApiResult(true, '',data)) : response.send(ApiResult(false, '',data));
        })
    })



    //李龙威
    app.post('/getallgoods',urlencodedParser, function(request, response){
        // console.log(222)
        
        DB.getallgoods('goods',{},function(data){
            response.send(ApiResult(true, '获取成功',data));
        })
   
        
    })

	app.post('/searchgoods',urlencodedParser,function(req,res){
		// res.setHeader('Access-Control-Allow-Origin','*');
		 // console.log(req.body)
        DB.searchgoods('goods',req.body,function(data){
            res.send(ApiResult(true, '查询成功',data));
        })
	})

    app.post('/addcart',urlencodedParser,function(request,response){
        // console.log(444)
        DB.addcart('cargoods',request.body,function(data){
            data ? response.send(ApiResult(true,'添加成功')) : response.send(ApiResult(false,'添加失败'));
            
        })
    })

    app.post('/origingoods',urlencodedParser,function(req,res){
        // res.setHeader('Access-Control-Allow-Origin','*');
         // console.log(req.body)
        DB.origingoods('goods',req.body,function(data){
            res.send(ApiResult(true, '查询成功',data));
        })
    })




    
}