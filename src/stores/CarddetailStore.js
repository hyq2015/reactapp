import Reflux from 'reflux';
import CarddetailActions from '../actions/CarddetailActions';
import AppStore from './AppStore';
import _ from 'lodash';
import CONFIG,{XHR} from '../static/js/request';
let CarddetailStore = Reflux.createStore({
  init: function () {
    this.data = {
        indexLoading:true,
        originData:{
            scaleDto:{}
        },
        reviseCard:false,
        cardUsed:false,
        cardOverview:{}
    };
  },
  listenables: CarddetailActions,
  getInitialState() {
    return this.data
  },
  
  onLoadData:async function(id){
    try{
        const res=await XHR(CONFIG.baseUrl+CONFIG.alphaPath.cardDetail+'/'+id,{},'get');
        res.cardDetail.useCount=res.cardDetail.remainAmount;
        this.data.originData=res;
        this.data.indexLoading=false;
    }catch(err){
        this.data.indexLoading=false;
        this.data.originData={};
        alert('请求异常')
    }finally{
        this.trigger(this.data);
    }
  },
  onUpdateCount:async function(id,count,originData){
    try{
        let data=originData;
        const res=await XHR(CONFIG.baseUrl+CONFIG.alphaPath.reviseCardCount,{'cardId':id,'amount':count},'get');
        this.data.reviseCard=false;
        data.cardDetail.useCount=count;
        data.secritCode=res.secritCode;
        this.data.originData=data;
        
    }catch(err){
        this.data.reviseCard=true;
        alert('请求异常')
    }finally{
        this.data.showLoading=false;
        this.trigger(this.data);
    }
  },
  onCheckCardUsed:async function(code,originState){
    let data=originState; 
    try{
        const res=await XHR(CONFIG.baseUrl+CONFIG.alphaPath.checkIfCardUsed,{'code':code},'get');
        data.cardOverview=res;
    }catch(err){
        alert('请求异常')
    }finally{
        this.trigger(data);
    }
  }
})
export default CarddetailStore
