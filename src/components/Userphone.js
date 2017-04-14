import React,{ Component } from 'react';
export default class Userphone extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
        <div style={{padding:15,backgroundColor:'#fff',fontSize:14}}>
            <span>手机号：</span>
            <span style={{color: 'rgb(153, 153, 153)'}}>{this.props.phone}</span>
        </div>
    )
    }
}