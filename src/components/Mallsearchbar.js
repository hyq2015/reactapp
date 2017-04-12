import React,{Component} from 'react';
import '../static/styles/iconfont.css';
import '../static/styles/mallsearch.less';
export  default class MallSearchbar extends Component{
  constructor(props){
    super(props);
    this.state={

    }
  }
  render(){
    return(
       <div className="search-bar" id="mallSearchBar">
          <div className="search-btn">
            <span className="icon-yw_icon_search iconfont"></span>
            <span className="txt">目的地/景点/农庄/特产</span>
          </div>
        <div className="mall-left-part" onClick={this.props.switchSearchType}>
          <span className="city-name">{this.props.type ? '全部' : '精选'}</span>
          <span className={this.props.type ? 'icon-shop_icon_all iconfont' : 'icon-shop_icon_jx iconfont'}></span>
        </div>
      </div>
    )
  }
}