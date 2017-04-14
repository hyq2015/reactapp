import React,{ Component } from 'react';
import PUBLIC from '../static/js/public';
import '../static/styles/ordercode.less';
export default class Ordercode extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
        <div className="order-codeinfo">
            <div className="flexdiv">
                <a className="detailTitle">订单编号：</a>
                <span>{this.props.ordercode}</span>
            </div>
            <div className="flexdiv">
                <a className="detailTitle">提交时间：</a>
                <span>{this.props.submittime}</span>
            </div>
            {this.props.paytime ? 
            <div className="flexdiv">
                <a className="detailTitle">付款时间：</a>
                <span>{PUBLIC.getSmpFormatDateByLong(this.props.paytime)}</span>
            </div>
            :''
            }
            
        </div>
    )
    }
}