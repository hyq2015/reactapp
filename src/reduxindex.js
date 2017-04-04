/**
 * Created by admin on 2017/4/4.
 */
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import configureStore from './redux/configureStore';
import DevTools from './redux/Devtool';
import {hashHistory } from 'react-router';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';
import routes from './routes/index';

const store=configureStore();
const history=syncHistoryWithStore(hashHistory,store);

ReactDOM.render(<Provider store={store}>
  <div>
    {routes}
    <DevTools />
  </div>
  
</Provider>,document.getElementById('app'));
