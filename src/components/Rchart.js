/**
 * Created by Administrator on 2017/4/1.
 */
import React,{Component} from 'react';
import {render} from 'react-dom';
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
const defaultSetting={
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
  'originLocationArr': [{x: 0, y: 2500}, {x: 1, y: 2600}, {x: 2, y: 1501}, {x: 3, y: 2700}, {x: 4, y: 2400}, {
    x: 5,
    y: 1580
  }, {x: 6, y: 1100}, {x: 7, y: 1400}],
  'hotTypeName': ['温泉', '采摘', '钓鱼', '烧烤', '画展', 'K歌', '赏花', '篝火'],
  'tooltipId':'whiteboard',
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
let devicePixelRatio=1;
var RmyCanvas,cxt;
export default class Rchart extends Component{
  constructor(props){
    super(props);
    this.drawCss=this.drawCss.bind(this);
    this.state={
      options:{},
      lineObj:{},
      linexStyle:{},
      line0Style:{},
      line1Style:{},
      line2Style:{},
      RmyCanvasStyle:{},
      devicePixelRatio:1
    }
  }
  componentDidMount(){
    let options={};
    options = Object.assign({}, defaultSetting, this.props.options);
    options.dashedHeight = options.realCanvasHeight / 4;
    options.canvasContainerHeight = options.realCanvasHeight + options.topBarMarginTop + options.canvasMarginTop + options.xAxisBottom +options.canvasMarginBottom;
    options.perWidth = (options.innerWidth - options.canvasPaddingLeft * 2) / options.hotTypeName.length;
    RmyCanvas = document.getElementById("R-myCanvas");
    cxt = RmyCanvas.getContext("2d");
    devicePixelRatio=getPixelRatio(cxt);
    this.state.options=options;
    this.setState({
      options:options,
      devicePixelRatio:devicePixelRatio
    });
    this.drawCss();



  }
  drawCss(){

    /*
     * css样式
     * */
    this.setState({
      lineObj:{
        width:this.state.options.innerWidth - this.state.options.canvasPaddingLeft * 2 ,
        height: this.state.options.dashedHeight ,
        left: this.state.options.canvasPaddingLeft
      },
      RmyCanvasStyle:{
        backgroundColor: this.state.options.canvasBackgroundColor,
        width:this.state.options.innerWidth,
        height:this.state.options.canvasContainerHeight
      },
      linexStyle:Object.assign({},this.state.lineObj,{
        bottom: this.state.options.xAxisBottom + this.state.options.canvasMarginBottom
      }),
      line0Style: Object.assign({},this.state.lineObj,{
          bottom: this.state.options.xAxisBottom + this.state.options.canvasMarginBottom + this.state.options.dashedHeight * 1
        }),
      line1Style:Object.assign({},this.state.lineObj,{
          bottom: this.state.options.xAxisBottom + this.state.options.canvasMarginBottom + this.state.options.dashedHeight * 2
      }),


      line2Style:Object.assign({},this.state.lineObj,{
        bottom: this.state.options.xAxisBottom + this.state.options.canvasMarginBottom + this.state.options.dashedHeight * 3
      })


    });
    let locationArr = [];
    let ParentNode=document.getElementById(this.props.parentId);
    ParentNode.style.height=this.state.options.canvasContainerHeight ;


    /*
     * 各个坐标点
     * */
    var mostHot = {x: 0, y: 0};
    for (let n = 0; n < this.state.options.originLocationArr.length; n++) {
      if (this.state.options.originLocationArr[n].y > mostHot.y) {
        mostHot = this.state.options.originLocationArr[n]
      }

    }

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
    for (let a = 0; a < this.state.options.originLocationArr.length; a++) {
      locationArr.push({y: ((this.state.options.realCanvasHeight * (this.state.options.originLocationArr[a].y / mostHot.y)).toFixed(2) + this.state.options.xAxisBottom + this.state.options.canvasMarginBottom)})
    }

    /*
     * 绘制最上面的标线
     * */
    cxt.save();
    cxt.beginPath();
    cxt.strokeStyle = this.state.options.fontColor;
    cxt.moveTo((this.state.options.canvasPaddingLeft)*devicePixelRatio, (this.state.options.canvasMarginTop)*devicePixelRatio);
    cxt.lineTo((mostHot.x * this.state.options.perWidth + this.state.options.canvasPaddingLeft + this.state.options.perWidth / 2 - 10)*devicePixelRatio, this.state.options.canvasMarginTop*devicePixelRatio);
    cxt.lineTo((mostHot.x * this.state.options.perWidth + this.state.options.canvasPaddingLeft + this.state.options.perWidth / 2)*devicePixelRatio, (this.state.options.canvasMarginTop + 10)*devicePixelRatio);
    cxt.lineTo((mostHot.x * this.state.options.perWidth + this.state.options.canvasPaddingLeft + this.state.options.perWidth / 2 + 10)*devicePixelRatio, this.state.options.canvasMarginTop*devicePixelRatio);
    cxt.lineTo((this.state.options.innerWidth - 10)*devicePixelRatio, this.state.options.canvasMarginTop*devicePixelRatio);
    cxt.moveTo((mostHot.x * this.state.options.perWidth + this.state.options.canvasPaddingLeft + this.state.options.perWidth / 2)*devicePixelRatio, (this.state.options.canvasMarginTop + 10)*devicePixelRatio);
    cxt.lineTo((mostHot.x * this.state.options.perWidth + this.state.options.canvasPaddingLeft + this.state.options.perWidth / 2)*devicePixelRatio, (this.state.options.canvasContainerHeight - this.state.options.xAxisBottom - this.state.options.canvasMarginBottom)*devicePixelRatio);
    cxt.stroke();
    cxt.closePath();
    cxt.restore();

    /*
     * 绘制y轴坐标
     * */
    cxt.save();
    cxt.beginPath();
    cxt.font=((parseInt(this.state.options.yAxisFontSize*devicePixelRatio)).toString()+'px'+' '+this.state.options.fontFamily+' '+this.state.options.fontWeight);
    // cxt.font = cxt.font.replace(/\d+(\.\d+)?(px|pt|em|%)/i,parseInt(this.state.options.yAxisFontSize*devicePixelRatio).toString()+'px');//替换字体大小
    cxt.fillStyle = this.state.options.fontColor;
    cxt.fillText(parseInt(perPartHotScore).toString(), (this.state.options.canvasPaddingLeft + this.state.options.yAxisAdditionalLeft)*devicePixelRatio, (this.state.options.canvasContainerHeight - this.state.options.xAxisBottom - this.state.options.canvasMarginBottom - this.state.options.optionTop - this.state.options.dashedHeight)*devicePixelRatio);
    cxt.fillText((parseInt(perPartHotScore) * 2).toString(), (this.state.options.canvasPaddingLeft + this.state.options.yAxisAdditionalLeft)*devicePixelRatio, (this.state.options.canvasContainerHeight - this.state.options.xAxisBottom - this.state.options.canvasMarginBottom - this.state.options.optionTop - this.state.options.dashedHeight * 2)*devicePixelRatio);
    cxt.fillText((parseInt(perPartHotScore) * 3).toString(), (this.state.options.canvasPaddingLeft + this.state.options.yAxisAdditionalLeft)*devicePixelRatio, (this.state.options.canvasContainerHeight - this.state.options.xAxisBottom - this.state.options.canvasMarginBottom - this.state.options.optionTop - this.state.options.dashedHeight * 3)*devicePixelRatio);
    cxt.fillText((parseInt(perPartHotScore) * 4).toString(), (this.state.options.canvasPaddingLeft + this.state.options.yAxisAdditionalLeft)*devicePixelRatio, (this.state.options.canvasContainerHeight - this.state.options.xAxisBottom - this.state.options.canvasMarginBottom - this.state.options.optionTop - this.state.options.dashedHeight * 4)*devicePixelRatio);
    cxt.closePath();
    cxt.restore();

    /*
     * 绘制页面上的单个坐标点
     * */
    cxt.save();
    cxt.strokeStyle = this.state.options.lineColor;
    cxt.beginPath();
    cxt.lineJoin = "round";
    cxt.lineWidth = this.state.options.lineWidth;
    cxt.translate(this.state.options.lineOffset,this.state.options.lineOffset);
    for (let i = 0; i < locationArr.length; i++) {
      if (locationArr[i].y > mostHot.y) {
        mostHot = locationArr[i]
      }
      if (i === 0) {
        cxt.moveTo((this.state.options.perWidth / 2 + this.state.options.canvasPaddingLeft + i * this.state.options.perWidth)*devicePixelRatio, (this.state.options.canvasContainerHeight - locationArr[i].y - this.state.options.canvasMarginBottom - this.state.options.xAxisBottom)*devicePixelRatio);
      } else {
        cxt.lineTo((this.state.options.perWidth / 2 + this.state.options.canvasPaddingLeft + i * this.state.options.perWidth)*devicePixelRatio, (this.state.options.canvasContainerHeight - locationArr[i].y - this.state.options.canvasMarginBottom - this.state.options.xAxisBottom)*devicePixelRatio);
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

    cxt.font=parseInt(this.state.options.xAxisFontSize*devicePixelRatio)+'px'+' '+this.state.options.fontFamily+' '+this.state.options.fontWeight;
    cxt.textAlign = 'center';
    cxt.fillStyle = this.state.options.fontColor;
    cxt.lineWidth = 1;

    for (let m = 0; m < this.state.options.hotTypeName.length; m++) {
      cxt.save();
      cxt.translate((this.state.options.perWidth / 2 + this.state.options.canvasPaddingLeft + m * this.state.options.perWidth)*devicePixelRatio, (this.state.options.canvasContainerHeight - this.state.options.xAxisBottom)*devicePixelRatio);
      cxt.rotate(this.state.options.xAxisTxtRotateAngle * Math.PI / 180);
      cxt.fillText(this.state.options.hotTypeName[m], 0, 0);
      cxt.restore();
    }

    cxt.closePath();
    cxt.restore();

    /*
     * 绘制阴影区域
     * */
    cxt.save();
    cxt.beginPath();
    cxt.strokeStyle = this.state.options.shadowBackgroundColor;
    cxt.fillStyle = this.state.options.shadowBackgroundColor;
    cxt.moveTo((this.state.options.perWidth / 2 + this.state.options.canvasPaddingLeft)*devicePixelRatio, (this.state.options.canvasContainerHeight - this.state.options.xAxisBottom - this.state.options.canvasMarginBottom)*devicePixelRatio);
    for (let p = 0; p < locationArr.length; p++) {
      cxt.lineTo((this.state.options.perWidth / 2 + this.state.options.canvasPaddingLeft + p * this.state.options.perWidth)*devicePixelRatio, (this.state.options.canvasContainerHeight - locationArr[p].y - this.state.options.canvasMarginBottom - this.state.options.xAxisBottom)*devicePixelRatio);
    }
    cxt.lineTo((this.state.options.perWidth / 2 + this.state.options.canvasPaddingLeft + (this.state.options.hotTypeName.length-1) * this.state.options.perWidth)*devicePixelRatio, (this.state.options.canvasContainerHeight - this.state.options.xAxisBottom - this.state.options.canvasMarginBottom)*devicePixelRatio);
    cxt.lineTo((this.state.options.perWidth / 2 + this.state.options.canvasPaddingLeft)*devicePixelRatio, (this.state.options.canvasContainerHeight - this.state.options.xAxisBottom - this.state.options.canvasMarginBottom)*devicePixelRatio);
    cxt.stroke();
    cxt.fill();
    cxt.closePath();
    cxt.restore();

    let toolTip=document.getElementById(this.state.options.tooltipId);
    let toolTipWidth=toolTip.offsetWidth;
    let toolTipHeight=toolTip.offsetHeight;
    let circleBox=document.getElementById('Rcircle');
    let circleBoxHeight=circleBox.offsetHeight;
    let circleBoxWidth=circleBox.offsetWidth;
    toolTip.style.left=(mostHot.x) * this.state.options.perWidth + this.state.options.canvasPaddingLeft + this.state.options.perWidth/2 - toolTipWidth/2;
    toolTip.style.top=this.state.options.canvasContainerHeight-this.state.options.xAxisBottom-this.state.options.canvasMarginBottom-this.state.options.realCanvasHeight-toolTipHeight-circleBoxHeight/2;
    circleBox.style.left=(mostHot.x) * this.state.options.perWidth + this.state.options.canvasPaddingLeft + this.state.options.perWidth/2 - circleBoxWidth/2;
    circleBox.style.top=this.state.options.canvasContainerHeight-this.state.options.xAxisBottom-this.state.options.canvasMarginBottom-this.state.options.realCanvasHeight-circleBoxHeight/2;


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
        <canvas id="R-myCanvas" style={this.state.RmyCanvasStyle} width={this.state.options.innerWidth*this.state.devicePixelRatio} height={this.state.options.canvasContainerHeight*this.state.devicePixelRatio}></canvas>
      </div>
    )

  }

}
