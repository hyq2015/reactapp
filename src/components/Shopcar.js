import React,{Component} from 'react';
import _ from 'lodash';
const PUBLIC=require('../static/js/public.js') ;
import FooterBtns from './Footer';
import Dialog from './Dialog';
import SizeDetail from './SizeDetail';
import '../static/styles/weui.css';
import '../static/styles/shopcar.less';
import '../static/styles/media.css';
import 'babel-polyfill';
import {Link} from 'react-router';
import ShopcarStore from '../stores/ShopcarStore';
import ShopcarActions from '../actions/ShopcarActions';
import AppActions from '../actions/AppActions';
var globalIndex0=0,globalIndex1=0;
export default class Shopcar extends Component{
    constructor(props){
        super(props);
        this.handleSingleChange=this.handleSingleChange.bind(this);
        this.state={
            indexLoading:true,
            totalAmount:0,
            editAll:false,
            shoplist:[],
            ChooseAll:true,
            footerCount:0,
            footerPay:0,
            needAddress:true,
            sizeDetailShow:false,
            sizeDetailObj:{}
        }
        this._fetchData=this._fetchData.bind(this);
        this._init=this._init.bind(this);
        this.switchMode=this.switchMode.bind(this);
        this.ifChooseAll=this.ifChooseAll.bind(this);
        this.handleSingleCount=this.handleSingleCount.bind(this);
        this.hideDialog=this.hideDialog.bind(this);
        this.confirmDialog=this.confirmDialog.bind(this);
        this.closeDetail=this.closeDetail.bind(this);
        this.confirmDetail=this.confirmDetail.bind(this);
        this.showDetail=this.showDetail.bind(this);
        this.submitCase=this.submitCase.bind(this);
        
    }
    componentWillMount(){
        this._init();
    }
    componentWillUnmount() {
        if (_.isFunction(this.unsubscribe)){
            this.unsubscribe();
        }
        
    }
    componentDidMount(){
        this.unsubscribe = ShopcarStore.listen(function(state) {
            this.setState(state);
        }.bind(this));
        this._fetchData();
        document.title="购物车";
        
    }
    
