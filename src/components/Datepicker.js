/**
 * Created by admin on 2017/4/2.
 */
/**
 * Created by admin on 2017/4/2.
 */
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link ,hashHistory } from 'react-router';
import Reflux from 'reflux';
import reactMixin from 'react-mixin';
import ListComponent from './Listcomponent';
import 'babel-polyfill';

import MainActions from '../actions/MainActions';
import MainStore from '../stores/MainStore';

import '../static/styles/test.less';

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  
  
  componentWillUnmount() {
    if (_.isFunction(this.unsubscribe))
      this.unsubscribe()
  }
  sayHello(){
    MainActions.add('我是reflux初始版');
  }
  
  render(){
    return (
      <div>
        <ListComponent/>
        <button onClick={this.sayHello.bind(this)}>点击我</button>
        <span>{this.state.grammar}</span>
      </div>
    );
  }
}
reactMixin.onClass(App, Reflux.connect(MainStore));
export default App;
