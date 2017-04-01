import React,{Component} from 'react';
import {render} from 'react-dom';
import '../static/styles/swiper.css';
export default class Swiper extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return(
            <div className="swiper-wrapper">
                    {this.props.hotlist ? this.props.hotlist.map((item,index)=>
                        <div key={index} className="swiper-slide rank" style={{backgroundImage:'url('+item.imgurl+')',backgroundSize:'cover'}}>
                            <div className="headline">{item.title}</div>
                            <div className="join"><span>{item.theme.score}</span>人参加</div>
                        </div>
                    ) : ''}
                    {this.props.featurelist ? this.props.featurelist.map((item,index)=>
                        <div key={index} className="swiper-slide">
                            <div className="nice-pic" style={{backgroundImage:'url('+item.imgurl+')',backgroundSize:'cover'}}></div>
                            <div className="niceName"><span>{item.title}</span>人参加</div>
                    </div>
                    ) : ''}

            </div>

        )
    }
}
