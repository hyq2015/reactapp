/**
 * Created by admin on 2017/4/2.
 */
/**
 * Created by admin on 2017/4/2.
 */
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link ,hashHistory } from 'react-router';
import 'babel-polyfill';

import { DatePicker,List } from 'antd-mobile';
import moment from 'moment';
import { createForm } from 'rc-form';
import 'moment/locale/zh-cn';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';

import MainActions from '../actions/MainActions';
import MainStore from '../stores/MainStore';
import _ from 'lodash';

import 'antd-mobile/dist/antd-mobile.css';
import '../static/styles/test.less';
function onChange(value) {
  console.log('changed', value);
}
const minDate = moment('1990-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const maxDate = moment('2020-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);
console.log(minDate)
const zhNow = moment().locale('zh-cn').utcOffset(8);
class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  componentDidMount() {
    this.unsubscribe = MainStore.listen(function(state) {
      console.log(state);
      this.setState(state)
    }.bind(this))
  }
  
  componentWillUnmount() {
    if (_.isFunction(this.unsubscribe))
      this.unsubscribe()
  }
  sayHello(){
    MainActions.add('我是reflux初始版');
  }
  
  render(){
    const { getFieldProps } = this.props.form;
    return (
      <div>
        <DatePicker
          mode="date"
          title="选择日期"
          extra="可选,小于结束日期"
          {...getFieldProps('time', {
            initialValue: zhNow,
          })}
          minDate={minDate}
          maxDate={maxDate}
        >
          <List.Item arrow="horizontal">日期(CST)</List.Item>
        </DatePicker>
        <button onClick={this.sayHello.bind(this)}>点击我</button>
        <span>{this.state.grammar}</span>
      </div>
    
    
    
    
    );
  }
}
const TestWrapper = createForm()(App);
export default TestWrapper;
