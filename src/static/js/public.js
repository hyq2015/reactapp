module.exports={
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
    }
}