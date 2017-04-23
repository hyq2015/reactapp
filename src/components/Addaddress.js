import React,{Component} from 'react';
import {render} from 'react-dom';
import _ from 'lodash';
import PUBLIC from '../static/js/public';
import AreaPicker from './Areaselect';
import '../static/styles/weui.css';
import '../static/styles/iconfont.css';
import '../static/styles/addaddress.less';
import CS from 'classnames';
import 'babel-polyfill';
import AddaddressStore from '../stores/AddaddressStore';
import AddaddressActions from '../actions/AddaddressActions';
import AppActions from '../actions/AppActions';
var numberReg=/^1[3|4|5|7|8][0-9]{9}$/;
var singleNumber=/^[0-9]*$/;
const inititalState={
    canSave:false,
    showselect:false,
    errRemind:'手机号格式错误',
    errorShow:false,
    errorToastShow:false,
    receiverArea:'',
    saveAddressSuccess:false,
    addressObj:{
        address:null,
        area:'',
        city:'',
        defaultFlag:false,
        id:null,
        lat:null,
        lng:null,
        province:'',
        receiverAddress:'',
        receiverName:'',
        receiverPhone:'',
        town:''
    }
}
export default class Addaddress extends Component{
    constructor(props){
        super(props);
        this.state={
            canSave:false,
            showselect:false,
            errRemind:'手机号格式错误',
            errorShow:false,
            errorToastShow:false,
            receiverArea:'',
            saveAddressSuccess:false,
            addressObj:{
                address:null,
                area:'',
                city:'',
                defaultFlag:false,
                id:null,
                lat:null,
                lng:null,
                province:'',
                receiverAddress:'',
                receiverName:'',
                receiverPhone:'',
                town:''
            },
            newAddressid:''
        };
        this.handleChange=this.handleChange.bind(this);
        this.handleName=this.handleName.bind(this);
        this.handlePhone=this.handlePhone.bind(this);
        this.handleSwitch=this.handleSwitch.bind(this);
        this._init=this._init.bind(this);
        this.calculateIfsave=this.calculateIfsave.bind(this);
        this.showselect=this.showselect.bind(this);
        this.hideSelect=this.hideSelect.bind(this);
        this.confirmChoose=this.confirmChoose.bind(this);
        this.saveSetting=this.saveSetting.bind(this);
        this.showError=this.showError.bind(this);
        this._fetchData=this._fetchData.bind(this);
       
    }
    componentWillMount(){
        this._init();
    }
    componentWillUnmount() {
     this.setState({
        saveAddressSuccess:false
     });
      if (_.isFunction(this.unsubscribe)){
        this.unsubscribe();
      }
        
    }

    componentDidMount(){
      
      this.unsubscribe = AddaddressStore.listen(function(state) {
        this.setState(state);
      }.bind(this));
      /*
        load user from server
        */
        let userLoginStatus=PUBLIC.LoadUser().then((res)=>{
            if(res){
                if(this.props.location.query.editId){
                    this._fetchData(this.props.location.query.editId);
                }
            }
        })
      
    }
    componentDidUpdate(){
        let thisObj=this;
        if(this.state.saveAddressSuccess){
            setTimeout(function(){
                if(thisObj.props.location.query.backorder && thisObj.props.location.query.backorder==1 && thisObj.state.newAddressid){
                    thisObj.context.router.push('order/confirmorder?addressid='+thisObj.state.newAddressid)
                }else{
                    if(thisObj.props.location.query.chooseAdd && thisObj.props.location.query.orders){
                        thisObj.context.router.push('address/list?chooseAdd='+thisObj.props.location.query.chooseAdd+'&orders='+thisObj.props.location.query.orders)
                    }else{
                        thisObj.context.router.push('address/list')
                    }
                    
                }
                
            },500)
        }
    }
    _fetchData(id){
        AddaddressActions.getAddressDetail(id);
    }
    _init(){
        AppActions.disableLoading();
    }
    calculateIfsave(val,typename){
        if(typename=='address'){
            if(val.length>0 && this.state.addressObj.receiverName.length>0 && this.state.addressObj.receiverPhone.length>0){
                this.setState({
                    canSave:true
                })
            }else{
                this.setState({
                    canSave:false
                })
            }
        }else if(typename=='name'){
            if(val.length>0 && this.state.addressObj.receiverAddress.length>0 && this.state.addressObj.receiverPhone.length>0){
                this.setState({
                    canSave:true
                })
            }else{
                this.setState({
                    canSave:false
                })
            }
        }else if(typename=='phone'){
            if(val.length>0 && this.state.addressObj.receiverAddress.length>0 && this.state.addressObj.receiverName.length>0){
                this.setState({
                    canSave:true
                })
            }else{
                this.setState({
                    canSave:false
                })
            }
        }
        
    }
    handleChange(e){
        let addressObj=this.state.addressObj;
        addressObj.receiverAddress=e.target.value;
        this.setState({
            addressObj:addressObj
        });
        this.calculateIfsave(e.target.value,'address');
    }
    handleName(e){
        let addressObj=this.state.addressObj;
        addressObj.receiverName=e.target.value;
        this.setState({
            addressObj:addressObj
        });
        this.calculateIfsave(e.target.value,'name');
    }
    handlePhone(e){
        let addressObj=this.state.addressObj;
        addressObj.receiverPhone=e.target.value;
        this.setState({
            addressObj:addressObj
        });
        this.calculateIfsave(e.target.value,'phone');
    }
    handleSwitch(e){
        let addressObj=this.state.addressObj;
        addressObj.defaultFlag=!this.state.addressObj.defaultFlag
        this.setState({
            addressObj:addressObj
        })
    }
    showselect(){
        this.setState({
            showselect:true
        })
    }
    hideSelect(){
        this.setState({
            showselect:false
        })
    }
    confirmChoose(province,city,town){
        let addressObj=this.state.addressObj;
        addressObj.province=province;
        addressObj.city=city;
        addressObj.area=town;
        this.setState({
            showselect:false,
            receiverArea:province+' '+city+' '+town,
            addressObj:addressObj
        })
    }
    saveSetting(){
        this.setState({
            saveAddressSuccess:false
        })
        if(!this.state.canSave){
            return
        }else{
            if(!numberReg.test(this.state.addressObj.receiverPhone)){
                this.state.errRemind='手机号格式错误';
                this.showError();
                return;
            }
            if(this.state.addressObj.receiverAddress.length<6){
                this.state.errRemind='详细地址至少6个字符';
                this.showError();
                return;
            }
            
            AddaddressActions.saveAddress(this.state.addressObj);

        }
        
    }
    showError(){
        let thisObj=this;
        this.setState({
            errorShow:true,
            errorToastShow:true
        })
        setTimeout(function(){
            thisObj.setState({
                errorShow:false,
                errorToastShow:false
            })
        },2000)
    }
    
