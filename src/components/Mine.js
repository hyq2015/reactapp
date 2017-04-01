import React,{Component} from 'react';
import {render} from 'react-dom';
import { Link} from 'react-router';
import '../static/styles/play.less';
const playStyle={
    minHeight:'calc(100vh - 49px)'
}
export default class extends Component{
    render(){
        return(
            <div id="playContainer" style={playStyle}>我的页面</div>
        )
    }
}
