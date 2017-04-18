import React,{Component} from 'react';
import '../static/styles/iconfont.css';
import '../static/styles/commoncomponent.less';
//FinishBtn
const blueColor='#00c8fb';
const FinishBtn_defaultStyle={
        height: 50,display: 'inline-block',width: '100%',boxSizing: 'border-box',
        backgroundColor: blueColor,color: '#fff',textAlign: 'center',
        borderRadius: 4,fontSize: 16,
        marginTop: 40,border: 'none'
    }
export const FinishBtn=(txt,styleoption,callbackFunc)=>{
    let newStyle=Object.assign({},FinishBtn_defaultStyle,styleoption)
        
    return(
        <div style={{padding:'0 12px',textAlign:'center'}}>
            <button style={newStyle} onClick={()=>callbackFunc()}>{txt}</button>
        </div>
    )
}

//SuccessTag
const SuccessTag_styleObj={
    backgroundColor:'#fff',textAlign:'center',padding:'20px 0 30px 0',overflow:'hidden'
}
const SuccessTag_iconStyleObj={
    fontSize:55,color:'#00c8fb'
}
export const SuccessTag=(txt,outeroption,iconStyle)=>{
    let newStyle=Object.assign({},SuccessTag_styleObj,outeroption)
    let newIconStyle=Object.assign({},SuccessTag_iconStyleObj,iconStyle)
    return(
        <div style={newStyle}>
            <span className="iconfont icon-gou" style={newIconStyle}></span>
            <p>{txt}</p>
        </div>
    )
}

//footerBtns

export const FooterBtns=(totalpay,saleinfo,submitTxt,callbackFunc)=>{
    return(
        <div className="footer-outer">
            <div className="footer-commoncontainer">
            <div className="footer-btn-total">
                <div className="footer-total-text">
                    <div className="totalPay">
                        <span>共计：</span>
                        <span>¥</span><span>{totalpay}</span>
                    </div>
                    <div className="text-info">{saleinfo}</div>
                </div>
                <div className="footersubmit-btn" onClick={()=>callbackFunc()}>{submitTxt}</div>
            </div>
        </div>
        </div>
        
    )
}