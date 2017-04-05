import React,{Component} from 'react';
import {render} from 'react-dom';
import Star from './Star';
import '../static/styles/cardstar.less';
export default class Cardstar extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentDidMount(){
      console.log(this.props.nearlist)
    }
    render(){
        return(
            <ul className="carditems clearfloat">
                {this.props.nearlist ? this.props.nearlist.map((cardItem,index)=>
                <li key={index} className={this.props.class}>
                    <div className="card-pic" style={{backgroundImage:'url('+(cardItem.imgurl ? cardItem.imgurl : '/static/images/loaderr.png')+')',backgroundSize:'cover'}}></div>
                    <p className="cardTitle">{cardItem.name}</p>
                    <Star score={cardItem.score}></Star>
                    <div className="SandP">
                      <div className="tags">
                            {cardItem.tagList.map((item,index1)=>
                                <span key={index1} className="nearbyBlack">{item}</span>
                            )}
                      </div>
                      <div className="nIcon icon-youwan_icon-ad iconfont"></div>
                      <div className="nearbyDistance">{cardItem.town}</div>
                  </div>
                </li>) : ''}
            </ul>

        )
    }
}
