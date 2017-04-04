/**
 * Created by admin on 2017/4/4.
 */
import React,{Component} from 'react';
import Nav from './Reduxnav';
class Frame extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="frame">
        <section>
          <Nav link="/" linkname="home" />
          <Nav link="/detail/5" linkname="detail" />
        </section>
        <section>
          {this.props.children}
        </section>
        
      </div>
      
    )
  }
}
export default Frame;
