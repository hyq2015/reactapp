import React,{Component} from 'react';
import '../static/styles/orderlist.less';
import Topnavbar from './Topnavbar';
import Loader from './Loader';
import NoDataPage from './NoData';
import SingleOrderCard from './SingleOrdercard';
import CONFIG from '../static/js/request';
import 'babel-polyfill';
import MyorderStore from '../stores/MyorderStore';
import MyorderActions from '../actions/MyorderActions';
import AppActions from '../actions/AppActions';
var myScroll=null;
var scrollerHeight=0;
const windowHeight=window.innerHeight;
const initOrigindata={
    content:[],
    last:false
};
export default class Myorder extends Component{
    constructor(props){
        super(props);
        this.state={
            indexLoading:true,
            loadMore:true,
            canload:true,
            nodata:false,
            loading:false,
            navbars:[
                    {'name':'全部','active':true},
                    {'name':'待付款','active':false},
                    {'name':'已付款','active':false},
                    {'name':'已完成','active':false},
                    {'name':'退款/售后','active':false}
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
        this.orderDetail=this.orderDetail.bind(this);
        this.checkLogistic=this.checkLogistic.bind(this);
    }
    componentWillMount(){
        AppActions.disabletab();
    }
    componentDidMount(){
        document.title='我的订单';
        this.unsubscribe = MyorderStore.listen(function(state) {
            this.setState(state);
        }.bind(this));
        this._loadData({'size':CONFIG.pageSize},this.state.originData);
        document.getElementById('OrderscrollWrapper').addEventListener('touchmove',this.onScroll);
        document.getElementById('OrderscrollWrapper').addEventListener('touchend',this.onScrollEnd);
    }
     _refreshScroll(){
         if(this.refs.scroller){
            scrollerHeight=this.refs.scroller.offsetHeight;
         }
        
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
        if(this.refs.scroller){
            if(document.body.scrollTop>scrollerHeight-windowHeight-150){
                if(!this.state.originData.last && !this.state.loading){
                    this.setState({
                        loading:true
                    })
                    this._loadData({'size':CONFIG.pageSize,'fromId':this.state.originData.content[this.state.originData.content.length-1].id})
                }else{
                    if(this.state.loadMore){
                        this.setState({
                            loadMore:false
                        })
                    }
                }
            }
        }
        
    }
    deleteOrder(orderid){
        MyorderActions.deleteOrder(orderid,this.state.originData)

    }
    orderDetail(id){
        this.context.router.push('order/detail?id='+id)
    }
    componentDidUpdate(){
        if(!this.state.indexLoading){
            AppActions.loaded();
           
        }
        this._refreshScroll();
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
    }
    _loadData(obj,origindata){
        MyorderActions.loadData(obj,origindata);
    }
    _changeNav(item,index){
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
            loading:true,
            nodata:false,
            loadMore:true,
            originData:initOrigindata
        });
        if(this.state.activenav!==index){
            switch(index){
                case 0:
                    this._loadData({'size':CONFIG.pageSize},initOrigindata);
                    break;
                case 1:
                    this._loadData({'size':CONFIG.pageSize,'status':'TO_PAY'},initOrigindata);
                    break;
                case 2:
                    this._loadData({'size':CONFIG.pageSize,'status':'PAID'},initOrigindata);
                    break;
                case 3:
                    this._loadData({'size':CONFIG.pageSize,'status':'SUCCESS'},initOrigindata);
                    break;
                case 4:
                    this._loadData({'size':CONFIG.pageSize,'status':'CLOSED'},initOrigindata);
                    break;
            }
            this.setState({
                activenav:index
            })
        }
    }
    checkCode(e){
        if(e.stopPropagation){
            e.stopPropagation();
        }else{
            e.cancelBubble=true;
        }
        if(e.target.getAttribute('data-detail')=='yes'){
            alert('即将跳转到卡券详情')
        }else{
            alert('不能跳转到卡券详情')
        }
    }
    checkLogistic(e,id){
        if(e.stopPropagation){
            e.stopPropagation();
        }else{
            e.cancelBubble=true;
        }
    }
    render(){
        return(
            <div id="Ordercontainer">
                <Topnavbar navs={this.state.navbars} changeNav={this._changeNav}/>
                <div style={{height:47}}></div>
                {this.state.nodata ? NoDataPage(this.state.activenav,'order') : 
                    <div id="OrderscrollWrapper" ref="scroller" style={{height:'calc(100vh - 58px)'}}>
                    <div>
                        {this.state.originData.content.map((item,index)=>
                            <SingleOrderCard orderdetail={this.orderDetail} deleteOrder={this.deleteOrder} checkCode={this.checkCode} checkLogistic={this.checkLogistic} key={item.id} order={item}/>
                        )}
                        <Loader loading={this.state.loading} loadMore={this.state.loadMore} canload={this.state.canload}/>
                    </div>
                </div>
                }
            </div>
        )
    }
}
Myorder.contextTypes = {  
    router: React.PropTypes.object
}