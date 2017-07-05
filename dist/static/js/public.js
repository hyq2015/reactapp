import 'babel-polyfill';
import CONFIG,{XHR} from './request';
//转换时间函数
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
} ;
//转换long型为日期字符串
function getFormatDateByLong(l, pattern) {
    return getFormatDate(new Date(l), pattern);
}
//转换日期对象为日期字符串
function getFormatDate(date, pattern) {
    if (date == undefined) {
        date = new Date();
    }
    if (pattern == undefined) {
        pattern = "yyyy-MM-dd hh:mm:ss";
    }
    return date.format(pattern);
}
function getSmpFormatDate(date, isFull) {
    var pattern = "";
    if (isFull == true || isFull == undefined) {
        pattern = "yyyy-MM-dd hh:mm:ss";
    } else if(isFull==2){
        pattern = "yyyy-MM-dd hh:mm";
    } else if(isFull==5){
        pattern = "hh:mm";
    } else if(isFull==6){
        pattern = "yyyy-MM";
    }
    else {
        pattern = "yyyy-MM-dd";
    }
    return getFormatDate(date, pattern);
}

const PUBLIC={
     /*
        时间戳转换
    */
    getSmpFormatDateByLong:function(date, isFull){
        if(date=='' || date==null){
            return
        }
        return getSmpFormatDate(new Date(date), isFull);
    },
    /*
    * 将手机号中间的数字用****代替
    * */
    HandlePhone:function (value) {
        var newPhone='';
        if(value && value.length==11){
            newPhone=value.substr(0, 3) + '****' + value.substr((value.length) - 4, 5);
        }else if(value){
            newPhone=value;
        }
        return newPhone;
    },
    /*
    * 转换价格为两位小数
    * */
     transformCharge:function(numberCharge) {
        var charge=numberCharge+'';
        var finalCharge=0;
        if(charge){
            if(charge.toString().split('.')[1] && charge.toString().split('.')[1].length>0){
                var decimal=charge.toString().split('.')[1];
                if(decimal.length>2){
                    finalCharge=charge.toString().split('.')[0]+'.'+charge.toString().split('.')[1].substr(0,2)
                }else if(decimal.length==2){
                    finalCharge=charge;
                }else if(decimal.length==1){
                    finalCharge=charge.toString().split('.')[0]+'.'+decimal+'0'
                }
            }else{
                if(charge.toString().indexOf('.')>0){
                    finalCharge=charge.toString()+'00';
                }else{
                    finalCharge=charge.toString()+'.00';
                }

            }
            return finalCharge
        }else{
            return finalCharge
        }

    },
    /*
        收货地址
    */
    getCurrentUserAddress: function(){
        let useraddress=[];
        try{
            const res= XHR(CONFIG.baseUrl+CONFIG.alphaPath.checkUserAddress,{},'get').then((res)=>{
                useraddress=res
            })
            
        }catch(err){
            console.log('请求用户收货地址异常');
        }finally{
            return useraddress
        }
    },

    /*
    将毫秒时间差转换成小时,分
    */
    changeTimestrToHour:function(timestap){
        let now=Date.now();
        let timegap=timestap-now;
        if(timegap>0){
            let hour=Math.floor(timegap/3600000);
            let minitue=Math.ceil((timegap-hour*3600000)/60000);
            return hour+'小时'+minitue+'分';
        }else{
            return '已过期'
        }
        
    },
    /*
    redirect from wechat
    */
    RedirectToGen:function(){
        let locationHref=window.location.href;
        window.location.href='http://'+window.location.host+'/alpha/api/wechat/login?url='+encodeURIComponent(locationHref);
    },
    /*
    getUserFromServer
    */
    getUserFromServer:async function(){
        let thisObj=this;
        let userLogined=false;
        try{
          const res=  await XHR(CONFIG.baseUrl+CONFIG.alphaPath.userlogin,{},'get');
            if(res && res.openid){
                console.log(res)
                window.sessionStorage.user=JSON.stringify(res);
                userLogined=true;
                // window.location.reload();
            }else{
                console.log('start redirect')
                PUBLIC.RedirectToGen();
            }
        }catch(err){
            console.log('start redirect')
            PUBLIC.RedirectToGen();
        }finally{
            return userLogined
        }

    },
    LoadUser:async function(){
        if(window.sessionStorage.user && JSON.parse(window.sessionStorage.user).openid){
            return true
        }else{
            let userLogined=false;
            try{
            const res=await XHR(CONFIG.baseUrl+CONFIG.alphaPath.userlogin,{},'get');
                if(res && res.openid){
                    console.log(res)
                    window.sessionStorage.user=JSON.stringify(res);
                    userLogined=true;
                }else{
                    PUBLIC.RedirectToGen();
                }
            }catch(err){
                PUBLIC.RedirectToGen();
            }finally{
                return userLogined
            }
        }
    },
    wxSetTitle:function(title) {
        document.title = title;
        var mobile = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(mobile)) {
            var iframe = document.createElement('iframe');
            iframe.style.visibility = 'hidden';
            var iframeCallback = function() {
                setTimeout(function() {
                    iframe.removeEventListener('load', iframeCallback);
                    setTimeout(function(){
                        document.body.removeChild(iframe);
                    },0)
                    
                }, 0);
            };
            iframe.addEventListener('load', iframeCallback);
            document.body.appendChild(iframe);
        }
    },
    wxUserSign:async function(){
        try{
            const res=await XHR(CONFIG.baseUrl+CONFIG.alphaPath.userSign,encodeURI(decodeURI(window.location.href)),'post');
            console.log(res);
            if(!isWechat()){
                return
            }else{
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.appId, // 必填，公众号的唯一标识
                    timestamp: res.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.nonceStr, // 必填，生成签名的随机串
                    signature: res.signature, // 必填，签名，见附录1
                    jsApiList: ['openLocation', 'getLocation', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'previewImage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                wx.ready(function() {
                    window.sessionStorage.WechatSupport='ok';
                    // onWechatReady();
                    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                    // if (shareObject != null) {
                    //     wx.onMenuShareAppMessage(shareObject);
                    //     wx.onMenuShareTimeline(shareObject);
                    // }
                    var shareObj=getCurrentShareObj('normal');
                    var shareObj1=getCurrentShareObj('friend');
                    wx.onMenuShareAppMessage(shareObj);//分享给朋友
                    wx.onMenuShareTimeline(shareObj1);//分享到朋友圈
                    wx.onMenuShareQQ(shareObj);//分享到QQ
                    wx.onMenuShareWeibo(shareObj);//分享到腾讯微博
                    wx.onMenuShareQZone(shareObj);//分享到QQ空间
                });
                wx.error(function(result) {
                    window.sessionStorage.WechatSupport='error';
                    console.log('wechat init failed');
                    console.log(result);
                    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                });
            }
        }catch(err){
            window.sessionStorage.WechatSupport='error';
        }finally{
        
        }
    },
    shareObj:{
        'play':'RSharePlay',
        'mall':'RShareMall'
    }
}

