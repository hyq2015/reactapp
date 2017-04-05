import React,{Component} from 'react';
import {render} from 'react-dom';
import { Link} from 'react-router';
import _ from 'lodash';
import Searchbar from './Searchbar';
import Swiper from './Swipper';
import NewSwiper from 'swiper';
import Rchart from './Rchart';
import Card from './Card';
import Cardstar from './Cardstar';
import 'babel-polyfill';
import MainStore from '../stores/MainStore';
import MainActions from '../actions/MainActions';
let request=require('../static/js/request');
import '../static/styles/swiper-3.4.1.min.css';
import '../static/styles/play.less';
import '../static/styles/play.css';
import '../static/styles/R-chart.css';

const options={
  hotTypeName:['赏花','野菜','川西','温泉','骑行','爬山','步道','古镇'],//x轴坐标名字与热度指数一一对应
  originLocationArr: [{x: 0, y: 2540}, {x: 1, y: 2560}, {x: 2, y: 1651}, {x: 3, y: 2270}, {x: 4, y: 2740}, {
    x: 5,
    y: 1578
  }, {x: 6, y: 1410}, {x: 7, y: 1470}],//热度指数
  realCanvasHeight:120,  //图表区域高度
  canvasMarginTop: 30,
  tooltipId:'whiteboard1',
  canvasBackgroundColor:'rgba(255,255,255,0)',
  'topBarMarginTop': 45,
  'xAxisFontSize':'12',
  'yAxisFontSize':'9',
  'lineWidth':2,
  'fontColor':'rgba(255,255,255,0.8)',
  'optionTop': 6,//y轴坐标下间距
  'yAxisAdditionalLeft': 4,//y轴坐标左间距
};
const playStyle={
    height:'calc(100vh - 50px)',
    overflowY:'scroll'
};
var mySwiper,mySwiper1;
export default class Play extends Component{
    constructor(props){
        super(props);
        this.state={
           indexData:{}
        }
    }

    componentWillUnmount() {
      mySwiper=null;
      mySwiper1=null;
      if (_.isFunction(this.unsubscribe)){
        this.unsubscribe();
      }
        
    }

    componentDidMount(){
      this.unsubscribe = MainStore.listen(function(state) {
        this.setState(state);
      }.bind(this));

      this._fetchData();
      this._fetchNearby();
    
    }
    componentDidUpdate(){
        if(_.has(this.state.indexData,'RANK')){
            if(!mySwiper){
                mySwiper = new NewSwiper ('.swiperFir', {
                    slidesPerView: 'auto',
                    freeMode: true
                });
            }
            if(!mySwiper1){
                mySwiper1 = new NewSwiper ('.swiperSec', {
                    slidesPerView: 'auto',
                    freeMode: true
                });
            }
        }
        
    }
    _fetchData(){
      MainActions.getIndexList();
    }
    _fetchNearby(){
      MainActions.getNearBy();
    }
    render(){
        return(
            <div id="playContainer" style={playStyle}>
                <div className="topbg">
                    <Searchbar></Searchbar>
                    <div id="canvas">
                        <div id="whiteboard1">TOP1</div>
                      <Rchart parentId="canvas" options={options}></Rchart>
                    </div>
                </div>
                <div className="thehot">
                    <p className="theme">热度排行</p>
                    <p className="feature">"大家都在玩，来一场浪漫的邂逅"</p>
                    <div className="swiper-container swiperFir">
                        <Swiper hotlist={this.state.indexData.RANK}></Swiper>
                    </div>
                </div>

                <div className="characteristic clearfloat">
                    <p className="theme">独具特色</p>
                    <p className="feature">"这地方特别好，可你却不知道"</p>
                    <div className="swiper-container swiperSec">
                        <Swiper featurelist={this.state.indexData.NICE}></Swiper>
                    </div>
                </div>

                <div className="chance clearfloat">
                    <p className="theme">机会难得</p>
                    <p className="feature">"机不可失，失不再来"</p>
                    <Card class="chanceItem" chancelist={this.state.indexData.CHANCE}></Card>
                </div>

                <div className="nearby clearfloat">
                <p className="theme">附近</p>
                <p className="feature">好吃好玩</p>
                <Cardstar class="cardItem clearfloat" nearlist={this.state.nearList}></Cardstar>
                </div>

            </div>
        )
    }
}
// reactMixin.onClass(Play, Reflux.connect(MainStore));
