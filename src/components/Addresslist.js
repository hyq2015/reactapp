import React,{Component} from 'react';
import {render} from 'react-dom';
import { Link} from 'react-router';
import '../static/styles/addresslist.less';
export default class AddressList extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return(
            <div id="addresscontainer">
                <span>地址列表</span>
                <SingleAddress/>
            </div>
        )
    }
}
class SingleAddress extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return(
            <div className="address-panel"></div>
        )
        
    }
}