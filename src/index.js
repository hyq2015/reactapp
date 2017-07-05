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
function setShare(nextlocation){
  let pathName=nextlocation.location.pathname;
  if(pathName=='play' || pathName=='mine' || pathName=='address/list' || pathName=='address/add' || pathName=='shopcar' || pathName=='orders' || pathName=='cards' || pathName=='order/detail' ||
    pathName=='card/detail' || pathName=='card/success' || pathName=='order/confirmorder' || pathName=='order/pay' || pathName=='order/paysuccess' || pathName=='logistic' ||
    pathName=='refund/detail' || pathName=='search') {
    window.sessionStorage.ShareName=PUBLIC.shareObj.play;
  }else if(pathName=='mall'){
    window.sessionStorage.ShareName=PUBLIC.shareObj.mall;
  }
}
// Render the main component into the dom
class MainApp extends Component{
  render(){
    return(
        <Router history={hashHistory}>
          <Route path="/" component={App}>
            <Route path="play" components={Play} onEnter={(nextlocation)=>setShare(nextlocation)}/>
            <Route path="mall" components={Mall} onEnter={(nextlocation)=>setShare(nextlocation)}/>
            <Route path="mine" onEnter={(nextlocation)=>setShare(nextlocation)} components={Mine}/>
            <Route path="address/list" components={AddressList} onEnter={(nextlocation)=>setShare(nextlocation)}/>
            <Route path="address/add" components={Addaddress} onEnter={(nextlocation)=>setShare(nextlocation)}/>
            <Route path="shopcar" components={Shopcar} onEnter={(nextlocation)=>setShare(nextlocation)}/>
            <Route path="orders" components={Myorders} onEnter={(nextlocation)=>setShare(nextlocation)}/>
            <Route path="cards" components={Mycard} onEnter={(nextlocation)=>setShare(nextlocation)}/>
            <Route path="order/detail" components={Orderdetail} onEnter={(nextlocation)=>setShare(nextlocation)}/>
            <Route path="card/detail" components={Carddetail} onEnter={(nextlocation)=>setShare(nextlocation)}/>
            <Route path="card/success" components={CarduseSuccess} onEnter={(nextlocation)=>setShare(nextlocation)}/>
            <Route path="order/confirmorder" components={ConfirmOrder} onEnter={(nextlocation)=>setShare(nextlocation)}/>
            <Route path="order/pay" components={OrderPay} onEnter={(nextlocation)=>setShare(nextlocation)}/>
            <Route path="order/paysuccess" components={OrderPaySuccess} onEnter={(nextlocation)=>setShare(nextlocation)}/>
            <Route path="search" components={Searchpage} onEnter={(nextlocation)=>setShare(nextlocation)}/>
            <Route path="logistic" components={Logistic} onEnter={(nextlocation)=>setShare(nextlocation)}/>
            <Route path="refund/detail" components={RefundDetail} onEnter={(nextlocation)=>setShare(nextlocation)}/>
            
          </Route>
      </Router>
    )
  }
}

ReactDOM.render(<MainApp/>, document.getElementById('app'));
