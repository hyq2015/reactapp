/**
 * Created by Administrator on 2017/4/1.
 */
import React,{Component,findDOMNode} from 'react';
import {render,ReactDOM} from 'react-dom';
import _ from 'lodash';
let windowWidth=window.innerWidth;
function getPixelRatio(context) {
  var backingStore = context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio || 1;

  return (window.devicePixelRatio || 1) / backingStore;
}
let defaultSetting={
  'innerWidth': windowWidth,
  'realCanvasHeight': 150,//图表区域高度
  'canvasPaddingLeft': 10,//图表左右间距
  'xAxisTxtRotateAngle': 0,//图表x轴坐标旋转角度
  'optionTop': 4,//y轴坐标下间距
  'yAxisAdditionalLeft': 2,//y轴坐标左间距
  'xAxisBottom': 20,//x轴左边的下间距
  'canvasMarginBottom': 20,
  'canvasMarginTop': 40,
  'topBarMarginTop': 55,
  'canvasBackgroundColor': '#00c8fb',//canvas背景色
  'originLocationArr': [{x:0,y:1500},{x:1,y:5645},{x:2,y:1500},{x:3,y:5645},{x:4,y:1500},{x:5,y:5645},{x:6,y:1500},{x:7,y:5645}],
  'hotTypeName': ['dfg','df','dfg','df','dfg','df','dfg','df'],
  'tooltipId':'whiteboard1',
  'xAxisFontSize':'14',
  'fontFamily':'PingFang SC,Microsoft YaHei,Microsoft JhengHei',
  'fontWeight':'normal',
  'fontColor':'#fff',
  'yAxisFontSize':'12',
  'lineColor':'#fff',
  'lineOffset':0.5,
  'lineWidth':1,
  'shadowBackgroundColor':'rgba(255,255,255,0.4)'//阴影部分背景色
};
var devicePixelRatio=1;
var options={};
var RmyCanvas=null,cxt=null,lineObj={},linexStyle={},line0Style={},line1Style={},line2Style={},RmyCanvasStyle={},drawed=false;
export default class Rchart extends Component{
  constructor(props){
    super(props);
    this.drawCss=this.drawCss.bind(this);
    this.state={
      options:{
        innerWidth:10,
        canvasContainerHeight:200
      },
      drawed:false,
      devicePixelRatio:1
    }
  }
  componentWillMount(){
    options={};
    options = Object.assign({}, defaultSetting, this.props.options);
    options.dashedHeight = options.realCanvasHeight / 4;
    options.canvasContainerHeight = options.realCanvasHeight + options.topBarMarginTop + options.canvasMarginTop + options.xAxisBottom +options.canvasMarginBottom;
    options.perWidth = (options.innerWidth - options.canvasPaddingLeft * 2) / options.hotTypeName.length;
    
    let realoption={
      canvasContainerHeight:options.canvasContainerHeight,
      innerWidth:windowWidth
    }
    this.setState({
      options:realoption
    })
  }
  componentDidUpdate(){
    console.log('updated')
  }
  componentDidMount(){
    let that=this;
    setTimeout(function(){
      RmyCanvas = that.refs.Rcanvas;
      cxt = RmyCanvas.getContext("2d");
      devicePixelRatio=getPixelRatio(cxt);
      
      that.setState({
        devicePixelRatio:devicePixelRatio
      })
      if(options.originLocationArr && options.originLocationArr.length>0 &&  options.hotTypeName && options.hotTypeName.length>0 && cxt){
        that.drawCss(cxt);
      }
    },10)
    
  }
  

