import React,{Component} from 'react';
import '../static/styles/iconfont.css';
import '../static/styles/confirmorderphone.less';
export default class ConfirmOrderPhone extends Component{
    constructor(props){
        super(props)

    }
    render(){
        return(
            <div className="confirmOrderPhone-container">
                <div className="phone-toast">
                    <span className="icon-cuowu iconfont"></span>
                    <span style={{marginLeft:5}}>请填写手机号码,如订单异常,我们将通过此号码与你联系</span>
                </div>
                <div className="inputPhoneNumberR">
                    <input type="tel" maxLength={11} value={this.props.phone} onChange={(e)=>this.props.inputPhone(e)}/>
                </div>
            </div>
        )
    }
}