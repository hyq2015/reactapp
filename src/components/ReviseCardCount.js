import React,{Component} from 'react';
import _ from 'lodash';
import KeyBoard from './KeyBoard';
import '../static/styles/revisecard.less';
import '../static/styles/iconfont.css';
export default class ReviseCardCount extends Component{
    constructor(props){
        super(props);
        this.state={
            numberArr:[]
        }
        this.tapNumber=this.tapNumber.bind(this);
    }
    tapNumber(item){
        let numberArr=_.cloneDeep(this.state.numberArr);
        if(item.type=='number'){
            if(numberArr.length<1 && item.txt===0){
                return
            }
            numberArr.push(item.txt);
            if(numberArr.join('')>this.props.maxCount){
                return
            }
            this.setState({
                numberArr:numberArr
            })
        }else if(item.type=='del'){
            if(numberArr.length>0){
                numberArr.splice(numberArr.length-1,1);
                this.setState({
                    numberArr:numberArr
                })
            }
            
        }
    }
    render(){
        return(
            <div id="revisecardContainer">
                <div className="goback bluefont" onClick={this.props.hideReviser}>取消</div>
                <div className="inputAmount">
                    <div className="haspadding txtinfo">
                        <span className="iconfont icon-tishi bluefont"></span>
                        <span style={{color:'#7b7b7b'}}> 输入使用数量,点击完成即可生成二维码</span>
                    </div>
                    <div style={{backgroundColor:'#fff'}} className="haspadding">
                        <p style={{fontSize:16,color:'#000'}}>使用数量</p>
                        <div className="blurinput">
                            {this.state.numberArr.map((item,index)=>
                                <span key={index}>{item}</span>
                            )}
                            <div className="fade-cursor"></div>
                        </div>
                        <p style={{fontSize:14,color:'#7b7b7b',marginTop:10}}>请输入使用数量,本次最多可使用<span>4</span>张</p>
                    </div>
                    <button className="finish-btn" onClick={()=>this.props.updateUseCount(this.state.numberArr.join(''))}>完成</button>
                    
                </div>
                <KeyBoard tapNumber={this.tapNumber}/>
            </div>
        )
    }
}