import React,{Component} from 'react';
import '../static/styles/orderdetail.less';
import UserInfo from './UserInfo';
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
                items:[]
            }
        };
        this._loadData=this._loadData.bind(this);
        this._setTitle=this._setTitle.bind(this);
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
    render(){
        return(
            <div id="OrderDetailContainer">
                {this.state.originData.logisticsCompany ? 
                    <div className="ponumber">
                        <span>配送方式：</span>
                        <span>{this.state.originData.logisticsCompany}</span>
                        <span style={{marginLeft:10}}>快递单号：</span>
                        <span style={{wordBreak: 'break-all'}}>{this.state.originData.logisticsCode}</span>
                    </div>
                    : (!this.state.needAddress ? <Userphone phone={this.state.originData.customerMobile}/> : '')
                }
                {this.state.needAddress ? 
                    <UserInfo 
                    address={this.state.originData.receiverAddressDto.province+this.state.originData.receiverAddressDto.city+this.state.originData.receiverAddressDto.area+this.state.originData.receiverAddressDto.receiverAddress} 
                    name={this.state.originData.receiverAddressDto.receiverName} 
                    phone={this.state.originData.receiverAddressDto.receiverPhone}
                />
                : ''
                }
                
                <OrderdetailCard order={this.state.originData}/>
                <Ordercode ordercode={this.state.originData.code} submittime={this.state.originData.creation} paytime={this.state.originData.paidTime}/>
            </div>
        )
    }
}