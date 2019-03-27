- ### interview demo  
- 应用开发库：jquery、reset.css、iconfont.js
- 应用模块化方案：require.js    
- 项目主文件：index.html、scripts/main.js、style.css  
- 自定义模块：crousel.js、slider.js、form.js   
    - #### todo  
         - 页面未进行响应式配置  
         - 页面媒体资源文件加载未做懒加载处理

- ### 代码示例

- #### main.js  
```javascript
    (function(){
    baseUrl:"./"
    require.config({
        paths: {
            "jquery": "./libs/jquery",
            "carousel": "./carousel",
            "slider":"./slider",
            "form":"./form"
        }
    })

    require(["jquery","carousel","slider","form"],function($,carousel,slider,form){

        
        $(function(){

            // 模块引入完毕，业务逻辑代码执行区

        })
})()
```  
  
- #### carousel.js  
```javascript  
  
  //自定义轮播层叠轮播图模块，搭配carousel.css使用

define(["jquery"],function($){

    
    var
        _ = this,
        carousels = $("ul.carousel"),
        Carousel = [];

    function CarouselFactory(key, item, data) {

        this.key = key;
        this.container = item;
        this.itemWidth = data.width;
        this.itemHeight = data.height;
        this.wrapperWidth = data.width * data.show;
        this.offsetWidth = data.width * data.total;

        this.prevBoundary = data.prevBoundary || 0;
        this.nextBoundary = (this.offsetWidth - this.wrapperWidth);
        this.shiftWidth = (this.itemWidth * data.step);
        this.currentShift = data.currentShift || 0;

        this.btn_prev = data.btn_prev || '<button class="btn-prev iconfont" aria-label="previous" type="button">&#xe676;</button>';
        this.btn_next = data.btn_next || '<button class="btn-next iconfont" aria-label="next" type="button">&#xe676;</button>';

        this.container.dataset.key = this.key;
    }

    CarouselFactory.prototype = {
        constructor: CarouselFactory,
   cd ..
```  
  
- #### form.js  
  
```javascript

    //自定义预约安装模块，异步加载国家省市区信息，实现联动选择及表单序列化

    define(["jquery"],function($){

    function init(){
        var f_reserve = document.forms["reservation"],
            province = f_reserve["reserve_province"],
            city = f_reserve["reserve_city"],
            area = f_reserve["reserve_area"],
            province_data, city_data, area_data;


        function onSelectChange(e) {
            switch (e.target.name) {
                case "reserve_province":
                    var selected = e.target.selectedIndex;
                    var code = $(e.target[selected]).data("code");
                    var city_potions = city_data.filter(city => city.provinceCode == code);
                    addOptions(city, city_potions);
                    city.disabled = false;
                    break;

                case "reserve_city":
                    var selected = e.target.selectedIndex;
                    var code = $(e.target[selected]).data("code");
                    var area_potions = area_data.filter(area => area.cityCode == code);
                    addOptions(area, area_potions);
                    area.disabled = false;
                    break;
            }
        }

        function addOptions(element, options) {

            options.forEach(function (item, index) {
                var option = document.createElement("option");
                $(option).attr({
                    "value": item.name,
                    "data-code": item.code
                })
                option.text = item.name;
                element.add(option);
            })

        }



        $.ajax({ url: "../assets/address/province.json" })
            .then((p_data) => {
                addOptions(province, p_data);
                province_data = p_data;
                return $.ajax({ url: "../assets/address/city.json" })
            })
            .then((c_data) => {
                city_data = c_data;
                return $.ajax({ url: "../assets/address/area.json" });

            })
            .then(a_data => area_data = a_data)
            .catch(err => {
                throw err;
            })


        function serialize(form) {
            var parts = [], field = null, index, len, bufferIndex, optionLen, option, optionVal;

            for (var index = 0, len = form.elements.length; index < len; index++) {
                field = form.elements[index];
                switch (field.type) {
                    case "select-one":
                    case "select-multiple":
                        for (var bufferIndex = 0, optionLen = field.options.length; bufferIndex < optionLen; bufferIndex++) {
                            option = field.options[bufferIndex];
                            if (option.selected) {
                                optionVal = "";
                                optionVal = option.hasAttribute("value") ? option.value : option.text;
                                parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(optionVal));
                            }
                        }
                        break;

                    case undefined:
                    case "file":
                    case "submit":
                    case "reset":
                    case "button":
                        break;
                    case "radio":
                    case "checkBox":
                        if (!field.checked) break;
                    default:
                        if (field.name.length) {
                            parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
                        }

                        break;
                }
            }

            console.log(parts);
        }



        province.onchange = onSelectChange;
        city.onchange = onSelectChange;
        f_reserve.onsubmit = function (e) {
            e.preventDefault();
            serialize(e.target);
        }
    }

    return {
        init:init
    }

})


```  
  
- ### 页面动画实现  

    - #### 主图交替显示动画  
    ```css
        #poster_first{
            opacity: 1;
            z-index: 2;
            animation: first_toggle 14s ease-out infinite;
        }

        @keyframes first_toggle{
            from{
                opacity: 1;
            }
            49%{
                opacity: 1;
            }
            50%{
                opacity: 0;
            }
            99%{
                opacity: 0;
            }
            to{
                opacity: 1;
            }
        }

    ```  
    - #### 进度条交替填充动画  
    ```css
        .banner-progressbar--ahead{
            width: 100%;
            height: 100%;
            background: #1695ef;
            animation: progressbar--ahead 14s linear infinite;
            
        }

        .banner-progressbar--after{
            width: 100%;
            height: 100%;
            background: #1695ef;
            animation: progressbar--after 14s linear infinite;
        }



        @keyframes progressbar--ahead{
            0%{
                margin-left: -50px;
            }
            50%{
                margin-left: 0;
            }
            50.1%{
                margin-left: -50px;
            }
            100%{
                margin-left: -50px;
            }
        }

        @keyframes progressbar--after{
            0%{
                margin-left: -50px;
            }
            50%{
                margin-left: -50px;
            }
            100%{
                margin-left: 0;
            }
        } 
    ```
