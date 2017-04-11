import Reflux from 'reflux';
import MallActions from '../actions/MallActions';
import AppStore from './AppStore';
import CONFIG,{XHR} from '../static/js/request';
let MallStore = Reflux.createStore({
  init: function () {
    this.data = {
        indexLoading:true,
        originData:{
          content:[]
        }
    };
  },
  listenables: MallActions,
  getInitialState() {
    return this.data
  },
  onInit:function(){
      AppStore.onMallTab();
  },
  
  onLoadData:async function(jsonobj,originData){
    try{
        const res=await XHR(CONFIG.baseUrl+CONFIG.alphaPath.mallInfo,jsonobj,'post');
        if(originData.content.length<1){
          this.data.originData= res;
        }else{
          let content=originData.content;
          this.data.originData=res;
          this.data.originData.content=content.concat(res.content);
        }
        this.data.indexLoading=false;
    }catch(err){
        this.data.indexLoading=false;
        this.data.originData=originData;
        alert('请求异常')
    }finally{
      this.trigger(this.data);
    }
  }
})
export default MallStore