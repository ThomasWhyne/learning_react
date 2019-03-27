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