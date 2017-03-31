import 'normalize.css/normalize.css';
import 'styles/App.css';

import React,{Component} from 'react';
import Tabbar from './Tabbar';


class AppComponent extends Component {
  constructor(props){
    super(props);
    this.changeTab=this.changeTab.bind(this);
    this.state={
      activebar:2
    }
  }
  componentDidMount(){
        switch(this.props.location.pathname){
            case '/play':
            this.setState({
              activebar:1
            });
            break;
            case '/mall':
            this.setState({
              activebar:2
            });
            break;
            case '/mine':
            this.setState({
              activebar:3
            });
            break;
        }
        // browserHistory.getCurrentLocation().pathname
  }
  changeTab(index){
    this.setState({
      activebar:index
    })
  }
  render() {
    return (
      <div className="index" id="index-container">
        {this.props.children}
        <Tabbar activetab={this.state.activebar} changeTab={this.changeTab}/>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};


export default AppComponent;