    componentDidUpdate(){
        if(!this.state.indexLoading){
            AppActions.loaded();
        }
    }
    showDetail(index0,index1){
        globalIndex0=index0;
        globalIndex1=index1;
        let sizeDetail={};
        sizeDetail.scales = this.state.shoplist[index0].products[index1].product.scales;
        sizeDetail.name = this.state.shoplist[index0].products[index1].product.name;
        sizeDetail.price = this.state.shoplist[index0].products[index1].scale.price;
        sizeDetail.scaleName = this.state.shoplist[index0].products[index1].scale.name;
        sizeDetail.imgurl = this.state.shoplist[index0].products[index1].product.imgurl;
        this.setState({
            sizeDetailObj:sizeDetail,
            sizeDetailShow:true
        })
    }
    closeDetail(){
        this.setState({
            sizeDetailShow:false
        })
    }
    submitCase(){
        if(this.state.editAll){
            console.log('删除')
        }else{
            let shoplist=this.state.shoplist; 
            let canSubmit=false;
            let productIds='';
            for(let item of shoplist){
                for(let single of item.products){
                    if(single.amount!==0 && single.checked){
                        productIds+=single.id+':';
                        canSubmit=true;
                    }
                }
            }
            if(!canSubmit){
                alert('您还没有选择商品')
            }else{
                this.context.router.push('order/confirmorder?orders='+productIds)
            }
        }
        
    }
    confirmDetail(scale){
        let shoplist=this.state.shoplist;
        shoplist[globalIndex0].products[globalIndex1].scale=scale;
        shoplist[globalIndex0].products[globalIndex1].totalPrice=shoplist[globalIndex0].products[globalIndex1].amount*scale.price;
        this.setState({
            sizeDetailShow:false,
            shoplist:shoplist
        });

    }
    _fetchData(){
        ShopcarActions.loadData();
    }
    _init(){
        AppActions.disabletab();
    }
    handleSingleChange(index0,index1){
        
        let shoplist=this.state.shoplist;
        let boxChooseAll=true;
        shoplist[index0].products[index1].checked=!shoplist[index0].products[index1].checked;
        for(let item of shoplist[index0].products){
            if(!item.checked){
                boxChooseAll=false;
                break;
            }
        }
        shoplist[index0].selectAll=boxChooseAll;
        this.setState({
            shoplist:shoplist
        });
        this.thinkIfSelectAll(shoplist);
        ShopcarActions.calculateFooter(this.state);
    }
    handleSelecBoxItems(index0){
        let shoplist=this.state.shoplist;
        shoplist[index0].selectAll=!shoplist[index0].selectAll;
        for(let item of shoplist[index0].products){
            item.checked=shoplist[index0].selectAll;
        }
        this.setState({
            shoplist:shoplist
        });
        this.thinkIfSelectAll(shoplist);
        ShopcarActions.calculateFooter(this.state);
    }
    thinkIfSelectAll(shoplist){
        let chooseAll=true;
        for(let item of shoplist){
            for(let single of item.products){
                 if(!single.checked){
                    chooseAll=false;
                    break;
                }
            }
           
        }
        document.getElementById('chooseAllitem').checked=chooseAll;
    }
    switchMode(){
        let shoplist=this.state.shoplist;
        if(this.state.editAll){
            for(let item of shoplist){
                item.editMode=false;
            }
        }else{
            for(let item of shoplist){
                item.editMode=true;
            }
        }
        
        this.setState({
            shoplist:shoplist
        });
        ShopcarActions.calculateFooter(this.state);
        ShopcarActions.calculateTopCount(this.state);
        this.setState({
            editAll:!this.state.editAll
        });
    }
    ifChooseAll(e){
        let shoplist=this.state.shoplist;
        if(!e.target.checked){
            for(let item of shoplist){
                item.selectAll=false;
                for(let single of item.products){
                    single.checked=false;
                }
            }
        }else{
            for(let item of shoplist){
                item.selectAll=true;
                for(let single of item.products){
                    single.checked=true;
                }
            }
        }
        this.setState({
            shoplist:shoplist
        });
        ShopcarActions.calculateFooter(this.state);
    }
    handleSingleCount(typename,index0,index1){
        globalIndex0=index0;
        globalIndex1=index1;
        let shoplist=this.state.shoplist;
        if(typename=='minus'){
            if(shoplist[index0].products[index1].amount>1){
                shoplist[index0].products[index1].amount=shoplist[index0].products[index1].amount-1;
                this.setState({
                    shoplist:shoplist
                });
                ShopcarActions.calculateFooter(this.state);
                ShopcarActions.calculateTopCount(this.state);
            }else{
                this.setState({
                    dialogShow:true
                })
            }
            
        }else if(typename=='plus'){
            shoplist[index0].products[index1].amount=shoplist[index0].products[index1].amount+1;
             this.setState({
                shoplist:shoplist
            });
            ShopcarActions.calculateFooter(this.state);
            ShopcarActions.calculateTopCount(this.state);
        }
        
        
    }
    hideDialog(){
        this.setState({
            dialogShow:false
        })
    }
    confirmDialog(){
        let shoplist=this.state.shoplist;
        shoplist[globalIndex0].products[globalIndex1].checked=false;
        shoplist[globalIndex0].products[globalIndex1].amount=0;
        this.setState({
            shoplist:shoplist
        });
        ShopcarActions.calculateFooter(this.state);
        ShopcarActions.calculateTopCount(this.state);
        this.setState({
            dialogShow:false
        });
    }
    render(){
        return(
            <div id="shopcarContainer" className="page">
                {this.state.shoplist.length<1 ? 
                    <div className="page msg_warn js_show" id="noproduct" style={{overflow:'hidden'}}>
                        <div className="weui-msg">
                            <div className="weui-msg__icon-area"><img src="../static/images/order_icon_order_none@2x.png" alt=""/></div>
                            <div className="weui-msg__text-area">
                                <h2 className="weui-msg__title">购物车空空如也</h2>
                            </div>
                            <Link to="mall" className="goshop">逛一逛</Link>
                        </div>
                    </div> :
                    <div>
                <div id="shopcarEdit">
                    <span>购物车</span><span>(<span>{this.state.totalAmount}</span>)</span>
                    <span className="all-edit" onClick={this.switchMode}>{this.state.editAll ? '完成' : '编辑'}</span>
                </div>
                <div className="page__bd">
                    {
                        this.state.shoplist.map((item,index0)=>
                        <div key={index0} className="weui-panel weui-panel_access singleShop" style={{position: "relative"}}>
                            <div className="weui-panel__bd">
                                <div className="weui-cells_checkbox " style={{marginTop: 0}}>
                                    <label className="weui-cell weui-check__label firstLabel">
                                        <div className="weui-cell__hd">
                                            <input type="checkbox" className="weui-check" checked={item.selectAll}  onChange={()=>this.handleSelecBoxItems(index0)}/>
                                            <i className="weui-icon-checked"></i>
                                        </div>
                                        <div className="weui-cell__bd">
                                            <a href="javascript:void(0);" className="titleBar">
                                                <span className="shopName">{item.products[0].product.shop.name}</span>
                                            </a>
                                        </div>
                                    </label>
                                </div>

                                {item.products.map((single,index1)=>{
                                    return single.amount>0 ? 
                                        <div key={single.id} className="weui-cells_checkbox" style={{marginTop: 0}}>
                                            <label className="weui-cell weui-check__label">
                                                <div className="weui-cell__hd">
                                                    <input type="checkbox" checked={single.checked} onChange={()=>this.handleSingleChange(index0,index1)} className="weui-check chooseChildren"/>
                                                    <i className="weui-icon-checked"></i>
                                                </div>


                                                <div className="weui-cell__bd">
                                                    <a href="javascript:void(0);" className="weui-media-box weui-media-box_appmsg"
                                                    style={{paddingLeft: 0}}>
                                                        <div className="weui-media-box__hd">
                                                            <div className="weui-media-box__thumb"
                                                                style={{backgroundImage:'url('+(single.product.imgurl ? single.product.imgurl+'?imageView2/0/w/200' : '../static/images/loaderr.png')+')'}}>
                                                            </div>
                                                        </div>
                                                        {!item.editMode ? 
                                                            <div className="weui-media-box__bd">
                                                                <h4 className="weui-media-box__title">{single.product.name}</h4>
                                                                <p className="weui-media-box__desc"><span>规格：</span><span>{single.scale.name}</span></p>
                                                                <div className="pro-detail">
                                                                    <div style={{width: 80}}>
                                                                        <span>¥<span>{PUBLIC.transformCharge(single.scale.price)}</span></span></div>
                                                                    <div style={{width: 80,marginRight:5,textAlign: 'right',boxSizing: 'border-box'}}>
                                                                        <span>x<span>{single.amount}</span></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        : ''}
                                                        
                                                    </a>
                                                </div>
                                                
                                            </label>

                                            <div className="editMode" style={{width: 'calc(100vw*0.56)',height: '100%',display:item.editMode ? 'block' : 'none'}}>
                                                <div className="editMode-left">
                                                    <div className="flexTop">
                                                        <div className="plus" onClick={()=>this.handleSingleCount('minus',index0,index1)} style={{backgroundColor: '#f2f2f2'}}>-
                                                        </div>
                                                        <div style={{width: '50%',height: '100%',margin: '0 2px'}}>
                                                            <input readOnly="readonly" type="text" style={{width: '100%',border: 'none',textAlign: 'center',height: '100%',color: '#000',fontSize: 14,backgroundColor: '#f7f7f7'}} value={single.amount}/>
                                                        </div>
                                                        <div className="minus" onClick={()=>this.handleSingleCount('plus',index0,index1)} style={{backgroundColor: '#f2f2f2'}}>+</div>
                                                    </div>
                                                    <div className="detail-info" onClick={()=>this.showDetail(index0,index1)}>
                                                        <span className="size-detail">{single.scale.name}</span><span
                                                            className="icon-yw_topicon_Chevron iconfont more"></span><br/>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    : ''
                                     } 
                                    
                                )}
                                

                            </div>
                        </div>
                        )
                    }
                </div>
                <FooterBtns submitCase={this.submitCase} ifChooseAll={this.ifChooseAll} chooseAll={this.state.ChooseAll} editAllmode={this.state.editAll} totalCount={this.state.footerCount} totalPay={this.state.footerPay}/>
                {this.state.dialogShow ? 
                    <Dialog cancelEvent={this.hideDialog} confirmEvent={this.confirmDialog} title="确认删除已选商品吗?"/> : ''
                }
                {this.state.sizeDetailShow ? <SizeDetail imgurl="http://cdn.genwoshua.com/o_1bchpq42iru16o5675luliv6g.jpg" confirmDetail={this.confirmDetail} closeDetail={this.closeDetail} sizeObg={this.state.sizeDetailObj}/> : ''}
                
                </div>
                }
            </div>
            
        )
    }
}
Shopcar.contextTypes = {  
    router: React.PropTypes.object
}