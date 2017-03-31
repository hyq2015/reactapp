import React,{Component} from 'react';
import {render} from 'react-dom';
import '../styles/card.less';
export default class Card extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return(
            <ul className="carditems clearfloat">
                {this.props.chancelist ? this.props.chancelist.map((cardItem,index)=>
                <li key={index} className={this.props.class}>
                    <div className="card-pic" style={{backgroundImage:'url('+(cardItem.imgurl ? cardItem.imgurl : '../static/images/loaderr.png')+')',backgroundSize:'cover'}}></div>
                    <p className="cardTitle">{cardItem.title}</p>
                    {cardItem.product.amountTotal ? 
                        <div  className="progress">
                            {cardItem.product.amountLeft == cardItem.product.amountTotal ? 
                            <div className="saleOut">
                                <div className="bgwhite">售罄</div>
                            </div> : ''
                            }
                        
                        <div className="text-center">
                            <span className="residue">剩余&nbsp;</span> 
                            <span className="color222">{cardItem.product.amountLeft}</span>
                        </div>
                        <div className="progressBlue" style={{width:((cardItem.product.amountTotal-cardItem.product.amountLeft)/cardItem.product.amountTotal)*100+'%'}}></div>
                    </div>
                    : 
                    <div className="time">
                        {cardItem.time < 0 ? 
                        <div className="saleOut">
                            <div className="bgwhite">已过时</div>
                        </div> : ''
                        }
                        <span>距结束</span>
                        <p className="blue">{cardItem.dates}</p>
                        <span>天</span>
                        <p className="blue">{cardItem.hours}</p>
                        <span>时</span>
                        <p className="blue">{cardItem.mins}</p>
                        <span>分</span>
                    </div>
                    }
                </li>) : ''} 
            </ul>
            
        )
    }
}