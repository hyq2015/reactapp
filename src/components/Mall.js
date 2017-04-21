import React,{Component} from 'react';
import { Link} from 'react-router';
import CONFIG from '../static/js/request';
import PUBLIC from '../static/js/public';
import Mediacard from './Mediacard';
import MallSearchbar from './MallSearchbar';
import Loader from './Loader';
import _ from 'lodash';
import 'babel-polyfill';
import MallStore from '../stores/MallStore';
import MallActions from '../actions/MallActions';
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';
import { ListView } from 'antd-mobile';
import '../static/styles/mall.less';
const playStyle={
    minHeight:'calc(100vh - 49px)',
    paddingBottom:50
}
var myScroll=null;
var initState=true;
var bottomState=false;
var scrollerHeight=0;
const windowHeight=window.innerHeight;
export default class Mall extends Component{
    constructor(props){
        super(props);
        this.state={
            loadMore:true,
            indexLoading:true,
            itemsChanged:true,
            typeGood:true,
            canload:true,
            loading:false,
            originData:{
                content:[],
                last:false
            }
        };
        this.onScroll=this.onScroll.bind(this);
        this.onScrollEnd=this.onScrollEnd.bind(this);
        this._fetchaData=this._fetchaData.bind(this);
        this.switchSearchType=this.switchSearchType.bind(this);
    }
    componentWillMount(){
        MallActions.init();
    }
    componentWillUnmount(){
        if (_.isFunction(this.unsubscribe)){
            this.unsubscribe();
        };
        myScroll=null;
    }
    componentDidMount(){
        this.unsubscribe = MallStore.listen(function(state) {
            this.setState(state);
        }.bind(this));
        document.title='商城';
        this._fetchaData({'size':CONFIG.pageSize});
        document.getElementById('mallContainer').addEventListener('touchmove',this.onScroll);
        document.getElementById('mallContainer').addEventListener('touchend',this.onScrollEnd);
        console.log(AppStore)
        
    }
    
    componentDidUpdate(){
        if(!this.state.indexLoading){
            AppActions.loaded();
        }
        this._refreshScroll();

    }
    _refreshScroll(){
        scrollerHeight=this.refs.scroller.offsetHeight;
    }
    switchSearchType(){
        this.setState({
            typeGood:!this.state.typeGood
        })
    }
    _fetchaData(obj){
        MallActions.loadData(obj,this.state.originData);
    }
    onScroll(e){
        if(this.state.originData.last){
            if(this.state.loadMore){
                this.setState({
                    loadMore:false
                })
            }
        }
    }
    onScrollEnd(e){
        if(document.body.scrollTop>scrollerHeight-windowHeight-150){
            if(!this.state.originData.last && !this.state.loading){
                this.setState({
                    loading:true
                })
                this._fetchaData({'size':CONFIG.pageSize,'fromId':this.state.originData.content[this.state.originData.content.length-1].id})
            }else{
                if(this.state.loadMore){
                    this.setState({
                        loadMore:false
                    })
                }
            }
        }
    }

        
    render(){
        return(
            <div id="mallContainer" style={playStyle} ref="scroller">
                <div>
                    <MallSearchbar canInput={false} type={this.state.typeGood} switchSearchType={this.switchSearchType}/>
                    {this.state.originData.content.length>0 ? 
                        this.state.originData.content.map((item,index)=>
                            <Mediacard key={index} imgurl={item.imgurl} proTitle={item.name} desc={item.intro} price={item.price}/>
                        )
                    :''}
                    <Loader loading={this.state.loading} loadMore={this.state.loadMore} canload={this.state.canload}/>
                </div>
            </div>
        )
    }
}
Mall.contextTypes = {  
    router: React.PropTypes.object.isRequired
};