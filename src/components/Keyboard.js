import React,{Component} from 'react';
import '../static/styles/keyboard.less';
export default class KeyBoard extends Component{
    constructor(props){
        super(props);
        this.state={
            numberArr1:[{type:'number',txt:1},{type:'number',txt:2},{type:'number',txt:3}],
            numberArr2:[{type:'number',txt:4},{type:'number',txt:5},{type:'number',txt:6}],
            numberArr3:[{type:'number',txt:7},{type:'number',txt:8},{type:'number',txt:9}],
            numberArr4:[{type:'',txt:''},{type:'number',txt:0},{type:'del',txt:'删除'}]
        }
    }
    render(){
        return(
            <div id="keyboard" className="keyboard">
                <SingleNUmber tapNumber={this.props.tapNumber} arr={this.state.numberArr1}/>
                <SingleNUmber tapNumber={this.props.tapNumber} arr={this.state.numberArr2}/>
                <SingleNUmber tapNumber={this.props.tapNumber} arr={this.state.numberArr3}/>
                <SingleNUmber tapNumber={this.props.tapNumber} arr={this.state.numberArr4}/>
            </div>
        )
    }
}
class SingleNUmber extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="numberLine">
                {this.props.arr.map((item,index)=>
                    <div key={index} onClick={()=>this.props.tapNumber(item)} className="singleNumber" style={{backgroundColor:item.type!='number' ? 'rgb(225,232,237)' : ''}}>{item.txt}</div>
                )}
            </div>
           
        )
    }
}