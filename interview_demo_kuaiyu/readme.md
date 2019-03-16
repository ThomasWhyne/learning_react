- 项目使用`react`+`webpack`+`babel`构建，未直接使用react-cli构建项目，手动配置了webpack，只挑选了一些必需模块。  
- 遵从组件化思想将页面模块细分，分化为不同组件，并区分其具体职能，项目主要组件有：`Banner`,`Category`,`Home`,`Navbar`,`Recommend`,`Searchbar`,`News`  
- 使用BrowserRouter稍稍搭建了路由，但是纯粹客户端路由    
- icon是在iconfont网站上随机挑选的，所以有些粗陋  
- 效果图：  

./assets/interbiew_4.gif
./assets/interview__5.gif

![]("./assets/interbiew_4.gif")
![]("./assets/interview__5.gif)

- 核心代码：  
```javascript

    //屏幕适配方案 rem

    +function(window,document){
            var docEl=document.documentElement;
            var dpr=window.devicePixelRatio||1;
            document.addEventListener("DOMContentLoaded",function(){
                document.body.style.fontSize = (12 * dpr) + "px";
            });

            function setRemUnit(){
                var rem=100*(docEl.clientWidth / 750);
                docEl.style.fontSize=rem+"px";
            }

            setRemUnit();

            function throttle(fn,wait) {
              var timmer,source,previous=0;

              function later() {
                  previous=+new Date;
                  timmer=null;
                  fn(source);
              }

              function controller(e){
                  var now=+new Date,remain=wait-(now-previous),source=e;
                  if(remain<=0 || remain>wait){
                      if(timmer){
                          clearTimeout(timmer);
                          timmer=null;
                      }
                      previous=now;
                      fn(source);
                  }else if(!timmer){
                      timmer=setTimeout(later,remain);
                  }
              }

              return controller;
            }

            // throttle(setRemUnit, 1000) 防抖
            window.addEventListener("resize",setRemUnit);

        }(window,document);



    //点赞评分逻辑
    // 构建五星点赞， 以商店名为键构建哈希表
        const { floor, random } = Math;
        const Star=(current)=>{
            return new Array(5).fill(STARED, 0, current).fill(UNSTARED,current);
        };
        const stars = this.state.stores.reduce((ac, cu, index) => ({ ...ac, [cu.name]: { buffer: Star(floor(random() * 5)) } }), {});
        this.setState({
            stars
        })

        handleStar(name,index){
            const { stars }=this.state;
            const flag=stars[name].buffer[index]===UNSTARED?false:true;
            let newBuffer;
            if(flag){
                // when clicked one was stared,reverse it
                newBuffer = stars[name].buffer.map((item, starIndex) => starIndex>index?UNSTARED:starIndex<index?item:UNSTARED);
            }else{
                newBuffer = stars[name].buffer.map((item, starIndex) => starIndex<index?STARED:starIndex>index?item:STARED);
            }
            stars[name].buffer=newBuffer;
            this.setState({
                stars
            })
        }


         // 手动实现的轮播图且默认中图居中

         onTouchStart({ touches }){
        const { clientX }=touches[0];
        this.setState({
            touchStart:clientX,
        });
    }

    onTouchMove({ touches,currentTarget }){
        const { offsetWidth }=currentTarget;
        const { clientX }=touches[0];
        let { touchStart,shift }=this.state;
        let diff =(clientX - touchStart);
        if (Math.abs(shift + diff) <= offsetWidth / 2){
            shift = shift + diff;
            this.setState({
                transform: `translateX(${shift}px)`,
                touchStart: clientX,
                shift: shift
            })
        }
    }
    render(){
        const { banners }=this.state;
        return(
            <div className="banner"
                 onTouchStart={ (e)=>this.onTouchStart(e) } 
                 onTouchMove={ (e)=>this.onTouchMove(e) } 
                //  onTouchEnd={ (e)=>this.onTouchEnd(e) }

            >
                {banners.map((item, index) => (
                    <span key={index} style={ { transform:this.state.transform } }>
                        <img src={item} alt="" style={ { opacity:`${this.state.show?"inline-block":"none"}`}} onLoad={ ()=>this.setState({show:true}) }  />
                    </span>))}
            </div>
        );
    }


    

```  
  
