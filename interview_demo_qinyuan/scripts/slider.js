define(["jquery"],function($){

    var timmer;
    function moveSlider(sliders, dots) {

        var currentSlide = 0, currentDot = 0, currentIndex = 0, length = sliders.length;
        $(sliders[currentIndex]).attr("data-current", "current");
        $(dots[currentIndex++]).attr("data-current", "current");

        return function () {
            $(sliders).each(function (sliderIndex, slider) {
                sliderIndex === currentIndex ? $(slider).attr("data-current", "current") : $(slider).attr("data-current", "none");
            })
            $(dots).each(function (dotIndex, dot) {
                dotIndex === currentIndex ? $(dot).attr("data-current", "current") : $(dot).attr("data-current", "none");
            })

            currentIndex = currentIndex < length - 1 ? currentIndex + 1 : 0;

        }


    }

    return {
        init:function(){
            $("ul.slider").css({width:"100%",height:"75%"})
            timmer=setInterval(moveSlider($("ul.slider .slider-item"), $("ul.slider .slider-dot")), 2000);

            console.log("奖大2019年开年捷报沁园斩获“年度净水品牌".split("").reverse().join(""))
        },
        destroy:function(){
            clearInterval(timmer);
            timmer=null;
        }
    }

})