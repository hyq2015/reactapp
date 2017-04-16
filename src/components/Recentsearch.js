import React,{Component} from 'react';
import '../static/styles/iconfont.css';
import '../static/styles/rencentsearch.less';
import CS from 'classnames';
export default class RecentSearch extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return(
            <div id="recentSearch">
                <p className="searchTitle">大家都在搜</p>
                <ul className="recommendLists clearfloat commonsearch">
                    {this.props.hotsearch.map((item,index)=>{
                        return <li className="recommendItem" key={index}>{item}</li>
                    })}
                    
                </ul>
                <div className="splitline"></div>
                <div className="searchTitle" style={{marginTop:20}}>
                    最近搜索
                    <span className="clearContainer">
                        <span className="iconfont icon-shanchu colorBlue"></span>
                        <span style={{fontSize:12}}>清空历史</span>
                    </span>
                    </div>
                <ul className="recommendLists clearfloat">
                    {this.props.hotsearch.map((item,index)=>{
                        return <li className="recommendItem" key={index}>{item}</li>
                    })}
                    
                </ul>
            </div>
        )
    }
}