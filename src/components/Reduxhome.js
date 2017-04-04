/**
 * Created by admin on 2017/4/4.
 */
import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PreviewList from './Reduxpreviewlist';
import * as listActions from '../redux/actions/Reduxcounter';
 class Home extends Component{
  render(){
    return(
      <div>
        <h1>home</h1>
        <PreviewList
          {...this.props.counter}
          {...this.props.listActions}
        />
      </div>
      
    )
  }
}

export default connect(state=>{
  return{
    counter:state.counter
  };
},dispatch=>{
  return{
    listActions:bindActionCreators(listActions,dispatch)
  }
})(Home)
