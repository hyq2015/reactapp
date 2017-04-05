import React,{Component} from 'react';
import {render} from 'react-dom';
import '../static/styles/iconfont.css';
import '../static/styles/Minecard.less';
export default class MineCard extends Component{
    constructor(props){
        super(props);

    }
    render(){
        return(
            <div className="minecard-single">
                <div className="minecard-top">
                    <div className="text-overflow">{this.props.card.title}</div>
                    <div className="text-intro">未使用</div>
                </div>
                <div className="dot-line">
                    <div className="leftcircle"></div>
                    <div className="line"></div>
                    <div className="rightcircle"></div>
                </div>
                <div className="minecard-content">
                    <div className="iconcircle">
                        <span className="iconfont icon-youhuiquan"></span>
                    </div>
                    <div className="carddetail">
                        <div className="detail-content">
                            <div><span>有效期至:</span><span>{this.props.card.expiryDate}</span></div>
                            <div><span>商家:</span><span>{this.props.card.shopName}</span></div>
                        </div>
                        <div style={{width:50,textAlign:'center'}}>
                            <div className="currentnumber">{this.props.card.remainAmount}</div>
                            <div className="currentnumber-text">当前数量</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}