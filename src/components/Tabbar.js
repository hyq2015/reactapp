/**
 * Created by Administrator on 2017/3/27.
 */
import React,{Component} from 'react';
import {render} from 'react-dom';
import { Link, browserHistory} from 'react-router'

import '../styles/iconfont.css';
import '../styles/Tabbar.less';
export default class Tabbar extends Component{
  constructor(props){
    super(props);
    this.state={
      currentPlayColor:this.props.activetab==1 ? '#00c8f8' : '#a9a9a9',
      currentMallColor:this.props.activetab==2 ? '#00c8f8' : '#a9a9a9',
      currentMineColor:this.props.activetab==3 ? '#00c8f8' : '#a9a9a9',
    }
  }
  componentWillMount(){
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      currentPlayColor:nextProps.activetab==1 ? '#00c8f8' : '#a9a9a9',
      currentMallColor:nextProps.activetab==2 ? '#00c8f8' : '#a9a9a9',
      currentMineColor:nextProps.activetab==3 ? '#00c8f8' : '#a9a9a9',
    });
    return true
  }
  
  render(){
    return(
      <div className="tabBar-container">
          <div className="tab-item">
            <Link to='play'activeStyle={{'color':'red'}} onClick={()=>this.props.changeTab(1)}>
             <span className="tab-img iconfont icon-yw_tabicon-yw_activity" style={{color:this.state.currentPlayColor}}></span>
            <span className="tab-name">游玩</span>
            </Link>
          </div>
           <div className="tab-item">
            <Link to='mall'activeStyle={{'color':'red'}} onClick={()=>this.props.changeTab(2)}>
             <span className="tab-img iconfont icon-yw_tabicon_shop" style={{color:this.state.currentMallColor}}></span>
            <span className="tab-name">商城</span>
            </Link>
          </div>
           <div className="tab-item">
            <Link to='mine'activeStyle={{'color':'red'}} onClick={()=>this.props.changeTab(3)}>
             <span className="tab-img iconfont icon-yw_tabicon_mine" style={{color:this.state.currentMineColor}}></span>
            <span className="tab-name">我的</span>
            </Link>
          </div>
      </div>
    )
  }
}
