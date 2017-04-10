import React,{Component} from 'react';
import {render} from 'react-dom';
import AreaJson from '../static/js/province_city_town.json';
import '../static/styles/areapicker.less';
import CS from 'classnames';
export default class AreaPicker extends Component{
    constructor(props){
        super(props);
        this.state={
           currentActive:0,
           currentActiveCity:0,
           currentActiveTown:0,
           realProvince:'',
           realCity:'',
           realTown:''
        };
        this.initUi=this.initUi.bind(this);
        this.chooseCity=this.chooseCity.bind(this);
        this.initCity=this.initCity.bind(this);
        this.initTown=this.initTown.bind(this);
        this.setSelectedName=this.setSelectedName.bind(this);
    }
    componentDidMount(){
        this.initUi();
        this.chooseCity('province');
        this.chooseCity('city');
        this.chooseCity('town');
    }
    componentWillMount(){
        this.setState({
            currentActive:this.props.currentActive,
            currentActiveCity:this.props.currentActiveCity,
            currentActiveTown:this.props.currentActiveTown,
            realProvince:AreaJson.province_city_town[this.props.currentActive].name,
            realCity:AreaJson.province_city_town[this.props.currentActive].sub[this.props.currentActiveCity].name,
            realTown:AreaJson.province_city_town[this.props.currentActive].sub[this.props.currentActiveCity].sub ? AreaJson.province_city_town[this.props.currentActive].sub[this.props.currentActiveCity].sub[this.props.currentActiveTown].name : ''
        })
    }
    setSelectedName(){
        this.setState({
            realProvince:AreaJson.province_city_town[this.state.currentActive].name,
            realCity:AreaJson.province_city_town[this.state.currentActive].sub[this.state.currentActiveCity].name,
            realTown:AreaJson.province_city_town[this.state.currentActive].sub[this.state.currentActiveCity].sub ? AreaJson.province_city_town[this.state.currentActive].sub[this.state.currentActiveCity].sub[this.state.currentActiveTown].name : ''
        })
    }
    render(){
        return(
            <div id="mask" style={{display:this.props.showselect ? 'block' :'none'}}>
                <div className="selectArea" id="selectArea">'
                    <div className="btns">
                        <div className="btn cancelbtn" onClick={this.props.hideSelect}>取消</div>
                        <div className="btn confirmbtn" onClick={()=>this.props.confirm(this.state.realProvince,this.state.realCity,this.state.realTown)}>确定</div>
                    </div>
                    <div id="confirmArea"></div>
                    
                    <div style={{width: '33%',height: 260,position: 'relative',overflow: 'hidden'}} id="container">
                        <div style={{width: '100%',height: '100%',position: 'relative',overflowX: 'hidden',boxSizing: 'border-box'}} id="Ricky1">
                            <ul style={{width: '100%',paddingLeft:0,height: 36,lineHeight: '36px', transform: 'perspective(1000px) rotateY(0deg) rotateX(0deg)', transition: '150ms ease-out'}} id="list">
                                {AreaJson.province_city_town.map((item,index)=>
                                     <li key={index} className={(index<this.state.currentActive-2 || index>this.state.currentActive+3) ? 'visible litag province' : 'litag province'}
                                        style={{transform:'translateZ(100px) rotateX('+(-(index)*20)+'deg)'}}>{item.name}</li>
                                )}
                            </ul>
                        </div>
                    </div>

                    <div style={{width: '33%',height: 260,position: 'relative',overflow: 'hidden'}} id="container2">
                        <div style={{width: '100%',height: '100%',position: 'relative',overflowX: 'hidden',boxSizing: 'border-box'}}>
                            <ul style={{width: '100%',paddingLeft:0,height: 36,lineHeight: '36px', transform: 'perspective(1000px) rotateY(0deg) rotateX(0deg)', transition: '150ms ease-out'}} id="list2">
                                {AreaJson.province_city_town[this.state.currentActive].sub.map((item,index)=>
                                     <li key={index} className={(index<this.state.currentActiveCity-2 || index>this.state.currentActiveCity+3) ? 'visible litag province' : 'litag province'}
                                        style={{transform:'translateZ(100px) rotateX('+(-(index)*20)+'deg)'}}>{item.name}</li>
                                )}
                            </ul>
                        </div>
                    </div>

                    <div style={{width: '33%',height: 260,position: 'relative',overflow: 'hidden'}} id="container3">
                        <div style={{width: '100%',height: '100%',position: 'relative',overflowX: 'hidden',boxSizing: 'border-box'}}>
                            <ul style={{width: '100%',paddingLeft:0,height: 36,lineHeight: '36px', transform: 'perspective(1000px) rotateY(0deg) rotateX(0deg)', transition: '150ms ease-out'}} id="list3">
                                {AreaJson.province_city_town[this.state.currentActive].sub[this.state.currentActiveCity].sub ? AreaJson.province_city_town[this.state.currentActive].sub[this.state.currentActiveCity].sub.map((item,index)=>
                                     <li key={index} className={(index<this.state.currentActiveTown-2 || index>this.state.currentActiveTown+3) ? 'visible litag province' : 'litag province'}
                                        style={{transform:'translateZ(100px) rotateX('+(-(index)*20)+'deg)'}}>{item.name}</li>
                                ) : ''}
                            </ul>
                        </div>
                    </div>



                </div>
            </div>
        )
    }
    initCity(){
        this.setState({
            currentActiveCity:0,
            currentActiveTown:0
        })
        originTop2 = 0;
        moveVolume2 = 0;
        originTop3 = 0;
        moveVolume3 = 0;
        document.getElementById('list2').style.transform='perspective(1000px) rotateY(0deg) rotateX(' + (moveVolume2) + 'deg)';
        document.getElementById('list2').style.webkitTransform='perspective(1000px) rotateY(0deg) rotateX(' + (moveVolume2) + 'deg)';
        
        document.getElementById('list3').style.transform='perspective(1000px) rotateY(0deg) rotateX(' + (moveVolume3) + 'deg)';
        document.getElementById('list3').style.webkitTransform='perspective(1000px) rotateY(0deg) rotateX(' + (moveVolume3) + 'deg)';
    }
    initTown(){
         this.setState({
            currentActiveTown:0
        })
        originTop3 = 0;
        moveVolume3 = 0;
        document.getElementById('list3').style.transform='perspective(1000px) rotateY(0deg) rotateX(' + (moveVolume3) + 'deg)';
        document.getElementById('list3').style.webkitTransform='perspective(1000px) rotateY(0deg) rotateX(' + (moveVolume3) + 'deg)';
    }
    initUi(){
        document.getElementById('confirmArea').style.height='36px';
        if (userAgent.indexOf('ANDROID') > 0) {
            document.getElementById('list').style.height=ShowHeight+'px';
            document.getElementById('list').style.width=windowWidth*0.33+'px';
            document.getElementById('list').style.transformOrigin='center center 0';
            document.getElementById('list').style.webkitTransformOrigin='center center 0';

            document.getElementById('list2').style.height=ShowHeight+'px';
            document.getElementById('list2').style.width=windowWidth*0.33+'px';
            document.getElementById('list2').style.transformOrigin='center center 0';
            document.getElementById('list2').style.webkitTransformOrigin='center center 0';
            
            document.getElementById('list3').style.height=ShowHeight+'px';
            document.getElementById('list3').style.width=windowWidth*0.33+'px';
            document.getElementById('list3').style.transformOrigin='center center 0';
            document.getElementById('list3').style.webkitTransformOrigin='center center 0';

        } else if (userAgent.indexOf('IPHONE')) {
            document.getElementById('list').style.height=ShowHeight+'px';
            document.getElementById('list').style.width=windowWidth*0.33+'px';
            document.getElementById('list').style.transformOrigin='center center 100px';
            document.getElementById('list').style.webkitTransformOrigin='center center 100px';

            document.getElementById('list2').style.height=ShowHeight+'px';
            document.getElementById('list2').style.width=windowWidth*0.33+'px';
            document.getElementById('list2').style.transformOrigin='center center 100px';
            document.getElementById('list2').style.webkitTransformOrigin='center center 100px';

            document.getElementById('list3').style.height=ShowHeight+'px';
            document.getElementById('list3').style.width=windowWidth*0.33+'px';
            document.getElementById('list3').style.transformOrigin='center center 100px';
            document.getElementById('list3').style.webkitTransformOrigin='center center 100px';
        }
        for(let item of document.querySelectorAll('.province')){
            item.style.lineHeight='36px';
            item.style.width=windowWidth * 0.33 + 'px';
            item.style.maxWidth=windowWidth * 0.33 + 'px';
        }
        if(this.props.currentActive==8){
            moveVolume=160;
            document.getElementById('list').style.transform='perspective(1000px) rotateY(0deg) rotateX(160deg)';
            document.getElementById('list').style.transwebkitTransform='perspective(1000px) rotateY(0deg) rotateX(160deg)';
            document.getElementById('list').style.webkitTransformStyle='preserve-3d';
        }
        
    }
    chooseCity(chooseWhat){
        let thatObj=this;
        if(chooseWhat=='province'){
            myScroll_self2=document.getElementById('container');
        }else if(chooseWhat=='city'){
            myScroll_self2=document.getElementById('container2');
        }else if(chooseWhat=='town'){
            myScroll_self2=document.getElementById('container3');
        }
        /*重构开始*/

        myScroll_self2.addEventListener('touchstart',function (ev) {
            if(chooseWhat=='province'){
                originTop = (ev.changedTouches ? ev.changedTouches[0] : ev).pageY;
            }else if(chooseWhat=='city'){
                originTop2 = (ev.changedTouches ? ev.changedTouches[0] : ev).pageY;
            }else if(chooseWhat=='town'){
                originTop3 = (ev.changedTouches ? ev.changedTouches[0] : ev).pageY;
            }

        });

        myScroll_self2.addEventListener('touchmove',function (e) {
            e.preventDefault();
            var para;
            var endY = (e.changedTouches ? e.changedTouches[0] : e).pageY;
            var changeY;
            if(chooseWhat=='province'){
                changeY = originTop - endY;
                para = AreaJson.province_city_town.length - 1;
                moveVolume += (360 * changeY) / (200 * Math.PI);
                if (moveVolume >= para * 20 + 10) {
                    moveVolume = para * 20 + 10;
                }
                if (moveVolume <= -10) {
                    moveVolume = -10;
                }

                /*控制显示那些item*/
                var leftVolume = moveVolume % 20;
                var intPart = Math.floor(moveVolume / 20);
                if (leftVolume > 10) {
                    thatObj.setState({
                        currentActive:intPart + 1
                    });
                    
                } else if(leftVolume<0){
                    thatObj.setState({
                        currentActive:0
                    })
                }else{
                    thatObj.setState({
                        currentActive:intPart
                    })
                }
                thatObj.initCity();
                document.getElementById('list').style.transform='perspective(1000px) rotateY(0deg) rotateX(' + (moveVolume) + 'deg)';
                document.getElementById('list').style.webkitTransform='perspective(1000px) rotateY(0deg) rotateX(' + (moveVolume) + 'deg)';
                document.getElementById('list').style.backfaceVisibility='hidden';
                document.getElementById('list').style.willChange='transform';
                originTop = endY;
            }else if(chooseWhat=='city'){
                changeY = originTop2 - endY;
                para = AreaJson.province_city_town[thatObj.state.currentActive].sub.length - 1;
                moveVolume2 += (360 * changeY) / (200 * Math.PI);
                if (moveVolume2 >= para * 20 + 10) {
                    moveVolume2 = para * 20 + 10;
                }
                if (moveVolume2 <= -10) {
                    moveVolume2 = -10;
                }

                /*控制显示那些item*/
                var leftVolume = moveVolume2 % 20;
                var intPart = Math.floor(moveVolume2 / 20);
                if (leftVolume > 10) {
                    thatObj.setState({
                        currentActiveCity:intPart + 1
                    })
                } else if(leftVolume<0){
                    thatObj.setState({
                        currentActiveCity:0
                    })
                }else{
                    thatObj.setState({
                        currentActiveCity:intPart
                    })
                }
                thatObj.initTown();
                document.getElementById('list2').style.transform='perspective(1000px) rotateY(0deg) rotateX(' + (moveVolume2) + 'deg)';
                document.getElementById('list2').style.webkitTransform='perspective(1000px) rotateY(0deg) rotateX(' + (moveVolume2) + 'deg)';
                document.getElementById('list2').style.backfaceVisibility='hidden';
                document.getElementById('list2').style.willChange='transform';
                originTop2 = endY;
            }else if(chooseWhat=='town'){
                changeY = originTop3 - endY;
                if(((AreaJson.province_city_town[thatObj.state.currentActive].sub)[thatObj.state.currentActiveCity].sub)){
                    para = (((AreaJson.province_city_town[thatObj.state.currentActive].sub)[thatObj.state.currentActiveCity].sub).length) - 1;

                }else{
                    para=0;
                }
                moveVolume3 += (360 * changeY) / (200 * Math.PI);
                if (moveVolume3 >= para * 20 + 10) {
                    moveVolume3 = para * 20 + 10;
                }
                if (moveVolume3 <= -10) {
                    moveVolume3 = -10;
                }

                /*控制显示那些item*/
                var leftVolume = moveVolume3 % 20;
                var intPart = Math.floor(moveVolume3 / 20);
                if (leftVolume > 10) {
                    thatObj.setState({
                        currentActiveTown:intPart + 1
                    })
                } else if(leftVolume<0){
                    thatObj.setState({
                        currentActiveTown:0
                    })
                }else{
                    thatObj.setState({
                        currentActiveTown:intPart
                    })
                }
               
                document.getElementById('list3').style.transform='perspective(1000px) rotateY(0deg) rotateX(' + (moveVolume3) + 'deg)';
                document.getElementById('list3').style.webkitTransform='perspective(1000px) rotateY(0deg) rotateX(' + (moveVolume3) + 'deg)';
                document.getElementById('list3').style.backfaceVisibility='hidden';
                document.getElementById('list3').style.willChange='transform';
                originTop3 = endY;
            }
             thatObj.setSelectedName();
        });
        myScroll_self2.addEventListener('touchend',function () {
            var para;
            if(chooseWhat=='province'){
                para = AreaJson.province_city_town.length - 1;
                if (moveVolume >= para * 20) {
                    moveVolume = para * 20;
                }
                if (moveVolume <= 0) {
                    moveVolume = 0;
                }
                var leftVolume = moveVolume % 20;
                var intPart = Math.floor(moveVolume / 20);
                if (leftVolume > 10) {
                    moveVolume = (intPart + 1) * 20;
                    thatObj.setState({
                        currentActive:intPart+1
                    })
                } else {
                    moveVolume = 20 * intPart;
                    thatObj.setState({
                        currentActive:intPart
                    })
                }
                thatObj.initCity();
                document.getElementById('list').style.transform='perspective(1000px) rotateY(0deg) rotateX(' + (moveVolume) + 'deg)';
                document.getElementById('list').style.webkitTransform='perspective(1000px) rotateY(0deg) rotateX(' + (moveVolume) + 'deg)';
                document.getElementById('list').style.backfaceVisibility='hidden';
                document.getElementById('list').style.willChange='transform';
                originTop = 0;
            }else if(chooseWhat=='city'){
                para = AreaJson.province_city_town[thatObj.state.currentActive].sub.length - 1;
                if (moveVolume2 >= para * 20) {
                    moveVolume2 = para * 20;
                }
                if (moveVolume2 <= 0) {
                    moveVolume2 = 0;
                }
                var leftVolume = moveVolume2 % 20;
                var intPart = Math.floor(moveVolume2 / 20);
                if (leftVolume > 10) {
                    moveVolume2 = (intPart + 1) * 20;
                    thatObj.setState({
                        currentActiveCity:intPart+1
                    })
                } else {
                    moveVolume2 = 20 * intPart;
                    thatObj.setState({
                        currentActiveCity:intPart
                    })
                }
                 thatObj.initTown();
                document.getElementById('list2').style.transform='perspective(1000px) rotateY(0deg) rotateX(' + (moveVolume2) + 'deg)';
                document.getElementById('list2').style.webkitTransform='perspective(1000px) rotateY(0deg) rotateX(' + (moveVolume2) + 'deg)';
                document.getElementById('list2').style.backfaceVisibility='hidden';
                document.getElementById('list2').style.willChange='transform';
                originTop2 = 0;
            }else if(chooseWhat=='town'){
                if(((AreaJson.province_city_town[thatObj.state.currentActive].sub)[thatObj.state.currentActiveCity].sub)){
                    para = (((AreaJson.province_city_town[thatObj.state.currentActive].sub)[thatObj.state.currentActiveCity].sub).length) - 1;

                }else{
                    para=0;
                }
                if (moveVolume3 >= para * 20) {
                    moveVolume3 = para * 20;
                }
                if (moveVolume3 <= 0) {
                    moveVolume3 = 0;
                }
                var leftVolume = moveVolume3 % 20;
                var intPart = Math.floor(moveVolume3 / 20);
                if (leftVolume > 10) {
                    moveVolume3 = (intPart + 1) * 20;
                    thatObj.setState({
                        currentActiveTown:intPart+1
                    })
                } else {
                    moveVolume3 = 20 * intPart;
                    thatObj.setState({
                        currentActiveTown:intPart
                    })
                }
                document.getElementById('list3').style.transform='perspective(1000px) rotateY(0deg) rotateX(' + (moveVolume3) + 'deg)';
                document.getElementById('list3').style.webkitTransform='perspective(1000px) rotateY(0deg) rotateX(' + (moveVolume3) + 'deg)';
                document.getElementById('list3').style.backfaceVisibility='hidden';
                document.getElementById('list3').style.willChange='transform';
                originTop3 = 0;
            }
             thatObj.setSelectedName();
        });
    }
}
var userAgent = navigator.userAgent.toUpperCase();
var windowWidth = window.innerWidth;
var originTop = 0;
var moveVolume = 0;
var originTop2 = 0;
var moveVolume2 = 0;
var myScroll_self2;
var originTop3 = 0;
var moveVolume3 = 0;
var ShowHeight = 36;
document.body.addEventListener('touchmove',function (e) {
    //否则ios在弹出选择器之后还可以滚动屏幕
    e.preventDefault();
});
