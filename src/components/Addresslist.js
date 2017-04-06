import React,{Component} from 'react';
import {render} from 'react-dom';
import { Link} from 'react-router';
import '../static/styles/iconfont.css';
import '../static/styles/addresslist.less';
export default class AddressList extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return(
            <div id="addresscontainer">
                <SingleAddress/>
                <Link to="/address/add" className="addaddress">
                    <span className="icon-llalbumshopselectorcreate iconfont"></span>
                    <span className="addtext">新增地址</span>
                </Link>
            </div>
        )
    }
}
class SingleAddress extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return(
            <div className="address-panel">
                <div className="address-box">
                    <h4 className="address-box__title">
                        <span>黄云其</span>
                        <span style={{marginLeft:10}}>180****8805</span>
                    </h4>
                    <p className="address-box__desc">中和镇熊家桥路</p>
                </div>
                <div className="address-box_text">
                    <div className="address-box_text_desc">
                        <div className="editMenuleft">
                            <span className="icon-gou iconfont blueColor"></span>
                            <span style={{marginLeft:2}}>设为默认</span>
                        </div>
                        <div className="editMenuright">
                            <span>
                                <span className="icon-bianji iconfont"></span>
                                <span style={{marginLeft:2}}>编辑</span>
                            </span>
                            <span>
                                <span className="icon-shanchu iconfont" style={{marginLeft:15}}></span>
                                <span style={{marginLeft:2}}>删除</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
        
    }
}