function isWechat(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}
function getCurrentShareObj(shareType) {
    var shareObj={type:'link',dataUrl:''};
    if(window.sessionStorage.ShareName){
        let ShareName=window.sessionStorage.ShareName;
        if(ShareName==PUBLIC.shareObj.play){
            if(shareType!='friend'){
                shareObj.desc='慢生活 轻旅游  跟我一起乡村游';
            }
            shareObj.title='成都市跟我耍乡村休闲自驾周边游';
            shareObj.imgUrl='http://'+window.location.host+'/src/images/login_img_logo@1x.png';
            shareObj.link=window.location.host+'/#/play';

        }else if(ShareName=='RShareHot'){
            if(shareType!='friend'){
                shareObj.desc=JSON.parse(window.sessionStorage.ThemeObj).highlight;
            }
            shareObj.title=decodeURI(getQueryStringByName('name'))+'怎么玩';
            shareObj.imgUrl=JSON.parse(window.sessionStorage.ThemeObj).imgurl;
            shareObj.link=window.location.href;
        }else if(ShareName==PUBLIC.shareObj.mall){
            if(shareType!='friend'){
                shareObj.desc='慢生活 轻旅游  跟我一起乡村游';
            }
            shareObj.title='成都市跟我耍乡村休闲自驾周边游';
            shareObj.imgUrl='http://'+window.location.host+'/src/images/login_img_logo@1x.png';
            shareObj.link=window.location.host+'/#/mall';
        }else if(ShareName=='PRODUCT'){
            if(shareType!='friend'){
                // shareObj.desc=JSON.parse(window.sessionStorage.shopObj).highlight;
                if(window.sessionStorage.ActualSlogan){
                    shareObj.desc=window.sessionStorage.ActualSlogan;
                }else{
                    shareObj.desc='这个看起来很好玩，要不要一起去玩啊';
                }

            }
            shareObj.title=JSON.parse(window.sessionStorage.productObj).title;
            shareObj.imgUrl=JSON.parse(window.sessionStorage.productObj).imgurl;
            shareObj.link=window.location.href;
        }else if(ShareName=='SHOP'){
            if(shareType!='friend'){
                shareObj.desc='发现一个好玩的地方，推荐你去玩哦';
            }
            shareObj.title=JSON.parse(window.sessionStorage.shopObj).title;
            shareObj.imgUrl=JSON.parse(window.sessionStorage.shopObj).imgurl;
            shareObj.link=window.location.href;
        }else if(ShareName=='TOTALPRODUCT'){
            if(shareType!='friend'){
                shareObj.desc='发现一个好玩的地方，推荐你去玩哦';
            }
            shareObj.title=JSON.parse(window.sessionStorage.totalObj).name;
            shareObj.imgUrl=JSON.parse(window.sessionStorage.totalObj).imgurl;
            shareObj.link=window.location.host+'/alpha/webapp/developversion/mall/detail/shop.html?shopid='+JSON.parse(window.sessionStorage.totalObj).shopid+'&name='+encodeURI(JSON.parse(window.sessionStorage.totalObj).name);
        }
        console.log(shareObj)
    }
    return shareObj;

}
export default PUBLIC
