import 'core-js/fn/object/assign';
import FastClick from 'fastclick';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import Play from './components/Play';
import Mall from './components/Mall';
import Mine from './components/Mine';
import AddressList from './components/AddressList';
import Addaddress from './components/Addaddress';
import Shopcar from './components/Shopcar';
import Myorders from './components/Myorders';
import Mycard from './components/Mycards';
import Orderdetail from './components/Orderdetail';
import Carddetail from './components/Carddetail';
import ConfirmOrder from './ordercomponent/ConfirmOrder';
import OrderPay from './ordercomponent/OrderPay';
import Searchpage from './components/Searchpage';
import CarduseSuccess from './components/CarduseSuccess';
import Logistic from './components/Logistic';

import './static/styles/reset.css';
import { Router, Route, IndexRoute, Link ,hashHistory,browserHistory } from 'react-router';


if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
	}, false);
}
// Render the main component into the dom
ReactDOM.render((<Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="play" components={Play} />
      <Route path="mall" components={Mall}/>
      <Route path="mine" components={Mine}/>
      <Route path="address/list" components={AddressList}/>
      <Route path="address/add" components={Addaddress}/>
      <Route path="shopcar" components={Shopcar}/>
      <Route path="orders" components={Myorders}/>
      <Route path="cards" components={Mycard}/>
      <Route path="order/detail" components={Orderdetail}/>
      <Route path="card/detail" components={Carddetail}/>
      <Route path="card/success" components={CarduseSuccess}/>
      <Route path="order/confirmorder" components={ConfirmOrder}/>
      <Route path="order/pay" components={OrderPay}/>
      <Route path="search" components={Searchpage}/>
      <Route path="logistic" components={Logistic}/>
      
    </Route>
</Router>), document.getElementById('app'));
