import React,{Component} from 'react';
import {render} from 'react-dom';
import '../static/styles/iconfont.css';
import '../static/styles/Minecard.less';
export default class MineCard extends Component{
    constructor(props){
        super(props);

    }
    render(){
        let currentTxt='';
        let remindTxt='';
        let dateTxt='';
        let expiryDate='';
        if(this.props.activenav===0){
            currentTxt='当前数量';
            remindTxt='未使用';
            dateTxt='有效期至:';
            expiryDate=this.props.card.expiryDate ? this.props.card.expiryDate : '永久';
        }else if(this.props.activenav===1){
            currentTxt='使用数量';
            remindTxt='已使用';
            dateTxt='使用日期:';
            expiryDate=this.props.card.updateTime;
        }else if(this.props.activenav===2){
            currentTxt='过期数量';
            remindTxt='已过期';
            dateTxt='有效期至:';
            expiryDate=this.props.card.expiryDate ? this.props.card.expiryDate : '永久';
        }
        return(
            <div className="minecard-single" onClick={()=>this.props.goDetail(this.props.card.id)}>
                <div className="minecard-top">
                    <div className={this.props.activenav===0 ? "text-overflow normalBlack" : "text-overflow normalgray"}>{this.props.card.title}</div>
                    <div className={this.props.activenav===0 ? "text-intro normalBlue" : "text-intro normalgray"}>{remindTxt}</div>
                </div>
                <div className="dot-line">
                    <div className="leftcircle"></div>
                    <div className="line"></div>
                    <div className="rightcircle"></div>
                </div>
                <div className="minecard-content">
                    <div className={this.props.activenav===0 ? "iconcircle normalBluebg" : "iconcircle normalgraybg"}>
                        <span className="iconfont icon-youhuiquan" style={{color:'#fff'}}></span>
                    </div>
                    <div className={this.props.activenav===0 ? "carddetail normalstrong" : "carddetail normalgray"}>
                        <div className="detail-content">
                            <div><span>{dateTxt}</span><span>{expiryDate}</span></div>
                            <div><span>商家:</span><span>{this.props.card.shopName}</span></div>
                        </div>
                        <div style={{width:50,textAlign:'center'}}>
                            <div className={this.props.activenav===0 ? "currentnumber normalBlue" : "currentnumber normalgray"}>{this.props.activenav!==1 ? this.props.card.remainAmount : this.props.card.useAmount}</div>
                            <div className="currentnumber-text">{currentTxt}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}