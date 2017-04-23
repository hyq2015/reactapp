import React,{Component} from 'react';
import {render} from 'react-dom';
import { Link} from 'react-router';
import PUBLIC from '../static/js/public';
import MineCard from './MineCard';
import _ from 'lodash';
import 'babel-polyfill';
import MineStore from '../stores/MineStore';
import MineActions from '../actions/MineActions';
import AppActions from '../actions/AppActions';
import '../static/styles/mine.less';
const playStyle={
    minHeight:'calc(100vh - 50px)',
    paddingBottom:50
}
export default class Mine extends Component{
    constructor(props){
        super(props);
        this.state={
            indexData:{
                cardCount:'',
                orderCount:'',
                shoppingCartItemCount:'',
                cardList:[]
            },
            user:{},
            indexLoading:true
        };
        this._addresslist=this._addresslist.bind(this);
        this._init=this._init.bind(this);
        this.goDetail=this.goDetail.bind(this);
    }
    componentWillUnmount() {
      if (_.isFunction(this.unsubscribe)){
        this.unsubscribe();
      }
      this._init();
        
    }

    componentDidMount(){
        document.title="我的";
        if(window.sessionStorage.user){
          this.setState({
                user:JSON.parse(window.sessionStorage.user)
            })
        }
      this.unsubscribe = MineStore.listen(function(state) {
        this.setState(state);
        if(!window.sessionStorage.user){
            this.setState({
                user:state.indexData.user
            })
        }
        
      }.bind(this));
      /*
        load user from server
        */
        let userLoginStatus=PUBLIC.LoadUser().then((res)=>{
            if(res){
                this._fetchData();
            }
        })
    }
    componentDidUpdate(){
        if(!this.state.indexLoading){
            AppActions.loaded();
        }
        
    }
    _init(){
        MineActions.init();
    }
    _fetchData(){
        MineActions.getIndexInfo();
    }
    _addresslist(){
        MineActions.goAddresslist();
    }
    goDetail(id){
        this.context.router.push('card/detail?id='+id)
    }
    render(){
        return(
                <div id="mineContainer" style={playStyle}>
                    {(this.state.loginmsg && this.state.loginmsg=='ok') ? 
                        <div>
                            <div className="topbg">
                                <Link to="address/list" className="set-address" onClick={this._addresslist}>收货地址</Link>
                                <div className="avatar-bg">
                                    <img className="avatar" src={this.state.indexData.user.headimgurl} alt=""/>
                                </div>
                                <div className="username">{this.state.indexData.user.nickname}</div>
                                <div className="navbar">
                                    <nav>
                                        <Link to="shopcar">
                                            <span className="count">{this.state.indexData.shoppingCartItemCount}</span>
                                            <span className="navname">购物车</span>
                                        </Link>
                                    </nav>
                                    <nav className="centerbar">
                                        <Link to="orders">
                                            <span className="count">{this.state.indexData.orderCount}</span>
                                            <span className="navname">订单</span>
                                        </Link>
                                    </nav>
                                    <nav>
                                        <Link to="cards">
                                            <span className="count">{this.state.indexData.cardCount}</span>
                                            <span className="navname">卡券</span>
                                        </Link>
                                    </nav>
                                </div>
                            </div>
                            <div className="pagebd" style={{minHeight:'calc(100vh - 333px)'}}>
                                <section className="pagebd-top">
                                    <div className="recent-card">最近卡券</div>
                                </section>
                                <section className="pagebd-content">
                                    {this.state.indexData.cardList.map((item,index)=>
                                        <MineCard goDetail={this.goDetail} activenav={0} style={{marginBottom:10}} card={item} key={item.id}/>
                                    )}
                                    
                                </section>
                            </div>
                        </div>
                        : ''
                    }
                
            </div>
        
            
        )
    }
}
Mine.contextTypes = {  
    router: React.PropTypes.object
}
