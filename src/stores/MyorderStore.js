import Reflux from 'reflux';
import MyorderActions from '../actions/MyorderActions';
import AppStore from './AppStore';
import _ from 'lodash';
import CONFIG,{XHR} from '../static/js/request';
let MyorderStore = Reflux.createStore({
  init: function () {
    this.data = {
        indexLoading:true,
        navbars:[
                {'name':'全部','active':true},
                {'name':'待付款','active':false},
                {'name':'已付款','active':false},
                {'name':'已完成','active':false},
                {'name':'退款/售后','active':false}
            ],
        originData:{},
        nodata:false
    };
  },
  listenables: MyorderActions,
  getInitialState() {
    return this.data
  },
  
  onLoadData:async function(jsonobj,originData){
    try{
        const res=await XHR(CONFIG.baseUrl+CONFIG.alphaPath.allorder,jsonobj,'post');
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
  onDeleteOrder:async function(id,originData){
    try{
        const res=await XHR(CONFIG.baseUrl+CONFIG.alphaPath.deleteOrder+id,{},'get');
        if(originData.content.length==1){
          this.data.originData=originData;
          this.data.originData.content=[];
          this.data.originData.last=true;
          this.data.nodata=true;
        }else{
          let content=originData.content;
          let newcontent=_.filter(content,function(n){
              return n.id!=id;
          })
          this.data.originData=originData;
          this.data.originData.content=newcontent;
        }
    }catch(err){
        this.data.originData=originData;
        alert('请求异常')
    }finally{
        if(this.data.originData.content.length<1){
            this.data.nodata=true;
        }else{
            this.data.nodata=false;
        }
      this.trigger(this.data);
    }
  }
})
export default MyorderStore