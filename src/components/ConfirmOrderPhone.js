import React,{Component} from 'react';
import {TopErrortoast} from './CommonComponent';
import '../static/styles/iconfont.css';
import '../static/styles/confirmorderphone.less';
export default class ConfirmOrderPhone extends Component{
    constructor(props){
        super(props)

    }
    render(){
        return(
            <div className="confirmOrderPhone-container">
                {TopErrortoast('请填写手机号码,如订单异常,我们将通过此号码与你联系',{textAlign:'left'})}
                <div className="inputPhoneNumberR">
                    <input type="tel" maxLength={11} value={this.props.phone} onChange={(e)=>this.props.inputPhone(e)}/>
                </div>
            </div>
        )
    }
}