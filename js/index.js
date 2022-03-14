(function(){
    //随机生成数值的函数
    function getRandom(num){
        return Math.floor(Math.random()*num+1)
    }

    function $(selector){
        return document.querySelector(selector)
    }

    //获取dom
    var dictionaryDOM=$('.dictionary')
    var resultImgDOM=$('.resultImg')
    //获取魔盘
    var panelDOM=$('.panel')

    //获取魔盘的初始化图片
    var initImgDOM=$('.initImg')

    //定义图片的最大下标
    var totalNum=15
    //保存游戏状态
    var gameover=false

    //初始化操作
    function initCreate(){
        //清空字典内容
        dictionaryDOM.innerHTML=''
        //随机生成一个随机数来获取最终结果图片
        var num=getRandom(totalNum)
        resultImgDOM.src=`./images/values/${num}.png`
        //生成元素
        for(var i=0;i<100;i++){
            //是9的倍数的情况
            if(i%9===0){
                var str=`<div class="item">
                    <span>${i}</span>
                    <span>
                        <img src="./images/values/${num}.png" alt="">
                    </span>
                </div>`
                dictionaryDOM.innerHTML+=str 
            }else{
                //随机生成图片下标
                var imgIndex=getRandom(totalNum)
                //文本内容生成
                var str=`<div class="item">
                        <span>${i}</span>
                        <span>
                            <img src="./images/values/${imgIndex}.png" alt="">
                        </span>
                    </div>`
                    dictionaryDOM.innerHTML+=str
            }
            
        }
    }

    //魔盘转动函数
    function getResult(){
        if(!gameover){
            //给魔盘添加过渡属性
            panelDOM.style.transition='all 2s'
            //给魔盘加上旋转效果
            panelDOM.style.transform='rotate(1800deg)'
            panelDOM.addEventListener('transitionend',function(){
                //隐藏初始化图片
                initImgDOM.style.opacity='0'
                //显示结果图片
                resultImgDOM.style.opacity='100%'
                //游戏结束
                gameover=true
            })
        }else{  //游戏已经结束，重新开始
            var isTrue=window.confirm('是否重新开始游戏!')
            if(isTrue){ //重新开始的操作
                //字典初始化
                initCreate()
                //显示初始化图片
                initImgDOM.style.opacity='100%'
                //隐藏结果图片
                resultImgDOM.style.opacity='0'
                //移除过渡属性和
                panelDOM.style.transition='none'
                panelDOM.style.transform='rotate(0)'
                //游戏开始状态
                gameover=false
            }else{
                return 
            }

        }
    }

    //事件监听函数
    function initEvent(){
        panelDOM.addEventListener('click',getResult)
    }

    //入口函数
    function init(){
        initEvent()
        initCreate()
    }

    init()
})()
