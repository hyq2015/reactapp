import React,{Component} from 'react';
import '../static/styles/ordermediacard.less';
import PUBLIC from '../static/js/public';
export default class OrderdetailMediaCard extends Component{
    constructor(props){
        super(props);
        
    }
    render(){
        return(
            <div className="orderdetail-mediapanel">
                <div className="orderdetail-container">
                    <div className="orderdetail-mediapanel__img" style={{backgroundImage:'url('+(this.props.orderitem.imgurl ? this.props.orderitem.imgurl : this.props.orderitem.product.imgurl)+')'}}></div>
                    <div className="detailLeft">
                        <h4 className="detailName">{this.props.orderitem.name ? this.props.orderitem.name : this.props.orderitem.product.name}</h4>
                        <p className="detailScale">
                            <span>规格：</span>
                            <span>{this.props.scalename}</span>
                        </p>
                    </div>
                    <div className="detail-right">
                        <div className="currentPrice">
                            <span>¥</span><span>{PUBLIC.transformCharge(this.props.scaleprice)}</span>
                        </div>
                        <div className="currentCount">
                            <span>x</span><span>{this.props.orderitem.amount}</span>
                        </div>
                    </div>
                </div>
                {(this.props.productType.toUpperCase()=='CARD' && this.props.cardStatus) ? 
                    <div className="checkCode">
                        <a href="">查看券码</a>
                    </div>
                :''
                }
                
                
            </div>
        )
    }
}