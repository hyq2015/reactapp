import Reflux from 'reflux';
import MycardActions from '../actions/MycardActions';
import AppStore from './AppStore';
import _ from 'lodash';
import CONFIG,{XHR} from '../static/js/request';
let MycardStore = Reflux.createStore({
  init: function () {
    this.data = {
        indexLoading:true,
        originData:{},
        nodata:false,
        loading:false
    };
  },
  listenables: MycardActions,
  getInitialState() {
    return this.data
  },
  
  onLoadData:async function(jsonobj,originData,path){
    try{
        const res=await XHR(CONFIG.baseUrl+path,jsonobj,'post');
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
        if(this.data.originData.content.length<1){
            this.data.nodata=true;
        }else{
            this.data.nodata=false;
        }
        this.data.loading=false;
        this.trigger(this.data);
    }
  },
  
})
export default MycardStore