import React,{Component} from 'react';
import UserInfo from '../components/UserInfo';
import OrderdetailCard from '../components/OrderdetailCard';
import PUBLIC from '../static/js/public';
import Dialog from '../components/Dialog';
import {FooterBtns} from '../components/CommonComponent';
import 'babel-polyfill';
import ConfirmorderStore from '../stores/ConfirmorderStore';
import ConfirmorderActions from '../actions/ConfirmorderActions';
import AppActions from '../actions/AppActions';
export default class ConfirmOrder extends Component{
    constructor(props){
        super(props);
        this.state={
            currentAddress:{},
            indexLoading:true,
            hasAddress:false,
            orders:[],
            needSetAddress:false,
            addressLoaded:false,
            allNeedPay:''
        };
        this._loadData=this._loadData.bind(this);
        this.changeAddress=this.changeAddress.bind(this);
        this.cancelEvent=this.cancelEvent.bind(this);
        this.confirmEvent=this.confirmEvent.bind(this);
        this.submitCase=this.submitCase.bind(this);
    }
    componentWillMount(){
        document.title='确认订单';
        AppActions.disabletab();
    }
    componentDidMount(){
        this.unsubscribe = ConfirmorderStore.listen(function(state) {
            this.setState(state);
            if(state.needAddress && !state.hasAddress){
                this.setState({
                    needSetAddress:true
                })
            }else{

            }
        }.bind(this));
        this._loadData();
        
    }
    
    componentDidUpdate(){
        if(!this.state.indexLoading && this.state.addressLoaded){
            AppActions.loaded();
        }
    }
    componentWillUnmount() {
      if (_.isFunction(this.unsubscribe)){
        this.unsubscribe();
      }
        
    }
    confirmEvent(){
        this.context.router.push('address/add?backorder=1')
    }
    cancelEvent(){
        window.history.go(-1);
    }
    _loadData(){
        let productsIds=this.props.location.query.orders;
        let arr=[];
        if(productsIds){
            if(productsIds.split(':').length>1){
                arr=productsIds.split(':').splice(0,productsIds.split(':').length-1);
            }else{
                arr=productsIds.split(':');
            }

        }
        if(this.props.location.query.addressid){
            ConfirmorderActions.checkAddress(this.props.location.query.addressid);
        }else{
            ConfirmorderActions.checkAddress('none');
        }
        ConfirmorderActions.loadData(arr);
    }
    changeAddress(){
        this.context.router.push('address/list?chooseAdd=1&orders='+this.props.location.query.orders);
    }
    submitCase(){
        console.log('支付')
    }
    render(){
        return(
            <div id="ConfirmOrderContainer" style={{paddingBottom:50}}>
                
                {this.state.hasAddress ? 
                    <UserInfo changeAddress={this.changeAddress} canchange={true} 
                    name={this.state.currentAddress.receiverName} 
                    phone={this.state.currentAddress.receiverPhone} 
                    address={this.state.currentAddress.province+this.state.currentAddress.city+this.state.currentAddress.area+this.state.currentAddress.receiverAddress}/>
                :''
                }
                {this.state.needSetAddress ? <Dialog confirmEvent={this.confirmEvent} cancelEvent={this.cancelEvent} title="你还没有设置收货地址,请设置地址"/> : 
                    this.state.orders.map((item,index)=>
                        <OrderdetailCard key={`${"father"+item.id}`} order={item} orderItem={item.selectItems}/>
                    )
                }
                {FooterBtns(PUBLIC.transformCharge(this.state.allNeedPay),'无优惠折扣','去支付',this.submitCase)}
            </div>
        )
    }
}
ConfirmOrder.contextTypes = {  
    router: React.PropTypes.object
}