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

    }
}