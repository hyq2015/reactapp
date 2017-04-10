import Reflux from 'reflux';
import ShopcarActions from '../actions/ShopcarActions';
import CONFIG,{XHR} from '../static/js/request';
let ShopcarStore = Reflux.createStore({
  init: function () {
    this.data = {
        indexLoading:true,
        shoplist:[],
        ChooseAll:true,
        totalAmount:0,
        footerCount:0,
        footerPay:0,
        dialogShow:false,
        sizeDetailShow:false,
        needAddress:true,
        sizeDetailObj:{}
    };
  },
  listenables: ShopcarActions,
  getInitialState() {
    return this.data
  },
  onLoadData:async function(){
    try{
        const res=await XHR(CONFIG.baseUrl+CONFIG.alphaPath.currentShopCar,{},'get');
        this.data.originData=res;
        ShopcarActions.handleData(res);
    }catch(err){
        alert('请求异常')
    }
  },
  onCalculateFooter:function(data){
    let Data=data;
    let orderNeedAddress=false;
    let totalCount = 0;
    let totalPay = 0;
    for (let l = 0; l < Data.shoplist.length; l++) {
        for (let g = 0; g < Data.shoplist[l].products.length; g++) {
            Data.shoplist[l].products[g].totalPrice = Data.shoplist[l].products[g].amount * Data.shoplist[l].products[g].scale.price;
            if(Data.shoplist[l].products[g].product.needAddress && Data.shoplist[l].products[g].checked){
                orderNeedAddress=true;
            }
            if (Data.shoplist[l].products[g].checked) {
                totalCount += parseInt(Data.shoplist[l].products[g].amount);
                totalPay += parseFloat(Data.shoplist[l].products[g].totalPrice);
            }

        }
    }
    Data.footerCount = totalCount;
    Data.footerPay = totalPay;
    Data.needAddress=orderNeedAddress;
    this.trigger(Data);
  },
  onCalculateTopCount:function(data){
    let Data=data;
     let totalAmount=0;
      for(let v=0;v<Data.originData.items.length;v++){
          if(Data.originData.items[v].amount!==0){
              totalAmount+=parseInt(Data.originData.items[v].amount)
          }
      }
      Data.totalAmount=totalAmount;
      this.trigger(Data);
  },
  onHandleData:function(data){
    let newArr = data.items.slice();
    let originData = data.items.slice();
    /*
      * 数组去重
      * */
    let needAddress=false;
    if (data.items.length > 1) {
        for (let i = 0; i < originData.length - 1; i++) {
            for (let j = i + 1; j < originData.length; j++) {
                if (originData[i].product.shop.id == originData[j].product.shop.id) {
                    originData.splice(j, 1);
                    j--;
                }
            }
        }
    }
    let newObj = [];
    for (let n = 0; n < newArr.length; n++) {

        if(newArr[n].product.needAddress){
            needAddress=true;
        }

        if (typeof(newArr[n].scale) != 'object') {
            newArr[n].scale = JSON.parse(newArr[n].scale);
        }

        if (typeof(newArr[n].product.scales) != 'object') {
            newArr[n].product.scales = JSON.parse(newArr[n].product.scales);
        }
        newArr[n].checked = true;

    }
    for (let k = 0; k < originData.length; k++) {
        let freshArr = {"products": []};
        for (let m = 0; m < newArr.length; m++) {
            if (newArr[m].product.shop.id == originData[k].product.shop.id) {
                freshArr.products.push(newArr[m]);
            }
        }
        newObj.push(freshArr);

    }
    for (let h = 0; h < newObj.length; h++) {
        newObj[h].selectAll = true;
    }
    for(let g=0;g<newObj.length;g++){
        newObj[g].editMode=false;
    }
    this.data.shoplist = newObj;
    this.data.needAddress=needAddress;
    this.data.indexLoading=false;
    ShopcarActions.calculateTopCount(this.data);
    ShopcarActions.calculateFooter(this.data);
    
  }
});
export default ShopcarStore;