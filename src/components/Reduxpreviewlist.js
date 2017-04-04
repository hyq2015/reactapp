/**
 * Created by admin on 2017/4/4.
 */
import React,{Component,PropTypes} from 'react';
export default class Counter extends Component{
  static propTypes={
    loading:PropTypes.bool,
    articleList:PropTypes.object,
    error:PropTypes.bool,
    loadArticles:PropTypes.func
  };
  render(){
    const {Load,Add,counter}=this.props;
    return (
    <div>
      <span>{counter.counter}</span>
      {counter.list.map((item,index)=><p key={index}>{item}</p>)}
      <button onClick={Add}>点击</button>
      </div>
    );
  }
}
