import React,{Component} from 'react';
import '../static/styles/iconfont.css';
import PUBLIC from '../static/js/public';
export default class Mediacard extends Component{
    constructor(props){
        super(props);
        this.state={
            
        };
        
    }
    render(){
        return(
            <div className="mediacard" style={{backgroundColor:'#fff',lineHeight:1}}>
                <div style={{width:'calc(100vw)',height:'calc(61.8vw)',backgroundRepeat:'no-repeat',backgroundPosition:'center',backgroundSize:'cover',backgroundImage:'url('+(this.props.imgurl ? this.props.imgurl : '../static/images/loaderr.png')+')'}}></div>
                <div style={{padding:10}}>
                    <p style={{margin:0,maxWidth:'100%',textOverflow:'ellipsis',overflow:'hidden',whiteSpace:'nowrap',color:'#222',fontSize:16}}>{this.props.proTitle}</p>
                    <div style={{marginTop:10,display:'flex'}}>
                        <div style={{color:'#b2b2b2',fontSize:12,flex:4,textOverflow:'ellipsis',overflow:'hidden',whiteSpace:'nowrap',paddingRight:5}}><span className="iconfont icon-shop_icon_ld" style={{fontSize:12}}></span><span style={{marginLeft:6}}>{this.props.desc}</span></div>
                        <div style={{flex:1,textAlign:'right',fontSize:14,color:'#00c8fb'}}>¥{PUBLIC.transformCharge(this.props.price)}</div>
                    </div>
                </div>
                
            </div>
        )
    }
}