import React,{Component} from 'react';
import {render} from 'react-dom';
import { Link} from 'react-router';
import '../styles/play.less';

const playStyle={
    minHeight:'calc(100vh - 49px)'
}
export default class extends Component{
    render(){
        return(
            <div id="playContainer" style={playStyle}>
                游玩页面
                
                </div>
        )
    }
}