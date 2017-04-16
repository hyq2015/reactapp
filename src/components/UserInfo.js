import React,{Component} from 'react';
import '../static/styles/userinfo.less';
import PUBLIC from '../static/js/public';
export default class UserInfo extends Component{
    constructor(props){
        super(props);
        
    }
    render(){
        return(
            <div onClick={this.props.changeAddress} className={this.props.canchange ? "user-singleAddress changeAddress" : "user-singleAddress"}>
                <div style={{position:'relative'}}>
                    <h4 className="user__title">
                        <span>{this.props.name}</span>
                        <span className="userphone">{PUBLIC.HandlePhone(this.props.phone)}</span>
                    </h4>
                    <p className="user__desc">{this.props.address}</p>
                </div>
            </div>
        )
    }
}