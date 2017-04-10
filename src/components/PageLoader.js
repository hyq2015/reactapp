import React,{Component} from 'react';
import {render} from 'react-dom';
import '../static/styles/pageloader.less';
export default class PageLoader extends Component{
    render(){
        return(
            <div className="PageLoadingToast">
                <div className="R-weui-mask_transparent" style={{background: 'rgba(255,255,255,1)',bottom:this.props.pagebottom}}></div>
                <div className="R-weui-toast" style={{background: 'rgba(255,255,255,1)'}}>
                    <i className="R-weui-loading weui-icon_toast"></i>
                    <p className="R-weui-toast__content">努力加载中</p>
                </div>
            </div>
        )
    }
}