import React,{Component} from 'react';
import {render} from 'react-dom';
import { Link} from 'react-router';
import CONFIG from '../static/js/request';
import Mediacard from './Mediacard';
import MallSearchbar from './MallSearchbar';
import Loader from './Loader';
import Iscroll from 'iscroll/build/iscroll-probe';
import 'babel-polyfill';
import MallStore from '../stores/MallStore';
import MallActions from '../actions/MallActions';
import AppActions from '../actions/AppActions';
import { ListView } from 'antd-mobile';
import '../static/styles/mall.less';
const playStyle={
    minHeight:'calc(100vh - 49px)',
    height:'calc(100vh - 49px)'
}
var myScroll=null;
var initState=true;
var bottomState=false;
export default class Mall extends Component{
    constructor(props){
        super(props);
        this.state={
            loadMore:false,
            indexLoading:true,
            itemsChanged:true,
            typeGood:true,
            canload:true,
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
        console.log(111111111)
        myScroll=null;
        document.body.removeEventListener('touchmove',function(e){e.preventDefault()});
    }
    componentDidMount(){
        this.unsubscribe = MallStore.listen(function(state) {
            this.setState(state);
        }.bind(this));
        document.title='商城';
        this._fetchaData({'size':CONFIG.pageSize});
        document.getElementById('mallContainer').addEventListener('touchmove',function(e){e.preventDefault()});
        myScroll =new Iscroll('#mallContainer',{
            preventDefault: false,
            probeType:2,
            zoom:false,
            bounce:false,
            scrollbars:false,
            useTransform:true
        });
        myScroll.on('scroll',this.onScroll);
        myScroll.on('scrollEnd',this.onScrollEnd);
        
    }
    
    componentDidUpdate(){
        if(!this.state.indexLoading){
            AppActions.loaded();
           
        }
        myScroll.refresh();

    }
    switchSearchType(){
        this.setState({
            typeGood:!this.state.typeGood
        })
    }
    _fetchaData(obj){
        MallActions.loadData(obj,this.state.originData);
    }
    onScroll(){
        if(this.state.originData.last){
            if(this.state.loadMore){
                this.setState({
                    loadMore:false
                })
            }
        }
    }
    onScrollEnd(){
        if(Math.abs(myScroll.y)>=Math.abs(myScroll.maxScrollY)-150){
                if(!this.state.originData.last){
                    if(!this.state.loadMore){
                        this.setState({
                            loadMore:true
                        });
                        this._fetchaData({'size':CONFIG.pageSize,'fromId':this.state.originData.content[this.state.originData.content.length-1].id})
                    }
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
            <div id="mallContainer" style={playStyle}>
                <div>
                    <MallSearchbar type={this.state.typeGood} switchSearchType={this.switchSearchType}/>
                    {this.state.originData.content.length>0 ? 
                        this.state.originData.content.map((item,index)=>
                            <Mediacard key={index} imgurl={item.imgurl} proTitle={item.name} desc={item.intro} price={item.price}/>
                        )
                    :''}
                    <Loader loadMore={this.state.loadMore} canload={this.state.canload}/>
                </div>
            </div>
        )
    }
}
