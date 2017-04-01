import React,{Component} from 'react';
import {render} from 'react-dom';
import { Link} from 'react-router';
import Searchbar from './Searchbar';
import Swiper from './Swipper';
import NewSwiper from 'swiper';
import Card from './Card';
import Cardstar from './Cardstar';
let request=require('../static/js/request');
import '../static/styles/swiper-3.4.1.min.css';
import '../static/styles/play.less';
import '../static/styles/play.css';
import '../static/styles/R-chart.css';


const playStyle={
    minHeight:'calc(100vh - 49px)'
}
export default class extends Component{
    constructor(props){
        super(props);
        this.state={
            hotlist:[{'imgurl':'../static/images/loaderr.png','title':'',theme:{'score':''}}],
            featurelist:[{'imgurl':'../static/images/loaderr.png','title':'',theme:{'score':''}}]
        }
    }
    componentDidMount(){
        this._fetchData();
        this._fetchNearby();
        let newChart=$('#canvas').Rchart({
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
            });
            newChart.build();
    }
    componentDidUpdate(){
        console.log('update');
        let mySwiper = new NewSwiper ('.swiperFir', {
            slidesPerView: 'auto',
            freeMode: true
        });
        let mySwiper1 = new NewSwiper ('.swiperSec', {
            slidesPerView: 'auto',
            freeMode: true
        });
    }
    _fetchData(){
        request.http.post(request.baseUrl+request.alphaPath.indexData,{}).then((res)=>{
            console.log(res);
            this.setState({
                hotlist:res.RANK,
                featurelist:res.NICE,
                chancelist:res.CHANCE

            });

        })
    }
    _fetchNearby(){
        request.http.post(request.baseUrl+request.alphaPath.findnearby,{"lat":"104.06487","lng":"30.54742"}).then((res)=>{
            console.log(res);
            this.setState({
                nearlist:res
            });

        })
    }
    render(){
        return(
            <div id="playContainer" style={playStyle}>
                <div className="topbg">
                    <Searchbar></Searchbar>
                    <div id="canvas">
                        <div id="whiteboard1">TOP1</div>
                    </div>
                </div>
                <div className="thehot">
                    <p className="theme">热度排行</p>
                    <p className="feature">"大家都在玩，来一场浪漫的邂逅"</p>
                    <div className="swiper-container swiperFir">
                        <Swiper hotlist={this.state.hotlist}></Swiper>
                    </div>
                </div>

                <div className="characteristic clearfloat">
                    <p className="theme">独具特色</p>
                    <p className="feature">"这地方特别好，可你却不知道"</p>
                    <div className="swiper-container swiperSec">
                        <Swiper featurelist={this.state.featurelist}></Swiper>
                    </div>
                </div>

                <div className="chance clearfloat">
                    <p className="theme">机会难得</p>
                    <p className="feature">"机不可失，失不再来"</p>
                    <Card class="chanceItem" chancelist={this.state.chancelist}></Card>
                </div>

                <div className="nearby clearfloat">
                <p className="theme">附近</p>
                <p className="feature">好吃好玩</p>
                <Cardstar class="cardItem clearfloat" nearlist={this.state.nearlist}></Cardstar>
                </div>

            </div>
        )
    }
}
