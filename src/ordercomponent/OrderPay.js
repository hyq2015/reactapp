import React,{Component} from 'react';
import _ from 'lodash';
import PUBLIC from '../static/js/public';
import 'babel-polyfill';
import OrderpayStore from '../stores/OrderpayStore';
import OrderpayActions from '../actions/OrderpayActions';
export default class OrderPay extends Component{
    constructor(props){
        super(props);
        this.state={
            paySuccess:false,
            payStatus:''
        }
    }
    componentWillMount(){
        document.title="订单支付";
    }
    componentDidMount(){
        this.unsubscribe = OrderpayStore.listen(function(state) {
            this.setState(state);
        }.bind(this));
        /*
        load user from server
        */
        let userLoginStatus=PUBLIC.LoadUser().then((res)=>{
            if(res){
                OrderpayActions.pay(this.props.location.query.id);
            }
        })
         this.context.router.setRouteLeaveHook(this.props.route, (nextLocation)=>{
            if(nextLocation.pathname=='/orders' || nextLocation.pathname=='/order/confirmorder' || nextLocation.pathname=='/order/detail'){
                this.context.router.replace('order/detail?id='+this.props.location.query.id);
            }else{
                return true
            }
        })
        
    }
    componentDidUpdate(){
        if(this.state.paySuccess){
            this.context.router.replace('order/paysuccess?id='+this.props.location.query.id)
        }else if(!this.state.paySuccess && this.state.payStatus=='fail'){
            this.context.router.replace('order/detail?id='+this.props.location.query.id)
        }
    }
    componentWillUnmount() {
        this.setState({
            paySuccess:false
        });
        if (_.isFunction(this.unsubscribe)){
            this.unsubscribe();
        }
        
    }
    render(){
        return(
            <div style={{height:'calc(100vh)',backgroundColor:'#fff'}}></div>
        )
    }
}
OrderPay.contextTypes = {  
    router: React.PropTypes.object
}