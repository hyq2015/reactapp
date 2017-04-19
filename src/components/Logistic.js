import React,{Component} from 'react';
import '../static/styles/logistics.less';
import {logisticFootPrint} from './CommonComponent';
import 'babel-polyfill';
import LogisticStore from '../stores/LogisticStore';
import LogisticActions from '../actions/LogisticActions';
import AppActions from '../actions/AppActions';
const styleObg={
    minHeight:'calc(100vh)',
    backgroundColor:'#fff'
}
const logistmsg=[
    {current:true,firstname:'香港',lastname:'铜锣湾',destination:'尖沙咀',date:'2017-03-16 16:42'},
    {current:false,firstname:'香港',lastname:'铜锣湾',destination:'尖沙咀',date:'2017-03-16 16:42'},
    {current:false,firstname:'香港',lastname:'铜锣湾',destination:'尖沙咀',date:'2017-03-16 16:42 2017-03-16 16:42 2017-03-16 16:422017-03-16 16:42'}
]
export default class Logistic extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        document.title="查看物流";
        AppActions.disabletab();
    }
    componentWillUnmount() {
      if (_.isFunction(this.unsubscribe)){
        this.unsubscribe();
      }
    }
    componentDidMount(){
        this.unsubscribe = LogisticStore.listen(function(state) {
            this.setState(state);
        }.bind(this));
        setTimeout(function(){
            AppActions.loaded();
        },500)
    }
    render(){
        return(
            <div id="logisticContainer">
                <div className="logistic-total">
                    <span>配送方式：</span><span>申通快递</span>
                    <span>快递单号：</span><span style={{wordBreak:'break-all'}}>787456465445445</span>
                </div>
                <p className="logistic-txt">物流信息</p>
                <div className="logistic-detail">
                    {
                        logisticFootPrint(logistmsg)
                    }
                </div>
            </div>
        )
    }
}