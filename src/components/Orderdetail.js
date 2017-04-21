import React,{Component} from 'react';
import '../static/styles/orderdetail.less';
import PUBLIC from '../static/js/public';
import _ from 'lodash';
import ShopNavigator from './ShopNavigator';
import UserInfo from './UserInfo';
import {FooterBtns,TopErrortoast} from '../components/CommonComponent';
import OrderdetailCard from './OrderdetailCard';
import Ordercode from './Ordercode';
import Userphone from './Userphone';
import 'babel-polyfill';
import OrderdetailStore from '../stores/OrderdetailStore';
import OrderdetailActions from '../actions/OrderdetailActions';
import AppActions from '../actions/AppActions';
export default class Orderdetail extends Component{
    constructor(props){
        super(props);
        this.state={
            titleRefreshed:false,
            indexLoading:true,
            needAddress:true,
            originData:{
                receiverAddressDto:{},
                shop:{},
                items:[],
                status:''
            },
            shopnavShow:false,
            shopPhone:''
        };
        this._loadData=this._loadData.bind(this);
        this._setTitle=this._setTitle.bind(this);
        this.changeAddress=this.changeAddress.bind(this);
        this.submitCase=this.submitCase.bind(this);
        this.cardDetail=this.cardDetail.bind(this);
        this.contactShop=this.contactShop.bind(this);
        this.hideFade=this.hideFade.bind(this);
        this.navToMap=this.navToMap.bind(this);
    }
    componentWillMount(){
        AppActions.disabletab();
    }
    componentDidMount(){
        console.log(this.props.location);
        this.unsubscribe = OrderdetailStore.listen(function(state) {
            this.setState(state);
        }.bind(this));
        this._loadData(this.props.location.query.id)
        
    }
    componentDidUpdate(){
        if(!this.state.indexLoading){
            AppActions.loaded();
        }
        this._setTitle();
        
    }
    changeAddress(){
        
    }
    _setTitle(){
        if(!this.state.titleRefreshed && this.state.originData.status){
            switch(this.state.originData.status.toUpperCase()){
                case 'PAID':
                    document.title="已付款订单";
                    break;
                case 'TO_PAY':
                    document.title="待付款订单";
                    break;
                case 'SUCCESS':
                    document.title="已完成订单";
                    break;
                case 'CLOSED':
                    document.title="已关闭订单";
                    break;
                case 'CANCELED':
                    document.title="已取消订单";
                    break;
            }
            this.setState({
                titleRefreshed:true
            })
        }
    }
    componentWillUnmount(){
        if (_.isFunction(this.unsubscribe)){
            this.unsubscribe();
        };
    }
    _loadData(id){
        OrderdetailActions.loadData(id);
    }
    submitCase(){
        this.context.router.push('order/pay?id='+this.state.originData.id)
    }
    cardDetail(id,status){
        if(status.toUpperCase()=='TO_USE'){
            this.context.router.push('card/detail?id='+id)
        }
    }
    contactShop(){
        this.setState({
            shopnavShow:true,
        })
    }
    hideFade(){
         this.setState({
            shopnavShow:false
        })
    }
    navToMap(){
        console.log(this.state.originData.shop.lat,this.state.originData.shop.lng)
    }
    render(){
        return(
            <div id="OrderDetailContainer" style={{paddingBottom:this.state.originData.status.toUpperCase()=='TO_PAY' ? 50 : 0}}>
                {this.state.originData.status.toUpperCase()=='TO_PAY' ? TopErrortoast('付款剩余时间:'+PUBLIC.changeTimestrToHour(this.state.originData.payExpireTime),{textAlign:'center'}) : ''}
                {this.state.originData.logisticsCompany ? 
                    <div className="ponumber">
                        <span>配送方式:</span>
                        <span>{this.state.originData.logisticsCompany}</span>
                        <span style={{marginLeft:10}}>快递单号:</span>
                        <span style={{wordBreak: 'break-all'}}>{this.state.originData.logisticsCode}</span>
                    </div>
                    : (!this.state.needAddress ? <Userphone phone={this.state.originData.customerMobile}/> : '')
                }
                {this.state.needAddress ? 
                    <UserInfo 
                    changeAddress={this.changeAddress}
                    address={this.state.originData.receiverAddressDto.province+this.state.originData.receiverAddressDto.city+this.state.originData.receiverAddressDto.area+this.state.originData.receiverAddressDto.receiverAddress} 
                    name={this.state.originData.receiverAddressDto.receiverName} 
                    phone={this.state.originData.receiverAddressDto.receiverPhone}
                />
                : ''
                }
                
                <OrderdetailCard 
                    order={this.state.originData} 
                    orderItem={this.state.originData.items}
                    cardDetail={this.cardDetail}
                    contactShop={this.contactShop}
                    contactShopShow={true}
                />
                <Ordercode ordercode={this.state.originData.code} submittime={this.state.originData.creation} paytime={this.state.originData.paidTime}/>
                {(this.state.originData.status.toUpperCase()=='TO_PAY' &&  this.state.originData.payExpireTime>Date.now()) ? FooterBtns(PUBLIC.transformCharge(this.state.originData.totalPrice),'无优惠折扣','去支付',this.submitCase) : ''}
                {this.state.shopnavShow ? 
                    <ShopNavigator 
                        hideFade={this.hideFade} 
                        shopname={this.state.originData.shop ? this.state.originData.shop.name : ''}
                        address={this.state.originData.shop ? this.state.originData.shop.address : ''}
                        navToMap={this.navToMap}
                        shopPhone={this.state.originData.shop ? this.state.originData.shop.contactPhone : ''}
                        /> : ''}
            </div>
        )
    }
}
Orderdetail.contextTypes = {  
    router: React.PropTypes.object
}