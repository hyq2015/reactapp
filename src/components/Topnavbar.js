import React,{Component} from 'react';
export default class Topnavbar extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="topbar">
                {this.props.navs.map((item,index)=>
                    <div key={index} onClick={()=>this.props.changeNav(item,index)} className={item.active ? "singlenav activeNav" : "singlenav"}>{item.name}</div>
                )}
            </div>
        )
    }
}