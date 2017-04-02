/**
 * Created by admin on 2017/4/2.
 */
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link ,hashHistory } from 'react-router';
import 'babel-polyfill';

import Listcomponent from './components/Listcomponent';
import TestWrapper from './components/Datepicker';


class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
    
    }
  }
  render(){
    
    return (
      <div style={{textAlign:'center',fontSize:20,height:30}}>
        <Link to='play'>游玩</Link>
        <Link to='index'>主页</Link>
        {this.props.children}
      </div>
    );
  }
}

ReactDOM.render(
  (<Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="index" components={TestWrapper} />
      <Route path="play" components={Listcomponent} />
    </Route>
  </Router>),
  document.getElementById('app')
);
