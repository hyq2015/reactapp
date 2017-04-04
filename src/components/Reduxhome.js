/**
 * Created by admin on 2017/4/4.
 */
import {bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import Counter from './Reduxpreviewlist';
import * as listActions from '../redux/actions/Reduxcounter';
 
function mapStateToProps(state) {
  return {
    counter: state.counter,
    list:state.list
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(listActions, dispatch)
  
}

export default connect(mapStateToProps,mapDispatchToProps)(Counter)
