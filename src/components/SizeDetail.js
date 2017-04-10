import React,{Component} from 'react';
import {render} from 'react-dom';
const PUBLIC=require('../static/js/public.js') ;
export default class SizeDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            currentScale:{}
        }
        this.chooseScale=this.chooseScale.bind(this);
    }
    componentWillMount(){
        for(let item of this.props.sizeObg.scales){
            if(item.name==this.props.sizeObg.scaleName){
                this.setState({
                    currentScale:item
                });
                break;
            }
        }
        
    }
    chooseScale(item){
        this.setState({
            currentScale:item
        })
    }
    
    render(){
        return(
            <div className="js_dialog" id="sizeDetail">
                <div className="weui-mask">
                    <div className="detailArea">
                        <div id="closeDetailFather" onClick={this.props.closeDetail}>
                            <span id="closeDetail" className="iconfont icon-icon25959"
                                style={{fontSize: 20}}></span>
                        </div>

                        <div className="topArea">
                            <div>
                                <div className="weui-media-box__thumb editImg"
                                    style={{backgroundImage:'url('+(this.props.sizeObg.imgurl ? this.props.sizeObg.imgurl+'?imageView2/0/w/200' : '../static/images/loaderr.png')+')'}}
                                    ></div>
                            </div>
                            <div className="rightInfo">
                                <div style={{width: '100%',wordBreak: 'break-all',maxHeight: '2em',overflow: 'hidden',fontSize: 16,lineHeight: 1,paddingTop: 5}}
                                    >{this.props.sizeObg.name}</div>
                                <div className="blueFont"><span>¥</span><span>{PUBLIC.transformCharge(this.state.currentScale.price)}</span></div>
                                <div className="grayFont">已选<span>{this.state.currentScale.name}</span>规格</div>
                            </div>
                        </div>
                        <div className="middleArea">
                            <div className="titleFont">规格</div>
                            <div>
                                {this.props.sizeObg.scales.map((item,index)=>
                                    <a key={index} href="javascript:;" className="sizeMenu active"
                                    className={item.name==this.state.currentScale.name ? 'active sizeMenu ' : 'inactive sizeMenu'}
                                    onClick={()=>this.chooseScale(item)} >{item.name}</a>
                                )}
                                
                            </div>
                        </div>
                        <div className="confirmBtn" onClick={()=>this.props.confirmDetail(this.state.currentScale)}>确认</div>
                    </div>

                </div>

            </div>
        )
    }
}