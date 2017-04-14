import React,{Component} from 'react';
import '../static/styles/loader.less';
export default class Loader extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="bottomloader" id="pageBottomLoader">
                {(this.props.loadMore && !this.props.loading) ? <div style={{height:50,textAlign:'center',lineHeight:'50px',color:'#bbbbbb'}}>上拉加载更多</div> : ''}
                {(this.props.loadMore && this.props.loading) ? <img className="loaderImg" src="../static/images/refreshing.png" alt="" /> : ''}
                {!this.props.loadMore && !this.props.loading ? <div style={{height:50,textAlign:'center',lineHeight:'50px',color:'#bbbbbb'}}>没有更多啦</div> : ''}
                
            </div>
        )
    }
}