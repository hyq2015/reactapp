import React,{Component} from 'react';
import {render} from 'react-dom';
import 'babel-polyfill';
import ShopcarStore from '../stores/ShopcarStore';
import ShopcarActions from '../actions/ShopcarActions';
import AppActions from '../actions/AppActions';
export default class Shopcar extends Component{
    constructor(props){
        super(props);
        this.state={
            indexLoading:true
        }
        this._fetchData=this._fetchData.bind(this);
        this._init=this._init.bind(this);
    }
    componentWillMount(){
        this._init();
    }
    componentWillUnmount() {
        if (_.isFunction(this.unsubscribe)){
            this.unsubscribe();
        }
        
    }
    componentDidMount(){
        this.unsubscribe = ShopcarStore.listen(function(state) {
        this.setState(state);
      }.bind(this));
        this._fetchData();
    }
    componentDidUpdate(){
        if(!this.state.indexLoading){
            AppActions.loaded();
        }
    }
    _fetchData(){
        ShopcarActions.loadData();
    }
    _init(){
        AppActions.disabletab();
    }
    render(){
        return(
            <div>购物车</div>
        )
    }
}