/**
 * Created by admin on 2017/4/4.
 */
import React,{Component,PropTypes} from 'react';
import Preview from './Reduxpreview';
export default class ReduxpreviewList extends Component{
  static propTypes={
    loading:PropTypes.bool,
    articleList:PropTypes.object,
    error:PropTypes.bool,
    loadArticles:PropTypes.func,
    counter:PropTypes.number
  };
  render(){
    const {loading,error,Load,loadArticles,counter}=this.props;
    if(error){
      return <p>something is error</p>
    }
    
    if(loading){
      return <p>loading...</p>
    }
    return (
    <div>
      {counter}
      <button onClick={Load}>点击</button>
      </div>
    );
    // return articleList.map((item)=>
    //   <Preview {...item} key={item.id} />
    // )
  }
}
