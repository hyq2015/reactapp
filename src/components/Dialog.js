import React,{Component} from 'react';
import {render} from 'react-dom';
import '../static/styles/Dialog.less';
export default class Dialog extends Component{
    constructor(props){
        super(props);
        this.state={
            
        };
        
    }
    render(){
        return(
            <div className="js_dialog">
                <div className="weui-mask"></div>
                <div className="weui-dialog">
                    <div className="weui-dialog__hd">
                        <strong className="weui-dialog__title">{this.props.title}</strong>
                    </div>
                    <div className="weui-dialog__ft">
                        <a onClick={this.props.confirmEvent} href="javascript:;" className="weui-dialog__btn weui-dialog__btn_default">{this.props.confirm ? this.props.confirm : '确认'}</a>
                        <a onClick={this.props.cancelEvent} href="javascript:;" className="weui-dialog__btn weui-dialog__btn_primary">{this.props.cancel ? this.props.cancel : '取消'}</a>
                    </div>
                </div>
            </div>
        )
    }
}