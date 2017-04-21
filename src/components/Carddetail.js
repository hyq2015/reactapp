import React,{Component} from 'react';
import '../static/styles/iconfont.css';
import '../static/styles/carddetail.less';
import PUBLIC from '../static/js/public';
import _ from 'lodash';
import LoadingToast from './Loading';
import QRCode from 'qrcode.react';
import ReviseCardCount from './ReviseCardCount';
import 'babel-polyfill';
import CarddetailStore from '../stores/CarddetailStore';
import CarddetailActions from '../actions/CarddetailActions';
import AppActions from '../actions/AppActions';
let qrcodeimgHost='';
let timer=null;
export default class Carddetail extends Component{
    constructor(props){
        super(props);
        this.state={
            originData:{
            },
            drwaimg:false,
            indexLoading:true,
            reviseCard:false,
            showLoading:false,
            qrcodeimg:false
        }
        this._loadData=this._loadData.bind(this);
        this.hideReviser=this.hideReviser.bind(this);
        this.updateUseCount=this.updateUseCount.bind(this);
        this._checkIfcardUsed=this._checkIfcardUsed.bind(this);
    }
    componentWillMount(){
        document.title="卡券详情";
        AppActions.disabletab();
    }
    componentDidMount(){
        if(window.location.host.indexOf('192.168.31.204')!=-1){
            qrcodeimgHost='http://dev.genwoshua.com/alpha/webapp/developversion/cardconfirm/confirm.html'
        }else{
            qrcodeimgHost='http://app.genwoshua.com/alpha/webapp/build/html/cardconfirm/confirm.html'
        }
        this.unsubscribe = CarddetailStore.listen(function(state) {
            this.setState(state);
            if(state.originData.cardDetail && state.originData.secritCode && state.originData.cardDetail.useCount && state.originData.cardDetail.id){
                this.setState({
                    qrcodeimg:qrcodeimgHost+'?pd='+state.originData.secritCode+'&id='+state.originData.cardDetail.id+'&count='+state.originData.cardDetail.useCount
                })
            }
            if(state.cardOverview.isVerify){
                clearInterval(timer);
                this.context.router.replace('card/success?id='+state.cardOverview.cardUseLogId)
            }
            if(state.cardOverview.checkCodeIsExpire || state.cardOverview.ttl<=60){
                this._loadData(this.props.location.query.id)
            }
        }.bind(this));
        this._loadData(this.props.location.query.id);
        timer=setInterval(()=>this._checkIfcardUsed(),5000)
        
    }
    componentDidUpdate(){
        if(!this.state.indexLoading){
            AppActions.loaded();
        }
        
    }
    
