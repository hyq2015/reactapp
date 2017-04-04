/**
 * Created by admin on 2017/4/4.
 */
import { LOAD_ARTICLES, LOAD_ARTICLES_SUCCESS,LOAD_ARTICLES_ERROR } from '../actions/Reduxcounter';
let initialState={
  loading:true,
  error:false,
  count:1
};
function previewList(state=0,action) {
  console.log(action.type)
  switch(action.type){
    case LOAD_ARTICLES:{
      return state++;
      
    }
    case LOAD_ARTICLES_SUCCESS:{
      return{
        ...state,
        loading:false,
        error:false,
        articleList:action.payload.articleList
      };
    }
    case LOAD_ARTICLES_ERROR:{
      return{
        ...state,
        loading:false,
        error:true
      };
    }
    default:
      return state
    
  }
}
export default previewList;