  drawLine(cxt){
    if(this.state.drawed){
      return
    }
    console.log(options);
    this.setState({
      drawed:true
    });
    
    let locationArr = [];
      /*
     * 各个坐标点
     * */
    var mostHot = {x: 0, y: 0};
    for (let n = 0; n < options.originLocationArr.length; n++) {
      if (options.originLocationArr[n].y > mostHot.y) {
        mostHot = options.originLocationArr[n]
      }

    }
    console.log(cxt)

    /*
     * y轴坐标转换成最大的整数
     * */
    if (mostHot.y >= 400) {
      if (mostHot.y % 400 !== 0) {
        mostHot.y = 400 * Math.ceil(mostHot.y / 400)
      }
    } else {
      if (mostHot.y % 40 !== 0) {
        mostHot.y = 40 * Math.ceil(mostHot.y / 40)
      }
    }

    var perPartHotScore = (mostHot.y / 4);
    /*
     * 将获取到的坐标数据转换成按照比例换算的数据
     * */
    for (let a = 0; a < options.originLocationArr.length; a++) {
      locationArr.push({y: ((options.realCanvasHeight * (options.originLocationArr[a].y / mostHot.y)).toFixed(2) + options.xAxisBottom + options.canvasMarginBottom)})
    }
    console.log(locationArr)

    /*
     * 绘制最上面的标线
     * */
    cxt.save();
    cxt.beginPath();
    cxt.strokeStyle = options.fontColor;
    cxt.moveTo((options.canvasPaddingLeft)*devicePixelRatio, (options.canvasMarginTop)*devicePixelRatio);
    cxt.lineTo((mostHot.x * options.perWidth + options.canvasPaddingLeft + options.perWidth / 2 - 10)*devicePixelRatio, options.canvasMarginTop*devicePixelRatio);
    cxt.lineTo((mostHot.x * options.perWidth + options.canvasPaddingLeft + options.perWidth / 2)*devicePixelRatio, (options.canvasMarginTop + 10)*devicePixelRatio);
    cxt.lineTo((mostHot.x * options.perWidth + options.canvasPaddingLeft + options.perWidth / 2 + 10)*devicePixelRatio, options.canvasMarginTop*devicePixelRatio);
    cxt.lineTo((options.innerWidth - 10)*devicePixelRatio, options.canvasMarginTop*devicePixelRatio);
    cxt.moveTo((mostHot.x * options.perWidth + options.canvasPaddingLeft + options.perWidth / 2)*devicePixelRatio, (options.canvasMarginTop + 10)*devicePixelRatio);
    cxt.lineTo((mostHot.x * options.perWidth + options.canvasPaddingLeft + options.perWidth / 2)*devicePixelRatio, (options.canvasContainerHeight - options.xAxisBottom - options.canvasMarginBottom)*devicePixelRatio);
    cxt.stroke();
    cxt.closePath();
    cxt.restore();


    /*
     * 绘制y轴坐标
     * */
    cxt.save();
    cxt.beginPath();
    cxt.font=((parseInt(options.yAxisFontSize*devicePixelRatio)).toString()+'px'+' '+options.fontFamily+' '+options.fontWeight);
    // cxt.font = cxt.font.replace(/\d+(\.\d+)?(px|pt|em|%)/i,parseInt(options.yAxisFontSize*devicePixelRatio).toString()+'px');//替换字体大小
    cxt.fillStyle = options.fontColor;
    cxt.fillText(parseInt(perPartHotScore).toString(), (options.canvasPaddingLeft + options.yAxisAdditionalLeft)*devicePixelRatio, (options.canvasContainerHeight - options.xAxisBottom - options.canvasMarginBottom - options.optionTop - options.dashedHeight)*devicePixelRatio);
    cxt.fillText((parseInt(perPartHotScore) * 2).toString(), (options.canvasPaddingLeft + options.yAxisAdditionalLeft)*devicePixelRatio, (options.canvasContainerHeight - options.xAxisBottom - options.canvasMarginBottom - options.optionTop - options.dashedHeight * 2)*devicePixelRatio);
    cxt.fillText((parseInt(perPartHotScore) * 3).toString(), (options.canvasPaddingLeft + options.yAxisAdditionalLeft)*devicePixelRatio, (options.canvasContainerHeight - options.xAxisBottom - options.canvasMarginBottom - options.optionTop - options.dashedHeight * 3)*devicePixelRatio);
    cxt.fillText((parseInt(perPartHotScore) * 4).toString(), (options.canvasPaddingLeft + options.yAxisAdditionalLeft)*devicePixelRatio, (options.canvasContainerHeight - options.xAxisBottom - options.canvasMarginBottom - options.optionTop - options.dashedHeight * 4)*devicePixelRatio);
    cxt.closePath();
    cxt.restore();

    /*
     * 绘制页面上的单个坐标点
     * */
    cxt.save();
    cxt.strokeStyle = options.lineColor;
    cxt.beginPath();
    cxt.lineJoin = "round";
    cxt.lineWidth = options.lineWidth;
    cxt.translate(options.lineOffset,options.lineOffset);
    for (let i = 0; i < locationArr.length; i++) {
      if (locationArr[i].y > mostHot.y) {
        mostHot = locationArr[i]
      }
      if (i === 0) {
        cxt.moveTo((options.perWidth / 2 + options.canvasPaddingLeft + i * options.perWidth)*devicePixelRatio, (options.canvasContainerHeight - locationArr[i].y - options.canvasMarginBottom - options.xAxisBottom)*devicePixelRatio);
      } else {
        cxt.lineTo((options.perWidth / 2 + options.canvasPaddingLeft + i * options.perWidth)*devicePixelRatio, (options.canvasContainerHeight - locationArr[i].y - options.canvasMarginBottom - options.xAxisBottom)*devicePixelRatio);
      }

    }
    cxt.stroke();
    cxt.closePath();
    cxt.restore();

    /*
     * 底部菜单文字
     * */
    cxt.save();
    cxt.beginPath();

    cxt.font=parseInt(options.xAxisFontSize*devicePixelRatio)+'px'+' '+options.fontFamily+' '+options.fontWeight;
    cxt.textAlign = 'center';
    cxt.fillStyle = options.fontColor;
    cxt.lineWidth = 1;

    for (let m = 0; m < options.hotTypeName.length; m++) {
      cxt.save();
      cxt.translate((options.perWidth / 2 + options.canvasPaddingLeft + m * options.perWidth)*devicePixelRatio, (options.canvasContainerHeight - options.xAxisBottom)*devicePixelRatio);
      cxt.rotate(options.xAxisTxtRotateAngle * Math.PI / 180);
      cxt.fillText(options.hotTypeName[m], 0, 0);
      cxt.restore();
    }

    cxt.closePath();
    cxt.restore();

    /*
     * 绘制阴影区域
     * */
    cxt.save();
    cxt.beginPath();
    cxt.strokeStyle = options.shadowBackgroundColor;
    cxt.fillStyle = options.shadowBackgroundColor;
    cxt.moveTo((options.perWidth / 2 + options.canvasPaddingLeft)*devicePixelRatio, (options.canvasContainerHeight - options.xAxisBottom - options.canvasMarginBottom)*devicePixelRatio);
    for (let p = 0; p < locationArr.length; p++) {
      cxt.lineTo((options.perWidth / 2 + options.canvasPaddingLeft + p * options.perWidth)*devicePixelRatio, (options.canvasContainerHeight - locationArr[p].y - options.canvasMarginBottom - options.xAxisBottom)*devicePixelRatio);
    }
    cxt.lineTo((options.perWidth / 2 + options.canvasPaddingLeft + (options.hotTypeName.length-1) * options.perWidth)*devicePixelRatio, (options.canvasContainerHeight - options.xAxisBottom - options.canvasMarginBottom)*devicePixelRatio);
    cxt.lineTo((options.perWidth / 2 + options.canvasPaddingLeft)*devicePixelRatio, (options.canvasContainerHeight - options.xAxisBottom - options.canvasMarginBottom)*devicePixelRatio);
    cxt.stroke();
    cxt.fill();
    cxt.closePath();
    cxt.restore();

    let toolTip=document.getElementById(options.tooltipId);
    let toolTipWidth=toolTip.offsetWidth;
    let toolTipHeight=toolTip.offsetHeight;
    let circleBox=document.getElementById('Rcircle');
    let circleBoxHeight=circleBox.offsetHeight;
    let circleBoxWidth=circleBox.offsetWidth;
    toolTip.style.left=(mostHot.x) * options.perWidth + options.canvasPaddingLeft + options.perWidth/2 - toolTipWidth/2+'px';
    toolTip.style.top=options.canvasContainerHeight-options.xAxisBottom-options.canvasMarginBottom-options.realCanvasHeight-toolTipHeight-circleBoxHeight/2+'px';
    circleBox.style.left=(mostHot.x) * options.perWidth + options.canvasPaddingLeft + options.perWidth/2 - circleBoxWidth/2+'px';
    circleBox.style.top=options.canvasContainerHeight-options.xAxisBottom-options.canvasMarginBottom-options.realCanvasHeight-circleBoxHeight/2+'px';
  }
  drawCss(cxt){
    /*
     * css样式
     * */
    let lineObj={
        width:options.innerWidth - options.canvasPaddingLeft * 2 ,
        height: options.dashedHeight ,
        left: options.canvasPaddingLeft
    }
    this.setState({
      lineObj:lineObj,
      RmyCanvasStyle:{
        backgroundColor: options.canvasBackgroundColor,
        width:options.innerWidth,
        height:options.canvasContainerHeight
      },
      linexStyle:Object.assign({},lineObj,{
        bottom: options.xAxisBottom + options.canvasMarginBottom
      }),
      line0Style: Object.assign({},lineObj,{
          bottom: options.xAxisBottom + options.canvasMarginBottom + options.dashedHeight * 1
        }),
      line1Style:Object.assign({},lineObj,{
          bottom: options.xAxisBottom + options.canvasMarginBottom + options.dashedHeight * 2
      }),

      line2Style:Object.assign({},lineObj,{
        bottom: options.xAxisBottom + options.canvasMarginBottom + options.dashedHeight * 3
      })

    });

    let ParentNode=document.getElementById(this.props.parentId);
    ParentNode.style.height=options.canvasContainerHeight+'px' ;
    this.drawLine(cxt);
  }
  componentDidUpdate(){
    // RmyCanvas = this.refs.Rcanvas;
    // cxt = RmyCanvas.getContext("2d");
    // cxt.clearRect(0,0,options.innerWidth*devicePixelRatio,options.canvasContainerHeight*devicePixelRatio)
    // this.drawLine(cxt);
  }
  render(){
    return(
      <div style={{height:'100%',position:'relative'}}>
        <div id="Rcircle">
          <div id="R-innerCircle"></div>
        </div>
        <div className="R-canvas-line R-canvas-linex" style={this.state.linexStyle}></div>
        <div className="R-canvas-line R-canvas-line0" style={this.state.line0Style}></div>
        <div className="R-canvas-line R-canvas-line1" style={this.state.line1Style}></div>
        <div className="R-canvas-line R-canvas-line2" style={this.state.line2Style}></div>
        <canvas id="R-myCanvas" ref="Rcanvas" style={this.state.RmyCanvasStyle} width={this.state.options.innerWidth*this.state.devicePixelRatio} height={this.state.options.canvasContainerHeight*this.state.devicePixelRatio}></canvas>
      </div>
    )

  }

}
