import React,{Component} from 'react';
import {FinishBtn , SuccessTag} from './CommonComponent';
import '../static/styles/cardusesuccess.less';
import 'babel-polyfill';
import CardsuccessStore from '../stores/CardsuccessStore';
import CardsuccessActions from '../actions/CardsuccessActions';
import AppActions from '../actions/AppActions';
export default class CarduseSuccess extends Component{
    constructor(props){
        super(props);
        this.state={
            indexLoading:true,
            originData:{}
        }
        this._console=this._console.bind(this);
    }
    componentWillMount(){
        document.title="卡券使用成功";
        AppActions.disabletab();
    }
    componentDidMount(){
        this.unsubscribe = CardsuccessStore.listen(function(state) {
            this.setState(state);
            
        }.bind(this));
        this._loadData(this.props.location.query.id);
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
        CardsuccessActions.loadData(id)
    }
    _console(){
        this.context.router.push('mine')
    }
    render(){
        return(
            <div id="cardUseSuccessContainer">
                {SuccessTag('恭喜你，使用成功',{},{})}
                <div className="card-detailinfo">
                    <p className="fadeTag">
                        <span>卡券：</span><span>{this.state.originData.title}</span>
                    </p>
                    <p className="fadeTag">
                        <span>本次使用数量：</span><span>{this.state.originData.useAmount}</span>
                    </p>
                    <p className="fadeTag">
                        <span>当前剩余数量：</span><span>{this.state.originData.remainAmount}</span>
                    </p>
                    <p className="fadeTag">
                        <span>本次使用时间：</span><span>{this.state.originData.updateTime}</span>
                    </p>
                </div>
                {FinishBtn('完成',{},this._console)}
                
            </div>
        )
    }
}
CarduseSuccess.contextTypes = {  
    router: React.PropTypes.object
}
