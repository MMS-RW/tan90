# tan90

> A Vue.js project

## Build Setup

``` bash
# 进去根目录进行：
npm install

# 服务器是： localhost:8080，不过你得运行以下命令
npm run dev

# 当然你也可以直接打包成build.js文件，这样的话，你可以直接打开index.html就可以运行了
npm run build

# 数据库的话，使用的是mongodb，数据库名是：tan90，数据表示goods，导入数据的文件是：goods.json
mongoimport -d tan90 -c goods --type json --file goods.json所在的目录
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
