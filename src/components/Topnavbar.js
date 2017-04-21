import React,{Component} from 'react';
export default class Topnavbar extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return(
            <div className="topbar">
                {this.props.navs.map((item,index)=>
                    <div key={(Math.random()*200).toFixed(2)+index} style={{fontSize:14}} onClick={()=>this.props.changeNav(item,index)} className={item.active ? "singlenav activeNav" : "singlenav"}>{item.name}</div>
                )}
            </div>
        )
    }
}