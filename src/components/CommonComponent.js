import React,{Component} from 'react';
import '../static/styles/iconfont.css';
import '../static/styles/commoncomponent.less';
//FinishBtn
const blueColor='#00c8fb';
const FinishBtn_defaultStyle={
        height: 50,display: 'inline-block',width: '100%',boxSizing: 'border-box',
        backgroundColor: blueColor,color: '#fff',textAlign: 'center',
        borderRadius: 4,fontSize: 16,
        marginTop: 40,border: 'none',
        lineHeight:'50px'
    }
export const FinishBtn=(txt,styleoption,callbackFunc)=>{
    let newStyle=Object.assign({},FinishBtn_defaultStyle,styleoption)
        
    return(
        <div style={{padding:'0 12px',textAlign:'center'}}>
            <button style={newStyle} onClick={()=>callbackFunc()}>{txt}</button>
        </div>
    )
}

//atagBtn

export const aTagBtn=(txt,styleoption,type)=>{
    let newStyle=Object.assign({},FinishBtn_defaultStyle,styleoption)
    if(type=='phone'){
        return(
            <div style={{padding:'0 12px',textAlign:'center'}}>
                <a href={`tel://${txt}`} style={newStyle}>联系电话&nbsp;{txt}</a>
            </div>
        )
    }else if(type=='online'){
        return(
            <div style={{padding:'0 12px',textAlign:'center'}}>
                <a href='https://static.meiqia.com/dist/standalone.html?eid=49692' style={newStyle}>{txt}</a>
            </div>
        )
    }
    
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

//logisticFootPrint
export const logisticFootPrint=(stationArr)=>{
    let logistArr=[];
    for(let [index,station] of stationArr.entries()){
        logistArr.push(
            <div key={index} className={station.current ? "singlelogistic logisticCircle-active" : "singlelogistic logisticCircle-inactive"} style={{color:station.current ? '#00c8fb' : '#bbbbbb'}}>
                {'['+station.firstname+'] 快件离开 ['+station.lastname+'] 已发往 ['+station.destination+'] '}
                <br/>{station.date}
            </div>
        )
    }
    
    return logistArr
}

