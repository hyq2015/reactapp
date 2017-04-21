import React,{Component} from 'react';
import _ from 'lodash';
import {FinishBtn , SuccessTag} from '../components/CommonComponent';
import {Link} from 'react-router';
import OrderdetailCard from '../components/OrderdetailCard';
import Ordercode from '../components/Ordercode';
import 'babel-polyfill';
import OrderSuccessStore from '../stores/OrderSuccessStore';
import OrderSuccessActions from '../actions/OrderSuccessActions';
import AppActions from '../actions/AppActions';
export default class OrderPaySuccess extends Component{
    constructor(props){
        super(props);
        this.state={
            originData:''
        }
        this.cardDetail=this.cardDetail.bind(this);
        
    }
    componentWillMount(){
        document.title="支付成功";
        AppActions.disabletab();
    }
    componentDidMount(){
        this.unsubscribe = OrderSuccessStore.listen(function(state) {
            this.setState(state);
            
        }.bind(this));
        OrderSuccessActions.loadData(this.props.location.query.id);
    }
    componentDidUpdate(){
        if(!this.state.indexLoading){
            AppActions.loaded();
        }
        
    }
    componentWillUnmount(){
        if (_.isFunction(this.unsubscribe)){
            this.unsubscribe();
        };
    }
    
    cardDetail(id,status){
        if(status.toUpperCase()=='TO_USE'){
            this.context.router.push('card/detail?id='+id)
        }
    }
    render(){
        return(
            <div style={{paddingBottom:50}}>
                {SuccessTag('恭喜你，支付成功',{},{})}
                {this.state.originData ? 
                    <OrderdetailCard 
                        order={this.state.originData} 
                        orderItem={this.state.originData.items}
                        cardDetail={this.cardDetail}
                        contactShopShow={false}
                    /> : ''
                }
                {this.state.originData ? 
                    <Ordercode 
                        ordercode={this.state.originData.code} 
                        submittime={this.state.originData.creation} 
                        paytime={this.state.originData.paidTime}
                    />
                    : ''
                }
                <Link to="play" style={{position:'fixed',bottom:0,left:0,backgroundColor:'#00c8fb',color:'#fff',display:'block',height:50,textAlign:'center',width:'100%',lineHeight:'50px'}}>返回首页</Link>
            </div>
        )
    }
}
OrderPaySuccess.contextTypes = {  
    router: React.PropTypes.object
}