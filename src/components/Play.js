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
import PlayStore from '../stores/PlayStore';
import PlayActions from '../actions/PlayActions';
let request=require('../static/js/request');
import '../static/styles/swiper-3.4.1.min.css';
import '../static/styles/play.less';
import '../static/styles/play.css';
import '../static/styles/R-chart.css';


const playStyle={
    minHeight:'calc(100vh - 50px)',
    paddingBottom:50
};
var mySwiper,mySwiper1;
export default class Play extends Component{
    constructor(props){
        super(props);
        this.state={
           indexData:{
               
           },
           options:null
        }
        this._init=this._init.bind(this);
    }

    componentWillUnmount() {
      mySwiper=null;
      mySwiper1=null;
      if (_.isFunction(this.unsubscribe)){
        this.unsubscribe();
      }
        
    }

    componentDidMount(){
      this.unsubscribe = PlayStore.listen(function(state) {
        this.setState(state);
      }.bind(this));

      this._fetchData();
      this._fetchNearby();
    }
    componentDidUpdate(){
        if(_.has(this.state.indexData,'RANK')){
            if(!mySwiper){
                setTimeout(function(){
                    mySwiper = new NewSwiper ('.swiperFir', {
                        slidesPerView: 'auto',
                        freeMode: true
                    });
                },200)
                
            }
            if(!mySwiper1){
                setTimeout(function(){
                    mySwiper1 = new NewSwiper ('.swiperSec', {
                        slidesPerView: 'auto',
                        freeMode: true
                    });
                },200)
                
            }
        }
        
    }
    _init(){
        PlayActions.init();
    }
    _fetchData(){
      PlayActions.getIndexList();
    }
    _fetchNearby(){
      PlayActions.getNearBy();
    }
    render(){
        return(
            <div id="playContainer" style={playStyle}>
                <div className="topbg">
                    <Searchbar></Searchbar>
                    {(this.state.options && this.state.options.hotTypeName) ? 
                        <div id="canvas">
                        <div id="whiteboard1">TOP1</div>
                        <Rchart parentId="canvas" options={this.state.options} />
                    </div>
                     : <div style={{height:235}}></div>}
                    
                </div>
                <div className="thehot">
                    <p className="theme">热度排行</p>
                    <p className="feature">"大家都在玩，来一场浪漫的邂逅"</p>
                    <div className="swiper-container swiperFir">
                        {this.state.indexData.RANK && this.state.indexData.RANK.length>0 ? <Swiper hotlist={this.state.indexData.RANK}></Swiper> : ''}
                        
                    </div>
                </div>

                <div className="characteristic clearfloat">
                    <p className="theme">独具特色</p>
                    <p className="feature">"这地方特别好，可你却不知道"</p>
                    <div className="swiper-container swiperSec">
                        {this.state.indexData.NICE && this.state.indexData.NICE.length>0 ? <Swiper featurelist={this.state.indexData.NICE}></Swiper> : ''}
                        
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
