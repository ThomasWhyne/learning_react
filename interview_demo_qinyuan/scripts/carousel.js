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
        shouldMove: function (direction) {

            switch (direction) {
                case "previous":
                    return Math.abs(this.currentShift) > this.prevBoundary;
                case "next":
                    return Math.abs(this.currentShift) < this.nextBoundary;
            }

        },
        triggerMove: function (items, direction, shiftWidth, currentShift) {

            var shift = direction === "next" ? currentShift - shiftWidth : currentShift + shiftWidth;
            $(items).each(function (index, ele) {

                ele.style.transform = `translateX(${shift}px)`;
            });

            this.currentShift = shift;

        },
        cssConfig: function (wrapperW, wrapperH) {
            this.container.style.height = wrapperH + "px";
            var wrapper = document.createElement("div");
            wrapper.style.width = wrapperW+1+ "px";
            wrapper.style.height = wrapperH + "px";
            wrapper.classList.add("carousel-wrapper");

            $(`ul.carousel[data-key=${this.key}] .carousel-item`)
                .css({ "width": this.itemWidth, "height": this.itemHeight })
                .wrapAll(wrapper);
            // $(".carousel-item").each(function (index, item) {
            //     item.style.backgroundColor = "#" + ("" + Math.random()).slice(-6);
            // })

        },
        eventHandlers: {
            btn_click_handler: function (key) {
                var className=event.target.classList.value;
                
                if (className.indexOf('btn-prev') >= 0 || className.indexOf("btn-next")>=0){
                    console.log("real");
                    var items = $(`ul.carousel[data-key=${key}] .carousel-item`);
                    var direction = $(event.target).attr("aria-label");
                    if (this.shouldMove(direction)) {
                        this.triggerMove(items, direction, this.shiftWidth, this.currentShift)
                    }
                }
                console.log(_.CA[key]);
            }
        },
        init: function () {
            this.cssConfig(this.wrapperWidth, this.itemHeight);
            this.container.innerHTML += (this.btn_prev + this.btn_next);
            this.container.onclick = this.eventHandlers.btn_click_handler.bind(this, this.key);
        }

    }

    carousels.each(function (index, ele) {
        var initialData = JSON.parse(ele.dataset.init);
        Carousel.push(new CarouselFactory(index, ele, initialData));
    })

    _.CA = Carousel;
    

    return {
        CA:_.CA
    }
})