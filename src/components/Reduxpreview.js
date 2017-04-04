/**
 * Created by admin on 2017/4/4.
 */
import React,{Component} from 'react';
export default class Reduxpreview extends Component{
  static propTypes={
    title:React.PropTypes.string,
    link:React.PropTypes.string
  };
  render(){
    return(
      <article>
        <h1>{this.props.title}</h1>
        <span>{this.props.date}</span>
        <p>{this.props.description}</p>
      </article>
    )
  }
}
