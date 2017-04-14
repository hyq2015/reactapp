import React,{Component} from 'react';
import '../static/styles/weui.css';
const LoadingToast=(txt)=>{
    return(
        <div id="loadingToast">
            <div className="weui-mask_transparent" style={{width:'100%',height:'100%'}}></div>
            <div className="weui-toast">
                <i className="weui-loading weui-icon_toast"></i>
                <p className="weui-toast__content">{txt}</p>
            </div>
        </div>
    )
}
export default LoadingToast