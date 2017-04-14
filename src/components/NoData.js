import React,{Component} from 'react';
const NoDataPage=(activenav,type)=>{
    let txt='';
    if(type=='order'){
        switch(activenav){
        case 0:
            txt='你还没有订单哦';
            break;
        case 1:
            txt='你还没有未付款订单哦';
            break;
        case 2:
            txt='你还没有已付款订单哦';
            break;
        case 3:
            txt='你还没有交易成功的订单哦';
            break;
        case 4:
            txt='你还没有退款/售后订单哦';
            break;
        }
    }else if(type=='card'){
        switch(activenav){
        case 0:
            txt='你还没有未使用的卡券哦';
            break;
        case 1:
            txt='你还没有已使用的卡券哦';
            break;
        case 2:
            txt='你还没有已过期的卡券哦';
            break;
        }
    }
    return(
        <div id="nodataPage" style={{marginTop:100}}>
            <div style={{marginBottom:15,textAlign:'center'}}>
                <img src="../static/images/order_icon_order_none@2x.png" style={{maxWidth:60}} alt=""/>
            </div>
            <p style={{color:'#7b7b7b',fontSize:16,fontWeight:'400',textAlign:'center'}}>{txt}</p>
        </div>
    )
}
export default NoDataPage