import Reflux from 'reflux';
import AddresslistActions from '../actions/AddresslistActions';
import CONFIG,{XHR} from '../static/js/request';
let AddresslistStore = Reflux.createStore({
  init: function () {
    this.data = {
      indexData:{}
    };
  },
  listenables: AddresslistActions,
  getInitialState() {
    return this.data
  },
   onGetList:async function(){
        try{
            const res=await XHR(CONFIG.baseUrl+CONFIG.alphaPath.userIndexinfo,{},'get');
            this.data.indexData=res;
            this.data.msg='ok';
        }catch(err){
            this.data.indexData=null;
            this.data.msg='error';
        }finally{
            this.data.indexLoading=false;
            this.trigger(this.data);
        }
   },
   onDeleteDialogShow:async function(id){
        if(id){
            this.data.dialogShow=true;
            this.data.deleteAddressId=id;
            this.trigger(this.data);
        }
   },
   onDeleteAddress:async function(id){
        if(id){
            try{
                const res=await XHR(CONFIG.baseUrl+CONFIG.alphaPath.deleteAddress+id,{},'get');
                if(res.message.toUpperCase()=='OK'){
                    this.data.dialogShow=false;
                    this.data.deleteAddressId=null;
                    AddresslistActions.getList();
                }
                
            }catch(err){
                this.data.dialogShow=false;
                this.data.deleteAddressId=null;
                alert('删除地址失败')
            }finally{
                this.trigger(this.data);
            }
        }
   },
   onSetDefault:async function(id){
        console.log(id);
   }
});
export default AddresslistStore