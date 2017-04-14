import React,{Component} from 'react';
import '../static/styles/orderdetailcard.less';
import OrderdetailMediaCard from './OrderdetailMediaCard';
import PUBLIC from '../static/js/public';
export default class OrderdetailCard extends Component{
    constructor(props){
        super(props);
        
    }
    render(){
        return(
            <div className="userinfo-panel">
                <div className="userinfo__hd">
                    <div className="titleFont">{this.props.order.shop.name}</div>
                    <div className="bluefont">联系商家</div>
                </div>
                {this.props.order.items.map((item,index)=>
                    <OrderdetailMediaCard orderitem={item} key={`${'orderdetail'+item.id}`}/>
                )}
                <div className="totalAmount category">
                    <div style={{float:'right'}}>
                        <span>共计</span>{this.props.order.productCount}<span>件商品</span>
                    </div>
                </div>
                <div className="total-calculate category">
                    <div>合计：</div>
                    <div>¥{PUBLIC.transformCharge(this.props.order.totalPrice)}</div>
                    </div>
            </div>
        )
    }
}