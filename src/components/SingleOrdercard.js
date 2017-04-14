import React,{ Component } from 'react';
import PUBLIC from '../static/js/public';
import '../static/styles/singleordercard.less';
export default class SingleOrderCard extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="singleorder-card">
                <div className="shopname-container order-cell">
                    <span className="textoverflow">{this.props.order.shop.name}</span>
                    <span className="blue-font">{this.props.order.statusDesc}</span>
                </div>
                {this.props.order.items.map((item,index)=>
                    <div key={`${'pro'+item.id}`} className="order-mediacell order-cell" onClick={()=>this.props.orderdetail(this.props.order.id)}>
                        <img src={item.imgurl} className="order-img" alt=""/>
                        <div className="order-rightpart">
                            <div className="orderright-top">
                                <div className="order-desc">
                                    <p className="product-name">{this.props.order.title}</p>
                                    <div className="product-scale"><span>套餐：</span><span>{item.scaleDto.name}</span></div>
                                </div>
                                <div className="order-detail">
                                    <div>¥<span>{PUBLIC.transformCharge(item.scaleDto.price)}</span></div>
                                    <div>x<span>{item.amount}</span></div>
                                </div>
                            </div>
                            {this.props.order.status.toUpperCase()!=='TO_PAY' ? 
                                <div style={{marginTop:8}}>
                                    {item.productType.toUpperCase()==='CARD' ? <a onClick={(e)=>this.props.checkCode(e)} className={(item.status && item.status.toUpperCase()==='TO_USE') ? 'checkcode active' : 'checkcode inactive'} data-detail={(item.status && item.status.toUpperCase()==="TO_USE") ? "yes" : "no"}>查看券码</a> : ''}
                                    {(item.productType.toUpperCase()==='GOODS' && item.status && item.status.toUpperCase()!=='TO_RECEIVE') ? <span className="black-font">{item.statusDesc}</span> : ''}
                                    {(item.productType.toUpperCase()==='GOODS' && item.status && item.status.toUpperCase()==='TO_RECEIVE') ? <span onClick={(e)=>this.props.checkLogistic(e,this.props.order.id)} className="checkcode active">查看物流</span> : ''}
                                </div>
                                :''
                            }
                            
                            
                        </div>
                        
                    </div>
                )}
                <div className="order-cell order-totalprice">
                    <span className="total-pay">合计：</span><span>¥<span>{PUBLIC.transformCharge(this.props.order.totalPrice)}</span></span>
                </div>
                {statusName(this.props.order,this.props.deleteOrder)}
                
            </div>
        )
    }
}
const statusName=(order,func)=>{
    let renderBar=false;
    if(order.status.toUpperCase()==='TO_PAY' || order.status.toUpperCase()==='CLOSED' || order.status.toUpperCase()==='SUCCESS'){
        renderBar=true;
    }
    if(renderBar){
        return(
            <div className="order-handlebar">
                    {(order.status.toUpperCase()==='CLOSED' ||  order.status.toUpperCase()==='SUCCESS') ? <a href="javascript:;" className="order-btn" onClick={()=>func(order.id)}>删除订单</a> : ''}
                    {(order.status.toUpperCase()==='TO_PAY') ? <a href="javascript:;" className="order-btn remindshop">付款</a> : ''}
                </div>
        )
    }else{
        return ''
    }
}