    render(){
        let defaultClass=CS(
            'weui-btn','saveBtn',{'weui-btn_disabled':!this.state.canSave}
        );
        let errorBody=CS(
            'page',{'errorBodyShow':this.state.errorShow,'errorBodyHide':!this.state.errorShow}
        );
        let errorToas=CS(
            'errToast',{'errorToastShow':this.state.errorToastShow,'errorToastHide':!this.state.errorToastShow}
        );
        return(
            <div id="outercontainer">
                <div className={this.state.saveAddressSuccess ? 'successShow' :'hide'}>
                    <div className="weui-mask_transparent" style={{width: '100%',height: '100%'}}></div>
                    <div className="weui-toast" style={{fontSize:14}}>
                        <i className="weui-icon-success-no-circle weui-icon_toast"></i>
                        <p className="weui-toast__content">保存成功</p>
                    </div>
                </div>
                <div id="addaddressContainer" className={errorBody}>
                    <div className={errorToas}><span className="icon-cuowu iconfont"></span><span style={{marginLeft: 5}}>{this.state.errRemind}</span></div>
                    <div className="page__bd">
                        <div className="weui-cells_form weui-cells">
                            <div className="weui-cell">
                                <div className="weui-cell__hd">
                                    <label className="weui-label">收货人</label>
                                </div>
                                <div className="weui-cell__bd">
                                    <input type="text" value={this.state.addressObj.receiverName} onChange={this.handleName} placeholder="名字" className="weui-input"/>
                                </div>
                            </div>
                            <div className="weui-cell">
                                <div className="weui-cell__hd">
                                    <label className="weui-label">手机号码</label>
                                </div>
                                <div className="weui-cell__bd">
                                    <input type="text" maxLength={11} value={this.state.addressObj.receiverPhone} onChange={this.handlePhone} placeholder="11位手机号" className="weui-input"/>
                                </div>
                            </div>
                            <div className="weui-cell weui-cell_vcode">
                                <div className="weui-cell__hd">
                                    <label className="weui-label">收货地址</label>
                                </div>
                                <div className="weui-cell__bd" style={{position:'relative'}}>
                                    <div className="zone" onClick={this.showselect}></div>
                                    <input type="text" placeholder="地区信息" value={this.state.receiverArea} className="weui-input" style={{width:'100%',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}/>
                                </div>
                                <div className="weui-cell__ft">
                                    <button className="weui-vcode-btn" style={{textAlign: 'center',padding: '0 0.6em'}}><span className="cardIcon icon-youwan_icon-ad iconfont" style={{color: '#a2a2a2'}}></span><span style={{color: '#000000',fontFamily: '微软雅黑'}}>定位</span></button>
                                </div>
                            </div>
                            <div className="weui-cell">
                                <div className="weui-cell__bd" style={{position: 'relative'}}>
                                    <textarea value={this.state.addressObj.receiverAddress} onChange={this.handleChange} className="weui-textarea" id="userAddress" placeholder="详细地址(如街道门牌号)" rows="3" style={{fontFamily: '微软雅黑'}}></textarea>
                                    {this.state.addressObj.receiverAddress.length>0 ? <div className="closeBtn" onClick={()=>this.setState({address:'',canSave:false})}>&times;</div> : ''}
                                </div>
                            </div>
                        </div>
                        <div className="weui-cells weui-cells_form" style={{marginTop: '0.5em'}}>
                            <div className="weui-cell weui-cell_switch">
                                <div className="weui-cell__bd">设为默认</div>
                                <div className="weui-cell__ft">
                                    <input className="weui-switch" checked={this.state.addressObj.defaultFlag} onChange={this.handleSwitch} type="checkbox"/>
                                </div>
                            </div>
                        </div>
                        <div style={{padding: '0 15px'}}>
                            <a id="saveBtn"  href="javascript:;" className={defaultClass} onClick={this.saveSetting}>保存</a>
                        </div>
                    </div>
                    <AreaPicker confirm={this.confirmChoose} hideSelect={this.hideSelect} showselect={this.state.showselect} currentActive={8} currentActiveCity={0} currentActiveTown={0}/>
                </div>
            </div>
        )
    }
}
Addaddress.contextTypes = {  
    router: React.PropTypes.object
}