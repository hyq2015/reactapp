import Reflux from 'reflux';
import AddaddressActions from '../actions/AddaddressActions';
import CONFIG,{XHR} from '../static/js/request';
let AddaddressStore = Reflux.createStore({
  init: function () {
    this.data = {
      canSave:false,
      showselect:false,
      errRemind:'手机号格式错误',
      errorShow:false,
      errorToastShow:false,
      receiverArea:'',
      saveAddressSuccess:false,
      addressObj:{
        address:null,
        area:'',
        city:'',
        defaultFlag:false,
        id:null,
        lat:null,
        lng:null,
        province:'',
        receiverAddress:'',
        receiverName:'',
        receiverPhone:'',
        town:''
      },
      newAddressid:''
    };
  },
  listenables: AddaddressActions,
  getInitialState() {
    return this.data
  },
  onGetAddressDetail:async function(id){
    try{
        const res=await XHR(CONFIG.baseUrl+CONFIG.alphaPath.addressDetail+id,{},'get');
        let area=res.area ? res.area : '';
        this.data.receiverArea=res.province+' '+res.city+' '+area;
        this.data.canSave=true;
        this.data.addressObj=res;
        this.data.saveAddressSuccess=false;
    }catch(err){
        alert('获取地址详情失败')
    }finally{
        this.trigger(this.data);
    }
  },
  onSaveAddress:async function(addressObj){
    try{
        const res=await XHR(CONFIG.baseUrl+CONFIG.alphaPath.saveAddress,addressObj,'post');
        this.data.saveAddressSuccess=true;
        this.data.newAddressid=res.id;
    }catch(err){
        this.data.saveAddressSuccess=false;
        alert('保存地址失败')
    }finally{
        this.trigger(this.data);
    }
  }
})
export default AddaddressStore