/**
 * Created by admin on 2017/4/4.
 */
import React,{Component} from 'react';
import {Link} from 'react-router';
class Nav extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <nav>
        <Link to={this.props.link}>{this.props.linkname}</Link>
      </nav>
    )
  }
}
export default Nav;
