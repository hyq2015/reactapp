
import '../static/styles/Main.less';

import React,{Component,PropTypes } from 'react';
import Tabbar from './Tabbar';
import PUBLIC from '../static/js/public';
import PageLoader from './PageLoader';
import 'babel-polyfill';
import Reflux from 'reflux';
var reactMixin = require('react-mixin');
import 'babel-polyfill';
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';


class AppComponent extends Component {
  
  constructor(props){
    super(props);
    this.changeTab=this.changeTab.bind(this);
    this.state={
      activebar:1,
      tabshow:true,
      loading:true,
      pagebottom:50
    }
    this.checkRoute=this.checkRoute.bind(this);
  }
  componentWillMount(){
      // this.context.router.setRouteLeaveHook(this.props.route.childRoutes[0], (nextLocation)=>{
      //     console.log(nextLocation);
      //     if(nextLocation.pathname=='mine'){
      //       if(!window.sessionStorage.user){
      //         PUBLIC.getUserFromServer();
      //       }
      //     }
      //     //  return true
      // })
  }
  componentDidMount(){
      this.checkRoute(this.props.location.pathname);
      PUBLIC.wxUserSign();
      
      // AppActions.loadUser(this.props.route);
      // window.addEventListener('hashchange', this.checkUserLogined) 
    // const { route } = this.props;
    // const { router } = this.context;
    
        
        // browserHistory.getCurrentLocation().pathname
  }
  
  componentDidUpdate(prevProps) {
    
    if (this.props.location !== prevProps.location) {
        window.scrollTo(0, 0);
    }
    // this.checkUserLogined();

  }
  checkRoute(name){
    switch(name){
            case '/play':{
                this.setState({
                  activebar:1,
                  tabshow:true
                });
                break;
            }
            case '/mall':{
                this.setState({
                  activebar:2,
                  tabshow:true
                });
                break;
            }
              
            case '/mine':{
                this.setState({
                  activebar:3,
                  tabshow:true
                });
                break;
            }
              
            case '/address/list':{
                this.setState({
                  tabshow:false
                })
                break;
            }
              
            case '/address/add':{
                this.setState({
                  tabshow:false,
                  loading:false,
                  pagebottom:0
                });
                break;
            }
              
            case '/shopcar':{
                this.setState({
                  tabshow:false,
                  loading:true,
                  pagebottom:0
                })
                break;
            }
              
            case '/orders':{
                this.setState({
                  tabshow:false,
                  loading:true,
                  pagebottom:0
                })
                break;
            }
              
            case '/cards':{
                this.setState({
                  tabshow:false,
                  loading:true,
                  pagebottom:0
                })
                break;
            }
              
            case '/order/detail':{
                this.setState({
                  tabshow:false,
                  loading:true,
                  pagebottom:0
                })
                break;
            }
              
            case '/search':{
                this.setState({
                  tabshow:false,
                  loading:false,
                  pagebottom:0
                })
                break;
            }
              
            case '/order/confirmorder':{
                this.setState({
                  tabshow:false,
                  loading:true,
                  pagebottom:0
                })
                break;
            }
              
            case '/card/detail':{
                this.setState({
                  tabshow:false,
                  loading:true,
                  pagebottom:0
                })
                break;
            }
              
            case '/card/success':{
                this.setState({
                  tabshow:false,
                  loading:true,
                  pagebottom:0
                })
                break;
            }
            case '/logistic':{
                this.setState({
                  tabshow:false,
                  loading:true,
                  pagebottom:0
                })
                break;
            }
            case '/order/pay':{
                this.setState({
                  tabshow:false,
                  loading:false,
                  pagebottom:0
                })
                break;
            }
            case '/order/paysuccess':{
                this.setState({
                  tabshow:false,
                  loading:true,
                  pagebottom:0
                })
                break;
            }

            case '/refund/detail':{
              console.log(22222222)
                this.setState({
                  tabshow:false,
                  loading:false,
                  pagebottom:0
                })
                break;
            }
            
            
            default:{
                this.setState({
                  activebar:1,
                  tabshow:true
                });
                break;
            }
              
              
        }
  }
  changeTab(index){
    this.setState({
      activebar:index,
      tabshow:true,
    })
  }
  

  render() {
    return (
      <div className="index" id="index-container">
        {this.state.loading ? <PageLoader pagebottom={this.state.pagebottom}/> : ''}
        {this.props.children}
        {this.state.tabshow ? <Tabbar activetab={this.state.activebar} changeTab={this.changeTab}/> : ''}
      </div>
    );
  }
}

AppComponent.contextTypes = {  
    router: PropTypes.object.isRequired
};
reactMixin.onClass(AppComponent, Reflux.connect(AppStore));
export default AppComponent;

