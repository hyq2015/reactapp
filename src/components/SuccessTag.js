import React,{Component} from 'react';
const styleObj={
    backgroundColor:'#fff',textAlign:'center',padding:'20px 0 30px 0',overflow:'hidden'
}
const iconStyleObj={
    fontSize:55,color:'#00c8fb'
}
 const SuccessTag=(txt,func)=>{
    return(
        <div className="top-container" style={styleObj}>
            <span className="iconfont icon-gou" style={iconStyleObj}></span>
            <p onClick={()=>func()}>{txt}</p>
        </div>
    )
}
export default SuccessTag