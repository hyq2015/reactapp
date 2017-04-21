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
                    {this.props.contactShopShow ? 
                        <div className="bluefont" onClick={()=>this.props.contactShop(this.props.order)}>联系商家</div>
                        : ''
                    }
                    
                </div>
                {this.props.orderItem.map((item,index)=>
                    <OrderdetailMediaCard 
                    orderitem={item} scalename={item.scaleDto ? item.scaleDto.name : item.product.scaleDtoList[0].name} scaleprice={item.scaleDto ? item.scaleDto.price : item.product.scaleDtoList[0].price} key={`${'orderdetail'+(item.id ? item.id : index)}`}
                    productType={item.productType ? item.productType : item.product.productType}
                    cardStatus={item.status ? item.status : null}
                    cardDetail={(id,status)=>this.props.cardDetail(id,status)}
                    />
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