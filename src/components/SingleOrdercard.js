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
                {this.props.order.items ? this.props.order.items.map((item,index)=>
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
                                    {item.productType.toUpperCase()==='CARD' ? <a onClick={(e)=>this.props.checkCode(e,item.cardId,item.status)} className={(item.status && item.status.toUpperCase()==='TO_USE') ? 'checkcode active' : 'checkcode inactive'}>查看券码</a> : ''}
                                    {(item.productType.toUpperCase()==='GOODS' && item.status && item.status.toUpperCase()!=='TO_RECEIVE') ? <span className="black-font">{item.statusDesc}</span> : ''}
                                    {(item.productType.toUpperCase()==='GOODS' && item.status && item.status.toUpperCase()==='TO_RECEIVE') ? <span onClick={(e)=>this.props.checkLogistic(e,this.props.order.id)} className="checkcode active">查看物流</span> : ''}
                                </div>
                                :''
                            }
                        </div>
                        
                    </div>)
                    :
                    <div className="order-mediacell order-cell" onClick={()=>this.props.orderdetail(this.props.order)}>
                        <img src={this.props.order.imgurl} className="order-img" alt=""/>
                        <div className="order-rightpart">
                            <div className="orderright-top">
                                <div className="order-desc">
                                    <p className="product-name">{this.props.order.title ? this.props.order.title : this.props.order.name}</p>
                                    <div className="product-scale"><span>套餐：</span><span>{this.props.order.scaleDto.name}</span></div>
                                </div>
                                <div className="order-detail">
                                    <div>¥<span>{PUBLIC.transformCharge(this.props.order.scaleDto.price)}</span></div>
                                    <div>x<span>{this.props.order.amount}</span></div>
                                    
                                </div>
                            </div>
                            {this.props.activenav==4 && this.props.order.refundMoney ? <div style={{textAlign:'right',color:'#fc1414',fontSize:14}}><span>退款成功¥</span><span>{PUBLIC.transformCharge(this.props.order.refundMoney)}</span></div> : ''}
                        </div>
                    </div>
                }
                {this.props.activenav!=4 ? 
                    <div className="order-cell order-totalprice">
                        <span className="total-pay">合计：</span><span>¥<span>{PUBLIC.transformCharge(this.props.order.totalPrice)}</span></span>
                    </div>
                    : ''
                }
                
                {this.props.order.status ? statusName(this.props.order,this.props.deleteOrPay) : ''}
                
            </div>
        )
    }
}
const statusName=(order,func)=>{
    let renderBar=false;
    if(order.status.toUpperCase()==='CLOSED' || order.status.toUpperCase()==='SUCCESS'){
        renderBar=true;
    }else if(order.status.toUpperCase()==='TO_PAY' && order.payExpireTime>Date.now()){
        renderBar=true;
    }
    if(renderBar){
        return(
            <div className="order-handlebar">
                    {(order.status.toUpperCase()==='CLOSED' ||  order.status.toUpperCase()==='SUCCESS') ? <a href="javascript:;" className="order-btn" onClick={()=>func(order,'del')}>删除订单</a> : ''}
                    {(order.status.toUpperCase()==='TO_PAY') ? <div><span style={{float:'left'}}><span className="pay-lefttime">付款剩余时间:</span><span className="pay-lefttime">{PUBLIC.changeTimestrToHour(order.payExpireTime)}</span></span><a href="javascript:;" onClick={()=>func(order,'pay')} className="order-btn remindshop">付款</a></div> : ''}
                </div>
        )
    }else{
        return ''
    }
}