    componentWillUnmount(){
        if (_.isFunction(this.unsubscribe)){
            this.unsubscribe();
        };
        clearInterval(timer);
    }
    _checkIfcardUsed(){
        if(this.state.originData.secritCode){
            CarddetailActions.checkCardUsed(this.state.originData.secritCode,this.state)
        }
    }
    _loadData(id){
        CarddetailActions.loadData(id);
    }
    hideReviser(){
        this.setState({
            reviseCard:false
        })
    }
    updateUseCount(count){
        if(count && count>0){
            this.setState({
                showLoading:true
            });
            CarddetailActions.updateCount(this.state.originData.cardDetail.id,count,this.state.originData)
        }
        
    }
    render(){
        return(
            <div id="CarddetailContainer">
                <div className="page-top">
                    <p className="card-name">{this.state.originData.cardDetail ? this.state.originData.cardDetail.shopName : ''}</p>                    <div className="card-mediabox">
                        <img className="cardimg" src={this.state.originData.cardDetail ? this.state.originData.cardDetail.productImgUrl : ''} alt=""/>
                        <div className="card-detail">
                            <p className="card-txt">{this.state.originData.cardDetail ? this.state.originData.cardDetail.title : ''}</p>
                            <p className="pro-scale"><span>规格: </span><span>{this.state.originData.cardDetail ? this.state.originData.cardDetail.scaleDto.name : ''}</span></p>
                            <p className="pro-scale"><span>单价: </span>¥<span>{this.state.originData.cardDetail ? PUBLIC.transformCharge(this.state.originData.cardDetail.scaleDto.price) : ''}</span></p>
                        </div>
                        <span className="iconfont icon-Chevron"></span>
                    </div>
                </div>
                <div className="card-qrcodecontainer">
                    <p style={{textAlign:'center'}}><span style={{fontSize:11,color:'#7b7b7b'}}>密码: </span><span style={{color:'#000',fontSize:20}}>{this.state.originData.secritCode}</span></p>
                    <div className="qrcode-img" id="qrcode-img">
                        {this.state.qrcodeimg ? <QRCode value={this.state.qrcodeimg} size={160} level="L"/> : ''}
                    </div>
                    <p style={{fontSize:10,color:'#bbb',lineHeight:'1.4',textAlign:'center'}}>向商家出示此二维码</p>
                    <p style={{fontSize:10,color:'#bbb',lineHeight:'1.4',textAlign:'center'}}>待商家扫描完成，根据提示完成消费</p>
                    <div className="usecount-container">
                        <span>本次将使用&nbsp;</span>
                        <span className="usecount blue-color">{this.state.originData.cardDetail ? this.state.originData.cardDetail.useCount : ''}</span>
                        <span className="blue-color">&nbsp;张</span>
                        {(this.state.originData.cardDetail && this.state.originData.cardDetail.remainAmount>1) ? <div onClick={()=>{this.setState({reviseCard:true})}} className="reviseCount">修改数量</div> : ''}
                        
                    </div>
                </div>
                <div className="expire-container">
                    <p className="fade-color">
                        <span>有效期: </span>
                        <span>{this.state.originData.cardDetail ? (this.state.originData.cardDetail.expiryDate ? this.state.originData.cardDetail.expiryDate : '永久') : ''}</span>
                    </p>
                    <p className="fade-color">
                        <span>当前剩余: </span>
                        <span>{this.state.originData.cardDetail ? this.state.originData.cardDetail.remainAmount : ''}</span>
                    </p>
                </div>
                <div className="orderinfo-container">
                    <p className="fade-color">订单信息</p>
                    <p className="fade-color">
                        <span>订单号: </span>
                        <span>{this.state.originData.cardDetail ? this.state.originData.cardDetail.orderCode : ''}</span>
                    </p>
                    <p className="fade-color">
                        <span>提交时间: </span>
                        <span>{this.state.originData.cardDetail ? PUBLIC.getSmpFormatDateByLong(this.state.originData.cardDetail.orderCreateTime,true) : ''}</span>
                    </p>
                    <p className="fade-color">
                        <span>付款时间: </span>
                        <span>{this.state.originData.cardDetail ? PUBLIC.getSmpFormatDateByLong(this.state.originData.cardDetail.orderPaidTime,true) : ''}</span>
                    </p>
                    <p className="fade-color">
                        <span>数量: </span>
                        <span>{this.state.originData.cardDetail ? this.state.originData.cardDetail.amount : ''}</span>
                    </p>
                    <p className="fade-color">
                        <span>总价: ¥</span>
                        <span>{this.state.originData.cardDetail ? PUBLIC.transformCharge(this.state.originData.cardDetail.totalPrice) : ''}</span>
                    </p>
                </div>
                {this.state.reviseCard ? <ReviseCardCount updateUseCount={this.updateUseCount} hideReviser={this.hideReviser} maxCount={this.state.originData.cardDetail ? this.state.originData.cardDetail.remainAmount : 0}/> : ''}
                {this.state.showLoading ? LoadingToast('处理中') : ''}
            </div>
        )
    }
}
Carddetail.contextTypes = {  
    router: React.PropTypes.object
}