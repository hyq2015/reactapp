/**
 * Created by Administrator on 2017/3/31.
 */
import React,{Component} from 'react';
import {render} from 'react-dom';
import '../styles/iconfont.css';
import '../styles/searchbar.less';
export  default class Searchbar extends Component{
  constructor(props){
    super(props);
    this.state={

    }
  }
  render(){
    return(
      <div className="search-bar">
        <div className="left-part">
          <span className="city-name">成都</span>
          <span className="icon-yw_topicon_Chevron iconfont"></span>
        </div>
        <div className="search-btn">
          <span className="icon-yw_icon_search iconfont"></span>
          <span className="txt">按关键字搜索</span>
        </div>
      </div>
    )
  }
}
