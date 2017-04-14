import React,{Component} from 'react';
import {render} from 'react-dom';
import { Link} from 'react-router';
import _ from 'lodash';
var PUBLIC=require('../static/js/public');
import Dialog from './Dialog';
import CS from 'classnames';
import 'babel-polyfill';
import AddresslistStore from '../stores/AddresslistStore';
import AddresslistActions from '../actions/AddresslistActions';
import AppActions from '../actions/AppActions';
import '../static/styles/iconfont.css';
import '../static/styles/addresslist.less';


export default class AddressList extends Component{
    constructor(props){
        super(props);
        this.state={
            indexData:{},
            indexLoading:true
        };
        this._fetchData=this._fetchData.bind(this);
        this._deleteDialogShow=this._deleteDialogShow.bind(this);
        this._comfirmDelete=this._comfirmDelete.bind(this);
        this._cancelDelete=this._cancelDelete.bind(this);
        this._setDefault=this._setDefault.bind(this);
        this._goAdd=this._goAdd.bind(this);
        this._editAddress=this._editAddress.bind(this);
    }
    componentWillMount(){
        AppActions.disabletab();
    }
    componentWillUnmount() {
      if (_.isFunction(this.unsubscribe)){
        this.unsubscribe();
      }
        
    }

    componentDidMount(){
      this.unsubscribe = AddresslistStore.listen(function(state) {
        this.setState(state);
      }.bind(this));

      this._fetchData();
    }
    componentDidUpdate(){
        if(!this.state.indexLoading){
            AppActions.loaded();
        }
    }
    _deleteDialogShow(id){
        AddresslistActions.deleteDialogShow(id);
    }
    _fetchData(){
        AddresslistActions.getList();
    }
    _comfirmDelete(){
        if(this.state.deleteAddressId){
            AddresslistActions.deleteAddress(this.state.deleteAddressId);
            
        }
        
    }
    _cancelDelete(){
        this.setState({
            dialogShow:false
        })
    }
    _setDefault(id){
        AddresslistActions.setDefault(id);
    }
    _goAdd(){
        this.context.router.push('address/add?name=ricky')
    }
    _editAddress(id){
         this.context.router.push('address/add?editId='+id)
    }
    render(){
        return(
            <div id="addresscontainer">
                {this.state.indexData.addressList && this.state.indexData.addressList.length>0 ? this.state.indexData.addressList.map((item,index)=>
                    <SingleAddress _editAddress={this._editAddress} key={item.id} addressItem={item} del={this._deleteDialogShow} setDefault={this._setDefault}/>
                ) : <Noaddress/>}
                
                <Link onClick={this._goAdd} className="addaddress">
                    <span className="icon-llalbumshopselectorcreate iconfont"></span>
                    <span className="addtext">新增地址</span>
                </Link>
                {this.state.dialogShow ? 
                    <Dialog 
                        title="确认删除该地址吗?" confirm="确认" cancel="取消"
                        confirmEvent={this._comfirmDelete}
                        cancelEvent={this._cancelDelete}
                    /> : ''
                }
                
            </div>
        )
    }
}
AddressList.contextTypes = {  
    router: React.PropTypes.object
}
class SingleAddress extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        let defaultClass=CS(
            'icon-gou','iconfont',{blueColor:this.props.addressItem.defaultFlag}
        );
        return(
            <div className="address-panel">
                <div className="address-box">
                    <h4 className="address-box__title">
                        <span>{this.props.addressItem.receiverName}</span>
                        <span style={{marginLeft:10}}>{PUBLIC.HandlePhone(this.props.addressItem.receiverPhone)}</span>
                    </h4>
                    <p className="address-box__desc">{this.props.addressItem.receiverAddress}</p>
                </div>
                <div className="address-box_text">
                    <div className="address-box_text_desc">
                        <div className="editMenuleft" onClick={()=>this.props.setDefault(this.props.addressItem.id)}>
                            <span className={defaultClass}></span>
                            <span style={{marginLeft:2}}>设为默认</span>
                        </div>
                        <div className="editMenuright">
                            <span onClick={()=>this.props._editAddress(this.props.addressItem.id)}>
                                <span className="icon-bianji iconfont"></span>
                                <span style={{marginLeft:2}}>编辑</span>
                            </span>
                            <span onClick={()=>this.props.del(this.props.addressItem.id)}>
                                <span className="icon-shanchu iconfont" style={{marginLeft:15}}></span>
                                <span style={{marginLeft:2}}>删除</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
        
    }
}
class Noaddress extends Component{
    render(){
        return(
            <div className="noAddress">
                <div className="noaddress_img"></div>
                <div className="noInfo" style={{margin: '10px 0',fontSize: 16}}>没有收货地址</div>
                <div className="noInfo" style={{fontSize: 12}}>点击下方按钮新增</div>
            </div>
        )
    }
}