var ApiResult = require('./ApiResult')

var MongoDB = require('mongodb');
var MongoDBServer = new MongoDB.Server('localhost', 27017);
var db = new MongoDB.Db('tan90', MongoDBServer);

module.exports = {
    fetch: function(_collection, _condition, _callback) {
        db.open(function(dberror) {
            if (dberror) {
                _callback(ApiResult(false, null, dberror));
                return;
            }

            db.collection(_collection, function(collerror, collection) {
                if (collerror) {
                    _callback(ApiResult(false, null, collerror));
                    return;
                }
                var condition = _condition || {};
                collection.find(condition).toArray(function(resulterror, dataset) {
                    // console.log(dataset, _condition)
                    if (resulterror) {
                        _callback(ApiResult(false, null, resulterror));
                    } else {
                        _callback(ApiResult(true, null, dataset));
                    }
                     
                })
                db.close();
            })
          
        })
    },
    detailMsg:function(_collection, data, _callback){
        db.open(function(dberror) {
            if (dberror) {
               _callback(ApiResult(false, null, dberror));
                return;
            }
            db.collection('cargoods', function(collerror, collection) {
                if (collerror) {
                    _callback(ApiResult(false, null, dberror));
                    return;
                }
                // console.log(data)
                collection.find({productId:data.productId}).toArray(function(err, docs){
                    if(!docs[0]){
                        // console.log('!docs',111)
                        collection.insert(data, function(err, result) {
                            if (err) {
                                _callback(ApiResult(false, null, err));
                            } else {
                                _callback(ApiResult(true, null, result));
                            }
                        })
                       
                    }else if(docs[0]){
                        // console.log('docs',123)
                        if(data.productNum<="0"){
                            collection.remove(docs[0],function(err,result){
                                if(err){
                                    _callback(ApiResult(false, null, err));
                                    return;
                                }else{
                                    _callback(ApiResult(true, null, result));
                                }
                            })
            
                        }else{
                            // console.log('docssssss')
                            collection.update({productId:data.productId},{$set:{productNum:data.productNum,singleTotalPrice:data.singleTotalPrice}});
                            _callback(ApiResult(true, null, docs))
                            
                        }
                    }
                    db.close();
                    
                })
                
            })
            
        })
    },
    deleteGoods:function(_collection, data, _callback){
        db.open(function(dberror) {
            if (dberror) {
               _callback(ApiResult(false, null, dberror));
                return;
            }
            db.collection('cargoods', function(collerror, collection) {
                if (collerror) {
                    _callback(ApiResult(false, null, collerror));
                    return;
                }
                // console.log(request.body)
                collection.find({productId:data.productId}).toArray(function(err, docs){
                    if(!docs[0]){
                        // console.log('!docs',111)
                        _callback(ApiResult(false, null, err));
                    }else if(docs[0]){
                        // console.log('docs',123)
                        collection.remove(docs[0],function(err,result){
                            if(err){
                                _callback(ApiResult(false, null, err));
                                return;
                            }else{
                                _callback(ApiResult(true, null, result));
                            }
                        })

                    }
                    db.close();
                    
                })
                
            })
            
        })
    },
    insert: function(_collection, _newdata, _callback) {
        db.open(function(dberror) {
            if (dberror) {
                _callback(ApiResult(false, null, dberror));
                return;
            }

            db.collection(_collection, function(collerror, collection) {
                if (collerror) {
                    _callback(ApiResult(false, null, collerror));
                    return;
                }
                
                collection.insert(_newdata, function(resulterror, result) {
                    if (resulterror) {
                        _callback(ApiResult(false, null, resulterror));
                    } else {
                        _callback(ApiResult(true, null, result));
                    }
                })
            })
            db.close();
        })
    },
    
    //刘铁球
    //判断用户名或电话或邮箱是否已被注册
    judge:function(_collection,data,callback){
        db.open(function(err,db){
            if(err){
                console.log('connect db',err)
            }

            db.collection(_collection,function(err,collection){
                if(err){
                    console.log('connect collection',err)
                }
                if(data.username){
                    collection.find({username:data.username}).toArray(function(err,docs){
                        if(err){
                            console.log('find docs',err)
                            return;
                        }
                        docs[0] ? callback('username') : callback(null)
                        
                    })
                }else if(data.phone){
                    collection.find({phone:data.phone}).toArray(function(err,docs){
                        if(err){
                            console.log('find docs',err)
                            return;
                        }
                        docs[0] ? callback('phone') : callback(null);
        
                    })
                }else{
                    collection.find({email:data.email}).toArray(function(err,docs){
                        if(err){
                            console.log('find docs',err)
                            return;
                        }
                        docs[0] ? callback('email') : callback(null);
        
                    })
                }
                db.close();
            })
        })
    },
    //注册
    regist:function(_collection,data,callback){
        db.open(function(err,db){
            if(err){
                console.log('connect db',err)
            }

            db.collection(_collection,function(err,collection){
                if(err){
                    console.log('connect collection',err)
                }
                collection.find({'$or':[{username:data.username},{phone:data.phone},{email:data.email}]}).toArray(function(err,docs){
                    if(err){
                        console.log('find docs',err)
                        return;
                    }
                    // console.log(docs)
                    if(docs[0]){
                        if(docs[0].username == data.username){
                            callback('username')
                        }else if(docs[0].phone == data.phone){
                            callback('phone')
                        }else{
                            callback('email')
                        }
                    }else{
                        collection.insert(data);
                        callback(null);
                    }

                    db.close();
                })
            })
        })
    },
    //登录
    login:function(_collection,data,callback){
        db.open(function(err,db){
            if(err){
                console.log('connect db',err)
            }

            db.collection(_collection,function(err,collection){
                if(err){
                    console.log('connect collection',err)
                }
                collection.find({'$or':[{username:data.username},{phone:data.username},{email:data.username}]}).toArray(function(err,docs){
                    if(err){
                        console.log('find docs',err)
                        return;
                    }
                    // console.log(docs)
                    if(docs[0]){
                        docs[0].password == data.password ? callback(docs[0]) : callback('psw');
                        
                    }else{
                        callback('username');
                    }

                    db.close();
                })
            })
        })
    },
    //获取地址
    fetchAddress:function(_collection,data,callback){
        db.open(function(err,db){
            if(err){
                console.log('connect DB',err)
                return;
            }

            db.collection(_collection,function(err,collection){
                if(err){
                    console.log('connect collection',err)
                    return;
                }

                collection.find({email:data.email}).toArray(function(err,docs){
                    if(err){
                        console.log('find data',err)
                        return;
                    }

                    callback(docs)
                    db.close();
                })
            })
        })
    },
    //保存地址
    saveAddress:function(_collection,data,callback){
        db.open(function(err,db){
            if(err){
                console.log('connect DB',err)
                return;
            }

            db.collection(_collection,function(err,collection){
                if(err){
                    console.log('connect collection',err)
                    return;
                }
                // console.log(data)
                collection.find({email:data.email}).toArray(function(err,docs){
                    if(err){
                        console.log('find data',err)
                        return;
                    }
                    if(docs[0]){
                        if(data.val === '1'){
                            var obj;
                            docs.forEach(function(item){
                                if(item.val == '1'){
                                    obj = Object.assign({},item);
                                }
                            })
                            
                            collection.update({email:obj.email,phone:obj.phone,name:obj.name},{$set:{val:'0'}});

                            collection.insert(data)
                            callback(docs)
                        }else{
                            collection.insert(data)
                            callback(docs)
                        }
                         
                    }else{
                        data.val = '1';
                        collection.insert(data)
                        callback(docs)
                    }
                    db.close();
                })
            })
        })
    },
    //编辑地址
    editAddress:function(_collection,data,callback){
        db.open(function(err,db){
            if(err){
                console.log('connect DB',err)
                return;
            }

            db.collection(_collection,function(err,collection){
                if(err){
                    console.log('connect collection',err)
                    return;
                }
                // console.log(data)
                collection.find({email:data.email}).toArray(function(err,docs){
                    if(err){
                        console.log('find data',err)
                        return;
                    }
                    if(docs[0]){
                        var obj1;
                        var obj2;
                        docs.forEach(function(item){
                            if(item.val == '1'){
                                obj1 = JSON.parse(JSON.stringify(item))
                            }

                            if(item.addressId == data.addressId){
                                // console.log(1111)
                                obj2 = JSON.parse(JSON.stringify(item))
                            }
                            // console.log(typeof item.addressId,'data.id',typeof data.addressId)
                        })
                        // console.log(obj1,obj2)
                        if(obj2 && obj1.addressId != obj2.addressId && data.val == '1'){
                            collection.update({addressId:obj1.addressId,email:obj1.email},{$set:{val:'0'}});
                            collection.update({addressId:obj2.addressId,email:obj2.email},{$set:{phone:data.phone,tablet:data.tablet,name:data.name,val:'1'}},{multi:true});
                            callback(docs);
                        }else if(obj2 && obj1.addressId == obj2.addressId){
                            collection.update({addressId:obj2.addressId,email:obj2.email},{$set:{phone:data.phone,tablet:data.tablet,name:data.name,val:'1'}},{multi:true});
                            callback(docs);
                        }else{
                            collection.update({addressId:obj2.addressId,email:obj2.email},{$set:{phone:data.phone,tablet:data.tablet,name:data.name,val:data.val}},{multi:true});
                            callback(docs);
                        }
                    }else{
                        callback(false)
                    }
                    db.close();
                })
            })
        })
    },
    //删除地址
    deleteAddress:function(_collection,data,callback){
        db.open(function(err,db){
            if(err){
                console.log('connect DB',err)
                return;
            }

            db.collection(_collection,function(err,collection){
                if(err){
                    console.log('connect collection',err)
                    return;
                }

                collection.find({email:data.email,addressId:data.addressId}).toArray(function(err,docs){
                    if(err){
                        console.log('find data',err)
                        return;
                    }
                    if(docs[0]){
                        collection.remove({email:data.email,addressId:data.addressId});
                        callback(docs)
                    }else{
                        callback(false)
                    }
                    
                    db.close();
                })
            })
        })
    },

    //李龙威
    getallgoods:function(_collection,data, callback){
        db.open(function(error, db){
            if(error){
                console.log('connect db:', error);
            }
            //Account => 集合名（表名）
            db.collection(_collection, function(error, collection){
                if(error){
                    console.log(error)  
                } else {
                    collection.find().toArray(function(err, docs){
                        if(err){
                            console.log('find err:',err);
                        }
                        // console.log(docs)
                        callback(docs);
                        db.close();
                    })
                }
                
            })
        })  
    },

    searchgoods:function(_collection,data,callback){
        // console.log(data)
        db.open(function(error, db){
            if(error){
                console.log('connect db:', error);
            }
            //Account => 集合名（表名）
            db.collection(_collection, function(error, collection){
                if(error){
                    console.log(error)  
                } else {
                    // console.log(data.val);
                    var reg = new RegExp("^.*"+data.val+"\.*$","i");
                    collection.find({'$or':[{ProductName:{$regex:reg}},{GigClass:{$regex:reg}},{LittleClass:{$regex:reg}}]}).toArray(function(err,dos){  
                        if(err){
                            console.log(err);
                        }
                        // console.log(dos)
                        callback(dos);
                        
                        db.close();
                    })
                }
                
            })
        })  
    },
    addcart:function(_collection,data,callback){
        db.open(function(err,db){
            if(err){
                console.log('db open' ,err)
            }

            db.collection(_collection,function(err,collection){
                if(err){
                    console.log('collection ',err)
                }

                collection.find({productId:data.productId}).toArray(function(err,docs){
                    if(err){
                        console.log('find docs',err)
                    }
                    if(!docs[0]){
                        // console.log('!docs ' , 111);
                        collection.insert(data)
                        callback(null)
                    }else{
                        var num = data.productNum;
                        var total = data.singleTotalPrice;
                        var obj;
                        docs.forEach(function(item){
                            if(data.productId == item.productId){
                                num = Number(num) + Number(item.productNum);
                                console.log(num)
                                total = Number(total) + Number(item.singleTotalPrice);
                                obj = Object.assign({},item);
                            }
                        })
                        //判断是否已拥有该商品
                        if(!obj){
                            // console.log('!obj',222);
                            collection.insert(data);
                            callback(true)
                        }else{
                            // console.log('obj',obj);
                            collection.update({productId:obj.productId},{$set:{productNum:'' + num,singleTotalPrice:'' + total}});
                            callback(true)
                        }
                    }
                   db.close();
                })
            })
        })
    },
    origingoods:function(_collection,data,callback){
        // console.log(data)
        db.open(function(error, db){
            if(error){
                console.log('connect db:', error);
            }
            //Account => 集合名（表名）
            db.collection(_collection, function(error, collection){
                if(error){
                    console.log(error)  
                } else {
                    // console.log(data.val);
                    var reg = new RegExp("^.*"+data.val+"\.*$","i");
                    collection.find({'$or':[{ProductName:{$regex:reg}},{GigClass:{$regex:reg}},{LittleClass:{$regex:reg}}]}).toArray(function(err,dos){  
                        if(err){
                            console.log(err);
                        }
                        // console.log(dos)
                        callback(dos);
                        
                        db.close();
                    })
                }
                
            })
        })  
    }
}