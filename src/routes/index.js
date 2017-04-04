/**
 * Created by admin on 2017/4/4.
 */
import React from 'react';
import { Router, Route, IndexRoute,hashHistory} from 'react-router';
import Frame from '../components/Reduxframe';
import Home from '../components/Reduxhome';
import Detail from '../components/Reduxdetail';
const routes=(
  <Router history={hashHistory}>
    <Route path="/" component={Frame}>
      <IndexRoute  component={Home}/>
      <Route path="/detail/:id" component={Detail}/>
    </Route>
  
  </Router>
);
export default routes;
