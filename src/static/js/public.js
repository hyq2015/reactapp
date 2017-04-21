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
    getUserFromServer: function(){
        let thisObj=this;
        let userLogined=false;
        try{
             XHR(CONFIG.baseUrl+CONFIG.alphaPath.userlogin,{},'get').then((res)=>{
                if(res && res.openid){
                    window.sessionStorage.user=JSON.stringify(res);
                }else{
                    PUBLIC.RedirectToGen();
                }
            })
            
        }catch(err){
            PUBLIC.RedirectToGen();
        }
    }
}
export default PUBLIC
