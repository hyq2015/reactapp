import Reflux from 'reflux';
import CardsuccessActions from '../actions/CardsuccessActions';
import AppStore from './AppStore';
import _ from 'lodash';
import CONFIG,{XHR} from '../static/js/request';
let CardsuccessStore = Reflux.createStore({
  init: function () {
    this.data = {
        indexLoading:true
    };
  },
  listenables: CardsuccessActions,
  getInitialState() {
    return this.data
  },
  onLoadData:async function(id){
    try{
        const res=await XHR(CONFIG.baseUrl+CONFIG.alphaPath.cardUseSuccess+'/'+id,{},'get');
        this.data.originData=res;
        this.data.indexLoading=false;
    }catch(err){
        this.data.indexLoading=false;
        this.data.originData={};
        alert('请求异常')
    }finally{
        this.trigger(this.data);
    }
  }
})
export default CardsuccessStore
  