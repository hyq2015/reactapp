import React,{Component} from 'react';
import {render} from 'react-dom';
import { Link} from 'react-router';
import Searchbar from './Searchbar';
import 'babel-polyfill';
import MallStore from '../stores/MallStore';
import MallActions from '../actions/MallActions';
import AppActions from '../actions/AppActions';
import { ListView } from 'antd-mobile';
import '../static/styles/play.less';
const playStyle={
    minHeight:'calc(100vh - 49px)'
}
export default class extends Component{
    constructor(props){
        super(props)
    }
    componentWillMount(){
        MallActions.init();
    }
    componentDidMount(){
        document.title='商城';
        setTimeout(function(){
            AppActions.loaded();
        },2000)
        
    }
    render(){
        return(
            <div id="mallContainer" style={playStyle}>
                <Searchbar/>
            </div>
        )
    }
}
