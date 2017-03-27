import React,{Component} from 'react';
import {render} from 'react-dom';
import { Link} from 'react-router';
let request=require('../js/request');
import '../styles/play.less';

const playStyle={
    minHeight:'calc(100vh - 49px)'
}
export default class extends Component{
    componentDidMount(){
        this._fetchData()
    }
    _fetchData(){
        request.http.post(request.baseUrl+request.alphaPath.indexData,{}).then((res)=>{
            console.log(res)
        })
    }
    render(){
        return(
            <div id="playContainer" style={playStyle}>
                游玩页面
                </div>
        )
    }
}