import 'normalize.css/normalize.css';
import '../static/styles/App.css';

import React,{Component} from 'react';
import Tabbar from './Tabbar';
import 'babel-polyfill';
import Reflux from 'reflux';
import reactMixin from 'react-mixin';
import 'babel-polyfill';
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';


class AppComponent extends Component {
  
  constructor(props){
    super(props);
    this.changeTab=this.changeTab.bind(this);
    this.state={
      activebar:2,
      tabshow:true
    }
  }
  componentDidMount(){
        this.checkRoute(this.props.location.pathname);
        // browserHistory.getCurrentLocation().pathname
  }
  
  checkRoute(name){
    switch(name){
            case '/play':
            this.setState({
              activebar:1,
              tabshow:true
            });
            break;
            case '/mall':
            this.setState({
              activebar:2,
              tabshow:true
            });
            break;
            case '/mine':
            this.setState({
              activebar:3,
              tabshow:true
            });
            break;
            case '/address/list':
            this.setState({
              tabshow:false
            })
            break;
        }
  }
  changeTab(index){
    console.log(this.props.location.pathname);
    this.setState({
      activebar:index,
      tabshow:true
    })
  }
  render() {
    return (
      <div className="index" id="index-container">
        {this.props.children}
        {this.state.tabshow ? <Tabbar activetab={this.state.activebar} changeTab={this.changeTab}/> : ''}
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

reactMixin.onClass(AppComponent, Reflux.connect(AppStore));
export default AppComponent;
