import React,{Component} from 'react';
import _ from 'lodash';
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
        OrderpayActions.pay(this.props.location.query.id);
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