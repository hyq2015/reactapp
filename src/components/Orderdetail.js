import React,{Component} from 'react';
import 'babel-polyfill';
import OrderdetailStore from '../stores/OrderdetailStore';
import OrderdetailActions from '../actions/OrderdetailActions';
import AppActions from '../actions/AppActions';
export default class Orderdetail extends Component{
    constructor(props){
        super(props);
        this.state={
            indexLoading:true
        };
        this._loadData=this._loadData.bind(this);
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
            <div>
                <span>订单详情</span>
            </div>
        )
    }
}