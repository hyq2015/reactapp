import React,{Component} from 'react';
import {Link} from 'react-router';
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
            {this.props.canInput ? '' : <Link className="input-shade" to="search"></Link>}
            <span className="icon-yw_icon_search iconfont"></span>
            <form action="javascript:return true;" className="input-form">
              <input readOnly={this.props.canInput ? false : 'readonly'} className="txt" type="search" placeholder="目的地/景点/农庄/特产"/>
            </form>
          </div>
        <div className="mall-left-part" onClick={this.props.switchSearchType}>
          {this.props.canInput ? <span className="cancel-btn" onClick={()=>window.history.go(-1)}>取消</span> : 
            <div><span className="city-name">{this.props.type ? '全部' : '精选'}</span><span className={this.props.type ? 'icon-shop_icon_all iconfont' : 'icon-shop_icon_jx iconfont'}></span></div>
          }
        </div>
      </div>
    )
  }
}