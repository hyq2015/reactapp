/**
 * Created by admin on 2017/4/2.
 */
import Reflux from 'reflux';
import PlayActions from '../actions/PlayActions';
import AppStore from './AppStore';
// import ListStore from './ListStore';
// import Promise from 'bluebird';
import CONFIG,{XHR} from '../static/js/request';
const options={
  hotTypeName:null,//x轴坐标名字与热度指数一一对应
  originLocationArr: null,//热度指数
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
let PlayStore = Reflux.createStore({
  init: function () {
    this.data = {
      msg:'ok',
      indexData:{
         RANK:[],
         NICE:[],
         CHANCE:[]
      },
      nearList:[],
      options:{}
    };
  },
  listenables: PlayActions,
  getInitialState() {
    return this.data
  },
  onInit:function(){
    AppStore.onPlayTab();
  },
  onGetIndexList:async function(){
    try {
      const res=await XHR(CONFIG.baseUrl+CONFIG.alphaPath.indexData,{},'post');
      this.data.indexData=res;
      if(this.data.indexData.RANK && this.data.indexData.RANK.length>0){
            let biggestScore=0,biggestItem=0,hotTypename=[],originLocationArr=[];
            let rankLength=this.data.indexData.RANK.length;
            let hotArr=this.data.indexData.RANK;
            hotArr.sort(function(a,b){
                return a.displayIndex-b.displayIndex
            })
            
            for(let i=0;i<hotArr.length;i++){
                    hotTypename.push(hotArr[i].theme.shortName);
                    originLocationArr.push({x:i,y:hotArr[i].theme.score});
                    if(i>=7){
                        break;
                    }
            }
                options.hotTypeName=hotTypename;
                options.originLocationArr=originLocationArr;
                this.data.options=options;
        }
      this.data.msg='ok';
    }catch(err){
      if(err=='noRight'){
        this.data.msg = 'noRight';
      }else{
        this.data.msg = 'error';
      }
      this.data.indexData = null;
    }finally{
      this.trigger(this.data);
    }
  },
  onGetNearBy:async function(){
    try {
      const res=await XHR(CONFIG.baseUrl+CONFIG.alphaPath.findnearby,{"lat":"104.06487","lng":"30.54742"},'post');
      this.data.nearList=res;
      this.data.msg='ok';
    }catch(err){
      if(err=='noRight'){
        this.data.msg = 'noRight';
      }else{
        this.data.msg = 'error';
      }
      this.data.nearList = null;
    }finally{
      this.trigger(this.data);
    }
  },
  onAdd:async function(grammar){
    try {
      const t = await f();
      this.data.grammar = '123';
      this.data.playData = t;
    } catch (err) {
      console.log(err);
      if(err=='noRight'){
        this.data.grammar = 'noRight';
      }else{
        this.data.grammar = 'error';
      }

      this.data.playData = null;
    } finally {
      // ListStore.onChangename();
      this.trigger(this.data);

    }

  }
});
export default PlayStore
