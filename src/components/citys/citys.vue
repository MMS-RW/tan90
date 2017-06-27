<template>
  <div id="city">
    <div class="origin_top">
      <i class="iconfont icon-icon goBack" @click="goBack"></i>
      <p class="origin_song">选择城市</p>
      <!-- <span class="iconfont icon-mp-search sear" @click="searchClick"></span> -->
    </div>
    <div class="search-city"><input type="text" placeholder="请输入要搜索的城市" v-model="citySearch" :value="citySearch"></div>
    <div>
      <div id="showCityContent"></div>
      <div v-for="item in showCity" class="letter-item">
     
        <div><a :id="item.letter">{{item.letter}}</a></div>
        <div v-for="(i,index) in item.citylist" @click=chooseCity>{{i}}</div>
     
      </div>
    </div>
    <aside class="letter-aside">
      <ul>
        <li v-for="item in showCity" @click="naver(item.letter)">{{item.letter}} </li>
      </ul>
    </aside>
    <div id="tip">
      {{tipString}}
    </div>
  </div>
</template>

<script>
  import $ from "jquery"
  // import pinyin from 'pinyin'
  import './citys.scss'
  var cityLists = []
  var cityNames = []
  var cityNamesFilter = []
  var letter = []
  var countPage = 0
  var tipLetter = ''
  var citySearch = ''
  var showCity = []
  var showCityList = []
  var showCityTemp
  export default {
    beforeCreated: function () {
    },
    updated: function () {

    },
    created: function () {
      countPage++
      if (countPage < 2) {
        $.get('../../../city.json').then(response => {
          // console.log(response.data)
          let cityList = response.provinces
          for (let i in cityList) {
            cityLists = cityList[i].citys

            for (let j in cityLists) {
              cityNames.push(cityLists[j].citysName)
            }
            // console.log(cityNames)
          }
          cityNamesFilter = cityNames
          this.cityFilter(this.citySearch)
          this.someData = response.data.body
        }, response => {
        })
      }
    },
    mounted: function () {
    },
    methods: {
      goBack(){
        history.go(-1);
      },
      chooseCity(e){
        // console.log(e.target.innerText)
        let city=e.target.innerText
        history.go(-1);
        // this.$router.push({name:'index',params:{city:city}})
        localStorage.setItem("city",city)
        // console.log(localStorage.getItem("city"))
        // this.$parent.getCity(city)

      },
      buildLetter: function () {  // 构建字母项
        letter = []
        for (let i = 0; i <= 26; i++) {
          let obj = {}
          obj.letter = String.fromCharCode((65+i))
          obj.citylist = []
          letter.push(obj)
        }
      },
      getFirstLetter: function (str) { //  得到城市第一个字的首字母
        // console.log(pinyin(str)[0][0].charAt(0).toUpperCase())
        return pinyin(str)[0][0].charAt(0).toUpperCase()
      },
      buildItem: function (cityNamesFilter) {  // 构建城市
        this.buildLetter()
        let _this = this
        for (let i = 0; i < 26; i++) {
          letter[i].citylist = []
        }
        for (let i = 0; i < cityNamesFilter.length; i++) {
          let _index = Number(_this.getFirstLetter(cityNamesFilter[i]).charCodeAt() - 65)
          if (_index >= 0 && _index < 26) {
            letter[_index].citylist.push(cityNamesFilter[i])
          }
        }
        // 如果letter中citylist中没有值的话，过滤这一项
        showCity = showCityTemp = letter.filter(function (value) {
          let len = value.citylist.length
          return len > 0
        })
      },
      naver: function (id) { // 点击右边字母滚动
        this.tipString = id

        let obj = document.getElementById(id)
        let tip = document.getElementById('tip')
        tip.setAttribute('class', 'tipAppear')
        setTimeout(function () {
          tip.removeAttribute('class')
        }, 500)
        let oPos = obj.offsetTop
        // console.log(oPos)
        return $('#city').animate({scrollTop:oPos - 36});
        console.log(this.showCity)
      },
      cityFilter: function (city) {  // 城市搜索筛选
        let showCityListTemp
        this.buildItem(cityNamesFilter)
        showCity = showCityTemp
        showCity = showCity.filter(function (value) {
          showCityList = value.citylist
          showCityListTemp = showCityList.filter(function (val) {
            return (val.indexOf(city) > -1)
          })
          value.citylist = showCityListTemp
          return value.citylist.length > 0
        })
        this.showCity = showCity
        if (showCity.length === 0) {
          let _showCityContent = document.getElementById('showCityContent')
          _showCityContent.innerText = '查询不到结果'
          _showCityContent.setAttribute('class', 'tipShow')
        } else {
          document.getElementById('showCityContent').innerText = ''
        }
      }
    },
    data () {
      return {
        cityNames: cityNamesFilter,
        letter: letter,
        tipString: tipLetter,
        citySearch: citySearch,
        showCity: showCity
      }
    },
    watch: {
      citySearch: function (newCitySearch) {
        this.cityFilter(newCitySearch)
      }
    }
  }
</script>

