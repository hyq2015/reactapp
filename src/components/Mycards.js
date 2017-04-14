import React,{Component} from 'react';
import '../static/styles/mycard.less';
import Iscroll from 'iscroll/build/iscroll-probe';
import Topnavbar from './Topnavbar';
import Loader from './Loader';
import NoDataPage from './NoData';
import MineCard from './MineCard';
import CONFIG from '../static/js/request';
import 'babel-polyfill';
import MycardStore from '../stores/MycardStore';
import MycardActions from '../actions/MycardActions';
import AppActions from '../actions/AppActions';
var myScroll=null;
const initOrigindata={
    content:[],
    last:false
};
export default class Mycard extends Component{
    constructor(props){
        super(props);
        this.state={
            indexLoading:true,
            loadMore:true,
            canload:true,
            nodata:false,
            loading:false,
            navbars:[
                {'name':'未使用','active':true},
                {'name':'已使用','active':false},
                {'name':'已过期','active':false}
            ],
            originData:{
                content:[],
                last:false
            },
            activenav:0
        };
        this._changeNav=this._changeNav.bind(this);
        this._loadData=this._loadData.bind(this);
        this.onScroll=this.onScroll.bind(this);
        this.onScrollEnd=this.onScrollEnd.bind(this);
        this.checkCode=this.checkCode.bind(this);
        this.deleteOrder=this.deleteOrder.bind(this);
    }
    componentWillMount(){
        AppActions.disabletab();
    }
    componentDidMount(){
        document.title='我的卡券';
        this.unsubscribe = MycardStore.listen(function(state) {
            this.setState(state);
        }.bind(this));
        this._loadData({'size':CONFIG.pageSize,used:false},this.state.originData);
        document.getElementById('CardscrollWrapper').addEventListener('touchmove',function(e){e.preventDefault()});
        myScroll =new Iscroll('#CardscrollWrapper',{
            preventDefault: false,
            mouseWheel:false,
            probeType:2,
            zoom:false,
            bounce:false,
            scrollbars:false,
            useTransform:true
        });
        myScroll.on('scroll',this.onScroll);
        myScroll.on('scrollEnd',this.onScrollEnd);
        
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
            if(!this.state.originData.last && !this.state.loading){
                this.setState({
                    loading:true
                })
                this._loadData({'size':CONFIG.pageSize,'fromId':this.state.originData.content[this.state.originData.content.length-1].id},this.state.originData)
            }else{
                if(this.state.loadMore){
                    this.setState({
                        loadMore:false
                    })
                }
            }
        }
    }
    deleteOrder(orderid){
        MycardActions.deleteOrder(orderid,this.state.originData)

    }
    componentDidUpdate(){
        if(!this.state.indexLoading){
            AppActions.loaded();
           
        }
        myScroll.refresh();
        if(this.state.originData.last){
            if(this.state.loadMore){
                this.setState({
                    loadMore:false
                })
            }
        }else{
            if(!this.state.loadMore){
                this.setState({
                    loadMore:true
                })
            }
        }
    
    }
    componentWillUnmount(){
        if (_.isFunction(this.unsubscribe)){
            this.unsubscribe();
        };
        document.body.removeEventListener('touchmove',function(e){e.preventDefault()});
    }
    _loadData(obj,origindata){
        MycardActions.loadData(obj,origindata);
    }
    _changeNav(item,index){
        console.log(index===0)
        let navs=this.state.navbars;
        for(let [index1,item1] of navs.entries()){
            if(index1!==index){
                item1.active=false;
            }else{
                item1.active=true;
            }
        }
        this.setState({
            navbars:navs,
            nodata:false,
            loadMore:true,
            originData:initOrigindata
        });
        if(this.state.activenav!==index){
            switch(index){
                case 0:
                    this._loadData({'size':CONFIG.pageSize,used:false},initOrigindata);
                    break;
                case 1:
                    this._loadData({'size':CONFIG.pageSize,used:true},initOrigindata);
                    break;
                case 2:
                    this._loadData({'size':CONFIG.pageSize,isExpire:true},initOrigindata);
                    break;
                
            }
            this.setState({
                activenav:index
            })
        }
    }
    checkCode(e){
        if(e.target.getAttribute('data-detail')=='yes'){
            alert('即将跳转到卡券详情')
        }else{
            alert('不能跳转到卡券详情')
        }
    }
    render(){
        return(
            <div id="Cardcontainer">
                <Topnavbar navs={this.state.navbars} changeNav={this._changeNav}/>
                <div style={{height:47}}></div>
                {this.state.nodata ? NoDataPage(this.state.activenav,'card') : 
                    <div id="CardscrollWrapper" style={{height:'calc(100vh - 60px)'}}>
                    <div>
                        {this.state.originData.content.map((item,index)=>
                            <MineCard style={{marginBottom:10}} card={item} key={item.id}/>
                        )}
                        <Loader loadMore={this.state.loadMore} canload={this.state.canload}/>
                    </div>
                </div>
                }
            </div>
        )
    }
}