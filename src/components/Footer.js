import React,{Component} from 'react';
const PUBLIC=require('../static/js/public.js') ;
export default class FooterBtns extends Component{
    constructor(props){
        super(props);
        this.state={
            chooseAll:true
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            chooseAll:nextProps.chooseAll
        })
    }
    render(){
        return(
            <div className="footer_page" id="footerPage">
                <div className="weui-panel weui-panel_access footer-panel">
                    <div className="weui-panel__bd">
                        <div className="weui-cells_checkbox " style={{marginTop: 0}}>
                            <label className="weui-cell weui-check__label" style={{paddingRight: 0}}>
                                {this.props.countShow ? 
                                    <div className="weui-cell__hd">
                                        <input type="checkbox" id="chooseAllitem" className="weui-check" defaultChecked={this.props.chooseAll} onChange={(e)=>this.props.ifChooseAll(e)}/>
                                        <i className="weui-icon-checked" style={{marginTop: -2}}></i>
                                    </div>
                                    :''
                                }
                                
                                <div className="weui-cell__bd">
                                    <a href="javascript:void(0);" className="titleBar">
                                        {this.props.countShow ? <span className="shopName">全选</span> : <span className="shopName"></span>}
                                        <div className="footer-btn-total">
                                            {!this.props.editAllmode ? 
                                                <div className="footer-total-text">
                                                    <div className="totalPay">
                                                        <span>共计：</span>
                                                        <span>¥<span>{PUBLIC.transformCharge(this.props.totalPay)}</span></span>

                                                    </div>
                                                    <div className="text-info">不含运费、优惠折扣</div>
                                                </div>
                                                :''
                                            }
                                            
                                            <div id="check-btn" onClick={this.props.submitCase}>
                                                {this.props.editAllmode ? 
                                                    <span>删除</span> : 
                                                    <span>
                                                        <span>{this.props.submitName}</span>
                                                        {this.props.countShow ? <span>({this.props.totalCount})</span> : ''}
                                                        
                                                    </span>
                                                }

                                            </div>
                                        </div>

                                    </a>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

        </div>
        )
    }
}