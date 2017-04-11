import React,{Component} from 'react';
import '../static/styles/loader.less';
export default class Loader extends Component{
    constructor(props){
        super(props);
        this.state={
            loadingMore:false
            
        };
        
    }
    render(){
        return(
            <div className="bottomloader" id="pageBottomLoader">
                {this.props.loadMore ? <img className="loaderImg" src="../static/images/refreshing.png" alt="" /> : 
                <div style={{height:50,textAlign:'center',lineHeight:'50px',color:'#bbbbbb'}}>没有更多啦</div>
                }
                
            </div>
        )
    }
}