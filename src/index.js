import React,{Component} from 'react';
import 'core-js/fn/object/assign';
import FastClick from 'fastclick';
import PUBLIC from './static/js/public';
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
import OrderPaySuccess from './ordercomponent/OrderPaySuccess';
import Searchpage from './components/Searchpage';
import CarduseSuccess from './components/CarduseSuccess';
import Logistic from './components/Logistic';
import RefundDetail from './components/RefundDetail';

import './static/styles/reset.css';
import { Router, Route, IndexRoute, Link ,hashHistory,browserHistory } from 'react-router';


if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
	}, false);
}

function checkAuth(nextState, replace, next) {
  let AppPathName=nextState.location.pathname;
    if(AppPathName!='/play' && AppPathName!='/mall'){
      if(!window.sessionStorage.user){
        PUBLIC.getUserFromServer();
      }
    }
    next();
  //获取传输过来的数据
  // if (query.qsparam) {
    
  // } else {
  //   replace('/error')
  //   next()
  // }
}
// Render the main component into the dom
class MainApp extends Component{
  render(){
    return(
        <Router history={hashHistory}>
          <Route path="/" component={App}>
            <Route path="play" components={Play} />
            <Route path="mall" components={Mall}/>
            <Route path="mine" components={Mine} onChange={checkAuth}/>
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
            <Route path="order/paysuccess" components={OrderPaySuccess}/>
            <Route path="search" components={Searchpage}/>
            <Route path="logistic" components={Logistic}/>
            <Route path="refund/detail" components={RefundDetail}/>
            
          </Route>
      </Router>
    )
  }
}

ReactDOM.render(<MainApp/>, document.getElementById('app'));
