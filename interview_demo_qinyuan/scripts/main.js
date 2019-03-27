+function(){
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
        // carousel execution

        $(function(){

            var 
                showFloatIcon=false;
            

            carousel.CA.forEach(function(item,index){
                item.init();
            })
            slider.init();
            form.init();

            window.onscroll=function(){
                if (document.documentElement.scrollTop<=560){
                    if(showFloatIcon){
                        showFloatIcon=false;
                        $(".float-icon").css({
                            right:"-3%"
                        })
                    }
                }else{
                    if(!showFloatIcon){
                        showFloatIcon=true;
                        $(".float-icon").css({
                            right:"5%"
                        })
                    }
                }
                
            }

            $("#recommend-reservation").click(function(){
                $("div.mask").css({
                    display:"block"
                })
                $(document.body)
                    .css({
                        height:"100vh",
                        width:"100vw",
                        "overflow-y":"hidden"
                    })
                
            })
           
            $("div.mask").click(function(e){
                if(e.target.classList.contains("close") || e.target.classList.contains("mask")){
                    $(e.currentTarget).css({
                        display:"none"
                    })

                    $(document.body)
                        .css({
                            height: "100%",
                            width: "100%",
                            "overflow": "auto"
                        })
                }
            })
            
            
        })
        
    })
}()