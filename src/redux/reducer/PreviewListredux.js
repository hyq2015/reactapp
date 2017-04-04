/**
 * Created by admin on 2017/4/4.
 */
import { LOAD_ARTICLES, LOAD_ARTICLES_SUCCESS,LOAD_ARTICLES_ERROR } from '../actions/Reduxcounter';
const initialState={
  counter:1,
  list:[1,2,34,67]
}
function counter(state = initialState,action) {
  switch(action.type){
    case LOAD_ARTICLES:
      state.counter+=1;
      return {
        ...state,
        loading:true,
        error:false
      };
    
    case LOAD_ARTICLES_SUCCESS:
      state.counter-=1;
      return {...state};
    
    case LOAD_ARTICLES_ERROR:
      state.counter*=2;
      return {...state};
    default:
      return state
    
  }
}
export default counter;
