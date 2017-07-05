/**
 * Created by Ricky on 2017/3/16.
 */
;(function ($, window, document) {
    var windowWidth=window.innerWidth;
    var Rchart = function (ele, options) {
        this.element = ele;
        this.defaults = {
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
        this.options = Object.assign({}, this.defaults, options);
        this.options.dashedHeight = this.options.realCanvasHeight / 4;
        this.options.canvasContainerHeight = this.options.realCanvasHeight + this.options.topBarMarginTop + this.options.canvasMarginTop + this.options.xAxisBottom + this.options.canvasMarginBottom;
        this.options.perWidth = (this.options.innerWidth - this.options.canvasPaddingLeft * 2) / this.options.hotTypeName.length;
    };
    function getPixelRatio(context) {
        var backingStore = context.backingStorePixelRatio ||
            context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio || 1;

        return (window.devicePixelRatio || 1) / backingStore;
    }
    var devicePixelRatio=1;
    Rchart.prototype = {
        build: function () {
            $('<div id="Rcircle"><div id="R-innerCircle"></div></div><div class="R-canvas-line R-canvas-linex"></div>' +
                '<div class="R-canvas-line R-canvas-line0"></div>' +
                '<div class="R-canvas-line R-canvas-line1"></div>' +
                '<div class="R-canvas-line R-canvas-line2"></div>' +
                '<canvas id="R-myCanvas"></canvas>').appendTo(this.element);
            var RmyCanvas = document.getElementById("R-myCanvas");
            var cxt = RmyCanvas.getContext("2d");

            devicePixelRatio=getPixelRatio(cxt);

            /*
            * 根据devicePixelRatio重新定义options
            * */


            /*
             * css样式
             * */
            $('.R-canvas-line').css({
                width: this.options.innerWidth - this.options.canvasPaddingLeft * 2 + 'px',
                height: this.options.dashedHeight + 'px',
                left: this.options.canvasPaddingLeft + 'px'
            });
            var locationArr = [];
            this.element.css('height', this.options.canvasContainerHeight + 'px');
            RmyCanvas.setAttribute('width', this.options.innerWidth*devicePixelRatio);
            RmyCanvas.setAttribute('height', this.options.canvasContainerHeight*devicePixelRatio);
            RmyCanvas.css({
                backgroundColor: this.options.canvasBackgroundColor,
                width:this.options.innerWidth,
                height:this.options.canvasContainerHeight
            });
            $('.R-canvas-line0').css({
                bottom: this.options.xAxisBottom + this.options.canvasMarginBottom + this.options.dashedHeight * 1 + 'px'
            });
            $('.R-canvas-linex').css({
                bottom: this.options.xAxisBottom + this.options.canvasMarginBottom + 'px'
            });
            $('.R-canvas-line1').css({
                bottom: this.options.xAxisBottom + this.options.canvasMarginBottom + this.options.dashedHeight * 2 + 'px'
            });
            $('.R-canvas-line2').css({
                bottom: this.options.xAxisBottom + this.options.canvasMarginBottom + this.options.dashedHeight * 3 + 'px'
            });

            /*
             * 各个坐标点
             * */
            var mostHot = {x: 0, y: 0};
            for (var n = 0; n < this.options.originLocationArr.length; n++) {
                if (this.options.originLocationArr[n].y > mostHot.y) {
                    mostHot = this.options.originLocationArr[n]
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
            for (var a = 0; a < this.options.originLocationArr.length; a++) {
                locationArr.push({y: ((this.options.realCanvasHeight * (this.options.originLocationArr[a].y / mostHot.y)).toFixed(2) + this.options.xAxisBottom + this.options.canvasMarginBottom)})
            }

            /*
             * 绘制最上面的标线
             * */
            cxt.save();
            cxt.beginPath();
            cxt.strokeStyle = this.options.fontColor;
            cxt.moveTo((this.options.canvasPaddingLeft)*devicePixelRatio, (this.options.canvasMarginTop)*devicePixelRatio);
            cxt.lineTo((mostHot.x * this.options.perWidth + this.options.canvasPaddingLeft + this.options.perWidth / 2 - 10)*devicePixelRatio, this.options.canvasMarginTop*devicePixelRatio);
            cxt.lineTo((mostHot.x * this.options.perWidth + this.options.canvasPaddingLeft + this.options.perWidth / 2)*devicePixelRatio, (this.options.canvasMarginTop + 10)*devicePixelRatio);
            cxt.lineTo((mostHot.x * this.options.perWidth + this.options.canvasPaddingLeft + this.options.perWidth / 2 + 10)*devicePixelRatio, this.options.canvasMarginTop*devicePixelRatio);
            cxt.lineTo((this.options.innerWidth - 10)*devicePixelRatio, this.options.canvasMarginTop*devicePixelRatio);
            cxt.moveTo((mostHot.x * this.options.perWidth + this.options.canvasPaddingLeft + this.options.perWidth / 2)*devicePixelRatio, (this.options.canvasMarginTop + 10)*devicePixelRatio);
            cxt.lineTo((mostHot.x * this.options.perWidth + this.options.canvasPaddingLeft + this.options.perWidth / 2)*devicePixelRatio, (this.options.canvasContainerHeight - this.options.xAxisBottom - this.options.canvasMarginBottom)*devicePixelRatio);
            cxt.stroke();
            cxt.closePath();
            cxt.restore();

            /*
             * 绘制y轴坐标
             * */
            cxt.save();
            cxt.beginPath();
            cxt.font=((parseInt(this.options.yAxisFontSize*devicePixelRatio)).toString()+'px'+' '+this.options.fontFamily+' '+this.options.fontWeight);
            // cxt.font = cxt.font.replace(/\d+(\.\d+)?(px|pt|em|%)/i,parseInt(this.options.yAxisFontSize*devicePixelRatio).toString()+'px');//替换字体大小
            cxt.fillStyle = this.options.fontColor;
            cxt.fillText(parseInt(perPartHotScore).toString(), (this.options.canvasPaddingLeft + this.options.yAxisAdditionalLeft)*devicePixelRatio, (this.options.canvasContainerHeight - this.options.xAxisBottom - this.options.canvasMarginBottom - this.options.optionTop - this.options.dashedHeight)*devicePixelRatio);
            cxt.fillText((parseInt(perPartHotScore) * 2).toString(), (this.options.canvasPaddingLeft + this.options.yAxisAdditionalLeft)*devicePixelRatio, (this.options.canvasContainerHeight - this.options.xAxisBottom - this.options.canvasMarginBottom - this.options.optionTop - this.options.dashedHeight * 2)*devicePixelRatio);
            cxt.fillText((parseInt(perPartHotScore) * 3).toString(), (this.options.canvasPaddingLeft + this.options.yAxisAdditionalLeft)*devicePixelRatio, (this.options.canvasContainerHeight - this.options.xAxisBottom - this.options.canvasMarginBottom - this.options.optionTop - this.options.dashedHeight * 3)*devicePixelRatio);
            cxt.fillText((parseInt(perPartHotScore) * 4).toString(), (this.options.canvasPaddingLeft + this.options.yAxisAdditionalLeft)*devicePixelRatio, (this.options.canvasContainerHeight - this.options.xAxisBottom - this.options.canvasMarginBottom - this.options.optionTop - this.options.dashedHeight * 4)*devicePixelRatio);
            cxt.closePath();
            cxt.restore();

            /*
             * 绘制页面上的单个坐标点
             * */
            cxt.save();
            cxt.strokeStyle = this.options.lineColor;
            cxt.beginPath();
            cxt.lineJoin = "round";
            cxt.lineWidth = this.options.lineWidth;
            cxt.translate(this.options.lineOffset,this.options.lineOffset);
            for (var i = 0; i < locationArr.length; i++) {
                if (locationArr[i].y > mostHot.y) {
                    mostHot = locationArr[i]
                }
                if (i === 0) {
                    cxt.moveTo((this.options.perWidth / 2 + this.options.canvasPaddingLeft + i * this.options.perWidth)*devicePixelRatio, (this.options.canvasContainerHeight - locationArr[i].y - this.options.canvasMarginBottom - this.options.xAxisBottom)*devicePixelRatio);
                } else {
                    cxt.lineTo((this.options.perWidth / 2 + this.options.canvasPaddingLeft + i * this.options.perWidth)*devicePixelRatio, (this.options.canvasContainerHeight - locationArr[i].y - this.options.canvasMarginBottom - this.options.xAxisBottom)*devicePixelRatio);
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

            cxt.font=parseInt(this.options.xAxisFontSize*devicePixelRatio)+'px'+' '+this.options.fontFamily+' '+this.options.fontWeight;
            cxt.textAlign = 'center';
            cxt.fillStyle = this.options.fontColor;
            cxt.lineWidth = 1;

            for (var m = 0; m < this.options.hotTypeName.length; m++) {
                cxt.save();
                cxt.translate((this.options.perWidth / 2 + this.options.canvasPaddingLeft + m * this.options.perWidth)*devicePixelRatio, (this.options.canvasContainerHeight - this.options.xAxisBottom)*devicePixelRatio);
                cxt.rotate(this.options.xAxisTxtRotateAngle * Math.PI / 180);
                cxt.fillText(this.options.hotTypeName[m], 0, 0);
                cxt.restore();
            }

            cxt.closePath();
            cxt.restore();

            /*
             * 绘制阴影区域
             * */
            cxt.save();
            cxt.beginPath();
            cxt.strokeStyle = this.options.shadowBackgroundColor;
            cxt.fillStyle = this.options.shadowBackgroundColor;
            cxt.moveTo((this.options.perWidth / 2 + this.options.canvasPaddingLeft)*devicePixelRatio, (this.options.canvasContainerHeight - this.options.xAxisBottom - this.options.canvasMarginBottom)*devicePixelRatio);
            for (var p = 0; p < locationArr.length; p++) {
                cxt.lineTo((this.options.perWidth / 2 + this.options.canvasPaddingLeft + p * this.options.perWidth)*devicePixelRatio, (this.options.canvasContainerHeight - locationArr[p].y - this.options.canvasMarginBottom - this.options.xAxisBottom)*devicePixelRatio);
            }
            cxt.lineTo((this.options.perWidth / 2 + this.options.canvasPaddingLeft + (this.options.hotTypeName.length-1) * this.options.perWidth)*devicePixelRatio, (this.options.canvasContainerHeight - this.options.xAxisBottom - this.options.canvasMarginBottom)*devicePixelRatio);
            cxt.lineTo((this.options.perWidth / 2 + this.options.canvasPaddingLeft)*devicePixelRatio, (this.options.canvasContainerHeight - this.options.xAxisBottom - this.options.canvasMarginBottom)*devicePixelRatio);
            cxt.stroke();
            cxt.fill();
            cxt.closePath();
            cxt.restore();
            var toolTip=$('#'+this.options.tooltipId);
            var toolTipWidth=toolTip[0].offsetWidth;
            var toolTipHeight=toolTip[0].offsetHeight;
            var circleBox=$('#Rcircle');
            var circleBoxHeight=circleBox[0].offsetHeight;
            var circleBoxWidth=circleBox[0].offsetWidth;

            toolTip.css({
                left: (mostHot.x) * this.options.perWidth + this.options.canvasPaddingLeft + this.options.perWidth/2 - toolTipWidth/2+ 'px',
                top: this.options.canvasContainerHeight-this.options.xAxisBottom-this.options.canvasMarginBottom-this.options.realCanvasHeight-toolTipHeight-circleBoxHeight/2+'px'
            });
            circleBox.css({
                left:(mostHot.x) * this.options.perWidth + this.options.canvasPaddingLeft + this.options.perWidth/2 - circleBoxWidth/2+ 'px',
                top:this.options.canvasContainerHeight-this.options.xAxisBottom-this.options.canvasMarginBottom-this.options.realCanvasHeight-circleBoxHeight/2+ 'px'
            });

        }
    };

    $.fn.Rchart = function (options) {
        //创建Rchart的实体
        var newRchart = new Rchart(this, options);
        //调用其方法
        return newRchart;
    }


})(jQuery, window, document);
