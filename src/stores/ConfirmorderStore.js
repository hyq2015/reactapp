import Reflux from 'reflux';
const PUBLIC=require('../static/js/public.js') ;
import ConfirmorderActions from '../actions/ConfirmorderActions';
import CONFIG,{XHR} from '../static/js/request';
let ConfirmorderStore = Reflux.createStore({
    init: function () {
    this.data = {
        indexLoading:true,
        currentAddress:{},
        hasAddress:false,
        allNeedPay:''
    };
  },
  listenables: ConfirmorderActions,
  getInitialState() {
    return this.data
  },
  onCheckAddress:async function(para){
      let useraddress=[];
        try{
            const res=await XHR(CONFIG.baseUrl+CONFIG.alphaPath.checkUserAddress,{},'get');
            let defaultAddress='';
            let hasAddress=false;
            if(res.length>0){
                hasAddress=true;
                if(res.length==1){
                    defaultAddress=res[0]
                }else{
                    if(para!='none'){
                        defaultAddress=_.filter(res,function(item){
                            return item.id==para
                        })
                    }else{
                        defaultAddress=_.filter(res,function(item){
                            return item.defaultFlag==true
                        })
                    }
                    defaultAddress=defaultAddress[0]
                     
                }
                
            }
            if(defaultAddress){
                window.sessionStorage.userDefaultAddress=JSON.stringify(defaultAddress);
            }
            console.log(defaultAddress)
            this.data.hasAddress=hasAddress;
            this.data.addressLoaded=true;
            this.data.currentAddress=defaultAddress;
            
        }catch(err){
            alert('请求异常');
            this.data.addressLoaded=false;
        }finally{
            this.trigger(this.data);
        }
     
  },
  onLoadData:async function(arr){
      try{
            const res=await XHR(CONFIG.baseUrl+CONFIG.alphaPath.buildOrder,arr,'post');
            this.data.orders=res;
            let needAddress=false;
            let allNeedPay=0;
            for(let item of this.data.orders){
                let productCount=0;
                allNeedPay+=item.totalPrice;
                for(let single of item.selectItems){
                    productCount+=single.amount;
                    if(single.product.needAddress){
                        needAddress=true;
                    }
                }
                item.productCount=productCount;
            }
            this.data.needAddress=needAddress;
            this.data.allNeedPay=allNeedPay;
        }catch(err){
            alert('请求异常');
            this.data.orders=[];
        }finally{
            this.data.indexLoading=false;
            this.trigger(this.data);
        }
  },
  onCreateOrder:async function(data){
        try{
            const res=await XHR(CONFIG.baseUrl+CONFIG.alphaPath.confirmOrder,data,'post');
            this.data.orderCreated=true;
            this.data.orderPayId=res[0].id;
        }catch(err){
            alert('请求异常');
            this.data.orderCreated=false;
        }finally{
            this.data.loadingToastShow=false;
            this.trigger(this.data);
        }
  }
})
export default ConfirmorderStore