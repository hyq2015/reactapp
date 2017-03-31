import React,{Component} from 'react';
import {render} from 'react-dom';
export default class Star extends Component{
    constructor(props){
        super(props);
        this.state={
            starItems:["icon-yw_icon_talkfill","icon-yw_icon_talkfill","icon-yw_icon_talkfill","icon-yw_icon_talkfill","icon-yw_icon_talkfill"],
            score:5
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.score){
            var Score=0;
                if(nextProps.score > 5){
                    Score = 5
                }else{
                    Score=nextProps.score;
                }
                var result = [];
                var hasDecimal = Score % 1 !== 0;
                var integer = Math.floor(Score);
                for(var i = 0;i < integer; i++){
                    result.push('icon-yw_icon_talkfill')
                }
                if(hasDecimal){
                  
                    result.push('icon-stare_half')
                }
                if(result.length < 5){
                  var originLength=result.length;
                    for(var j = 0;j < 5 - originLength; j++){
                        result.push('icon-yw_icon_talkb')
                    }
                  
                }
                this.setState({
                    starItems:result,
                    score:Score
                })
            }
            return true
        
    }
    render(){
        return(
            <div className="star clearfloat">
                {this.state.starItems ? this.state.starItems.map((item,index)=>
                    <span key={index} className={'iconfont starItem'+' '+item}></span>
                ) : ''}
                <span className="score">{this.state.score}</span>
            </div>
        )
    }

}