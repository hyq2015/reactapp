import React,{Component} from 'react';
import {render} from 'react-dom';
import { Link} from 'react-router';
import '../styles/play.less';
const playStyle={
    minHeight:'calc(100vh - 49px)'
}
export default class extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div id="playContainer" style={playStyle}>商城页面</div>
        )
    }
}