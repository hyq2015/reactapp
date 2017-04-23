import React,{Component} from 'react';
import UserInfo from '../components/UserInfo';
import OrderdetailCard from '../components/OrderdetailCard';
import LoadingToast from '../components/Loading';
import PUBLIC from '../static/js/public';
import _ from 'lodash';
import Dialog from '../components/Dialog';
import ShopNavigator from '../components/ShopNavigator';
import ConfirmOrderPhone from '../components/ConfirmOrderPhone';
import {FooterBtns} from '../components/CommonComponent';
import 'babel-polyfill';
import ConfirmorderStore from '../stores/ConfirmorderStore';
import ConfirmorderActions from '../actions/ConfirmorderActions';
import AppActions from '../actions/AppActions';
const numberReg=/^1[3|4|5|7|8][0-9]{9}$/;
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
            allNeedPay:'',
            shopnavShow:false,
            activeOrder:{},
            userPhone:'',
            loadingToastShow:false,
            orderCreated:false,
            orderPayId:''
        };
        this._loadData=this._loadData.bind(this);
        this.changeAddress=this.changeAddress.bind(this);
        this.cancelEvent=this.cancelEvent.bind(this);
        this.confirmEvent=this.confirmEvent.bind(this);
        this.submitCase=this.submitCase.bind(this);
        this.contactShop=this.contactShop.bind(this);
        this.hideFade=this.hideFade.bind(this);
        this.navToMap=this.navToMap.bind(this);
        this.inputPhone=this.inputPhone.bind(this);
    }
    componentWillMount(){
        
        AppActions.disabletab();
    }
    componentDidMount(){
        PUBLIC.wxSetTitle('确认订单');
        this.unsubscribe = ConfirmorderStore.listen(function(state) {
            this.setState(state);
            if(state.needAddress && !state.hasAddress){
                this.setState({
                    needSetAddress:true
                })
            }
            if(state.orderCreated){
                if(this.state.orders.length>1){
                    this.context.router.replace('orders');
                }else{
                    this.context.router.replace('order/pay?id='+state.orderPayId)
                }
            }
        }.bind(this));

        /*
        load user from server
        */
        let userLoginStatus=PUBLIC.LoadUser().then((res)=>{
            if(res){
                this._loadData();
            }
        })
        
        if(window.sessionStorage.user && JSON.parse(window.sessionStorage.user).mobilePhone){
            this.setState({
                userPhone:JSON.parse(window.sessionStorage.user).mobilePhone
            })
        }
        
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
        let submitData={};
        let submitItems=[];
        let originOrder=_.clone(this.state.orders);
        for(let item of originOrder){
            for(let single of item.selectItems){
                let obj={};
                obj.amount=single.amount
                obj.productId=single.product.id;
                obj.scale=single.scale;
                obj.shoppingCardItemId=single.shopCardItemId ? single.shopCardItemId : '';
                submitItems.push(obj);

            }
        }
        submitData.items=submitItems;
        if(this.state.needAddress){
            if(this.state.currentAddress.id){
                submitData.addressId=this.state.currentAddress.id;
            }else{
                alert('没有设置收货地址');
                return
            }
            
        }else{
            if(this.state.userPhone && !numberReg.test(this.state.userPhone)){
                alert('手机号码格式错误');
                return
            }else if(numberReg.test(this.state.userPhone)){
                submitData.mobile=this.state.userPhone;
            }else if(!numberReg.test(this.state.userPhone)){
                submitData.mobile='';
            }
        }
        this.setState({
            loadingToastShow:true
        })
        ConfirmorderActions.createOrder(submitData,this.state)

    }
    contactShop(order){
         this.setState({
            activeOrder:order,
            shopnavShow:true
        })
    }
    hideFade(){
        this.setState({
            shopnavShow:false
        })
    }
    navToMap(){
        console.log('地图')
    }
    inputPhone(e){
        this.setState({
            userPhone:e.target.value
        })
    }
    render(){
        return(
            <div id="ConfirmOrderContainer" style={{paddingBottom:50}}>
                
                {this.state.hasAddress && this.state.needAddress ? 
                    <UserInfo changeAddress={this.changeAddress} canchange={true} 
                    name={this.state.currentAddress.receiverName} 
                    phone={this.state.currentAddress.receiverPhone} 
                    address={this.state.currentAddress.province+this.state.currentAddress.city+this.state.currentAddress.area+this.state.currentAddress.receiverAddress}/>
                : <ConfirmOrderPhone phone={this.state.userPhone} inputPhone={this.inputPhone}/>
                }
                {this.state.needSetAddress ? <Dialog confirmEvent={this.confirmEvent} cancelEvent={this.cancelEvent} title="你还没有设置收货地址,请设置地址"/> : 
                    this.state.orders.map((item,index)=>
                        <OrderdetailCard contactShop={this.contactShop} key={`${"father"+index}`} order={item} orderItem={item.selectItems}/>
                    )
                }
                {FooterBtns(PUBLIC.transformCharge(this.state.allNeedPay),'无优惠折扣','去支付',this.submitCase)}
                {this.state.shopnavShow ? 
                    <ShopNavigator 
                        hideFade={this.hideFade} 
                        shopname={this.state.activeOrder.shop ? this.state.activeOrder.shop.name : ''}
                        address={this.state.activeOrder.shop ? this.state.activeOrder.shop.address : ''}
                        navToMap={this.navToMap}
                        shopPhone={this.state.activeOrder.shop ? this.state.activeOrder.shop.contactPhone : ''}
                        /> : ''}
                {this.state.loadingToastShow ? LoadingToast('处理中...') : ''}
            </div>
        )
    }
}
ConfirmOrder.contextTypes = {  
    router: React.PropTypes.object
}