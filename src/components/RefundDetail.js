import React,{Component} from 'react';
import _ from 'lodash';
import SingleOrderCard from './SingleOrdercard';
import Ordercode from './Ordercode';
import {topTxtReminder,refundDetail} from './CommonComponent';
let orderCodeSty={
    padding:0,margin:0,lineHeight:2
}
export default class RefundDetail extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentDidMount(){
        console.log(this.props.location)
    }
    render(){
        return(
            <div>
                {topTxtReminder("商品已成功退款,请在微信钱包查看退款",{})}
                <SingleOrderCard 
                    orderdetail={()=>{return null}} 
                    deleteOrder={()=>{return null}} 
                    deleteOrPay={()=>{return null}}
                    checkCode={()=>{return null}} 
                    checkLogistic={()=>{return null}} 
                    order={this.props.location.state.order}
                    payMoney={()=>{return null}}
                    activenav={4}
                />
                <div style={{backgroundColor:'#fff',padding:'15px 12px',margin:'10px 0 10px 0',color:'#bbbbbb',fontSize:15}}>
                    <p>售后信息</p>
                    {refundDetail(this.props.location.state.order.afterSaleDetails)}
                </div>
                <div style={{backgroundColor:'#fff',padding:'15px 12px',margin:'10px 0 10px 0',color:'#bbbbbb',fontSize:15}}>
                    <p>订单信息</p>
                    <Ordercode 
                        ordercode={this.props.location.state.order.orderCode} 
                        submittime={this.props.location.state.order.orderCreateTime} 
                        paytime={this.props.location.state.order.orderPaidTime}
                        styleObj={orderCodeSty}
                    />
                </div>
                
            </div>
        )
    }
}