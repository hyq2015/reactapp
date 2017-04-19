import React,{Component} from 'react';
import { FinishBtn,aTagBtn } from './CommonComponent';
import '../static/styles/shopnavigator.less';
export default class ShopNavigator extends Component{
    constructor(props){
        super(props);

    }
    render(){
        return(
            <div id="shopnavigator-mask">
                <div className="contact-bg">
                    <p className="shopname">该商品由<span>{this.props.shopname}</span>提供</p>
                    <p className="address-line">地址&nbsp;<span>{this.props.address}</span></p>
                    {FinishBtn('导航',{backgroundColor:'#f9eb56',color:'#000',marginTop:0},this.props.navToMap)}
                    {aTagBtn(this.props.shopPhone,{color:'#fff',backgroundColor:'#3ed850',marginTop:15},'phone')}
                    {aTagBtn('在线咨询',{color:'#fff',backgroundColor:'#00c8fb',marginTop:15},'online')}
                    {FinishBtn('取消',{backgroundColor:'#fff',color:'#000',marginTop:15,border:'1px solid #eee'},this.props.hideFade)}
                </div>
            </div>
        )
    }
}