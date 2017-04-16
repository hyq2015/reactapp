import Reflux from 'reflux';
import SearchpageActions from '../actions/SearchpageActions';
import CONFIG,{XHR} from '../static/js/request';
let SearchpageStore = Reflux.createStore({
    init: function () {
    this.data = {
        hotSearchKeys:[]
    };
  },
  listenables: SearchpageActions,
  getInitialState() {
    return this.data
  },
  onLoadHotFromServer:async function(){
    try{
        const res=await XHR(CONFIG.baseUrl+CONFIG.alphaPath.hotsearch,{},'get');
        this.data.hotSearchKeys=res.hotSearchKeys;
        window.sessionStorage.hotSearchKeys=JSON.stringify(res.hotSearchKeys);
    }catch(err){
        alert('请求异常');
        this.data.hotSearchKeys=[];
    }finally{
        this.trigger(this.data)
    }
  }
})
export default SearchpageStore